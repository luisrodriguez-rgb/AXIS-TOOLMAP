import React from 'react';
import type { StageRecommendation, Tool } from '../types';
import { Compass } from 'lucide-react';

interface ParetoVisualizerProps {
  stages: StageRecommendation[];
  allTools: Tool[];
  onSelectTool: (rec: StageRecommendation) => void;
}

export const ParetoVisualizer: React.FC<ParetoVisualizerProps> = ({
  stages,
  allTools: _allTools,
  onSelectTool,
}) => {

  return (
    <div className="pareto-container">
      <div className="pareto-header">
        <div>
          <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass size={18} color="var(--cyan-accent)" />
            Frontera de Decisión (Ajuste vs Costo/Fricción)
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Las herramientas seleccionadas en tu stack se sitúan en la frontera óptima de Pareto según tus restricciones:
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--emerald-accent)', display: 'inline-block' }} />
            Herramienta en tu Stack
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text-muted)', display: 'inline-block' }} />
            Alternativa en el Espacio
          </span>
        </div>
      </div>

      <div className="pareto-canvas">
        <span className="pareto-axis-y">↑ Mayor Ajuste Funcional (Fit)</span>
        <span className="pareto-axis-x">Mayor Costo / Curva →</span>

        {/* Puntos de herramientas evaluadas en el stack */}
        {stages.map((stageRec) => {
          const { selectedTool, matchScore } = stageRec;
          
          // Normalizar posición X (Costo + Nivel Técnico)
          const techVal = selectedTool.technicalLevelRequired === 'high' ? 30 : selectedTool.technicalLevelRequired === 'medium' ? 20 : 10;
          const costVal = Math.min(50, selectedTool.pricing.startingPricePerMonthUSD * 1.5);
          const xPercent = Math.min(88, Math.max(12, 15 + techVal + costVal));
          
          // Posición Y (Invertida: 100% fit arriba)
          const yPercent = Math.min(85, Math.max(15, 100 - matchScore));

          return (
            <div
              key={selectedTool.id}
              className="pareto-point selected"
              style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
              onClick={() => onSelectTool(stageRec)}
              title={`${selectedTool.name} (${matchScore}% Fit)`}
            >
              <div className="pareto-dot" />
              <div className="pareto-point-label">
                {selectedTool.name} ({matchScore}%)
              </div>
            </div>
          );
        })}

        {/* Alternativas directas graficadas en color secundario */}
        {stages.flatMap((s) => s.alternatives).map((alt) => {
          const techVal = alt.tool.technicalLevelRequired === 'high' ? 35 : alt.tool.technicalLevelRequired === 'medium' ? 22 : 12;
          const costVal = Math.min(50, alt.tool.pricing.startingPricePerMonthUSD * 1.5);
          const xPercent = Math.min(88, Math.max(12, 15 + techVal + costVal));
          const yPercent = Math.min(85, Math.max(15, 100 - alt.matchScore));

          return (
            <div
              key={`alt-${alt.tool.id}`}
              className="pareto-point"
              style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
              title={`${alt.tool.name} - Alternativa (${alt.matchScore}% Match)`}
            >
              <div className="pareto-dot" />
              <div className="pareto-point-label" style={{ opacity: 0.75 }}>
                {alt.tool.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
