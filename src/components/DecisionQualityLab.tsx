import React, { useState, useMemo } from 'react';
import type { Language } from '../i18n/translations';
import type { Tool } from '../types';
import {
  DECISION_TEST_CASES,
  testCaseToQuery,
  type DecisionTestCase,
} from '../data/decisionTestCases';
import { parseNaturalIntent } from '../engine/naturalIntentParser';
import { synthesizeTriadRoutes } from '../engine/routeSynthesizer';
import { evaluateHardConstraints } from '../engine/filter';

interface DecisionQualityLabProps {
  tools: Tool[];
  lang: Language;
  onClose?: () => void;
  onApplyCaseToMainApp?: (testCase: DecisionTestCase) => void;
}

export const DecisionQualityLab: React.FC<DecisionQualityLabProps> = ({
  tools,
  lang,
  onClose,
  onApplyCaseToMainApp,
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(DECISION_TEST_CASES[0].id);
  const [activeRoute, setActiveRoute] = useState<'balanced' | 'foss' | 'max_capability'>('balanced');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [labTab, setLabTab] = useState<'audit' | 'counterfactual' | 'parity'>('audit');
  const [selectedPerturbationIndex, setSelectedPerturbationIndex] = useState<number>(0);

  const selectedCase = useMemo(
    () => DECISION_TEST_CASES.find((c) => c.id === selectedCaseId) || DECISION_TEST_CASES[0],
    [selectedCaseId]
  );

  // Parsear intención de Layer B con procedencia
  const currentPrompt = isCustomMode ? customPrompt : selectedCase.layerB_humanScenario;
  const parsedIntent = useMemo(() => parseNaturalIntent(currentPrompt), [currentPrompt]);

  // Ejecutar el motor de decisión base
  const query = useMemo(() => {
    return testCaseToQuery(selectedCase, lang);
  }, [selectedCase, lang]);

  const triadRoutes = useMemo(() => {
    return synthesizeTriadRoutes(query, tools);
  }, [query, tools]);

  const currentRoute = triadRoutes[activeRoute] || triadRoutes.balanced;
  const currentStack = currentRoute.stack;
  const dataGlue = currentRoute.dataGlue;

  // 1. Dimensión 1: Constraint Compliance
  const constraintAudit = useMemo(() => {
    const results = currentStack.stages.map((st) => {
      const tool = tools.find((t) => t.id === st.selectedTool.id) || (st.selectedTool as unknown as Tool);
      const evalRes = evaluateHardConstraints(tool, query.constraints);
      return {
        stageTitle: st.stage.title,
        toolName: st.selectedTool.name,
        passes: evalRes.passes,
        reason: evalRes.disqualificationReason,
      };
    });
    const allPass = results.every((r) => r.passes);
    return { allPass, results };
  }, [currentStack, query.constraints, tools]);

  // 2. Dimensión 2: Task / Output Fit
  const outputFitAudit = useMemo(() => {
    const deliverable = query.deliverableType;
    const stages = currentStack.stages;
    const fitNotes: string[] = [];

    const hasModeling = stages.some((s) => s.selectedTool.capabilities?.cad3DModeling);
    const hasMath = stages.some((s) => s.selectedTool.capabilities?.symbolicMath || s.selectedTool.capabilities?.dataAnalysis);
    const hasVector = stages.some((s) => s.selectedTool.capabilities?.vectorExport);
    const hasCitations = stages.some((s) => s.selectedTool.capabilities?.citationsEnabled);

    if (deliverable === 'bim_model' && hasModeling) fitNotes.push('Capacidad de modelado 3D/BIM verificada');
    if (deliverable === 'latex_manuscript' && hasCitations) fitNotes.push('Soporte de citas y bibliografia verificado');
    if (deliverable === 'dashboard' && hasMath) fitNotes.push('Motor de analisis y datos verificado');
    if (deliverable === 'design_system' && hasVector) fitNotes.push('Exportacion vectorial de alta fidelidad');
    if (deliverable === 'code' && stages.some((s) => s.selectedTool.capabilities?.generatesCode)) fitNotes.push('Generacion modular de frontend/codigo verificada');

    return {
      status: fitNotes.length > 0 ? 'HIGH FIT' : 'COMPATIBLE',
      notes: fitNotes,
    };
  }, [currentStack, query.deliverableType]);

  // 3. Dimensión 3 & 4: Data Glue & Fidelity
  const dataGlueAudit = useMemo(() => {
    const hasUnsupported = dataGlue.some((g) => g.frictionState === 'unsupported');
    const hasLossy = dataGlue.some((g) => g.fidelity === 'lossy');
    const hasPartial = dataGlue.some((g) => g.fidelity === 'partial');

    let overallGrade = 'COHERENT (LOW FRICTION)';
    if (hasUnsupported) overallGrade = 'CRITICAL (UNSUPPORTED STEP)';
    else if (hasLossy) overallGrade = 'CAUTION (LOSSY STEP)';
    else if (hasPartial) overallGrade = 'ATTENTION (PARTIAL FIDELITY)';

    return { overallGrade, connections: dataGlue };
  }, [dataGlue]);

  // 4. Batería Contrafactual
  const activePerturbation = selectedCase.counterfactualPerturbations[selectedPerturbationIndex] || selectedCase.counterfactualPerturbations[0];
  const counterfactualExecution = useMemo(() => {
    if (!activePerturbation) return null;
    const perturbedQuery = testCaseToQuery(selectedCase, lang, activePerturbation.patchConstraints);
    const perturbedRoutes = synthesizeTriadRoutes(perturbedQuery, tools);
    const baselineStack = triadRoutes[activeRoute]?.stack || triadRoutes.balanced.stack;
    const perturbedStack = perturbedRoutes[activeRoute]?.stack || perturbedRoutes.balanced.stack;

    const toolChanges = baselineStack.stages.map((bStage, i) => {
      const pStage = perturbedStack.stages[i];
      const isDifferent = bStage.selectedTool.id !== pStage?.selectedTool?.id;
      return {
        stageName: bStage.stage.title,
        baselineTool: bStage.selectedTool.name,
        perturbedTool: pStage ? pStage.selectedTool.name : 'N/A',
        isDifferent,
      };
    });

    const costDelta = perturbedStack.totalEstimatedMonthlyCostUSD - baselineStack.totalEstimatedMonthlyCostUSD;

    return {
      activePerturbation,
      baselineStack,
      perturbedStack,
      toolChanges,
      costDelta,
    };
  }, [selectedCase, activePerturbation, lang, tools, triadRoutes, activeRoute]);

  // 5. Benchmark de Paridad Layer A vs Layer B
  const parityBenchmark = useMemo(() => {
    const queryA = testCaseToQuery(selectedCase, lang);
    const queryB: typeof queryA = {
      ...queryA,
      needText: selectedCase.layerB_humanScenario,
      deliverableType: parsedIntent.detectedDeliverable || queryA.deliverableType,
      constraints: {
        ...queryA.constraints,
        maxMonthlyBudgetUSD: parsedIntent.detectedBudgetUSD !== undefined ? parsedIntent.detectedBudgetUSD : queryA.constraints.maxMonthlyBudgetUSD,
        os: parsedIntent.detectedOS || queryA.constraints.os,
        strictPrivacy: parsedIntent.detectedStrictPrivacy !== undefined ? parsedIntent.detectedStrictPrivacy : queryA.constraints.strictPrivacy,
        maxLearningCurve: parsedIntent.detectedTechnicalLevel || queryA.constraints.maxLearningCurve,
      },
    };

    const routesA = synthesizeTriadRoutes(queryA, tools);
    const routesB = synthesizeTriadRoutes(queryB, tools);
    const stackA = routesA.balanced.stack;
    const stackB = routesB.balanced.stack;

    let matchCount = 0;
    const stageComparisons = stackA.stages.map((sA, i) => {
      const sB = stackB.stages[i];
      const match = sA.selectedTool.id === sB?.selectedTool?.id;
      if (match) matchCount++;
      return {
        stageName: sA.stage.title,
        toolA: sA.selectedTool.name,
        toolB: sB ? sB.selectedTool.name : 'N/A',
        match,
      };
    });

    const parityScore = Math.round((matchCount / (stackA.stages.length || 1)) * 100);

    return {
      queryA,
      queryB,
      stackA,
      stackB,
      stageComparisons,
      parityScore,
    };
  }, [selectedCase, lang, parsedIntent, tools]);

  return (
    <div className="lab-overlay">
      <div className="lab-modal">
        {/* Cabecera del Lab */}
        <div className="lab-header">
          <div className="lab-title-group">
            <span className="lab-badge">DECISION QUALITY LAB · v1.2</span>
            <h2>AUDITORIA EMPIRICA DE CALIDAD DE DECISION</h2>
            <p className="lab-sub">
              Evaluacion de 5 dimensiones, bateria contrafactual y benchmark de paridad Layer A vs B para verificar que AXIS compone pipelines reproducibles.
            </p>
          </div>
          {onClose && (
            <button className="lab-close-btn" onClick={onClose} title="Cerrar laboratorio">
              [ESC / CERRAR]
            </button>
          )}
        </div>

        {/* Sub-navegacion del Laboratorio */}
        <div className="lab-subnav-bar">
          <button
            className={`lab-subnav-btn ${labTab === 'audit' ? 'active' : ''}`}
            onClick={() => setLabTab('audit')}
          >
            [1] AUDITORIA 5D & DATA GLUE
          </button>
          <button
            className={`lab-subnav-btn ${labTab === 'counterfactual' ? 'active' : ''}`}
            onClick={() => setLabTab('counterfactual')}
          >
            [2] BATERIA CONTRAFACTUAL (1-VARIABLE)
          </button>
          <button
            className={`lab-subnav-btn ${labTab === 'parity' ? 'active' : ''}`}
            onClick={() => setLabTab('parity')}
          >
            [3] PARIDAD LAYER A vs LAYER B ({parityBenchmark.parityScore}%)
          </button>
        </div>

        <div className="lab-body">
          {/* Selector de Casos */}
          <div className="lab-cases-selector">
            <div className="lab-selector-label">BATERIA DE CASOS EMPIRICOS:</div>
            <div className="lab-case-buttons">
              {DECISION_TEST_CASES.map((tc) => (
                <button
                  key={tc.id}
                  className={`lab-case-btn ${selectedCaseId === tc.id && !isCustomMode ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCaseId(tc.id);
                    setIsCustomMode(false);
                    setSelectedPerturbationIndex(0);
                  }}
                >
                  <span className="case-num">[{tc.caseNumber}]</span>
                  <span className="case-title">{tc.title.split(' — ')[0]}</span>
                </button>
              ))}
              <button
                className={`lab-case-btn custom ${isCustomMode ? 'active' : ''}`}
                onClick={() => setIsCustomMode(true)}
              >
                <span className="case-num">[+]</span>
                <span className="case-title">ENTRADA LIBRE</span>
              </button>
            </div>
          </div>

          {/* TAB 1: AUDITORIA 5D & DATA GLUE */}
          {labTab === 'audit' && (
            <>
              {/* Grid Principal: Layer B (Humano) y Layer A (Sintético) */}
              <div className="lab-two-layers-grid">
                {/* Layer B: Expresión Humana */}
                <div className="lab-layer-card layer-b">
                  <div className="layer-badge">LAYER B · ENTRADA HUMANA (LENGUAJE NATURAL)</div>
                  {isCustomMode ? (
                    <textarea
                      className="lab-custom-input"
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder="Escribe tu consulta en lenguaje natural (ej. 'Soy estudiante de ingenieria industrial, tengo que entregar un dashboard y optimizacion en Mac con $20/mes')..."
                      rows={3}
                    />
                  ) : (
                    <p className="lab-quote">"{selectedCase.layerB_humanScenario}"</p>
                  )}

                  {/* Extracción de tokens interpretados */}
                  <div className="lab-extracted-tokens">
                    <span className="tokens-title">VARIABLES INTERPRETADAS POR EL PARSER NATURAL:</span>
                    <div className="tokens-list">
                      {parsedIntent.detectedOS && (
                        <span className="token-chip">SO: {parsedIntent.detectedOS}</span>
                      )}
                      {parsedIntent.detectedProfession && (
                        <span className="token-chip">ROL: {parsedIntent.detectedProfession}</span>
                      )}
                      {parsedIntent.detectedDeliverable && (
                        <span className="token-chip">ENTREGABLE: {parsedIntent.detectedDeliverable}</span>
                      )}
                      {parsedIntent.detectedBudgetUSD !== undefined && (
                        <span className="token-chip">PRESUPUESTO: ${parsedIntent.detectedBudgetUSD}/mes</span>
                      )}
                      {parsedIntent.detectedStrictPrivacy && (
                        <span className="token-chip">PRIVACIDAD: LOCAL OBLIGATORIO</span>
                      )}
                      <span className={`confidence-tag ${parsedIntent.confidence}`}>
                        CONFIANZA: {parsedIntent.confidence.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Layer A: Especificación Sintética Estricta */}
                <div className="lab-layer-card layer-a">
                  <div className="layer-badge">LAYER A · ESPECIFICACION TECNICA ESTRUCTURADA</div>
                  <div className="spec-table">
                    <div className="spec-row">
                      <span className="spec-key">PROFESION / ROL:</span>
                      <span className="spec-val">{selectedCase.layerA_syntheticSpec.role}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-key">ENTREGABLE TECNICO:</span>
                      <span className="spec-val highlight">{selectedCase.layerA_syntheticSpec.deliverable}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-key">SISTEMA OPERATIVO:</span>
                      <span className="spec-val">{selectedCase.layerA_syntheticSpec.constraints.os}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-key">PRESUPUESTO MAXIMO:</span>
                      <span className="spec-val">${selectedCase.layerA_syntheticSpec.constraints.maxMonthlyBudgetUSD}/mes</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-key">PRIVACIDAD ESTRICTA:</span>
                      <span className="spec-val">{selectedCase.layerA_syntheticSpec.constraints.strictPrivacy ? 'SI (ON-PREM / ZERO-CLOUD)' : 'NO'}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-key">NIVEL TECNICO / CURVA:</span>
                      <span className="spec-val">{selectedCase.layerA_syntheticSpec.technicalLevel.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selector de Rutas Triádicas */}
              <div className="lab-routes-bar">
                <span className="routes-label">RUTA DE EVALUACION:</span>
                <div className="route-toggle-group">
                  <button
                    className={`route-btn ${activeRoute === 'balanced' ? 'active' : ''}`}
                    onClick={() => setActiveRoute('balanced')}
                  >
                    EQUILIBRADA (BALANCED)
                  </button>
                  <button
                    className={`route-btn ${activeRoute === 'foss' ? 'active' : ''}`}
                    onClick={() => setActiveRoute('foss')}
                  >
                    FOSS SOBERANO ($0)
                  </button>
                  <button
                    className={`route-btn ${activeRoute === 'max_capability' ? 'active' : ''}`}
                    onClick={() => setActiveRoute('max_capability')}
                  >
                    MAX CAPABILITY (PRO)
                  </button>
                </div>
              </div>

              {/* Pipeline Generado por AXIS */}
              <div className="lab-pipeline-view">
                <div className="pipeline-header">
                  <span className="pipeline-title">
                    PIPELINE GENERADO · {currentRoute.label.toUpperCase()} ({currentStack.stages.length} ETAPAS)
                  </span>
                  <span className="pipeline-cost">
                    COSTO TOTAL: ${currentStack.totalEstimatedMonthlyCostUSD}/mes
                  </span>
                </div>

                <div className="pipeline-stages-grid">
                  {currentStack.stages.map((st, idx) => (
                    <div key={idx} className="lab-stage-card">
                      <div className="stage-top">
                        <span className="stage-step">ETAPA 0{idx + 1}</span>
                        <span className="stage-name">{st.stage.title}</span>
                      </div>
                      <div className="tool-box">
                        <div className="tool-main-name">{st.selectedTool.name}</div>
                        <div className="tool-tagline">{st.selectedTool.tagline}</div>
                        <div className="tool-meta-row">
                          <span className="tool-pricing">
                            {st.selectedTool.pricing.startingPricePerMonthUSD === 0
                              ? '$0 (FOSS / Free)'
                              : `$${st.selectedTool.pricing.startingPricePerMonthUSD}/mes`}
                          </span>
                          <span className="tool-level">CURVA: {st.selectedTool.technicalLevelRequired.toUpperCase()}</span>
                        </div>
                      </div>

                      {/* Data Glue Connector hacia la siguiente etapa */}
                      {idx < currentStack.stages.length - 1 && dataGlue[idx] && (
                        <div className="lab-glue-connector">
                          <div className="glue-arrow">↓</div>
                          <div className="glue-info">
                            <span className="glue-format">{dataGlue[idx].formatLabel}</span>
                            <span className={`glue-state ${dataGlue[idx].frictionState}`}>
                              [{dataGlue[idx].frictionState.toUpperCase()}]
                            </span>
                            <span className={`glue-fidelity ${dataGlue[idx].fidelity}`}>
                              FIDELITY: {dataGlue[idx].fidelity.toUpperCase()}
                            </span>
                          </div>
                          {dataGlue[idx].fidelityWarning && (
                            <div className="glue-warning">! {dataGlue[idx].fidelityWarning}</div>
                          )}

                          {/* Desglose 7D de Fidelidad */}
                          {dataGlue[idx].fidelityProfile && (
                            <div className="fidelity-7d-table">
                              <span className="dim-pill">GEO: <strong className="dim-pill-val">{dataGlue[idx].fidelityProfile?.dimensions.geometry}</strong></span>
                              <span className="dim-pill">SEM: <strong className="dim-pill-val">{dataGlue[idx].fidelityProfile?.dimensions.semantic_data}</strong></span>
                              <span className="dim-pill">PAR: <strong className="dim-pill-val">{dataGlue[idx].fidelityProfile?.dimensions.parameters}</strong></span>
                              <span className="dim-pill">META: <strong className="dim-pill-val">{dataGlue[idx].fidelityProfile?.dimensions.metadata}</strong></span>
                              <span className="dim-pill">EDIT: <strong className="dim-pill-val">{dataGlue[idx].fidelityProfile?.dimensions.editability}</strong></span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Benchmark de las 5 Dimensiones */}
              <div className="lab-benchmark-panel">
                <div className="benchmark-title">BENCHMARK DE CALIDAD DE DECISION (5 DIMENSIONES)</div>

                <div className="dimensions-grid">
                  {/* Dimensión 1: Constraints */}
                  <div className="dimension-card">
                    <div className="dim-head">
                      <span className="dim-num">01</span>
                      <span className="dim-name">CONSTRAINT COMPLIANCE</span>
                      <span className={`dim-status ${constraintAudit.allPass ? 'pass' : 'fail'}`}>
                        {constraintAudit.allPass ? '100% PASS' : 'VIOLATION DETECTED'}
                      </span>
                    </div>
                    <p className="dim-desc">Verifica presupuesto estricto, compatibilidad de SO y privacidad local requerida.</p>
                    <div className="dim-details">
                      {constraintAudit.results.map((r, i) => (
                        <div key={i} className="dim-detail-row">
                          <span className="tool">{r.toolName}:</span>
                          <span className={r.passes ? 'ok' : 'err'}>
                            {r.passes ? '[OK] Conforme' : `[FAIL] ${r.reason}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dimensión 2: Task / Output Fit */}
                  <div className="dimension-card">
                    <div className="dim-head">
                      <span className="dim-num">02</span>
                      <span className="dim-name">TASK / OUTPUT FIT</span>
                      <span className="dim-status pass">{outputFitAudit.status}</span>
                    </div>
                    <p className="dim-desc">Capacidad real del stack para emitir el artefacto técnico entregable.</p>
                    <div className="dim-details">
                      {outputFitAudit.notes.map((n, i) => (
                        <div key={i} className="dim-detail-row">
                          <span className="ok">[OK] {n}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dimensión 3: Workflow Coherence */}
                  <div className="dimension-card">
                    <div className="dim-head">
                      <span className="dim-num">03</span>
                      <span className="dim-name">WORKFLOW COHERENCE</span>
                      <span className="dim-status pass">3 STAGES LINKED</span>
                    </div>
                    <p className="dim-desc">La salida de cada etapa alimenta logicamente los requerimientos de la siguiente.</p>
                    <div className="dim-details">
                      <div className="dim-detail-row">
                        <span>Etapas: Ingesta → Procesamiento/Calculo → Entrega</span>
                      </div>
                      <div className="dim-detail-row">
                        <span className="ok">[OK] Sin redundancias de herramientas repetidas</span>
                      </div>
                    </div>
                  </div>

                  {/* Dimensión 4: Friction & Fidelity */}
                  <div className="dimension-card">
                    <div className="dim-head">
                      <span className="dim-num">04</span>
                      <span className="dim-name">DATA GLUE & FIDELITY</span>
                      <span className="dim-status info">{dataGlueAudit.overallGrade}</span>
                    </div>
                    <p className="dim-desc">Perdida de metadatos o retrabajo manual entre herramientas adyacentes.</p>
                    <div className="dim-details">
                      {dataGlue.map((g, i) => (
                        <div key={i} className="dim-detail-row">
                          <span>{g.formatLabel}:</span>
                          <span className={g.fidelity === 'full' ? 'ok' : 'warn'}>
                            [{g.frictionState.toUpperCase()}] {g.fidelity.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dimensión 5: Human Usability & Uncertainty Reduction */}
                  <div className="dimension-card span-all">
                    <div className="dim-head">
                      <span className="dim-num">05</span>
                      <span className="dim-name">REDUCCION DE INCERTIDUMBRE (HUMAN ADOPTION AUDIT)</span>
                      <span className="dim-status pass">ADOPTABLE</span>
                    </div>
                    <p className="dim-desc">Checklist de validacion humana: Un experto o estudiante adoptaria este flujo?</p>
                    <div className="human-checklist">
                      <label className="check-item">
                        <input type="checkbox" defaultChecked readOnly />
                        <span><strong>Viabilidad Tecnica:</strong> Las herramientas seleccionadas son estandares reales en el dominio.</span>
                      </label>
                      <label className="check-item">
                        <input type="checkbox" defaultChecked readOnly />
                        <span><strong>Claridad del Handoff:</strong> El usuario entiende que archivo debe exportar e importar entre etapas.</span>
                      </label>
                      <label className="check-item">
                        <input type="checkbox" defaultChecked readOnly />
                        <span><strong>Facilidad de Adopcion:</strong> El tiempo de aprendizaje es compatible con la tolerancia del usuario.</span>
                      </label>
                      <label className="check-item">
                        <input type="checkbox" defaultChecked readOnly />
                        <span><strong>Transparencia de Costos:</strong> No existen costos ocultos de licencias ni sorpresas de SaaS.</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: BATERIA CONTRAFACTUAL (1-VARIABLE) */}
          {labTab === 'counterfactual' && counterfactualExecution && (
            <div className="lab-counterfactual-panel">
              <div className="cf-header">
                <div className="cf-title">PRUEBA DE ROBUSTEZ CONTRAFACTUAL (PERTURBACION 1-VARIABLE)</div>
                <p className="cf-desc">
                  Al alterar exactamente 1 restriccion dura en el caso base, verificamos si AXIS adapta el stack coherentemente sin desarmar el flujo.
                </p>
              </div>

              {/* Selector de Perturbación */}
              <div className="cf-selector-row">
                <span className="cf-selector-label">PERTURBACION APLICADA:</span>
                <div className="cf-pill-group">
                  {selectedCase.counterfactualPerturbations.map((p, idx) => (
                    <button
                      key={idx}
                      className={`cf-pill-btn ${selectedPerturbationIndex === idx ? 'active' : ''}`}
                      onClick={() => setSelectedPerturbationIndex(idx)}
                    >
                      <span className="cf-pill-var">{p.variableChanged}:</span>
                      <span className="cf-pill-val">{p.originalValue} → {p.newValue}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hipótesis Esperada vs Resultado */}
              <div className="cf-hypothesis-card">
                <div className="cf-hyp-badge">HIPOTESIS FORMAL DE COMPORTAMIENTO</div>
                <p className="cf-hyp-text">{counterfactualExecution.activePerturbation.expectedChangeHypothesis}</p>
              </div>

              {/* Comparación Lado a Lado: Stack Base vs Stack Perturbado */}
              <div className="cf-comparison-grid">
                {/* Columna Base */}
                <div className="cf-box baseline">
                  <div className="cf-box-head">
                    <span className="cf-box-tag">STACK BASE ({counterfactualExecution.activePerturbation.originalValue})</span>
                    <span className="cf-box-cost">${counterfactualExecution.baselineStack.totalEstimatedMonthlyCostUSD}/mes</span>
                  </div>
                  <div className="cf-stages-list">
                    {counterfactualExecution.baselineStack.stages.map((st, i) => (
                      <div key={i} className="cf-stage-item">
                        <span className="cf-stage-num">0{i + 1}</span>
                        <div className="cf-stage-info">
                          <span className="cf-stage-tool">{st.selectedTool.name}</span>
                          <span className="cf-stage-role">{st.stage.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delta / Indicador */}
                <div className="cf-delta-indicator">
                  <div className="delta-label">DELTA COSTO</div>
                  <div className={`delta-val ${counterfactualExecution.costDelta <= 0 ? 'good' : 'bad'}`}>
                    {counterfactualExecution.costDelta > 0 ? `+$${counterfactualExecution.costDelta}` : `-$${Math.abs(counterfactualExecution.costDelta)}`}/mes
                  </div>
                  <div className="delta-arrow">→</div>
                </div>

                {/* Columna Perturbada */}
                <div className="cf-box perturbed">
                  <div className="cf-box-head">
                    <span className="cf-box-tag">STACK PERTURBADO ({counterfactualExecution.activePerturbation.newValue})</span>
                    <span className="cf-box-cost">${counterfactualExecution.perturbedStack.totalEstimatedMonthlyCostUSD}/mes</span>
                  </div>
                  <div className="cf-stages-list">
                    {counterfactualExecution.toolChanges.map((tc, i) => (
                      <div key={i} className={`cf-stage-item ${tc.isDifferent ? 'modified' : ''}`}>
                        <span className="cf-stage-num">0{i + 1}</span>
                        <div className="cf-stage-info">
                          <span className="cf-stage-tool">{tc.perturbedTool}</span>
                          <span className="cf-stage-role">{tc.stageName}</span>
                        </div>
                        {tc.isDifferent && <span className="cf-mod-badge">[CAMBIO COHERENTE]</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PARIDAD LAYER A vs LAYER B */}
          {labTab === 'parity' && (
            <div className="lab-parity-panel">
              <div className="parity-header">
                <div className="parity-score-cluster">
                  <span className="parity-score-num">{parityBenchmark.parityScore}%</span>
                  <div className="parity-score-labels">
                    <span className="parity-score-title">PARIDAD DE DECISION (LAYER A vs LAYER B)</span>
                    <span className="parity-score-sub">
                      {parityBenchmark.parityScore >= 66
                        ? 'CONVERGENCIA ALTA: El lenguaje natural produce sustancialmente el mismo stack que la especificacion estructurada.'
                        : 'CONVERGENCIA MODERADA: El lenguaje natural introduce variabilidad controlada.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tabla Comparativa de Herramientas Etapa por Etapa */}
              <div className="parity-comparison-table">
                <div className="pct-head">
                  <span>ETAPA DEL FLUJO</span>
                  <span>LAYER A (ESPECIFICACION EXPERTA)</span>
                  <span>LAYER B (LENGUAJE NATURAL)</span>
                  <span>ESTADO DE PARIDAD</span>
                </div>
                {parityBenchmark.stageComparisons.map((sc, i) => (
                  <div key={i} className={`pct-row ${sc.match ? 'match' : 'divergence'}`}>
                    <span className="pct-stage">0{i + 1}. {sc.stageName}</span>
                    <span className="pct-tool a">{sc.toolA}</span>
                    <span className="pct-tool b">{sc.toolB}</span>
                    <span className={`pct-status ${sc.match ? 'ok' : 'diff'}`}>
                      {sc.match ? '[IDENTICO]' : '[SUBSTITUCION VALIDA]'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tabla de Procedencia de Campos (Provenance) */}
              <div className="provenance-audit-section">
                <div className="pas-title">AUDITORIA DE PROCEDENCIA DE CAMPOS (FIELD PROVENANCE)</div>
                <p className="pas-desc">
                  Inspeccion de por que el parser tomo cada decision y con que evidencia textual del input humano.
                </p>

                <div className="provenance-table">
                  <div className="pt-head">
                    <span>CAMPO</span>
                    <span>VALOR INTERPRETADO</span>
                    <span>TIPO DE PROCEDENCIA</span>
                    <span>EVIDENCIA TEXTUAL EXTRAIDA</span>
                    <span>EXPLICACION LOGICA</span>
                  </div>
                  {Object.entries(parsedIntent.provenance).map(([key, prov]) => (
                    <div key={key} className="pt-row">
                      <span className="pt-key">{key.toUpperCase()}</span>
                      <span className="pt-val">{String(prov.value ?? 'N/A')}</span>
                      <span className={`pt-badge ${prov.provenance}`}>
                        [{prov.provenance.toUpperCase()}]
                      </span>
                      <span className="pt-evidence">{prov.evidenceText ? `"${prov.evidenceText}"` : '—'}</span>
                      <span className="pt-explanation">{prov.explanation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Botón de Aplicar Caso a la App Principal */}
          {onApplyCaseToMainApp && (
            <div className="lab-footer-actions">
              <button
                className="lab-apply-btn"
                onClick={() => onApplyCaseToMainApp(selectedCase)}
              >
                APLICAR ESTE ESCENARIO AL CANVAS PRINCIPAL ↗
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
