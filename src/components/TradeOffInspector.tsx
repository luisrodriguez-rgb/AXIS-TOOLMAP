import React from 'react';
import type { StageRecommendation, WorkflowStageId } from '../types';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';

interface TradeOffInspectorProps {
  recommendation: StageRecommendation | null;
  onClose: () => void;
  onSwapTool: (stageId: WorkflowStageId, newToolId: string) => void;
  lang: Language;
}

export const TradeOffInspector: React.FC<TradeOffInspectorProps> = ({
  recommendation,
  onClose,
  onSwapTool,
  lang,
}) => {
  if (!recommendation) return null;

  const { stage, selectedTool, scoreBreakdown, alternatives } = recommendation;
  const t = TRANSLATIONS[lang].modal;
  const cardT = TRANSLATIONS[lang].card;

  const renderAsciiBar = (score: number) => {
    const totalBlocks = 12;
    const filledBlocks = Math.round((score / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-editorial" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-editorial">
          <div>
            <div className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--signal)', fontWeight: 700, textTransform: 'uppercase' }}>
              {t.stageSpec.replace('{stage}', stage.title.toUpperCase())}
            </div>
            <h3>{t.inspection.replace('{tool}', selectedTool.name)}</h3>
          </div>
          <button className="btn-close-editorial" onClick={onClose} aria-label="Cerrar">
            {t.close}
          </button>
        </div>

        <div className="modal-body-editorial">
          {/* Technical breakdown matrix */}
          <div style={{ background: 'var(--bg-canvas)', border: '1px solid var(--line)', padding: '16px' }}>
            <div className="mono-text" style={{ fontSize: '0.72rem', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase' }}>
              {t.evalVectors}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--ink-muted)' }}>{cardT.taskFit}:</span>
                <span style={{ fontWeight: 700 }}>{renderAsciiBar(scoreBreakdown.taskFit)} {scoreBreakdown.taskFit}%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--ink-muted)' }}>{cardT.friction}:</span>
                <span style={{ fontWeight: 700 }}>{renderAsciiBar(scoreBreakdown.frictionFactor)} {scoreBreakdown.frictionFactor}%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--ink-muted)' }}>{cardT.compliance}:</span>
                <span style={{ fontWeight: 700 }}>{renderAsciiBar(scoreBreakdown.constraintCompliance)} {scoreBreakdown.constraintCompliance}%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--ink-muted)' }}>{cardT.synergy}:</span>
                <span style={{ fontWeight: 700 }}>{renderAsciiBar(scoreBreakdown.ecosystemSynergy)} {scoreBreakdown.ecosystemSynergy}%</span>
              </div>
            </div>
          </div>

          {/* Strengths & Limitations */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ border: '1px solid var(--line)', padding: '16px', background: 'var(--bg-surface)' }}>
              <div className="mono-text" style={{ fontSize: '0.72rem', fontWeight: 700, marginBottom: '8px', color: 'var(--ink)' }}>
                {t.strengths}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem' }}>
                {selectedTool.whatItDoesBest.map((best, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: 'var(--ink)', fontWeight: 700 }}>✓</span>
                    <span>{best}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ border: '1px solid var(--line)', padding: '16px', background: 'var(--bg-surface)' }}>
              <div className="mono-text" style={{ fontSize: '0.72rem', fontWeight: 700, marginBottom: '8px', color: 'var(--signal)' }}>
                {t.limitations}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem' }}>
                {selectedTool.whatItDoesNotDo.map((notDo, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: 'var(--signal)', fontWeight: 700 }}>!</span>
                    <span style={{ color: 'var(--ink-secondary)' }}>{notDo}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Alternatives & Swap */}
          <div>
            <div className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '10px' }}>
              {t.alternatives}
            </div>

            {alternatives.length === 0 ? (
              <p className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
                {t.noAlt}
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {alternatives.map((alt) => (
                  <div key={alt.tool.id} className="alt-row-editorial">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem' }}>
                          {alt.tool.name}
                        </span>
                        <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--signal)', fontWeight: 700 }}>
                          {t.match.replace('{score}', String(alt.matchScore))}
                        </span>
                        <span className="mono-text" style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
                          {alt.tool.pricing.hasFreeTier
                            ? alt.tool.pricing.startingPricePerMonthUSD === 0
                              ? cardT.free
                              : cardT.freeTier
                            : `$${alt.tool.pricing.startingPricePerMonthUSD}/MO`}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--ink-secondary)', marginTop: '4px' }}>
                        {alt.reason}
                      </p>
                    </div>

                    <button
                      className="btn-swap-confirm"
                      onClick={() => {
                        onSwapTool(stage.id, alt.tool.id);
                        onClose();
                      }}
                    >
                      <span>{t.swapBtn}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
