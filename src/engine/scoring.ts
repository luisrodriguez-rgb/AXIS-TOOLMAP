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
      if (tool.capabilities.handlesPDF) fitPoints += 20;
      if (tool.capabilities.citationsEnabled) fitPoints += 25;
      if (tool.capabilities.dataAnalysis) fitPoints += 10;
      break;
    case 'render':
      if (tool.capabilities.cad3DModeling || tool.capabilities.generatesImages) fitPoints += 30;
      break;
    case 'dashboard':
      if (tool.capabilities.dataAnalysis) fitPoints += 30;
      if (tool.capabilities.interactiveCollaboration) fitPoints += 10;
      break;
    case 'code':
      if (tool.capabilities.generatesCode) fitPoints += 35;
      break;
    case 'concept':
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
  if (roleLower.includes('civil') && (tool.category === 'drafting_3d' || tool.category === 'calculation')) {
    fitPoints += 35; // Prioridad a Civil 3D, AutoCAD, Revit, OpenFOAM, Ansys
  } else if (roleLower.includes('arquitect') && (tool.category === 'drafting_3d' || tool.capabilities.cad3DModeling)) {
    fitPoints += 30; // Prioridad alta a Revit, ArchiCAD, Rhino, SketchUp, LookX, Twinmotion
  } else if ((roleLower.includes('software') || roleLower.includes('desarroll') || roleLower.includes('programad')) && (tool.capabilities.generatesCode || tool.id === 'docker' || tool.id === 'postman' || tool.id === 'jetbrains-idea' || tool.id === 'supabase' || tool.id === 'vercel')) {
    fitPoints += 35; // Prioridad a VS Code, Cursor, IntelliJ, Docker, Postman, Supabase, Vercel, Linear
  } else if (roleLower.includes('ingenier') && (tool.category === 'calculation' || tool.category === 'drafting_3d')) {
    fitPoints += 30; // Prioridad alta a MATLAB, SolidWorks, Ansys, GeoGebra, KiCad, Inventor
  } else if (roleLower.includes('dato') && tool.category === 'data_analysis') {
    fitPoints += 30; // Prioridad alta a Power BI, Tableau, Snowflake, Databricks, dbt, Superset, Metabase, RStudio
  } else if (roleLower.includes('diseñ') && tool.category === 'design_visual') {
    fitPoints += 30; // Prioridad alta a Figma, Adobe Photoshop/Illustrator/Premiere, Midjourney, Blender, Cinema 4D
  } else if (roleLower.includes('investig') && tool.category === 'research') {
    fitPoints += 30; // Prioridad alta a Zotero, Overleaf, Elicit, Perplexity, Mendeley, Connected Papers, Rayyan, ATLAS.ti
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
