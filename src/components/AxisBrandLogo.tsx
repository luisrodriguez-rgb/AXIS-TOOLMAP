import React from 'react';
import type { Language } from '../i18n/translations';

interface AxisBrandLogoProps {
  variant?: 'full' | 'mark-only' | 'horizontal';
  size?: number;
  lang?: Language;
  className?: string;
}

export const AxisBrandLogo: React.FC<AxisBrandLogoProps> = ({
  variant = 'horizontal',
  size = 36,
  lang = 'es',
  className = '',
}) => {
  // Isotipo SVG técnico exacto conforme al diseño suizo oficial
  const renderMark = (s: number) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 115"
        width={s}
        height={(s * 115) / 100}
        className="axis-brand-mark"
        style={{ overflow: 'visible' }}
      >
        {/* Grilla superior izquierda */}
        <g stroke="currentColor" strokeWidth="0.8" opacity="0.65">
          <line x1="18" y1="15" x2="48" y2="15" />
          <line x1="18" y1="24" x2="48" y2="24" />
          <line x1="18" y1="33" x2="48" y2="33" />
          <line x1="18" y1="42" x2="48" y2="42" />

          <line x1="25.5" y1="15" x2="25.5" y2="48" />
          <line x1="33" y1="15" x2="33" y2="48" />
          <line x1="40.5" y1="15" x2="40.5" y2="48" />
        </g>

        {/* Coordenadas [A] y [B] */}
        <text
          x="12"
          y="26"
          fill="currentColor"
          fontFamily="var(--font-mono)"
          fontSize="7"
          fontWeight="700"
          textAnchor="end"
        >
          [A]
        </text>
        <text
          x="12"
          y="44"
          fill="currentColor"
          fontFamily="var(--font-mono)"
          fontSize="7"
          fontWeight="700"
          textAnchor="end"
        >
          [B]
        </text>

        {/* Caja de contorno principal */}
        <rect
          x="18"
          y="15"
          width="60"
          height="60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        {/* Línea diagonal técnica */}
        <line
          x1="26"
          y1="67"
          x2="78"
          y2="15"
          stroke="currentColor"
          strokeWidth="1"
        />

        {/* Barras de gráfico (Bar chart) */}
        {/* Barra 1 */}
        <rect
          x="23"
          y="56"
          width="9"
          height="19"
          fill="var(--bg-canvas)"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        {/* Barra 2 */}
        <rect
          x="36"
          y="44"
          width="9"
          height="31"
          fill="var(--bg-canvas)"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        {/* Flecha Naranja de Señal Ascendente */}
        <g id="signal-arrow">
          {/* Fuste de la flecha */}
          <path
            d="M 44 48 L 44 22 L 52 22 L 52 48 Z"
            fill="var(--signal)"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          {/* Punta de la flecha que sobresale */}
          <polygon
            points="48,7 37,22 59,22"
            fill="var(--signal)"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </g>

        {/* Barra 3 */}
        <rect
          x="49"
          y="38"
          width="9"
          height="37"
          fill="var(--bg-canvas)"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        {/* Barra 4 */}
        <rect
          x="62"
          y="49"
          width="9"
          height="26"
          fill="var(--bg-canvas)"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        {/* Código serial de ingeniería 001 / 002 / 003 */}
        <text
          x="48"
          y="87"
          fill="currentColor"
          fontFamily="var(--font-mono)"
          fontSize="7"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
        >
          001 / 002 / 003
        </text>
      </svg>
    );
  };

  if (variant === 'mark-only') {
    return <div className={`axis-logo-container ${className}`}>{renderMark(size)}</div>;
  }

  if (variant === 'full') {
    return (
      <div
        className={`axis-logo-full ${className}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {renderMark(size * 1.8)}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: `${size * 0.9}px`,
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: 'var(--ink)',
            }}
          >
            AXIS
          </span>
          <span
            className="mono-text"
            style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              color: 'var(--signal)',
              letterSpacing: '0.05em',
            }}
          >
            [MCDA ENGINE]
          </span>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            color: 'var(--ink-muted)',
            marginTop: '4px',
            maxWidth: '320px',
            lineHeight: 1.3,
          }}
        >
          {lang === 'es'
            ? 'Capa de Decisión para Software y Flujos de Trabajo'
            : 'Decision Layer for Software & Workflows'}
        </p>
      </div>
    );
  }

  // Horizontal (para Header y barras compactas)
  return (
    <div
      className={`axis-logo-horizontal ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
      }}
    >
      {renderMark(size)}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: 'var(--ink)',
            }}
          >
            AXIS
          </span>
          <span
            className="mono-text"
            style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              color: 'var(--signal)',
              letterSpacing: '0.04em',
            }}
          >
            [MCDA ENGINE]
          </span>
        </div>
        <span
          className="mono-text"
          style={{
            fontSize: '0.62rem',
            color: 'var(--ink-muted)',
            marginTop: '2px',
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
          }}
        >
          {lang === 'es'
            ? 'CAPA DE DECISIÓN · FLUJOS DE TRABAJO'
            : 'DECISION LAYER · WORKFLOWS'}
        </span>
      </div>
    </div>
  );
};
