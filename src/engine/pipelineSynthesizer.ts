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
import { getLocalizedTool } from '../i18n/toolLocalization';

import { TRANSLATIONS } from '../i18n/translations';

export function getWorkflowStageDefinition(stageId: WorkflowStageId, lang: 'es' | 'en' = 'es'): WorkflowStage {
  const t = TRANSLATIONS[lang].stages[stageId];
  const stepNumbers: Record<WorkflowStageId, number> = {
    ingest_research: 1,
    model_process: 2,
    refine_format: 3,
    present_deliver: 4,
  };

  return {
    id: stageId,
    title: t.title,
    stepNumber: stepNumbers[stageId],
    description: t.description,
  };
}

export const WORKFLOW_STAGES_DEFINITION: Record<WorkflowStageId, WorkflowStage> = {
  ingest_research: getWorkflowStageDefinition('ingest_research', 'es'),
  model_process: getWorkflowStageDefinition('model_process', 'es'),
  refine_format: getWorkflowStageDefinition('refine_format', 'es'),
  present_deliver: getWorkflowStageDefinition('present_deliver', 'es'),
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

  const lang = query.lang || 'es';

  // 2. Para cada etapa, evaluar candidatos
  for (const stageId of activeStageIds) {
    const stageDef = getWorkflowStageDefinition(stageId, lang);

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

    // Calcular por qué y qué sacrifica con soporte multilingüe
    const locSelectedTool = getLocalizedTool(selectedTool, lang);
    const whyThisTool = generateWhyThisTool(selectedTool, query, breakdown, lang);
    const tradeOffs = generateWhatYouSacrifice(selectedTool, query, lang);
    const alternatives = generateAlternatives(scoredCandidates, selectedTool, query.constraints, lang);

    stageRecommendations.push({
      stage: stageDef,
      selectedTool: locSelectedTool,
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
  const tTrade = TRANSLATIONS[lang].tradeoffs;
  if (totalCostUSD === 0) {
    keyStackTradeOff = tTrade.zeroCost;
  } else if (totalCostUSD <= query.constraints.maxMonthlyBudgetUSD) {
    keyStackTradeOff = tTrade.balanced.replace('{cost}', String(totalCostUSD));
  } else {
    keyStackTradeOff = tTrade.exceeded.replace('{delta}', String(totalCostUSD - query.constraints.maxMonthlyBudgetUSD));
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
