import React from 'react';
import type { StageRecommendation } from '../types';
import { ToolCard } from './ToolCard';

interface WorkflowPipelineProps {
  stages: StageRecommendation[];
  onOpenInspector: (rec: StageRecommendation) => void;
}

export const WorkflowPipeline: React.FC<WorkflowPipelineProps> = ({
  stages,
  onOpenInspector,
}) => {
  return (
    <div className="pipeline-section">
      <div className="section-label" style={{ marginBottom: '16px' }}>
        <span>2. Flujo de Trabajo Secuencial (Pipeline de Decisión)</span>
      </div>

      <div className="pipeline-flow">
        {stages.map((stageRec, index) => {
          const isLast = index === stages.length - 1;
          return (
            <div key={stageRec.stage.id} className="stage-wrapper">
              <div className="stage-header-row">
                <div className="stage-title">
                  <span className="stage-step-pill">Etapa {index + 1}</span>
                  <span>{stageRec.stage.title}</span>
                </div>
                <span className="stage-desc">{stageRec.stage.description}</span>
              </div>

              <ToolCard
                recommendation={stageRec}
                onOpenInspector={onOpenInspector}
              />

              {!isLast && (
                <div className="stage-connector" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
