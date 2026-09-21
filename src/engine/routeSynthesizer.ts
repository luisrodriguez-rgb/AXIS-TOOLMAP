import type { Tool, UserWorkflowQuery, StackRecommendation, WorkflowStageId } from '../types';
import { synthesizeWorkflowStack } from './pipelineSynthesizer';

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

  // Helper para generar el "Data Glue" entre etapas
  const buildDataGlue = (stack: StackRecommendation): DataGlueConnection[] => {
    const connections: DataGlueConnection[] = [];
    const stages = stack.stages;

    for (let i = 0; i < stages.length - 1; i++) {
      const fromTool = stages[i].selectedTool;
      const toTool = stages[i + 1].selectedTool;

      let formatLabel = 'DATA / FILE';
      let transferMethod = 'MANUAL EXPORT/IMPORT';
      let frictionLevel: 'low' | 'medium' | 'high' = 'low';
      let frictionNote = 'Transferencia fluida entre formatos.';

      if (fromTool.category === 'research' && (toTool.category === 'design_visual' || toTool.category === 'drafting_3d')) {
        formatLabel = 'PROMPT / CONCEPT NOTES';
        transferMethod = 'COPY / PASTE TEXT';
        frictionLevel = 'low';
        frictionNote = 'Copiar especificaciones y referencias textuales.';
      } else if ((fromTool.category === 'design_visual' || fromTool.category === 'drafting_3d') && toTool.category === 'presentation') {
        formatLabel = fromTool.capabilities.vectorExport ? 'SVG VECTOR ASSET' : 'PNG RENDER (RASTER)';
        transferMethod = 'FILE IMPORT';
        frictionLevel = fromTool.capabilities.vectorExport ? 'low' : 'medium';
        frictionNote = fromTool.capabilities.vectorExport
          ? 'Vectorial: resolución infinita y editable.'
          : 'Rasterizado: no editable en capas tras exportar.';
      } else if (fromTool.category === 'calculation' && toTool.category === 'presentation') {
        formatLabel = 'EQUATION / SVG PLOT';
        transferMethod = 'EMBED / IMAGE EXPORT';
        frictionLevel = 'low';
        frictionNote = 'Exportar gráficos 2D/3D directamente.';
      } else if (fromTool.category === 'data_analysis') {
        formatLabel = 'CSV / AGGREGATED METRICS';
        transferMethod = 'DATA CONNECTOR';
        frictionLevel = 'medium';
        frictionNote = 'Requiere verificar consistencia de columnas.';
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
      label: 'RUTA RECOMENDADA',
      description: 'Equilibrio óptimo entre presupuesto, velocidad y calidad de entrega.',
      stack: recommendedStack,
      dataGlue: buildDataGlue(recommendedStack),
    },
    zero_cost: {
      id: 'zero_cost',
      label: 'RUTA $0 GRATIS',
      description: 'Stack 100% libre de costo fijo mensual usando freemium y software local.',
      stack: zeroCostStack,
      dataGlue: buildDataGlue(zeroCostStack),
    },
    pro_studio: {
      id: 'pro_studio',
      label: 'RUTA PRO STUDIO',
      description: 'Máxima potencia y automatización para producción sin restricción de costo.',
      stack: proStudioStack,
      dataGlue: buildDataGlue(proStudioStack),
    },
  };
}
