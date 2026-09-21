import React from 'react';
import type { DeliverableType, PersonaProfile } from '../types';
import {
  HelpCircle,
  Sparkles,
  Presentation,
  FileText,
  LineChart,
  Image as ImageIcon,
  LayoutDashboard,
  Code,
  Lightbulb,
} from 'lucide-react';

interface IntentSectionProps {
  needText: string;
  onNeedTextChange: (text: string) => void;
  selectedDeliverable: DeliverableType;
  onDeliverableChange: (deliverable: DeliverableType) => void;
  activePersona: PersonaProfile;
}

export const IntentSection: React.FC<IntentSectionProps> = ({
  needText,
  onNeedTextChange,
  selectedDeliverable,
  onDeliverableChange,
  activePersona,
}) => {
  const deliverableOptions: { type: DeliverableType; label: string; icon: React.ReactNode }[] = [
    { type: 'presentation', label: 'Presentación / Slides', icon: <Presentation size={15} /> },
    { type: 'report', label: 'Informe / Memoria con Citas', icon: <FileText size={15} /> },
    { type: 'visualization', label: 'Visualización Matemática / 3D', icon: <LineChart size={15} /> },
    { type: 'render', label: 'Render Conceptual', icon: <ImageIcon size={15} /> },
    { type: 'dashboard', label: 'Dashboard / Análisis de Datos', icon: <LayoutDashboard size={15} /> },
    { type: 'code', label: 'Prototipo de Software', icon: <Code size={15} /> },
    { type: 'concept', label: 'Concepto & Lluvia de Ideas', icon: <Lightbulb size={15} /> },
  ];

  return (
    <section className="intent-box">
      <div className="intent-header">
        <h2>
          <HelpCircle size={22} color="var(--primary-light)" />
          ¿Qué estás intentando hacer?
        </h2>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
          Describe tu objetivo en lenguaje natural o selecciona un caso de uso recomendado para tu perfil:
        </p>
      </div>

      <div className="intent-textarea-wrapper">
        <textarea
          className="intent-textarea"
          value={needText}
          onChange={(e) => onNeedTextChange(e.target.value)}
          placeholder="Ej: Estoy haciendo un proyecto de vivienda campestre. Tengo bocetos a mano y planos en PDF. Necesito hacer renders conceptuales y montar la presentación para el cliente sin programar..."
          rows={3}
        />
      </div>

      {activePersona.sampleNeeds.length > 0 && (
        <div className="sample-queries-row">
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Casos arquetípicos de {activePersona.label}:
          </span>
          {activePersona.sampleNeeds.map((sample, idx) => (
            <button
              key={idx}
              className="sample-query-pill"
              onClick={() => {
                onNeedTextChange(sample.query);
                onDeliverableChange(sample.deliverable);
              }}
            >
              <Sparkles size={12} color="var(--primary-light)" />
              <span>{sample.label}</span>
            </button>
          ))}
        </div>
      )}

      <div className="deliverables-group">
        <div className="section-label" style={{ marginBottom: '8px' }}>
          <span>¿Qué artefacto o entregable concreto necesitas producir?</span>
        </div>
        <div className="deliverables-pills">
          {deliverableOptions.map((opt) => {
            const isActive = opt.type === selectedDeliverable;
            return (
              <button
                key={opt.type}
                className={`deliverable-pill ${isActive ? 'active' : ''}`}
                onClick={() => onDeliverableChange(opt.type)}
              >
                {opt.icon}
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
