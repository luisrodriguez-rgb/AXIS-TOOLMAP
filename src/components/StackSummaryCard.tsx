import React from 'react';
import type { StackRecommendation } from '../types';
import { AlertTriangle, Layers } from 'lucide-react';

interface StackSummaryCardProps {
  stack: StackRecommendation;
}

export const StackSummaryCard: React.FC<StackSummaryCardProps> = ({ stack }) => {
  return (
    <div className="stack-summary-card">
      <div className="summary-main-row">
        <div className="summary-title-col">
          <h3>
            <Layers size={22} color="var(--primary-light)" />
            Stack Recomendado para tu Flujo Completo
          </h3>
          <p>
            Composición secuencial de {stack.stages.length} herramientas calibradas para tu perfil y restricciones.
          </p>
        </div>

        <div className="summary-metrics-row">
          <div className="summary-metric-box">
            <span className="metric-label">Ajuste Global</span>
            <span className="metric-value-huge metric-fit">
              {stack.overallFitScore}%
            </span>
          </div>

          <div className="summary-metric-box">
            <span className="metric-label">Costo Mensual Estimado</span>
            <span className="metric-value-huge metric-cost">
              {stack.totalEstimatedMonthlyCostUSD === 0
                ? '$0 USD'
                : `$${stack.totalEstimatedMonthlyCostUSD} USD`}
            </span>
          </div>

          <div className="summary-metric-box">
            <span className="metric-label">Sinergia de Ecosistema</span>
            <span className="metric-value-huge" style={{ color: 'var(--primary-light)' }}>
              {stack.ecosystemSynergyScore}%
            </span>
          </div>
        </div>
      </div>

      <div className="stack-tradeoff-banner">
        <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>Trade-off Integral del Stack: </strong>
          <span>{stack.keyStackTradeOff}</span>
        </div>
      </div>
    </div>
  );
};
