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
import { calculateToolScore, DELIVERABLE_COMPATIBLE_CATEGORIES } from './scoring';
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
  manualOverrides: Partial<Record<WorkflowStageId, string>> = {}
): StackRecommendation {
  // 1. Determinar qué etapas aplican según el entregable
  let activeStageIds: WorkflowStageId[] = [];

  switch (query.deliverableType) {
    case 'presentation':
    case 'brand_guidelines':
      activeStageIds = ['ingest_research', 'model_process', 'present_deliver'];
      break;
    case 'visualization':
    case 'render':
      activeStageIds = ['ingest_research', 'model_process', 'refine_format'];
      break;
    case 'report':
    case 'latex_manuscript':
    case 'bib_matrix':
    case 'clinical_protocol':
    case 'environmental_study':
      activeStageIds = ['ingest_research', 'model_process', 'refine_format'];
      break;
    case 'bim_model':
    case 'cad_plan':
    case 'gis_map':
      activeStageIds = ['ingest_research', 'model_process', 'refine_format'];
      break;
    case 'structural_calc':
    case 'cfd_simulation':
    case 'pcb_schematic':
      activeStageIds = ['ingest_research', 'model_process', 'refine_format'];
      break;
    case 'dashboard':
    case 'financial_model':
    case 'bom_estimate':
    case 'construction_schedule':
      activeStageIds = ['ingest_research', 'model_process', 'present_deliver'];
      break;
    case 'code':
    case 'api_spec':
    case 'docker_infra':
    case 'security_audit':
    case 'c4_architecture':
      activeStageIds = ['ingest_research', 'model_process', 'present_deliver'];
      break;
    case 'interactive_prototype':
    case 'design_system':
    case 'journey_map':
    case 'prd_spec':
      activeStageIds = ['ingest_research', 'model_process', 'present_deliver'];
      break;
    case 'video_master':
    case 'motion_graphics':
      activeStageIds = ['ingest_research', 'model_process', 'refine_format'];
      break;
    case 'computational_notebook':
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
    let stageCandidates = allTools.filter((tool) =>
      tool.supportedStages.includes(stageId)
    );

    // Filtrar estrictamente por categorías compatibles con el entregable (Domain Integrity Filter)
    const allowedCategories = DELIVERABLE_COMPATIBLE_CATEGORIES[query.deliverableType];
    if (allowedCategories && allowedCategories.length > 0) {
      const categoryFiltered = stageCandidates.filter((tool) =>
        allowedCategories.includes(tool.category)
      );
      // Solo aplicar si deja al menos 1 candidato
      if (categoryFiltered.length > 0) {
        stageCandidates = categoryFiltered;
      }
    }

    // 1. Filtrado Estricto de Restricciones Duras (Hard Constraints)
    // Separa candidatos viables de aquellos descartados por presupuesto, SO o privacidad
    const evaluatedCandidates = stageCandidates.map((tool) => {
      const filterResult = evaluateHardConstraints(tool, query.constraints);
      const breakdown = calculateToolScore(tool, query, stageId);

      // Si ya fue seleccionada en una etapa previa, aplicar leve penalización para favorecer diversidad en el flujo
      const alreadySelected = stageRecommendations.some(
        (prev) => prev.selectedTool.id === tool.id
      );
      const diversityPenalty = alreadySelected ? 20 : 0;
      const adjustedScore = Math.max(5, breakdown.finalScore - diversityPenalty);

      return {
        tool,
        filterResult,
        breakdown: { ...breakdown, finalScore: adjustedScore },
      };
    });

    // Candidatos que superan estrictamente todas las restricciones duras
    const compliantCandidates = evaluatedCandidates
      .filter((c) => c.filterResult.passes)
      .sort((a, b) => b.breakdown.finalScore - a.breakdown.finalScore);

    // Candidatos no conformes (para análisis de trade-offs o alternativas descartadas)
    const nonCompliantCandidates = evaluatedCandidates
      .filter((c) => !c.filterResult.passes)
      .sort((a, b) => b.breakdown.finalScore - a.breakdown.finalScore);

    // Lista combinada ordenada dando prioridad absoluta a los conformes
    const allSortedCandidates = [...compliantCandidates, ...nonCompliantCandidates];

    // Comprobar si hay un override manual del usuario (por botón Swap)
    const overrideToolId = manualOverrides[stageId];
    let selectedCandidate = allSortedCandidates.find(
      (c) => c.tool.id === overrideToolId
    );

    // Si no hay override o no se encuentra, tomar el primer candidato estrictamente conforme
    if (!selectedCandidate) {
      selectedCandidate = compliantCandidates[0] || nonCompliantCandidates[0];
    }

    if (!selectedCandidate) continue;

    const { tool: selectedTool, breakdown } = selectedCandidate;

    // Calcular por qué y qué sacrifica con soporte multilingüe
    const locSelectedTool = getLocalizedTool(selectedTool, lang);
    const whyThisTool = generateWhyThisTool(selectedTool, query, breakdown, lang);
    const tradeOffs = generateWhatYouSacrifice(selectedTool, query, lang);
    const alternatives = generateAlternatives(allSortedCandidates, selectedTool, query.constraints, lang);

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
