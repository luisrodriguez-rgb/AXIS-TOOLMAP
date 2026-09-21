import type { Tool, UserWorkflowQuery, WorkflowStageId, DeliverableType, ToolCategory, StageFitLevel } from '../types';

export const DELIVERABLE_COMPATIBLE_CATEGORIES: Record<DeliverableType, ToolCategory[]> = {
  // Documentos, investigación & textos
  latex_manuscript: ['research', 'productivity', 'data_analysis'],
  bib_matrix: ['research', 'productivity'],
  report: ['research', 'productivity', 'data_analysis'],
  clinical_protocol: ['research', 'productivity'],
  environmental_study: ['research', 'data_analysis', 'drafting_3d', 'calculation'],
  prd_spec: ['productivity', 'design_visual'],

  // Arquitectura, BIM, CAD & 3D
  bim_model: ['drafting_3d', 'calculation', 'design_visual'],
  cad_plan: ['drafting_3d', 'calculation'],
  render: ['drafting_3d', 'design_visual'],
  visualization: ['drafting_3d', 'design_visual', 'data_analysis', 'calculation'],

  // Ingeniería, Cálculo & Simulación
  structural_calc: ['calculation', 'drafting_3d', 'data_analysis'],
  cfd_simulation: ['calculation', 'drafting_3d'],
  pcb_schematic: ['calculation', 'drafting_3d'],
  computational_notebook: ['data_analysis', 'calculation', 'productivity'],

  // Software, Producto, Web & Startups
  code: ['productivity', 'data_analysis', 'design_visual'],
  api_spec: ['productivity'],
  docker_infra: ['productivity'],
  security_audit: ['productivity'],
  c4_architecture: ['productivity', 'design_visual'],
  interactive_prototype: ['design_visual', 'productivity'],
  design_system: ['design_visual', 'productivity'],

  // Datos, Finanzas & Gestión
  dashboard: ['data_analysis', 'productivity'],
  financial_model: ['data_analysis', 'productivity', 'calculation'],
  bom_estimate: ['data_analysis', 'productivity', 'calculation'],
  construction_schedule: ['productivity', 'drafting_3d', 'data_analysis'],
  gis_map: ['drafting_3d', 'data_analysis'],

  // Medios, Presentaciones & Marca
  presentation: ['productivity', 'design_visual', 'research'],
  brand_guidelines: ['design_visual', 'productivity'],
  video_master: ['design_visual'],
  motion_graphics: ['design_visual'],
  concept: ['productivity', 'design_visual', 'research'],
  journey_map: ['design_visual', 'productivity'],
};

export type { StageFitLevel };

export interface StageFitEvaluation {
  level: StageFitLevel;
  points: number;
  reason: string;
}

export function evaluateStageFit(
  tool: Tool,
  deliverableType: DeliverableType,
  stageId: WorkflowStageId
): StageFitEvaluation {
  const allowedCategories = DELIVERABLE_COMPATIBLE_CATEGORIES[deliverableType];

  // 1. INCOMPATIBLE: categoría prohibida o etapa no admitida
  if (allowedCategories && !allowedCategories.includes(tool.category)) {
    return {
      level: 'incompatible',
      points: -150,
      reason: `Categoría "${tool.category}" incompatible con el entregable "${deliverableType}"`,
    };
  }

  if (!tool.supportedStages.includes(stageId)) {
    return {
      level: 'incompatible',
      points: -100,
      reason: `La herramienta no opera en la etapa "${stageId}"`,
    };
  }

  // 2. STRONGLY_FIT: Especialización nativa y directa para la etapa y entregable
  // Casos académicos y publicaciones
  if (deliverableType === 'latex_manuscript' || deliverableType === 'bib_matrix' || deliverableType === 'report') {
    if (stageId === 'ingest_research' && tool.category === 'research' && tool.capabilities.citationsEnabled) {
      return { level: 'strongly_fit', points: 50, reason: 'Gestión nativa de bibliografía y citas DOI en literatura académica' };
    }
    if (stageId === 'model_process' && (tool.id === 'obsidian' || tool.id === 'scrivener' || tool.id === 'atlas-ti' || tool.capabilities.dataAnalysis)) {
      return { level: 'strongly_fit', points: 50, reason: 'Entorno especializado en síntesis de literatura, notas vinculadas y análisis' };
    }
    if ((stageId === 'refine_format' || stageId === 'present_deliver') && (tool.id === 'overleaf' || tool.id === 'marp' || tool.id === 'scribus')) {
      return { level: 'strongly_fit', points: 50, reason: 'Compilación y tipografía matemática de alta precisión para publicación' };
    }
  }

  // Casos BIM / CAD / 3D
  if (deliverableType === 'bim_model' || deliverableType === 'cad_plan') {
    if (stageId === 'model_process' && tool.capabilities.cad3DModeling && (tool.id === 'revit' || tool.id === 'archicad' || tool.id === 'bonsai-bim' || tool.id === 'freecad' || tool.id === 'autocad' || tool.id === 'rhino')) {
      return { level: 'strongly_fit', points: 50, reason: 'Modelador paramétrico/BIM nativo con soporte de clases IFC y estándares' };
    }
    if (stageId === 'refine_format' && tool.capabilities.vectorExport) {
      return { level: 'strongly_fit', points: 45, reason: 'Generación de documentación técnica y planos ejecutivos vectoriales' };
    }
  }

  // Casos Software / MVP / Web
  if (deliverableType === 'code' || deliverableType === 'interactive_prototype') {
    if (stageId === 'ingest_research' && (tool.id === 'notion' || tool.id === 'linear' || tool.id === 'appflowy')) {
      return { level: 'strongly_fit', points: 50, reason: 'Especificación de producto, backlog y seguimiento de requerimientos' };
    }
    if (stageId === 'model_process' && (tool.id === 'v0' || tool.id === 'cursor' || tool.id === 'vs-code' || tool.id === 'penpot' || tool.id === 'figma')) {
      return { level: 'strongly_fit', points: 50, reason: 'Generación acelerada de UI frontend / código modular' };
    }
    if ((stageId === 'refine_format' || stageId === 'present_deliver') && (tool.id === 'supabase' || tool.id === 'vercel' || tool.id === 'docker')) {
      return { level: 'strongly_fit', points: 50, reason: 'Backend relacional sin servidor y despliegue continuo a producción' };
    }
  }

  // Casos Datos / Dashboard / Cálculo
  if (deliverableType === 'dashboard' || deliverableType === 'financial_model') {
    if (stageId === 'model_process' && tool.capabilities.dataAnalysis) {
      return { level: 'strongly_fit', points: 50, reason: 'Motor analítico para transformación y agregación de métricas' };
    }
    if (stageId === 'present_deliver' && (tool.id === 'power-bi' || tool.id === 'tableau' || tool.id === 'looker-studio' || tool.id === 'metabase' || tool.id === 'apache-superset')) {
      return { level: 'strongly_fit', points: 50, reason: 'Plataforma líder de visualización de tableros y KPIs interactivos' };
    }
  }

  // 3. CAPABLE: La herramienta opera en la etapa y pertenece a una categoría válida, pero sin hiperespecialización
  return {
    level: 'capable',
    points: 20,
    reason: `Capacidad general en categoría "${tool.category}" para la etapa "${stageId}"`,
  };
}

export interface ScoreBreakdown {
  taskFit: number;
  frictionFactor: number;
  constraintCompliance: number;
  ecosystemSynergy: number;
  finalScore: number;
  stageFitLevel: StageFitLevel;
  stageFitReason: string;
}

export function calculateToolScore(
  tool: Tool,
  query: UserWorkflowQuery,
  stageId: WorkflowStageId
): ScoreBreakdown {
  const { persona, needText, deliverableType, constraints } = query;
  const lowerNeed = needText.toLowerCase();

  // --- 1. TASK FIT (Ajuste Funcional Evaluado con Matriz de 3 Niveles) ---
  const stageFit = evaluateStageFit(tool, deliverableType, stageId);
  let fitPoints = 50 + stageFit.points;

  // Relevancia en la etapa específica
  if (tool.supportedStages.includes(stageId)) {
    fitPoints += 15;
  }

  // Capacidades según el tipo de entregable
  switch (deliverableType) {
    case 'presentation':
    case 'brand_guidelines':
      if (tool.capabilities.presentationBuilder) fitPoints += 25;
      if (tool.capabilities.generatesImages) fitPoints += 10;
      if (tool.capabilities.vectorExport) fitPoints += 10;
      break;
    case 'visualization':
      if (tool.capabilities.symbolicMath || tool.capabilities.cad3DModeling) fitPoints += 25;
      if (tool.capabilities.generatesImages) fitPoints += 15;
      if (tool.capabilities.vectorExport) fitPoints += 10;
      break;
    case 'report':
    case 'environmental_study':
    case 'clinical_protocol':
    case 'prd_spec':
      if (tool.capabilities.handlesPDF) fitPoints += 20;
      if (tool.capabilities.citationsEnabled) fitPoints += 25;
      if (tool.capabilities.dataAnalysis) fitPoints += 10;
      break;
    case 'latex_manuscript':
    case 'bib_matrix':
      if (tool.capabilities.citationsEnabled) fitPoints += 35;
      if (tool.capabilities.handlesPDF) fitPoints += 20;
      break;
    case 'cad_plan':
    case 'bim_model':
      if (tool.capabilities.cad3DModeling) fitPoints += 35;
      if (tool.capabilities.vectorExport) fitPoints += 20;
      break;
    case 'structural_calc':
    case 'cfd_simulation':
      if (tool.capabilities.symbolicMath || tool.category === 'calculation') fitPoints += 35;
      if (tool.capabilities.cad3DModeling) fitPoints += 20;
      break;
    case 'pcb_schematic':
      if (tool.id === 'altium' || tool.id === 'kicad') fitPoints += 45;
      if (tool.capabilities.vectorExport) fitPoints += 15;
      break;
    case 'render':
      if (tool.capabilities.cad3DModeling || tool.capabilities.generatesImages) fitPoints += 30;
      break;
    case 'dashboard':
    case 'financial_model':
    case 'bom_estimate':
    case 'construction_schedule':
      if (tool.capabilities.dataAnalysis) fitPoints += 30;
      if (tool.capabilities.interactiveCollaboration) fitPoints += 10;
      break;
    case 'code':
    case 'api_spec':
    case 'docker_infra':
    case 'security_audit':
    case 'c4_architecture':
      if (tool.capabilities.generatesCode || tool.category === 'productivity') fitPoints += 35;
      break;
    case 'interactive_prototype':
    case 'design_system':
      if (tool.capabilities.interactiveCollaboration) fitPoints += 25;
      if (tool.capabilities.vectorExport) fitPoints += 20;
      break;
    case 'computational_notebook':
      if (tool.capabilities.dataAnalysis) fitPoints += 25;
      if (tool.capabilities.generatesCode) fitPoints += 25;
      if (tool.capabilities.symbolicMath) fitPoints += 15;
      break;
    case 'video_master':
    case 'motion_graphics':
      if (tool.capabilities.voiceAudio || tool.category === 'design_visual') fitPoints += 35;
      if (tool.capabilities.generatesImages) fitPoints += 20;
      break;
    case 'gis_map':
      if (tool.id === 'civil-3d' || tool.capabilities.dataAnalysis) fitPoints += 35;
      if (tool.capabilities.vectorExport) fitPoints += 15;
      break;
    case 'concept':
    case 'journey_map':
      if (tool.capabilities.generatesImages || tool.capabilities.interactiveCollaboration) fitPoints += 20;
      break;
  }

  // Ajuste por palabras clave en la necesidad expresada por el usuario
  if (lowerNeed.includes('pdf') && tool.capabilities.handlesPDF) fitPoints += 10;
  if ((lowerNeed.includes('cálculo') || lowerNeed.includes('integral') || lowerNeed.includes('matemátic')) && tool.capabilities.symbolicMath) {
    fitPoints += 25;
  }
  if ((lowerNeed.includes('render') || lowerNeed.includes('fachada') || lowerNeed.includes('boceto')) && (tool.capabilities.generatesImages || tool.capabilities.cad3DModeling)) {
    fitPoints += 20;
  }
  if ((lowerNeed.includes('cita') || lowerNeed.includes('paper') || lowerNeed.includes('fuente')) && tool.capabilities.citationsEnabled) {
    fitPoints += 20;
  }
  if ((lowerNeed.includes('encuesta') || lowerNeed.includes('excel') || lowerNeed.includes('dato')) && tool.capabilities.dataAnalysis) {
    fitPoints += 20;
  }
  if ((lowerNeed.includes('landing') || lowerNeed.includes('mvp') || lowerNeed.includes('sin programar') || lowerNeed.includes('no-code') || lowerNeed.includes('no técnico')) && (tool.id === 'v0' || tool.id === 'supabase' || tool.id === 'notion' || tool.id === 'vercel' || tool.id === 'appflowy')) {
    fitPoints += 40;
  }
  if ((lowerNeed.includes('base de datos') || lowerNeed.includes('crm') || lowerNeed.includes('clientes')) && (tool.id === 'supabase' || tool.id === 'notion' || tool.id === 'appflowy')) {
    fitPoints += 40;
  }

  // --- AFINIDAD DE DOMINIO PROFESIONAL DIRECTA ---
  const roleLower = (persona.primaryRole || '').toLowerCase();
  if ((roleLower.includes('civil') || roleLower.includes('construc') || roleLower.includes('gis')) && (tool.category === 'drafting_3d' || tool.category === 'calculation')) {
    fitPoints += 35; // Prioridad a Civil 3D, AutoCAD, Revit, Procore, OpenSpace, OpenFOAM
  } else if (roleLower.includes('arquitect') && (tool.category === 'drafting_3d' || tool.capabilities.cad3DModeling)) {
    fitPoints += 30; // Prioridad a Revit, ArchiCAD, Rhino, SketchUp, LookX, Twinmotion, Enscape
  } else if ((roleLower.includes('software') || roleLower.includes('devops') || roleLower.includes('ciberseguridad') || roleLower.includes('desarroll')) && (tool.capabilities.generatesCode || tool.id === 'docker' || tool.id === 'postman' || tool.id === 'jetbrains-idea' || tool.id === 'supabase' || tool.id === 'vercel' || tool.id === 'sentry')) {
    fitPoints += 35; // Prioridad a VS Code, Cursor, IntelliJ, Docker, Postman, Supabase, Vercel, Sentry, Linear
  } else if ((roleLower.includes('fundad') || roleLower.includes('emprended') || roleLower.includes('startup') || roleLower.includes('product manager') || roleLower.includes('pm')) && (tool.id === 'v0' || tool.id === 'supabase' || tool.id === 'notion' || tool.id === 'vercel' || tool.id === 'linear' || tool.id === 'appflowy')) {
    fitPoints += 40; // Prioridad a stack moderno de fundadores
  } else if ((roleLower.includes('mecánic') || roleLower.includes('electrónic') || roleLower.includes('químic') || roleLower.includes('biomédic') || roleLower.includes('industrial') || roleLower.includes('ingenier')) && (tool.category === 'calculation' || tool.category === 'drafting_3d')) {
    fitPoints += 35; // Prioridad a SolidWorks, CATIA, Creo, Inventor, Ansys, MATLAB, COMSOL, Altium, KiCad
  } else if ((roleLower.includes('dato') || roleLower.includes('financ') || roleLower.includes('econometr') || roleLower.includes('matemátic')) && (tool.category === 'data_analysis' || tool.category === 'calculation')) {
    fitPoints += 35; // Prioridad a Power BI, Tableau, Snowflake, Databricks, dbt, Superset, Metabase, RStudio, Excel
  } else if ((roleLower.includes('diseñ') || roleLower.includes('motion') || roleLower.includes('video') || roleLower.includes('branding')) && tool.category === 'design_visual') {
    fitPoints += 35; // Prioridad a Figma, Adobe Photoshop/Illustrator/Premiere/After Effects, DaVinci Resolve, Cinema 4D, Spline
  } else if ((roleLower.includes('investig') || roleLower.includes('clínic') || roleLower.includes('bioinformátic') || roleLower.includes('redactor') || roleLower.includes('docente') || roleLower.includes('abogado')) && (tool.category === 'research' || tool.category === 'productivity')) {
    fitPoints += 35; // Prioridad a Zotero, Overleaf, Elicit, Perplexity, Mendeley, Connected Papers, Rayyan, ATLAS.ti, Notion
  }

  const taskFit = Math.min(100, Math.max(5, fitPoints));

  // --- 2. FRICTION FACTOR (Facilidad de Adopción y Curva de Aprendizaje) ---
  let frictionPoints = 85;

  const techLevelValues: Record<string, number> = {
    none: 0,
    low: 1,
    medium: 2,
    high: 3,
  };

  const toolTechReq = techLevelValues[tool.technicalLevelRequired] || 0;
  const userTechLvl = techLevelValues[persona.technicalLevel] || 0;
  const maxAllowedCurve = techLevelValues[constraints.maxLearningCurve] || 1;

  // Penalizar si la herramienta requiere más nivel técnico del que el usuario tiene
  if (toolTechReq > userTechLvl) {
    const diff = toolTechReq - userTechLvl;
    frictionPoints -= diff * 25;
  }

  // Penalizar si supera la tolerancia de curva de aprendizaje declarada
  if (toolTechReq > maxAllowedCurve) {
    frictionPoints -= 20;
  }

  // Bonus si es accesible sin código para usuarios no técnicos
  if (tool.technicalLevelRequired === 'none' && persona.technicalLevel === 'none') {
    frictionPoints += 15;
  }

  const frictionFactor = Math.min(100, Math.max(5, frictionPoints));

  // --- 3. CONSTRAINT COMPLIANCE (Presupuesto, OS, Privacidad) ---
  let compliancePoints = 80;

  // Presupuesto
  if (constraints.maxMonthlyBudgetUSD === 0) {
    if (tool.pricing.hasFreeTier && tool.pricing.billingModel === 'free') {
      compliancePoints += 20;
    } else if (tool.pricing.hasFreeTier) {
      compliancePoints += 10;
    } else {
      compliancePoints -= 40;
    }
  } else {
    if (tool.pricing.startingPricePerMonthUSD <= constraints.maxMonthlyBudgetUSD) {
      compliancePoints += 15;
    } else {
      compliancePoints -= 25;
    }
  }

  // Sistema Operativo nativo vs solo Web
  if (constraints.os !== 'any') {
    if (tool.platforms.includes(constraints.os)) {
      compliancePoints += 10; // App nativa preferida
    } else if (tool.platforms.includes('web')) {
      compliancePoints += 5; // Web soportada
    }
  }

  // Privacidad
  if (constraints.strictPrivacy) {
    if (tool.privacyLevel === 'local_only' || tool.privacyLevel === 'zero_data_retention') {
      compliancePoints += 20;
    } else if (tool.privacyLevel === 'enterprise_cloud') {
      compliancePoints += 5;
    }
  }

  const constraintCompliance = Math.min(100, Math.max(10, compliancePoints));

  // --- 4. ECOSYSTEM SYNERGY (Integraciones con herramientas actuales) ---
  let synergyPoints = 50;

  // Si ya usa la herramienta en su stack diario
  if (persona.activeTools.includes(tool.id) || persona.activeTools.includes(tool.slug)) {
    synergyPoints += 35;
  }

  // Si la herramienta se integra directamente con alguna de las que ya usa
  const hasIntegration = tool.integrations.some((intgr) =>
    persona.activeTools.some((active) => active.toLowerCase().includes(intgr.toLowerCase()))
  );
  if (hasIntegration) {
    synergyPoints += 25;
  }

  const ecosystemSynergy = Math.min(100, Math.max(20, synergyPoints));

  // --- SCORE FINAL PONDERADO ---
  const finalScore = Math.round(
    taskFit * 0.45 +
    frictionFactor * 0.25 +
    constraintCompliance * 0.20 +
    ecosystemSynergy * 0.10
  );

  return {
    taskFit,
    frictionFactor,
    constraintCompliance,
    ecosystemSynergy,
    finalScore: Math.min(99, Math.max(15, finalScore)),
    stageFitLevel: stageFit.level,
    stageFitReason: stageFit.reason,
  };
}
