import React from 'react';
import type { UserConstraints, OperatingSystem, TechnicalLevel } from '../types';
import { DollarSign, Laptop, ShieldCheck, Zap } from 'lucide-react';

interface ConstraintsBarProps {
  constraints: UserConstraints;
  onChangeConstraints: (updated: UserConstraints) => void;
}

export const ConstraintsBar: React.FC<ConstraintsBarProps> = ({
  constraints,
  onChangeConstraints,
}) => {
  const osOptions: { id: OperatingSystem | 'any'; label: string }[] = [
    { id: 'mac', label: 'Mac' },
    { id: 'windows', label: 'Windows' },
    { id: 'linux', label: 'Linux' },
    { id: 'any', label: 'Cualquiera / Web' },
  ];

  const curveOptions: { id: TechnicalLevel; label: string }[] = [
    { id: 'none', label: 'Cero código' },
    { id: 'low', label: 'Baja' },
    { id: 'medium', label: 'Moderada' },
    { id: 'high', label: 'Avanzada / Dev' },
  ];

  return (
    <div className="constraints-panel">
      {/* Presupuesto */}
      <div className="constraint-item">
        <div className="constraint-title">
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <DollarSign size={14} />
            Presupuesto Mensual
          </span>
          <span className="constraint-value-highlight">
            {constraints.maxMonthlyBudgetUSD === 0
              ? 'Solo Gratis ($0)'
              : `Hasta $${constraints.maxMonthlyBudgetUSD} USD/mes`}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="80"
          step="5"
          value={constraints.maxMonthlyBudgetUSD}
          onChange={(e) =>
            onChangeConstraints({
              ...constraints,
              maxMonthlyBudgetUSD: Number(e.target.value),
            })
          }
          className="budget-slider"
        />
      </div>

      {/* Sistema Operativo */}
      <div className="constraint-item">
        <div className="constraint-title">
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Laptop size={14} />
            Sistema Operativo
          </span>
        </div>
        <div className="segmented-control">
          {osOptions.map((opt) => (
            <button
              key={opt.id}
              className={`segmented-button ${constraints.os === opt.id ? 'active' : ''}`}
              onClick={() => onChangeConstraints({ ...constraints, os: opt.id })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Curva de Aprendizaje */}
      <div className="constraint-item">
        <div className="constraint-title">
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={14} />
            Tolerancia de Curva
          </span>
        </div>
        <div className="segmented-control">
          {curveOptions.map((opt) => (
            <button
              key={opt.id}
              className={`segmented-button ${constraints.maxLearningCurve === opt.id ? 'active' : ''}`}
              onClick={() => onChangeConstraints({ ...constraints, maxLearningCurve: opt.id })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Privacidad Estricta */}
      <div className="constraint-item">
        <div className="constraint-title">
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} />
            Privacidad & Soberanía
          </span>
        </div>
        <div className="toggle-switch-wrapper">
          <span className="switch-label">
            {constraints.strictPrivacy ? 'Modo Local / Cero Retención' : 'Nube Estándar Permitida'}
          </span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={constraints.strictPrivacy}
              onChange={(e) =>
                onChangeConstraints({
                  ...constraints,
                  strictPrivacy: e.target.checked,
                })
              }
            />
            <span className="slider-round"></span>
          </label>
        </div>
      </div>
    </div>
  );
};
