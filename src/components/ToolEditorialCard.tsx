import React from 'react';
import type { StageRecommendation } from '../types';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';

interface ToolEditorialCardProps {
  recommendation: StageRecommendation;
  index: number;
  onOpenInspector: (rec: StageRecommendation) => void;
  lang: Language;
}

export const ToolEditorialCard: React.FC<ToolEditorialCardProps> = ({
  recommendation,
  index,
  onOpenInspector,
  lang,
}) => {
  const { selectedTool, scoreBreakdown, whyThisTool, tradeOffs } = recommendation;
  const t = TRANSLATIONS[lang].card;

  // Formatear código index: 001, 002, etc.
  const codeIndex = String(index + 1).padStart(3, '0');

  // Convertir valores numéricos en barras de caracteres ASCII
  const renderAsciiBar = (score: number) => {
    const totalBlocks = 10;
    const filledBlocks = Math.round((score / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
  };

  // Nivel de fit cualitativo
  const fitLevel =
    recommendation.matchScore >= 85 ? t.fitHigh : recommendation.matchScore >= 70 ? t.fitMedium : t.fitCond;

  return (
    <div className="tool-card-editorial">
      {/* Top Index Bar */}
      <div className="tool-card-top">
        <span className="tool-index-code">{codeIndex}</span>
        <span className="tool-category-badge">{selectedTool.category}</span>
      </div>

      {/* Header */}
      <div className="tool-card-header">
        <div className="tool-title-row">
          <h3 className="tool-title-editorial">{selectedTool.name}</h3>
          <a
            href={selectedTool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-text"
            style={{ fontSize: '0.75rem', color: 'var(--ink)', textDecoration: 'none', fontWeight: 700 }}
            title="Sitio web oficial"
          >
            {t.openLink}
          </a>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
          <span className="tool-tech-type">
            {selectedTool.isNativeAI ? t.nativeAi : t.traditional}
          </span>
          <span className="mono-text" style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
            {selectedTool.privacyLevel === 'local_only' ? t.local : t.cloud}
          </span>
        </div>

        <p className="tool-tagline-editorial">{selectedTool.tagline}</p>
      </div>

      {/* ASCII Capacity Breakdown Bars */}
      <div className="capacity-bars-block">
        <div className="capacity-row">
          <span className="capacity-label">{t.taskFit}</span>
          <span className="capacity-ascii">{renderAsciiBar(scoreBreakdown.taskFit)}</span>
          <span className="capacity-num">{scoreBreakdown.taskFit}</span>
        </div>
        <div className="capacity-row">
          <span className="capacity-label">{t.friction}</span>
          <span className="capacity-ascii">{renderAsciiBar(scoreBreakdown.frictionFactor)}</span>
          <span className="capacity-num">{scoreBreakdown.frictionFactor}</span>
        </div>
        <div className="capacity-row">
          <span className="capacity-label">{t.compliance}</span>
          <span className="capacity-ascii">{renderAsciiBar(scoreBreakdown.constraintCompliance)}</span>
          <span className="capacity-num">{scoreBreakdown.constraintCompliance}</span>
        </div>
        <div className="capacity-row">
          <span className="capacity-label">{t.synergy}</span>
          <span className="capacity-ascii">{renderAsciiBar(scoreBreakdown.ecosystemSynergy)}</span>
          <span className="capacity-num">{scoreBreakdown.ecosystemSynergy}</span>
        </div>
      </div>

      {/* Evidence List (Why it fits & Trade-offs) */}
      <div className="evidence-block">
        <div className="evidence-header">
          <span>{t.whyItFits}</span>
        </div>
        <ul className="evidence-list">
          {whyThisTool.map((why, idx) => (
            <li key={idx} className="evidence-item-pos">
              <span className="evidence-bullet-pos">✓</span>
              <span>{why}</span>
            </li>
          ))}
          {tradeOffs.map((sacr, idx) => (
            <li key={idx} className="evidence-item-neg">
              <span className="evidence-bullet-neg">!</span>
              <span>{sacr}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer with Specs & Action */}
      <div className="tool-card-footer">
        <div className="footer-specs">
          <span>
            {selectedTool.pricing.hasFreeTier
              ? selectedTool.pricing.startingPricePerMonthUSD === 0
                ? t.free
                : t.freeTier
              : `$${selectedTool.pricing.startingPricePerMonthUSD}/MO`}{' '}
            · {selectedTool.platforms.map((p) => p.toUpperCase()).join(' · ')}
          </span>
          <span style={{ marginLeft: '10px' }} className="fit-indicator-high">
            FIT: {fitLevel}
          </span>
        </div>

        <button
          className="btn-swap-editorial"
          onClick={() => onOpenInspector(recommendation)}
          title="Ver alternativas y sustituir"
        >
          <span>{t.swapBtn}</span>
        </button>
      </div>
    </div>
  );
};
