import type {
  Tool,
  UserWorkflowQuery,
  StackRecommendation,
  WorkflowStageId,
  DataFrictionState,
  DataFidelityLoss,
  DataFidelityProfile,
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
  fidelityProfile: DataFidelityProfile;
  frictionNote: string;
  fidelityWarning?: string;
}

export interface RouteOption {
  id: RouteId;
  label: string;
  description: string;
  objectiveStatement: string;
  objectiveFormula: string;
  stack: StackRecommendation;
  dataGlue: DataGlueConnection[];
}

export function synthesizeTriadRoutes(
  baseQuery: UserWorkflowQuery,
  allTools: Tool[],
  manualOverrides: Record<WorkflowStageId, string> = {} as Record<WorkflowStageId, string>
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

  // Helper para generar el "Data Glue" entre etapas con fricción y fidelidad multidimensional
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

      let fidelityProfile: DataFidelityProfile = {
        overall: 'full',
        dimensions: {
          geometry: 'not_applicable',
          semantic_data: 'preserved',
          parameters: 'not_applicable',
          metadata: 'preserved',
          structure: 'preserved',
          formatting: 'preserved',
          editability: 'fully_editable',
        },
      };

      // Modelado de transformaciones específicas y fidelidad multidimensional
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
        fidelityProfile = {
          overall: 'partial',
          dimensions: {
            geometry: 'flattened',
            semantic_data: 'stripped',
            parameters: 'lost',
            metadata: 'stripped',
            structure: 'flattened',
            formatting: 'preserved',
            editability: 'reconstruction_required',
          },
          lossExplanation: fidelityWarning,
        };
      } else if (fromTool.category === 'research' && (toTool.category === 'productivity' || toTool.id === 'obsidian')) {
        formatLabel = 'BibTeX / DOI → Markdown Frontmatter';
        transferMethod = 'Connector / Export Bib';
        frictionLevel = 'low';
        frictionState = 'one_click';
        fidelity = 'full';
        frictionNote =
          lang === 'es'
            ? 'Sincronización fluida de metadatos bibliográficos a notas Markdown locales'
            : 'Seamless bibliographic metadata sync to local Markdown notes';
        fidelityProfile = {
          overall: 'full',
          dimensions: {
            geometry: 'not_applicable',
            semantic_data: 'preserved',
            parameters: 'not_applicable',
            metadata: 'preserved',
            structure: 'preserved',
            formatting: 'approximate',
            editability: 'fully_editable',
          },
          lossExplanation: lang === 'es'
            ? 'Metadatos bibliográficos y citas DOI preservados con editabilidad completa'
            : 'Bibliographic metadata and DOI citations preserved with full editability',
        };
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
        fidelityProfile = {
          overall: fromTool.capabilities.vectorExport ? 'full' : 'partial',
          dimensions: {
            geometry: fromTool.capabilities.vectorExport ? 'preserved' : 'degraded',
            semantic_data: 'not_applicable',
            parameters: 'not_applicable',
            metadata: 'preserved',
            structure: 'flattened',
            formatting: 'preserved',
            editability: fromTool.capabilities.vectorExport ? 'fully_editable' : 'reconstruction_required',
          },
          lossExplanation: fidelityWarning,
        };
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
        fidelityProfile = {
          overall: 'partial',
          dimensions: {
            geometry: 'not_applicable',
            semantic_data: 'partially_retained',
            parameters: 'not_applicable',
            metadata: 'partially_mapped',
            structure: 'flattened',
            formatting: 'broken',
            editability: 'reconstruction_required',
          },
          lossExplanation: fidelityWarning,
        };
      } else if (fromTool.id === 'v0' && (toTool.id === 'supabase' || toTool.id === 'vercel')) {
        formatLabel = 'React / TSX Components → Production Deployment';
        transferMethod = 'Git Push / CLI Deploy';
        frictionLevel = 'low';
        frictionState = 'automatic';
        fidelity = 'full';
        frictionNote =
          lang === 'es'
            ? 'Despliegue directo de componentes limpios a infraestructura en la nube'
            : 'Direct deployment of clean components to cloud infrastructure';
        fidelityProfile = {
          overall: 'full',
          dimensions: {
            geometry: 'not_applicable',
            semantic_data: 'preserved',
            parameters: 'not_applicable',
            metadata: 'preserved',
            structure: 'preserved',
            formatting: 'preserved',
            editability: 'fully_editable',
          },
          lossExplanation: lang === 'es'
            ? 'Código fuente React completamente editable y modular sin pérdida'
            : 'Fully editable, modular React source code with zero loss',
        };
      }

      connections.push({
        fromStageId: stages[i].stage.id,
        toStageId: stages[i + 1].stage.id,
        formatLabel,
        transferMethod,
        frictionLevel,
        frictionState,
        fidelity,
        fidelityProfile,
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
    objectiveStatement:
      lang === 'es'
        ? 'Minimizar fricción operativa y costo recurrente manteniendo capacidad profesional suficiente.'
        : 'Minimize operational friction and recurring cost while maintaining professional capability.',
    objectiveFormula: 'min(Friction + Cost) s.t. OutputFit ≥ 75%',
    stack: balancedStack,
    dataGlue: buildDataGlue(balancedStack),
  };

  const fossOption: RouteOption = {
    id: 'foss',
    label: lang === 'es' ? 'Ruta $0 / FOSS Soberana' : '$0 / FOSS Sovereign Route',
    description: tRoutes.zero_costDesc,
    objectiveStatement:
      lang === 'es'
        ? 'Maximizar soberanía de datos y costo recurrente cero mediante formatos abiertos (IFC, Markdown, SVG, SQL).'
        : 'Maximize data sovereignty and zero recurring cost through open standards (IFC, Markdown, SVG, SQL).',
    objectiveFormula: 'max(Sovereignty) ∧ Cost = $0 s.t. OpenStandards = true',
    stack: fossStack,
    dataGlue: buildDataGlue(fossStack),
  };

  const maxCapabilityOption: RouteOption = {
    id: 'max_capability',
    label: lang === 'es' ? 'Ruta Pro / Máxima Capacidad' : 'Pro / Max Capability Route',
    description: tRoutes.pro_studioDesc,
    objectiveStatement:
      lang === 'es'
        ? 'Maximizar potencia técnica y velocidad de entrega bajo restricciones de presupuesto y curva aceptadas.'
        : 'Maximize technical horsepower and delivery speed under accepted budget and learning curve limits.',
    objectiveFormula: 'max(TechnicalPower) under Accepted Constraints',
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
