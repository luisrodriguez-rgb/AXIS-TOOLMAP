import React from 'react';
import type { StageRecommendation, StackRecommendation } from '../types';
import type { RouteId, RouteOption } from '../engine/routeSynthesizer';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import { getToolLogo } from '../assets/logos/ToolLogos';
import { ArtifactPreview } from './ArtifactPreview';
import { getLocalizedTool } from '../i18n/toolLocalization';

interface InteractiveWorkflowCanvasProps {
  currentRouteId: RouteId;
  onSelectRoute: (routeId: RouteId) => void;
  routes: Record<RouteId, RouteOption>;
  activeStack: StackRecommendation;
  onOpenInspector: (rec: StageRecommendation) => void;
  lang: Language;
  domainGroup?: string;
}

export const InteractiveWorkflowCanvas: React.FC<InteractiveWorkflowCanvasProps> = ({
  currentRouteId,
  onSelectRoute,
  routes,
  activeStack,
  onOpenInspector,
  lang,
  domainGroup,
}) => {
  const currentRoute = routes[currentRouteId];
  const t = TRANSLATIONS[lang].canvas;

  // Adaptación de vocabulario según dominio profesional (Smart Scoping Vocab)
  const isHumanitiesDomain = domainGroup === 'SCIENCE' || domainGroup === 'BIZ';
  const vocab = isHumanitiesDomain
    ? TRANSLATIONS[lang].domainVocab.humanities
    : TRANSLATIONS[lang].domainVocab.tech;

  // Formatear barras ASCII
  const renderAsciiBar = (score: number) => {
    const totalBlocks = 8;
    const filledBlocks = Math.round((score / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
  };

  return (
    <section className="workflow-canvas-rack">
      {/* 1. Header de Sección & Selector de 3 Rutas (The Triad of Routes) */}
      <div className="canvas-header-bar">
        <div className="canvas-title-group">
          <div className="mono-text" style={{ fontSize: '0.72rem', color: 'var(--signal)', fontWeight: 700 }}>
            {t.sectionTag}
          </div>
          <h2 className="canvas-headline">
            {t.headline}
          </h2>
        </div>

        {/* Selector de 3 Rutas Únicas y Neutrales */}
        <div className="routes-selector-group">
          {(['balanced', 'foss', 'max_capability'] as RouteId[]).map((rId) => {
            const r = routes[rId];
            if (!r) return null;
            const isSelected =
              rId === currentRouteId ||
              (currentRouteId === 'recommended' && rId === 'balanced') ||
              (currentRouteId === 'zero_cost' && rId === 'foss') ||
              (currentRouteId === 'pro_studio' && rId === 'max_capability');
            return (
              <button
                key={rId}
                className={`route-tab-btn ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectRoute(rId)}
              >
                <span className="route-bullet">{isSelected ? '●' : '○'}</span>
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Stack Telemetry / Bill of Materials (BOM) Bar con Vocabulario Adaptativo */}
      <div className="telemetry-bar">
        <div className="telemetry-metrics-cluster">
          <div className="telemetry-metric">
            <span className="telemetry-label">{vocab.estimatedBudget}</span>
            <span className="telemetry-val-signal">
              {activeStack.totalEstimatedMonthlyCostUSD === 0
                ? t.free
                : `$${activeStack.totalEstimatedMonthlyCostUSD} USD/MO`}
            </span>
          </div>

          <div className="telemetry-metric">
            <span className="telemetry-label">{t.globalFit}</span>
            <span className="telemetry-val">{activeStack.overallFitScore}%</span>
          </div>

          <div className="telemetry-metric">
            <span className="telemetry-label">{t.learningCurve}</span>
            <span className="telemetry-val">{activeStack.learningCurveOverall.toUpperCase()}</span>
          </div>

          <div className="telemetry-metric">
            <span className="telemetry-label">{vocab.dataGlue}</span>
            <span className="telemetry-val">{activeStack.ecosystemSynergyScore}%</span>
          </div>
        </div>

        <div className="telemetry-tradeoff-note">
          <strong className="mono-text" style={{ color: 'var(--signal)' }}>
            {t.tradeoff}
          </strong>
          <span>{activeStack.keyStackTradeOff}</span>
        </div>
      </div>

      {/* 3. Grafo Secuencial de Nodos y Conectores de Datos (Data Glue) */}
      <div className="canvas-nodes-stream">
        {activeStack.stages.map((stageRec, index) => {
          const isLast = index === activeStack.stages.length - 1;
          const dataGlue = currentRoute.dataGlue[index];
          const tool = getLocalizedTool(stageRec.selectedTool, lang);

          return (
            <React.Fragment key={stageRec.stage.id}>
              {/* Nodo de Herramienta */}
              <div className="node-rack-card">
                {/* Cabecera del Nodo */}
                <div className="node-top-bar">
                  <div className="node-stage-tag">
                    {String(index + 1).padStart(2, '0')} / {stageRec.stage.title.toUpperCase()}
                  </div>
                  <div className="node-price-badge">
                    {tool.pricing.hasFreeTier
                      ? tool.pricing.startingPricePerMonthUSD === 0
                        ? '$0'
                        : t.freeTier
                      : `$${tool.pricing.startingPricePerMonthUSD}/MO`}
                  </div>
                </div>

                {/* Identidad de la Herramienta con Logo SVG */}
                <div className="node-identity-row">
                  <div className="node-logo-frame">
                    {getToolLogo(tool.id, 26)}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <h3 className="node-tool-name">{tool.name}</h3>
                      <a
                        href={tool.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono-text"
                        style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', textDecoration: 'none' }}
                      >
                        ↗
                      </a>
                    </div>
                    <p className="node-tool-tagline">{tool.tagline}</p>
                  </div>
                </div>

                {/* Previsualización del Artefacto de Salida (Output Preview) */}
                <ArtifactPreview toolId={tool.id} category={tool.category} />

                {/* Barras de Capacidad ASCII */}
                <div className="node-capacity-grid">
                  <div className="node-cap-row">
                    <span className="node-cap-label">FIT:</span>
                    <span className="mono-text">{renderAsciiBar(stageRec.scoreBreakdown.taskFit)}</span>
                    <span className="mono-text" style={{ fontWeight: 700 }}>{stageRec.scoreBreakdown.taskFit}</span>
                  </div>
                  <div className="node-cap-row">
                    <span className="node-cap-label">EASE:</span>
                    <span className="mono-text">{renderAsciiBar(stageRec.scoreBreakdown.frictionFactor)}</span>
                    <span className="mono-text" style={{ fontWeight: 700 }}>{stageRec.scoreBreakdown.frictionFactor}</span>
                  </div>
                </div>

                {/* Evidencia Contextual */}
                <div className="node-evidence-box">
                  <div className="node-evidence-item pos">
                    <span>✓</span>
                    <span>{stageRec.whyThisTool[0]}</span>
                  </div>
                  {stageRec.tradeOffs[0] && (
                    <div className="node-evidence-item neg">
                      <span>!</span>
                      <span>{stageRec.tradeOffs[0]}</span>
                    </div>
                  )}
                </div>

                {/* Botón de Sustitución */}
                <button
                  className="btn-node-swap"
                  onClick={() => onOpenInspector(stageRec)}
                >
                  <span>⇄ {t.swapTool}</span>
                </button>
              </div>

              {/* Conector de Flujo de Datos (Data Glue) */}
              {!isLast && dataGlue && (
                <div className="data-glue-connector">
                  <div className="glue-cable-line" />
                  <div className="glue-badge-box">
                    <div className="glue-format-label">{dataGlue.formatLabel}</div>
                    <div className="glue-method-label">{dataGlue.transferMethod}</div>
                    <div
                      className="glue-friction-tag"
                      style={{
                        color: dataGlue.frictionLevel === 'low' ? 'var(--ink)' : 'var(--signal)',
                        borderColor: dataGlue.frictionLevel === 'low' ? 'var(--line)' : 'var(--signal)',
                      }}
                    >
                      {dataGlue.frictionLevel === 'low' ? t.seamless : t.manual}
                    </div>
                  </div>
                  <div className="glue-cable-line" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};
