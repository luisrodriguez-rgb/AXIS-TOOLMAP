import React from 'react';
import type { StageRecommendation } from '../types';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRightLeft,
  DollarSign,
  Laptop,
  Shield,
} from 'lucide-react';

interface ToolCardProps {
  recommendation: StageRecommendation;
  onOpenInspector: (rec: StageRecommendation) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  recommendation,
  onOpenInspector,
}) => {
  const { selectedTool, matchScore, whyThisTool, tradeOffs } = recommendation;

  const getScoreColorClass = (score: number) => {
    if (score >= 85) return 'score-high';
    if (score >= 70) return 'score-medium';
    return 'score-low';
  };

  return (
    <div className="tool-decision-card">
      {/* 1. Identidad y Metadatos */}
      <div className="tool-identity-col">
        <div className="tool-name-row">
          <span className="tool-title">{selectedTool.name}</span>
          {selectedTool.isNativeAI ? (
            <span className="native-ai-badge">Nativa IA</span>
          ) : (
            <span className="traditional-tool-badge">Software Tradicional</span>
          )}
        </div>

        <p className="tool-tagline">{selectedTool.tagline}</p>

        <div className="tool-meta-tags">
          <span className="meta-tag">
            <DollarSign size={12} />
            {selectedTool.pricing.hasFreeTier
              ? selectedTool.pricing.startingPricePerMonthUSD === 0
                ? 'Gratis'
                : 'Freemium'
              : `$${selectedTool.pricing.startingPricePerMonthUSD}/mes`}
          </span>

          <span className="meta-tag">
            <Laptop size={12} />
            {selectedTool.platforms.join(', ').toUpperCase()}
          </span>

          <span className="meta-tag">
            <Shield size={12} />
            {selectedTool.privacyLevel === 'local_only'
              ? '100% Local'
              : selectedTool.privacyLevel === 'enterprise_cloud'
              ? 'Nube Enterprise'
              : 'Nube Pública'}
          </span>
        </div>
      </div>

      {/* 2. Por qué encaja */}
      <div className="tool-why-col">
        <div className="col-header col-header-positive">
          <CheckCircle2 size={14} />
          <span>Por qué encaja con tu caso</span>
        </div>
        <ul className="reasons-list">
          {whyThisTool.map((reason, idx) => (
            <li key={idx} className="reason-item">
              <span className="reason-bullet-pos">✓</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Qué sacrificas */}
      <div className="tool-tradeoff-col">
        <div className="col-header col-header-tradeoff">
          <AlertCircle size={14} />
          <span>Qué sacrificas</span>
        </div>
        <ul className="reasons-list">
          {tradeOffs.map((tradeoff, idx) => (
            <li key={idx} className="reason-item">
              <span className="reason-bullet-neg">−</span>
              <span>{tradeoff}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 4. Score y Acciones */}
      <div className="tool-action-col">
        <div className="score-badge-large">
          <div className={`score-number ${getScoreColorClass(matchScore)}`}>
            {matchScore}
            <span className="score-percent">%</span>
          </div>
          <span className="score-subtext">Ajuste de Decisión</span>
        </div>

        <button
          className="btn-swap"
          onClick={() => onOpenInspector(recommendation)}
          title="Ver desglose de puntuación y sustituir por alternativas"
        >
          <ArrowRightLeft size={14} />
          <span>Trade-offs & Swap</span>
        </button>
      </div>
    </div>
  );
};
