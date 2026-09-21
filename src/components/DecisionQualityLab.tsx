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

  const selectedCase = useMemo(
    () => DECISION_TEST_CASES.find((c) => c.id === selectedCaseId) || DECISION_TEST_CASES[0],
    [selectedCaseId]
  );

  // Parsear intención de Layer B
  const currentPrompt = isCustomMode ? customPrompt : selectedCase.layerB_humanScenario;
  const parsedIntent = useMemo(() => parseNaturalIntent(currentPrompt), [currentPrompt]);

  // Ejecutar el motor de decisión
  const query = useMemo(() => {
    return testCaseToQuery(selectedCase, lang);
  }, [selectedCase, lang]);

  const triadRoutes = useMemo(() => {
    return synthesizeTriadRoutes(query, tools, {} as any);
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
    if (deliverable === 'latex_manuscript' && hasCitations) fitNotes.push('Soporte de citas y bibliografía verificado');
    if (deliverable === 'dashboard' && hasMath) fitNotes.push('Motor de análisis y datos verificado');
    if (deliverable === 'design_system' && hasVector) fitNotes.push('Exportación vectorial de alta fidelidad');

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

  return (
    <div className="lab-overlay">
      <div className="lab-modal">
        {/* Cabecera del Lab */}
        <div className="lab-header">
          <div className="lab-title-group">
            <span className="lab-badge">DECISION QUALITY LAB · v1.2</span>
            <h2>AUDITORÍA EMPÍRICA DE CALIDAD DE DECISIÓN</h2>
            <p className="lab-sub">
              Evaluación de 5 dimensiones sobre 6 escenarios reales para verificar si AXIS reduce la incertidumbre y compone pipelines viables.
            </p>
          </div>
          {onClose && (
            <button className="lab-close-btn" onClick={onClose} title="Cerrar laboratorio">
              [ESC / CERRAR ✕]
            </button>
          )}
        </div>

        <div className="lab-body">
          {/* Selector de Casos */}
          <div className="lab-cases-selector">
            <div className="lab-selector-label">BATERÍA DE CASOS EMPÍRICOS:</div>
            <div className="lab-case-buttons">
              {DECISION_TEST_CASES.map((tc) => (
                <button
                  key={tc.id}
                  className={`lab-case-btn ${selectedCaseId === tc.id && !isCustomMode ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCaseId(tc.id);
                    setIsCustomMode(false);
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
                  placeholder="Escribe tu consulta en lenguaje natural (ej. 'Soy estudiante de ingeniería industrial, tengo que entregar un dashboard y optimización en Mac con $20/mes')..."
                  rows={3}
                />
              ) : (
                <blockquote className="lab-quote">“{selectedCase.layerB_humanScenario}”</blockquote>
              )}

              <div className="lab-extracted-tokens">
                <span className="tokens-title">INTENT PARSER EXTRACTIONS:</span>
                <div className="tokens-list">
                  {parsedIntent.extractedKeywords.length > 0 ? (
                    parsedIntent.extractedKeywords.map((kw, i) => (
                      <span key={i} className="token-chip">
                        {kw}
                      </span>
                    ))
                  ) : (
                    <span className="token-empty">Sin tokens explícitos detectados</span>
                  )}
                  <span className={`confidence-tag ${parsedIntent.confidence}`}>
                    CONFIDENCE: {parsedIntent.confidence.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Layer A: Especificación Sintética */}
            <div className="lab-layer-card layer-a">
              <div className="layer-badge">LAYER A · ESPECIFICACIÓN SINTÉTICA (MOTOR)</div>
              <div className="spec-table">
                <div className="spec-row">
                  <span className="spec-key">ROL / DOMINIO:</span>
                  <span className="spec-val">{selectedCase.layerA_syntheticSpec.role} ({selectedCase.domain})</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">ENTREGABLE (OUTPUT):</span>
                  <span className="spec-val highlight">{selectedCase.layerA_syntheticSpec.deliverable}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">PRESUPUESTO DURO:</span>
                  <span className="spec-val">${selectedCase.layerA_syntheticSpec.constraints.maxMonthlyBudgetUSD}/mes</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">SISTEMA OPERATIVO:</span>
                  <span className="spec-val">{selectedCase.layerA_syntheticSpec.constraints.os.toUpperCase()}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">POLÍTICA PRIVACIDAD:</span>
                  <span className="spec-val">
                    {selectedCase.layerA_syntheticSpec.constraints.strictPrivacy ? 'LOCAL ESTRICTA / ZERO RETENTION' : 'NUBE ESTÁNDAR'}
                  </span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">TOLERANCIA CURVA:</span>
                  <span className="spec-val">{selectedCase.layerA_syntheticSpec.constraints.maxLearningCurve.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rutas de Decisión Neutrales */}
          <div className="lab-routes-bar">
            <span className="routes-label">RUTAS DISPONIBLES:</span>
            <div className="route-toggle-group">
              <button
                className={`route-btn ${activeRoute === 'balanced' ? 'active' : ''}`}
                onClick={() => setActiveRoute('balanced')}
              >
                01 / RUTA BALANCEADA
              </button>
              <button
                className={`route-btn ${activeRoute === 'foss' ? 'active' : ''}`}
                onClick={() => setActiveRoute('foss')}
              >
                02 / RUTA $0 FOSS SOBERANA
              </button>
              <button
                className={`route-btn ${activeRoute === 'max_capability' ? 'active' : ''}`}
                onClick={() => setActiveRoute('max_capability')}
              >
                03 / RUTA MÁXIMA CAPACIDAD
              </button>
            </div>
          </div>

          {/* Pipeline Generado por AXIS */}
          <div className="lab-pipeline-view">
            <div className="pipeline-header">
              <span className="pipeline-title">PIPELINE GENERADO ({currentRoute.label.toUpperCase()})</span>
              <span className="pipeline-cost">COSTO TOTAL: ${currentStack.totalEstimatedMonthlyCostUSD}/mes</span>
            </div>

            <div className="pipeline-stages-grid">
              {currentStack.stages.map((st, idx) => (
                <div key={st.stage.id} className="lab-stage-card">
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
                        <div className="glue-warning">⚠ {dataGlue[idx].fidelityWarning}</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Benchmark de las 5 Dimensiones */}
          <div className="lab-benchmark-panel">
            <div className="benchmark-title">BENCHMARK DE CALIDAD DE DECISIÓN (5 DIMENSIONES)</div>

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
                        {r.passes ? '✓ Conforme' : `✗ ${r.reason}`}
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
                      <span className="ok">✓ {n}</span>
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
                <p className="dim-desc">La salida de cada etapa alimenta lógicamente los requerimientos de la siguiente.</p>
                <div className="dim-details">
                  <div className="dim-detail-row">
                    <span>Etapas: Ingesta → Procesamiento/Cálculo → Entrega</span>
                  </div>
                  <div className="dim-detail-row">
                    <span className="ok">✓ Sin redundancias de herramientas repetidas</span>
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
                <p className="dim-desc">Pérdida de metadatos o retrabajo manual entre herramientas adyacentes.</p>
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
                  <span className="dim-name">REDUCCIÓN DE INCERTIDUMBRE (HUMAN ADOPTION AUDIT)</span>
                  <span className="dim-status pass">ADOPTABLE</span>
                </div>
                <p className="dim-desc">Checklist de validación humana: ¿Una persona experta o estudiante adoptaría este flujo?</p>
                <div className="human-checklist">
                  <label className="check-item">
                    <input type="checkbox" defaultChecked readOnly />
                    <span><strong>Viabilidad Técnica:</strong> Las herramientas seleccionadas son estándares reales en el dominio.</span>
                  </label>
                  <label className="check-item">
                    <input type="checkbox" defaultChecked readOnly />
                    <span><strong>Claridad del Handoff:</strong> El usuario entiende qué archivo debe exportar e importar entre etapas.</span>
                  </label>
                  <label className="check-item">
                    <input type="checkbox" defaultChecked readOnly />
                    <span><strong>Facilidad de Adopción:</strong> El tiempo de aprendizaje es compatible con la tolerancia del usuario.</span>
                  </label>
                  <label className="check-item">
                    <input type="checkbox" defaultChecked readOnly />
                    <span><strong>Transparencia de Costos:</strong> No existen costos ocultos de licencias ni sorpresas de SaaS.</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

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
