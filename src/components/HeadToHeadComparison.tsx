import React from 'react';
import type { Tool } from '../types';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import { getToolLogo } from '../assets/logos/ToolLogos';
import { getLocalizedTool } from '../i18n/toolLocalization';

interface HeadToHeadComparisonProps {
  commercialTool: Tool;
  fossTool: Tool;
  onClose: () => void;
  lang: Language;
}

interface ComparisonDimension {
  title: string;
  commercialValue: string;
  fossValue: string;
  verdictBadge?: 'COMMERCIAL' | 'FOSS' | 'TIE';
}

export const HeadToHeadComparison: React.FC<HeadToHeadComparisonProps> = ({
  commercialTool,
  fossTool,
  onClose,
  lang,
}) => {
  const t = TRANSLATIONS[lang].comparison;
  const locCommercial = getLocalizedTool(commercialTool, lang);
  const locFoss = getLocalizedTool(fossTool, lang);

  // Cálculo de TCO y ahorro a 3 años
  const commercialAnnualUSD = commercialTool.pricing.startingPricePerMonthUSD * 12;
  const fossAnnualUSD = fossTool.pricing.startingPricePerMonthUSD * 12;
  const annualSavings = commercialAnnualUSD - fossAnnualUSD;
  const threeYearSavings = annualSavings * 3;

  // Dimensiones de análisis multicriterio
  const dimensions: ComparisonDimension[] = [
    {
      title: t.dimCost,
      commercialValue:
        commercialTool.pricing.startingPricePerMonthUSD === 0
          ? (lang === 'es' ? '$0/mes (Capa gratuita limitada)' : '$0/mo (Limited free tier)')
          : `$${commercialTool.pricing.startingPricePerMonthUSD}/mes · $${commercialAnnualUSD}/año ($${commercialAnnualUSD * 3} a 3 años)`,
      fossValue:
        fossTool.pricing.startingPricePerMonthUSD === 0
          ? (lang === 'es' ? '$0/mes · Autoalojable sin costo de licencia' : '$0/mo · Free self-hosted / cloud tier')
          : `$${fossTool.pricing.startingPricePerMonthUSD}/mes`,
      verdictBadge: 'FOSS',
    },
    {
      title: t.dimSovereignty,
      commercialValue:
        commercialTool.privacyLevel === 'enterprise_cloud'
          ? (lang === 'es' ? 'Nube empresarial propietaria cifrada (Sujeta a políticas del vendor)' : 'Encrypted enterprise cloud (Subject to vendor policies)')
          : (lang === 'es' ? 'Nube pública comercial (Telemetría activa)' : 'Public cloud (Active telemetry)'),
      fossValue:
        fossTool.privacyLevel === 'local_only'
          ? (lang === 'es' ? '100% Soberana: Ejecución en servidor local u on-premise propio' : '100% Sovereign: Local machine or on-premise deployment')
          : (lang === 'es' ? 'Código auditable con opción de autoalojamiento' : 'Auditable code with self-hosting option'),
      verdictBadge: 'FOSS',
    },
    {
      title: t.dimStandards,
      commercialValue:
        lang === 'es'
          ? 'Formatos binarios cerrados o schemas propietarios (Riesgo de vendor lock-in)'
          : 'Proprietary binary blobs or closed schemas (Vendor lock-in risk)',
      fossValue:
        lang === 'es'
          ? 'Estándares abiertos verificables (SVG, IFC, Markdown, SQL, código fuente abierto)'
          : 'Open standards (SVG, IFC, Markdown, SQL, open source code)',
      verdictBadge: 'FOSS',
    },
    {
      title: t.dimCurve,
      commercialValue:
        lang === 'es'
          ? 'Adopción inmediata, interfaces altamente pulidas y ecosistema masivo de tutoriales'
          : 'Immediate adoption, highly polished UI, massive tutorial ecosystem',
      fossValue:
        lang === 'es'
          ? 'Curva ligeramente superior al inicio; requiere configuración técnica para despliegue'
          : 'Slightly higher initial curve; requires technical deployment setup',
      verdictBadge: 'COMMERCIAL',
    },
    {
      title: t.dimVerdict,
      commercialValue:
        lang === 'es'
          ? 'Recomendado para equipos corporativos donde la interoperabilidad con clientes externos que exigen este estándar sea innegociable.'
          : 'Recommended for corporate teams where compatibility with external clients demanding this standard is mandatory.',
      fossValue:
        lang === 'es'
          ? 'Recomendado para organizaciones que priorizan soberanía de datos, reducción drástica de TCO o cumplimiento normativo estricto.'
          : 'Recommended for organizations prioritizing data sovereignty, drastic TCO reduction, or strict regulatory compliance.',
      verdictBadge: 'TIE',
    },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-editorial"
        style={{ maxWidth: '960px', width: '92vw' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header-editorial">
          <div>
            <div
              className="mono-text"
              style={{
                fontSize: '0.72rem',
                color: 'var(--signal)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {t.tag}
            </div>
            <h3 style={{ marginTop: '2px', fontSize: '1.25rem' }}>
              {commercialTool.name} <span style={{ color: 'var(--ink-muted)' }}>VS.</span> {fossTool.name}
            </h3>
          </div>
          <button className="btn-close-editorial" onClick={onClose} aria-label="Cerrar">
            {t.close}
          </button>
        </div>

        <div className="modal-body-editorial" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
          {/* Banner de Ahorro y Soberanía */}
          {annualSavings > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'var(--bg-canvas)',
                border: '1px solid var(--signal-border)',
                borderLeft: '4px solid var(--signal)',
                marginBottom: '16px',
              }}
            >
              <div>
                <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--signal)' }}>
                  {t.savings}
                </span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 900, color: 'var(--ink)' }}>
                  ${annualSavings} USD / {lang === 'es' ? 'año por usuario' : 'year per user'}
                  <span
                    className="mono-text"
                    style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', fontWeight: 500, marginLeft: '8px' }}
                  >
                    (${threeYearSavings} USD a 3 años)
                  </span>
                </div>
              </div>
              {fossTool.githubRepo && (
                <a
                  href={`https://github.com/${fossTool.githubRepo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-text"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    background: 'var(--ink)',
                    color: 'var(--ink-inverse)',
                    textDecoration: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  <span>{t.repoLink}</span>
                </a>
              )}
            </div>
          )}

          {/* Comparativa de Tarjetas Principales */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            {/* Tarjeta Comercial */}
            <div style={{ border: '1px solid var(--line)', padding: '16px', background: 'var(--bg-surface)' }}>
              <div
                className="mono-text"
                style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--ink-muted)', marginBottom: '8px' }}
              >
                {t.commercial}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div className="node-logo-frame" style={{ width: '32px', height: '32px' }}>
                  {getToolLogo(commercialTool.id, 22)}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontFamily: 'var(--font-display)' }}>
                    {commercialTool.name}
                  </h4>
                  <a
                    href={commercialTool.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono-text"
                    style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', textDecoration: 'none' }}
                  >
                    {commercialTool.slug} ↗
                  </a>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', margin: '8px 0', minHeight: '38px' }}>
                {locCommercial.tagline}
              </p>
              <div
                className="mono-text"
                style={{ fontSize: '0.72rem', padding: '4px 8px', background: 'var(--bg-subtle)', border: '1px solid var(--line)' }}
              >
                {lang === 'es' ? 'PRECIO:' : 'PRICE:'} ${commercialTool.pricing.startingPricePerMonthUSD}/MO
              </div>
            </div>

            {/* Tarjeta FOSS */}
            <div
              style={{
                border: '1px solid var(--signal-border)',
                padding: '16px',
                background: 'var(--bg-surface)',
                position: 'relative',
              }}
            >
              <div
                className="mono-text"
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: 'var(--signal)',
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>{t.foss}</span>
                {fossTool.license && (
                  <span style={{ border: '1px solid var(--signal-border)', padding: '1px 5px', fontSize: '0.65rem' }}>
                    {t.licenseBadge} {fossTool.license}
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div className="node-logo-frame" style={{ width: '32px', height: '32px' }}>
                  {getToolLogo(fossTool.id, 22)}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontFamily: 'var(--font-display)' }}>
                    {fossTool.name}
                  </h4>
                  <a
                    href={fossTool.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono-text"
                    style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', textDecoration: 'none' }}
                  >
                    {fossTool.slug} ↗
                  </a>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', margin: '8px 0', minHeight: '38px' }}>
                {locFoss.tagline}
              </p>
              <div
                className="mono-text"
                style={{
                  fontSize: '0.72rem',
                  padding: '4px 8px',
                  background: 'var(--signal-bg)',
                  border: '1px solid var(--signal-border)',
                  color: 'var(--signal)',
                  fontWeight: 700,
                }}
              >
                {lang === 'es' ? 'PRECIO:' : 'PRICE:'} $0 / 100% FOSS
              </div>
            </div>
          </div>

          {/* Matriz Comparativa por Dimensiones */}
          <div style={{ border: '1px solid var(--line)', background: 'var(--bg-canvas)' }}>
            <div
              className="mono-text"
              style={{
                padding: '10px 14px',
                borderBottom: '1px solid var(--line)',
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                background: 'var(--bg-subtle)',
              }}
            >
              {lang === 'es' ? 'MATRIZ DE EVALUACIÓN MULTICRITERIO' : 'MULTI-CRITERIA EVALUATION MATRIX'}
            </div>
            {dimensions.map((dim, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '220px 1fr 1fr',
                  gap: '12px',
                  padding: '12px 14px',
                  borderBottom: idx < dimensions.length - 1 ? '1px solid var(--line)' : 'none',
                  fontSize: '0.82rem',
                }}
              >
                <div className="mono-text" style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '0.75rem' }}>
                  {dim.title}
                </div>
                <div style={{ color: 'var(--ink-secondary)', lineHeight: 1.4 }}>
                  {dim.commercialValue}
                </div>
                <div
                  style={{
                    color: 'var(--ink)',
                    lineHeight: 1.4,
                    fontWeight: dim.verdictBadge === 'FOSS' ? 600 : 400,
                  }}
                >
                  {dim.fossValue}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
