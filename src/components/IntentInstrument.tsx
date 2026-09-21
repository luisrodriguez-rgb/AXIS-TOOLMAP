import React from 'react';
import type { DeliverableType, PersonaProfile, UserConstraints } from '../types';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';

interface IntentInstrumentProps {
  needText: string;
  onNeedTextChange: (text: string) => void;
  selectedDeliverable: DeliverableType;
  onDeliverableChange: (deliverable: DeliverableType) => void;
  activePersona: PersonaProfile;
  onSelectPreset: (preset: PersonaProfile) => void;
  allPresets: PersonaProfile[];
  constraints: UserConstraints;
  onChangeConstraints: (constraints: UserConstraints) => void;
  onMapWork: () => void;
  lang: Language;
}

export const IntentInstrument: React.FC<IntentInstrumentProps> = ({
  needText,
  onNeedTextChange,
  selectedDeliverable,
  onDeliverableChange,
  activePersona,
  onSelectPreset,
  allPresets,
  constraints,
  onChangeConstraints,
  onMapWork,
  lang,
}) => {
  const t = TRANSLATIONS[lang].discover;

  const professions = [
    { id: 'architect', label: lang === 'es' ? 'Arquitecto' : 'Architect' },
    { id: 'civil-engineer', label: lang === 'es' ? 'Ingeniero Civil' : 'Civil Engineer' },
    { id: 'software-engineer', label: lang === 'es' ? 'Ingeniero Software' : 'Software Engineer' },
    { id: 'student', label: lang === 'es' ? 'Estudiante' : 'Student' },
    { id: 'founder-pm', label: lang === 'es' ? 'Fundador / PM' : 'Founder / PM' },
    { id: 'ux-designer', label: lang === 'es' ? 'Diseñador' : 'Designer' },
    { id: 'data-scientist', label: lang === 'es' ? 'Científico de Datos' : 'Data Scientist' },
    { id: 'academic-researcher', label: lang === 'es' ? 'Investigador' : 'Researcher' },
  ];

  const workTypes = [
    {
      label: lang === 'es' ? 'Investigar' : 'Research',
      text: lang === 'es'
        ? 'Investigación documental, síntesis de fuentes y extracción de citas.'
        : 'Document research, source synthesis, and citation extraction.',
    },
    {
      label: lang === 'es' ? 'Diseñar' : 'Design',
      text: lang === 'es'
        ? 'Modelado visual, renders conceptuales y prototipado estético.'
        : 'Visual modeling, conceptual renders, and aesthetic prototyping.',
    },
    {
      label: lang === 'es' ? 'Analizar' : 'Analyze',
      text: lang === 'es'
        ? 'Análisis de datos cuantitativos, matrices y gráficos de patrones.'
        : 'Quantitative data analysis, matrix operations, and pattern charts.',
    },
    {
      label: lang === 'es' ? 'Construir' : 'Build',
      text: lang === 'es'
        ? 'Generación de código, diagramas de arquitectura y especificación.'
        : 'Code generation, architectural diagrams, and technical specification.',
    },
    {
      label: lang === 'es' ? 'Presentar' : 'Present',
      text: lang === 'es'
        ? 'Comunicación ejecutiva, propuestas comerciales y diapositivas.'
        : 'Executive communication, commercial proposals, and slide decks.',
    },
  ];

  const outputTypes: { id: DeliverableType; label: string }[] = [
    { id: 'presentation', label: lang === 'es' ? 'Presentación / Diapositivas' : 'Presentation / Slides' },
    { id: 'report', label: lang === 'es' ? 'Informe / Memoria con Citas' : 'Report / Cited Paper' },
    { id: 'visualization', label: lang === 'es' ? 'Visualización Matemática / 3D' : 'Mathematical / 3D Viz' },
    { id: 'render', label: lang === 'es' ? 'Render Conceptual' : 'Conceptual Render' },
    { id: 'dashboard', label: lang === 'es' ? 'Dashboard / Métricas' : 'Data Dashboard' },
    { id: 'code', label: lang === 'es' ? 'Prototipo de Software' : 'Software Prototype' },
    { id: 'concept', label: lang === 'es' ? 'Mapa Conceptual' : 'Concept Map' },
  ];

  return (
    <div className="discover-instrument">
      {/* Top Input Header */}
      <div className="instrument-top-row">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
          <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--signal)' }}>
            {t.sectionTag}
          </span>
          <span className="mono-text" style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
            {t.sectionSub}
          </span>
        </div>

        <h1 className="instrument-headline">
          {t.headline}
        </h1>
        <p className="instrument-sub">
          {t.sub}
        </p>

        <div className="instrument-input-wrapper">
          <textarea
            className="instrument-textarea"
            value={needText}
            onChange={(e) => onNeedTextChange(e.target.value)}
            placeholder={t.placeholder}
            rows={3}
          />
        </div>
      </div>

      {/* 3-Column Context Grid (Swiss Matrix) */}
      <div className="matrix-grid">
        {/* Column 1: Profession */}
        <div className="matrix-col">
          <div className="matrix-col-header">
            <span>{t.colProfession}</span>
            <span style={{ color: 'var(--signal)' }}>{activePersona.label}</span>
          </div>
          <div className="matrix-options-list">
            {professions.map((prof) => {
              const isMatch =
                activePersona.id === prof.id ||
                activePersona.role.toLowerCase().includes(prof.label.toLowerCase()) ||
                activePersona.label.toLowerCase().includes(prof.label.toLowerCase());
              return (
                <button
                  key={prof.id}
                  className={`matrix-btn ${isMatch ? 'active' : ''}`}
                  onClick={() => {
                    const preset =
                      allPresets.find((p) => p.id === prof.id) ||
                      allPresets.find((p) =>
                        p.label.toLowerCase().includes(prof.label.toLowerCase()) ||
                        p.role.toLowerCase().includes(prof.label.toLowerCase())
                      ) ||
                      allPresets[0];
                    onSelectPreset(preset);
                  }}
                >
                  <span>{prof.label}</span>
                  <span className="matrix-btn-check">{isMatch ? '● ACTIVE' : '○'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Column 2: Work Mode */}
        <div className="matrix-col">
          <div className="matrix-col-header">
            <span>{t.colWork}</span>
            <span>{t.colWorkSub}</span>
          </div>
          <div className="matrix-options-list">
            {workTypes.map((work) => (
              <button
                key={work.label}
                className="matrix-btn"
                onClick={() => {
                  onNeedTextChange(`${needText.trim()} ${work.label}: ${work.text}`);
                }}
              >
                <span>{work.label}</span>
                <span className="matrix-btn-check">+ ADD</span>
              </button>
            ))}
          </div>
        </div>

        {/* Column 3: Output Artifact */}
        <div className="matrix-col">
          <div className="matrix-col-header">
            <span>{t.colOutput}</span>
            <span style={{ color: 'var(--signal)' }}>{selectedDeliverable.toUpperCase()}</span>
          </div>
          <div className="matrix-options-list">
            {outputTypes.map((out) => {
              const isSelected = out.id === selectedDeliverable;
              return (
                <button
                  key={out.id}
                  className={`matrix-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => onDeliverableChange(out.id)}
                >
                  <span>{out.label}</span>
                  <span className="matrix-btn-check">{isSelected ? '● SELECTED' : '○'}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Constraints Bar */}
      <div className="constraints-bar-editorial">
        <div className="constraint-cell">
          <div className="constraint-label">
            <span>{t.budgetLabel}</span>
            <span className="constraint-value">
              {constraints.maxMonthlyBudgetUSD === 0
                ? t.freeBadge
                : `$${constraints.maxMonthlyBudgetUSD} USD/MO`}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="60"
            step="5"
            value={constraints.maxMonthlyBudgetUSD}
            onChange={(e) => onChangeConstraints({ ...constraints, maxMonthlyBudgetUSD: Number(e.target.value) })}
            className="slider-technical"
          />
        </div>

        <div className="constraint-cell">
          <div className="constraint-label">
            <span>{t.platformLabel}</span>
            <span className="constraint-value">{constraints.os.toUpperCase()}</span>
          </div>
          <select
            className="select-technical"
            value={constraints.os}
            onChange={(e) => onChangeConstraints({ ...constraints, os: e.target.value as any })}
          >
            <option value="mac">macOS</option>
            <option value="windows">Windows</option>
            <option value="linux">Linux</option>
            <option value="any">Any / Web</option>
          </select>
        </div>

        <div className="constraint-cell">
          <div className="constraint-label">
            <span>{t.curveLabel}</span>
            <span className="constraint-value">{constraints.maxLearningCurve.toUpperCase()}</span>
          </div>
          <select
            className="select-technical"
            value={constraints.maxLearningCurve}
            onChange={(e) => onChangeConstraints({ ...constraints, maxLearningCurve: e.target.value as any })}
          >
            <option value="none">{t.curveZero}</option>
            <option value="low">{t.curveLow}</option>
            <option value="medium">{t.curveMed}</option>
            <option value="high">{t.curveHigh}</option>
          </select>
        </div>

        <div className="constraint-cell">
          <div className="constraint-label">
            <span>{t.privacyLabel}</span>
            <span className="constraint-value">
              {constraints.strictPrivacy ? t.privacyStrict.toUpperCase() : t.privacyStandard.toUpperCase()}
            </span>
          </div>
          <select
            className="select-technical"
            value={constraints.strictPrivacy ? 'strict' : 'standard'}
            onChange={(e) => onChangeConstraints({ ...constraints, strictPrivacy: e.target.value === 'strict' })}
          >
            <option value="standard">{t.privacyStandard}</option>
            <option value="strict">{t.privacyStrict}</option>
          </select>
        </div>
      </div>

      {/* Bottom Bar with Archetypes and Action */}
      <div className="instrument-bottom-bar">
        <div className="sample-queries-tagline">
          <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{t.archetypes}</span>
          {allPresets.map((preset) => (
            <button
              key={preset.id}
              className="sample-tag-btn"
              onClick={() => onSelectPreset(preset)}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <button className="btn-map-work" onClick={onMapWork}>
          <span>{t.mapWorkBtn}</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
