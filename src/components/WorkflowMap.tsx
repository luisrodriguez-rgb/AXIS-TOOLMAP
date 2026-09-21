import React from 'react';
import type { StageRecommendation, StackRecommendation } from '../types';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import { ToolEditorialCard } from './ToolEditorialCard';

interface WorkflowMapProps {
  stack: StackRecommendation;
  onOpenInspector: (rec: StageRecommendation) => void;
  lang: Language;
}

export const WorkflowMap: React.FC<WorkflowMapProps> = ({
  stack,
  onOpenInspector,
  lang,
}) => {
  const t = TRANSLATIONS[lang].workflow;

  const costFormatted =
    stack.totalEstimatedMonthlyCostUSD === 0
      ? lang === 'es' ? '$0 (GRATIS)' : '$0 (FREE)'
      : `$${stack.totalEstimatedMonthlyCostUSD} USD/MO`;

  return (
    <section className="workflow-map-container">
      {/* Section Header */}
      <div className="section-index-header" style={{ marginTop: 0 }}>
        <h2>
          <span className="section-num">{t.sectionNum}</span>
          <span>{t.sectionTitle}</span>
        </h2>
        <div className="section-meta-right">
          {t.nodesCount
            .replace('{count}', String(stack.stages.length))
            .replace('{cost}', costFormatted)}
        </div>
      </div>

      {/* Sequential Flow Breadcrumb */}
      <div className="workflow-sequence-header">
        <span className="sequence-label">{t.sequenceLabel}</span>
        {stack.stages.map((stageRec, idx) => {
          const isLast = idx === stack.stages.length - 1;
          return (
            <React.Fragment key={stageRec.stage.id}>
              <span className="sequence-step-tag">
                {stageRec.stage.title.toUpperCase()}
              </span>
              {!isLast && <span className="sequence-arrow">──►</span>}
            </React.Fragment>
          );
        })}
      </div>

      {/* Stack Summary & Trade-off Box */}
      <div
        style={{
          background: 'var(--bg-subtle)',
          border: '1px solid var(--line)',
          padding: '14px 20px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div>
            <span className="mono-text" style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              {t.globalFit}
            </span>
            <div className="mono-text" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)' }}>
              {stack.overallFitScore}%
            </div>
          </div>
          <div>
            <span className="mono-text" style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              {t.estimatedCost}
            </span>
            <div className="mono-text" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--signal)' }}>
              {stack.totalEstimatedMonthlyCostUSD === 0 ? '$0 / MO' : `$${stack.totalEstimatedMonthlyCostUSD} / MO`}
            </div>
          </div>
          <div>
            <span className="mono-text" style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              {t.synergy}
            </span>
            <div className="mono-text" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink)' }}>
              {stack.ecosystemSynergyScore}%
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '600px', fontSize: '0.82rem', color: 'var(--ink-secondary)', borderLeft: '2px solid var(--signal)', paddingLeft: '12px' }}>
          <strong className="mono-text" style={{ color: 'var(--signal)' }}>{t.tradeoffAlert} </strong>
          <span>{stack.keyStackTradeOff}</span>
        </div>
      </div>

      {/* Grid of Tool Cards */}
      <div className="tool-map-nodes-grid">
        {stack.stages.map((stageRec, index) => (
          <ToolEditorialCard
            key={stageRec.stage.id}
            recommendation={stageRec}
            index={index}
            onOpenInspector={onOpenInspector}
            lang={lang}
          />
        ))}
      </div>
    </section>
  );
};
