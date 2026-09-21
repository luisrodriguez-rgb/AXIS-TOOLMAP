import type {
  Tool,
  UserWorkflowQuery,
  WorkflowStage,
  WorkflowStageId,
  StageRecommendation,
  StackRecommendation,
  TechnicalLevel,
} from '../types';
import { evaluateHardConstraints } from './filter';
import { calculateToolScore } from './scoring';
import {
  generateWhyThisTool,
  generateWhatYouSacrifice,
  generateAlternatives,
} from './tradeoffs';

export const WORKFLOW_STAGES_DEFINITION: Record<WorkflowStageId, WorkflowStage> = {
  ingest_research: {
    id: 'ingest_research',
    title: '1. Ingesta & Fuentes',
    stepNumber: 1,
    description: 'Recopilación de documentos, referencias, apuntes o datos brutos.',
  },
  model_process: {
    id: 'model_process',
    title: '2. Núcleo & Procesamiento',
    stepNumber: 2,
    description: 'Cálculo, renderizado, diseño conceptual o análisis estadístico.',
  },
  refine_format: {
    id: 'refine_format',
    title: '3. Estructuración & Refinamiento',
    stepNumber: 3,
    description: 'Organización de contenidos, edición y preparación de artefactos.',
  },
  present_deliver: {
    id: 'present_deliver',
    title: '4. Presentación & Entrega',
    stepNumber: 4,
    description: 'Maquetación de diapositivas, informe final o entrega interactiva.',
  },
};

export function synthesizeWorkflowStack(
  query: UserWorkflowQuery,
  allTools: Tool[],
  manualOverrides: Record<WorkflowStageId, string> = {} as Record<WorkflowStageId, string>
): StackRecommendation {
  // 1. Determinar qué etapas aplican según el entregable
  let activeStageIds: WorkflowStageId[] = [];

  switch (query.deliverableType) {
    case 'presentation':
      activeStageIds = ['ingest_research', 'model_process', 'present_deliver'];
      break;
    case 'visualization':
      activeStageIds = ['ingest_research', 'model_process', 'refine_format'];
      break;
    case 'report':
      activeStageIds = ['ingest_research', 'model_process', 'refine_format'];
      break;
    case 'render':
      activeStageIds = ['ingest_research', 'model_process', 'refine_format'];
      break;
    case 'dashboard':
      activeStageIds = ['ingest_research', 'model_process', 'present_deliver'];
      break;
    case 'code':
      activeStageIds = ['ingest_research', 'model_process', 'refine_format'];
      break;
    case 'concept':
    default:
      activeStageIds = ['ingest_research', 'model_process', 'present_deliver'];
      break;
  }

  const stageRecommendations: StageRecommendation[] = [];
  let totalCostUSD = 0;
  let accumulatedFit = 0;
  let accumulatedSynergy = 0;
  let maxTechRequired: TechnicalLevel = 'none';

  const techRank: Record<TechnicalLevel, number> = {
    none: 0,
    low: 1,
    medium: 2,
    high: 3,
  };

  // 2. Para cada etapa, evaluar candidatos
  for (const stageId of activeStageIds) {
    const stageDef = WORKFLOW_STAGES_DEFINITION[stageId];

    // Herramientas que admiten esta etapa
    const stageCandidates = allTools.filter((tool) =>
      tool.supportedStages.includes(stageId)
    );

    // Evaluar restricciones y score de cada candidata
    const scoredCandidates = stageCandidates
      .map((tool) => {
        const filterResult = evaluateHardConstraints(tool, query.constraints);
        const breakdown = calculateToolScore(tool, query, stageId);

        // Si ya fue seleccionada en una etapa previa, aplicar leve penalización para favorecer diversidad en el flujo
        const alreadySelected = stageRecommendations.some(
          (prev) => prev.selectedTool.id === tool.id
        );
        const diversityPenalty = alreadySelected ? 20 : 0;

        // Si fue descartada por filtro duro, penalizar fuertemente el score
        const adjustedScore = filterResult.passes
          ? Math.max(5, breakdown.finalScore - diversityPenalty)
          : Math.max(5, breakdown.finalScore - 45);

        return {
          tool,
          filterResult,
          breakdown: { ...breakdown, finalScore: adjustedScore },
        };
      })
      .sort((a, b) => b.breakdown.finalScore - a.breakdown.finalScore);

    // Comprobar si hay un override manual del usuario (por botón Swap)
    const overrideToolId = manualOverrides[stageId];
    let selectedCandidate = scoredCandidates.find(
      (c) => c.tool.id === overrideToolId
    );

    // Si no hay override o no se encuentra, tomar el primer candidato compatible
    if (!selectedCandidate) {
      selectedCandidate =
        scoredCandidates.find((c) => c.filterResult.passes) || scoredCandidates[0];
    }

    if (!selectedCandidate) continue;

    const { tool: selectedTool, breakdown } = selectedCandidate;

    // Calcular por qué y qué sacrifica
    const whyThisTool = generateWhyThisTool(selectedTool, query, breakdown);
    const tradeOffs = generateWhatYouSacrifice(selectedTool, query);
    const alternatives = generateAlternatives(scoredCandidates, selectedTool, query.constraints);

    stageRecommendations.push({
      stage: stageDef,
      selectedTool,
      matchScore: breakdown.finalScore,
      scoreBreakdown: breakdown,
      whyThisTool,
      tradeOffs,
      alternatives,
    });

    // Costo efectivo: si el usuario pide gratis ($0) y la herramienta tiene free tier, el costo efectivo es $0
    const effectiveCost =
      query.constraints.maxMonthlyBudgetUSD === 0 && selectedTool.pricing.hasFreeTier
        ? 0
        : selectedTool.pricing.startingPricePerMonthUSD;

    totalCostUSD += effectiveCost;
    accumulatedFit += breakdown.finalScore;
    accumulatedSynergy += breakdown.ecosystemSynergy;

    if (techRank[selectedTool.technicalLevelRequired] > techRank[maxTechRequired]) {
      maxTechRequired = selectedTool.technicalLevelRequired;
    }
  }

  const stageCount = stageRecommendations.length || 1;
  const overallFitScore = Math.round(accumulatedFit / stageCount);
  const ecosystemSynergyScore = Math.round(accumulatedSynergy / stageCount);

  // Sintetizar el trade-off principal del stack completo
  let keyStackTradeOff = '';
  if (totalCostUSD === 0) {
    keyStackTradeOff =
      'Stack 100% libre de costo fijo mensual: óptimo para investigación y estudio, pero con límites de consumo diario en ciertas herramientas freemium.';
  } else if (totalCostUSD <= query.constraints.maxMonthlyBudgetUSD) {
    keyStackTradeOff = `Presupuesto balanceado ($${totalCostUSD} USD/mes): alta fidelidad de entrega manteniendo costos bajo control y curva accesible.`;
  } else {
    keyStackTradeOff = `Supera el presupuesto inicial en +$${totalCostUSD - query.constraints.maxMonthlyBudgetUSD} USD/mes: se recomienda evaluar alternativas gratuitas en las etapas secundarias.`;
  }

  return {
    stages: stageRecommendations,
    totalEstimatedMonthlyCostUSD: totalCostUSD,
    overallFitScore,
    ecosystemSynergyScore,
    learningCurveOverall: maxTechRequired,
    keyStackTradeOff,
  };
}
