import type {
  Tool,
  UserWorkflowQuery,
  StackRecommendation,
  WorkflowStageId,
  DataFrictionState,
  DataFidelityLoss,
} from '../types';
import { synthesizeWorkflowStack } from './pipelineSynthesizer';
import { TRANSLATIONS } from '../i18n/translations';

export type RouteId =
  | 'balanced'
  | 'foss'
  | 'max_capability'
  | 'recommended'
  | 'zero_cost'
  | 'pro_studio';

export interface DataGlueConnection {
  fromStageId: WorkflowStageId;
  toStageId: WorkflowStageId;
  formatLabel: string;
  transferMethod: string;
  frictionLevel: 'low' | 'medium' | 'high';
  frictionState: DataFrictionState;
  fidelity: DataFidelityLoss;
  frictionNote: string;
  fidelityWarning?: string;
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

  // 1. Ruta A: Balanceada (óptimo compromiso de capacidades y costo dentro de restricciones)
  const balancedStack = synthesizeWorkflowStack(baseQuery, allTools, manualOverrides);

  // 2. Ruta B: $0 / FOSS (soberanía local, formatos abiertos, forzar presupuesto $0)
  const fossQuery: UserWorkflowQuery = {
    ...baseQuery,
    constraints: {
      ...baseQuery.constraints,
      maxMonthlyBudgetUSD: 0,
      strictPrivacy: true,
    },
  };
  const fossStack = synthesizeWorkflowStack(fossQuery, allTools, manualOverrides);

  // 3. Ruta C: Pro / Máxima Capacidad (máxima potencia técnica, presupuesto $200/mo, tolerancia curva alta)
  const maxCapabilityQuery: UserWorkflowQuery = {
    ...baseQuery,
    constraints: {
      ...baseQuery.constraints,
      maxMonthlyBudgetUSD: 200,
      maxLearningCurve: 'high',
    },
  };
  const maxCapabilityStack = synthesizeWorkflowStack(maxCapabilityQuery, allTools, manualOverrides);

  // Helper para generar el "Data Glue" entre etapas con fricción y fidelidad
  const buildDataGlue = (stack: StackRecommendation): DataGlueConnection[] => {
    const connections: DataGlueConnection[] = [];
    const stages = stack.stages;

    for (let i = 0; i < stages.length - 1; i++) {
      const fromTool = stages[i].selectedTool;
      const toTool = stages[i + 1].selectedTool;

      let formatLabel = tGlue.formatLabel.data_file;
      let transferMethod = tGlue.transferMethod.manual;
      let frictionLevel: 'low' | 'medium' | 'high' = 'low';
      let frictionState: DataFrictionState = 'one_click';
      let fidelity: DataFidelityLoss = 'full';
      let frictionNote = tGlue.frictionNote.seamless_transfer;
      let fidelityWarning: string | undefined = undefined;

      // Modelado de transformaciones específicas
      if (fromTool.category === 'drafting_3d' && toTool.category === 'design_visual') {
        // BIM/CAD -> Raster/Vector: pérdida de datos paramétricos
        formatLabel = 'IFC / OBJ → SVG / PNG';
        transferMethod = 'Render / Export 2D';
        frictionLevel = 'medium';
        frictionState = 'manual';
        fidelity = 'partial';
        fidelityWarning =
          lang === 'es'
            ? 'Pérdida de propiedades paramétricas e información BIM al exportar a geometría plana/malla'
            : 'Loss of parametric properties and BIM metadata when exporting to flat geometry/mesh';
        frictionNote =
          lang === 'es'
            ? 'Requiere exportar vistas 2D o mallas poligonales'
            : 'Requires exporting 2D views or polygonal meshes';
      } else if (fromTool.category === 'research' && (toTool.category === 'design_visual' || toTool.category === 'drafting_3d')) {
        formatLabel = tGlue.formatLabel.prompt_notes;
        transferMethod = tGlue.transferMethod.copy_paste;
        frictionLevel = 'low';
        frictionState = 'one_click';
        fidelity = 'full';
        frictionNote = tGlue.frictionNote.text_refs;
      } else if ((fromTool.category === 'design_visual' || fromTool.category === 'drafting_3d') && toTool.category === 'presentation') {
        formatLabel = fromTool.capabilities.vectorExport ? tGlue.formatLabel.svg_vector : tGlue.formatLabel.png_raster;
        transferMethod = tGlue.transferMethod.file_import;
        frictionLevel = fromTool.capabilities.vectorExport ? 'low' : 'medium';
        frictionState = fromTool.capabilities.vectorExport ? 'automatic' : 'one_click';
        fidelity = fromTool.capabilities.vectorExport ? 'full' : 'partial';
        if (!fromTool.capabilities.vectorExport) {
          fidelityWarning =
            lang === 'es'
              ? 'Rasterización: pérdida de escalabilidad vectorial infinita'
              : 'Rasterization: loss of infinite vector scalability';
        }
        frictionNote = fromTool.capabilities.vectorExport
          ? tGlue.frictionNote.vector_infinite
          : tGlue.frictionNote.raster_layers;
      } else if (fromTool.category === 'calculation' && toTool.category === 'presentation') {
        formatLabel = tGlue.formatLabel.equation_plot;
        transferMethod = tGlue.transferMethod.embed;
        frictionLevel = 'low';
        frictionState = 'one_click';
        fidelity = 'full';
        frictionNote = tGlue.frictionNote.export_plots;
      } else if (fromTool.category === 'data_analysis' && (toTool.category === 'calculation' || toTool.category === 'presentation')) {
        formatLabel = tGlue.formatLabel.csv_metrics;
        transferMethod = tGlue.transferMethod.connector;
        frictionLevel = 'medium';
        frictionState = 'one_click';
        fidelity = 'full';
        frictionNote = tGlue.frictionNote.column_consistency;
      } else if (fromTool.category === 'research' && toTool.category === 'calculation') {
        formatLabel = 'PDF / Paper → Clean Data';
        transferMethod = 'Manual Data Entry / Extraction';
        frictionLevel = 'high';
        frictionState = 'manual';
        fidelity = 'partial';
        fidelityWarning =
          lang === 'es'
            ? 'Extracción no estructurada: requiere verificación humana de tablas y fórmulas'
            : 'Unstructured extraction: requires human verification of tables and formulas';
        frictionNote =
          lang === 'es'
            ? 'Conversión manual de datos numéricos desde literatura'
            : 'Manual numeric data conversion from literature';
      }

      connections.push({
        fromStageId: stages[i].stage.id,
        toStageId: stages[i + 1].stage.id,
        formatLabel,
        transferMethod,
        frictionLevel,
        frictionState,
        fidelity,
        frictionNote,
        fidelityWarning,
      });
    }

    return connections;
  };

  const balancedOption: RouteOption = {
    id: 'balanced',
    label: lang === 'es' ? 'Ruta Balanceada' : 'Balanced Route',
    description: tRoutes.recommendedDesc,
    stack: balancedStack,
    dataGlue: buildDataGlue(balancedStack),
  };

  const fossOption: RouteOption = {
    id: 'foss',
    label: lang === 'es' ? 'Ruta $0 / FOSS Soberana' : '$0 / FOSS Sovereign Route',
    description: tRoutes.zero_costDesc,
    stack: fossStack,
    dataGlue: buildDataGlue(fossStack),
  };

  const maxCapabilityOption: RouteOption = {
    id: 'max_capability',
    label: lang === 'es' ? 'Ruta Pro / Máxima Capacidad' : 'Pro / Max Capability Route',
    description: tRoutes.pro_studioDesc,
    stack: maxCapabilityStack,
    dataGlue: buildDataGlue(maxCapabilityStack),
  };

  return {
    balanced: balancedOption,
    foss: fossOption,
    max_capability: maxCapabilityOption,
    // Aliases para compatibilidad hacia atrás
    recommended: balancedOption,
    zero_cost: fossOption,
    pro_studio: maxCapabilityOption,
  };
}
