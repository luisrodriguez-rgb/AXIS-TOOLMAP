import type { Tool, UserWorkflowQuery, WorkflowStageId } from '../types';

export interface ScoreBreakdown {
  taskFit: number;
  frictionFactor: number;
  constraintCompliance: number;
  ecosystemSynergy: number;
  finalScore: number;
}

export function calculateToolScore(
  tool: Tool,
  query: UserWorkflowQuery,
  stageId: WorkflowStageId
): ScoreBreakdown {
  const { persona, needText, deliverableType, constraints } = query;
  const lowerNeed = needText.toLowerCase();

  // --- 1. TASK FIT (Ajuste Funcional a la Tarea y Entregable) ---
  let fitPoints = 50; // base

  // Relevancia en la etapa específica
  if (tool.supportedStages.includes(stageId)) {
    fitPoints += 25;
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

  // --- AFINIDAD DE DOMINIO PROFESIONAL DIRECTA ---
  const roleLower = (persona.primaryRole || '').toLowerCase();
  if ((roleLower.includes('civil') || roleLower.includes('construc') || roleLower.includes('gis')) && (tool.category === 'drafting_3d' || tool.category === 'calculation')) {
    fitPoints += 35; // Prioridad a Civil 3D, AutoCAD, Revit, Procore, OpenSpace, OpenFOAM
  } else if (roleLower.includes('arquitect') && (tool.category === 'drafting_3d' || tool.capabilities.cad3DModeling)) {
    fitPoints += 30; // Prioridad a Revit, ArchiCAD, Rhino, SketchUp, LookX, Twinmotion, Enscape
  } else if ((roleLower.includes('software') || roleLower.includes('devops') || roleLower.includes('ciberseguridad') || roleLower.includes('desarroll')) && (tool.capabilities.generatesCode || tool.id === 'docker' || tool.id === 'postman' || tool.id === 'jetbrains-idea' || tool.id === 'supabase' || tool.id === 'vercel' || tool.id === 'sentry')) {
    fitPoints += 35; // Prioridad a VS Code, Cursor, IntelliJ, Docker, Postman, Supabase, Vercel, Sentry, Linear
  } else if ((roleLower.includes('mecánic') || roleLower.includes('electrónic') || roleLower.includes('químic') || roleLower.includes('biomédic') || roleLower.includes('industrial') || roleLower.includes('ingenier')) && (tool.category === 'calculation' || tool.category === 'drafting_3d')) {
    fitPoints += 35; // Prioridad a SolidWorks, CATIA, Creo, Inventor, Ansys, MATLAB, COMSOL, Altium, KiCad
  } else if ((roleLower.includes('dato') || roleLower.includes('financ') || roleLower.includes('econometr') || roleLower.includes('matemátic')) && (tool.category === 'data_analysis' || tool.category === 'calculation')) {
    fitPoints += 35; // Prioridad a Power BI, Tableau, Snowflake, Databricks, dbt, Superset, Metabase, RStudio, Excel
  } else if ((roleLower.includes('diseñ') || roleLower.includes('motion') || roleLower.includes('video') || roleLower.includes('branding')) && tool.category === 'design_visual') {
    fitPoints += 35; // Prioridad a Figma, Adobe Photoshop/Illustrator/Premiere/After Effects, DaVinci Resolve, Cinema 4D, Spline
  } else if ((roleLower.includes('investig') || roleLower.includes('clínic') || roleLower.includes('bioinformátic') || roleLower.includes('redactor') || roleLower.includes('docente') || roleLower.includes('abogado')) && (tool.category === 'research' || tool.category === 'productivity')) {
    fitPoints += 35; // Prioridad a Zotero, Overleaf, Elicit, Perplexity, Mendeley, Connected Papers, Rayyan, ATLAS.ti, Notion
  }

  const taskFit = Math.min(100, Math.max(10, fitPoints));

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
  };
}
