import type { Tool, UserWorkflowQuery, StackRecommendation, WorkflowStageId } from '../types';
import { synthesizeWorkflowStack } from './pipelineSynthesizer';
import { TRANSLATIONS } from '../i18n/translations';

export type RouteId = 'recommended' | 'zero_cost' | 'pro_studio';

export interface DataGlueConnection {
  fromStageId: WorkflowStageId;
  toStageId: WorkflowStageId;
  formatLabel: string;
  transferMethod: string;
  frictionLevel: 'low' | 'medium' | 'high';
  frictionNote: string;
}

export interface RouteOption {
  id: RouteId;
  label: string;
  description: string;
  stack: StackRecommendation;
  dataGlue: DataGlueConnection[];
}

export function synthesizeTriadRoutes(
  baseQuery: UserWorkflowQuery,
  allTools: Tool[],
  manualOverrides: Record<WorkflowStageId, string>
): Record<RouteId, RouteOption> {
  const lang = baseQuery.lang || 'es';
  const tRoutes = TRANSLATIONS[lang].routes;
  const tGlue = TRANSLATIONS[lang].dataGlue;

  // 1. Ruta A: Recomendada / Balanceada (respetando restricciones activas)
  const recommendedStack = synthesizeWorkflowStack(baseQuery, allTools, manualOverrides);

  // 2. Ruta B: Zero-Cost / Open Stack (forzar presupuesto $0)
  const zeroCostQuery: UserWorkflowQuery = {
    ...baseQuery,
    constraints: {
      ...baseQuery.constraints,
      maxMonthlyBudgetUSD: 0,
    },
  };
  const zeroCostStack = synthesizeWorkflowStack(zeroCostQuery, allTools, manualOverrides);

  // 3. Ruta C: Pro Studio (máxima potencia, presupuesto alto $200/mo, tolerancia curva alta)
  const proStudioQuery: UserWorkflowQuery = {
    ...baseQuery,
    constraints: {
      ...baseQuery.constraints,
      maxMonthlyBudgetUSD: 200,
      maxLearningCurve: 'high',
    },
  };
  const proStudioStack = synthesizeWorkflowStack(proStudioQuery, allTools, manualOverrides);

  // Helper para generar el "Data Glue" entre etapas con textos internacionalizados
  const buildDataGlue = (stack: StackRecommendation): DataGlueConnection[] => {
    const connections: DataGlueConnection[] = [];
    const stages = stack.stages;

    for (let i = 0; i < stages.length - 1; i++) {
      const fromTool = stages[i].selectedTool;
      const toTool = stages[i + 1].selectedTool;

      let formatLabel = tGlue.formatLabel.data_file;
      let transferMethod = tGlue.transferMethod.manual;
      let frictionLevel: 'low' | 'medium' | 'high' = 'low';
      let frictionNote = tGlue.frictionNote.seamless_transfer;

      if (fromTool.category === 'research' && (toTool.category === 'design_visual' || toTool.category === 'drafting_3d')) {
        formatLabel = tGlue.formatLabel.prompt_notes;
        transferMethod = tGlue.transferMethod.copy_paste;
        frictionLevel = 'low';
        frictionNote = tGlue.frictionNote.text_refs;
      } else if ((fromTool.category === 'design_visual' || fromTool.category === 'drafting_3d') && toTool.category === 'presentation') {
        formatLabel = fromTool.capabilities.vectorExport ? tGlue.formatLabel.svg_vector : tGlue.formatLabel.png_raster;
        transferMethod = tGlue.transferMethod.file_import;
        frictionLevel = fromTool.capabilities.vectorExport ? 'low' : 'medium';
        frictionNote = fromTool.capabilities.vectorExport
          ? tGlue.frictionNote.vector_infinite
          : tGlue.frictionNote.raster_layers;
      } else if (fromTool.category === 'calculation' && toTool.category === 'presentation') {
        formatLabel = tGlue.formatLabel.equation_plot;
        transferMethod = tGlue.transferMethod.embed;
        frictionLevel = 'low';
        frictionNote = tGlue.frictionNote.export_plots;
      } else if (fromTool.category === 'data_analysis') {
        formatLabel = tGlue.formatLabel.csv_metrics;
        transferMethod = tGlue.transferMethod.connector;
        frictionLevel = 'medium';
        frictionNote = tGlue.frictionNote.column_consistency;
      }

      connections.push({
        fromStageId: stages[i].stage.id,
        toStageId: stages[i + 1].stage.id,
        formatLabel,
        transferMethod,
        frictionLevel,
        frictionNote,
      });
    }

    return connections;
  };

  return {
    recommended: {
      id: 'recommended',
      label: tRoutes.recommended,
      description: tRoutes.recommendedDesc,
      stack: recommendedStack,
      dataGlue: buildDataGlue(recommendedStack),
    },
    zero_cost: {
      id: 'zero_cost',
      label: tRoutes.zero_cost,
      description: tRoutes.zero_costDesc,
      stack: zeroCostStack,
      dataGlue: buildDataGlue(zeroCostStack),
    },
    pro_studio: {
      id: 'pro_studio',
      label: tRoutes.pro_studio,
      description: tRoutes.pro_studioDesc,
      stack: proStudioStack,
      dataGlue: buildDataGlue(proStudioStack),
    },
  };
}
