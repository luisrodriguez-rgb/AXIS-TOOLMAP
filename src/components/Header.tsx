import React from 'react';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import { AxisBrandLogo } from './AxisBrandLogo';

export type ActiveTab = 'discover' | 'workflow' | 'archive';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  toolCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  lang: Language;
  onToggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  toolCount,
  theme,
  onToggleTheme,
  lang,
  onToggleLang,
}) => {
  const t = TRANSLATIONS[lang].header;

  return (
    <header className="app-header">
      <div
        className="brand-wrapper"
        onClick={() => onSelectTab('discover')}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px' }}
      >
        <AxisBrandLogo variant="horizontal" size={28} lang={lang} />
        <span
          className="mono-text"
          style={{
            fontSize: '0.62rem',
            padding: '2px 8px',
            border: '1px solid var(--line)',
            background: 'var(--bg-canvas)',
            color: 'var(--ink-muted)',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
          title={t.brandSub.replace('{count}', String(toolCount))}
        >
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: 'var(--signal)',
              display: 'inline-block',
            }}
          />
          [{toolCount} TOOLS]
        </span>
      </div>

      {/* Navegación Primaria (Jerarquía Principal de Precisión Suiza) */}
      <nav className="nav-index-menu">
        <button
          className={`nav-index-item ${activeTab === 'discover' ? 'active' : ''}`}
          onClick={() => onSelectTab('discover')}
        >
          <div className="nav-main-label">
            <span className="nav-num">01</span>
            <span>{t.discover}</span>
          </div>
          <span className="nav-sub-label">
            {lang === 'es' ? 'ENTRADA · CONTEXTO' : 'INPUT · CONTEXT'}
          </span>
        </button>

        <button
          className={`nav-index-item ${activeTab === 'workflow' ? 'active' : ''}`}
          onClick={() => onSelectTab('workflow')}
        >
          <div className="nav-main-label">
            <span className="nav-num">02</span>
            <span>{t.workflowMap}</span>
          </div>
          <span className="nav-sub-label">
            {lang === 'es' ? 'GRAFO & PIPELINE' : 'GRAPH & PIPELINE'}
          </span>
        </button>

        <button
          className={`nav-index-item ${activeTab === 'archive' ? 'active' : ''}`}
          onClick={() => onSelectTab('archive')}
        >
          <div className="nav-main-label">
            <span className="nav-num">03</span>
            <span>{t.archive}</span>
          </div>
          <span className="nav-sub-label">
            {lang === 'es' ? 'MATRIZ & FOSS' : 'MATRIX & FOSS'}
          </span>
        </button>
      </nav>

      {/* Utilidades Secundarias: Tema e Idioma (Subordinadas, compactas, sin emojis) */}
      <div className="header-utilities">
        {/* Selector de Tema */}
        <div className="utility-control">
          <span className="utility-label">THEME:</span>
          <div className="utility-toggle-group">
            <button
              className={`utility-btn ${theme === 'light' ? 'active' : ''}`}
              onClick={() => theme !== 'light' && onToggleTheme()}
              title="Light mode"
            >
              LIGHT
            </button>
            <button
              className={`utility-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => theme !== 'dark' && onToggleTheme()}
              title="Dark mode"
            >
              DARK
            </button>
          </div>
        </div>

        {/* Selector de Idioma */}
        <div className="utility-control">
          <span className="utility-label">LANG:</span>
          <div className="utility-toggle-group">
            <button
              className={`utility-btn ${lang === 'es' ? 'active' : ''}`}
              onClick={() => lang !== 'es' && onToggleLang()}
              title="Español"
            >
              ES
            </button>
            <button
              className={`utility-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => lang !== 'en' && onToggleLang()}
              title="English"
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
