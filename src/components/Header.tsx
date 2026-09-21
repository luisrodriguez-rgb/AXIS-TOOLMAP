import React, { useEffect } from 'react';
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

  // Keyboard navigation: [1] -> discover, [2] -> workflow, [3] -> archive
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when user is typing in input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }
      if (e.key === '1') {
        onSelectTab('discover');
      } else if (e.key === '2') {
        onSelectTab('workflow');
      } else if (e.key === '3') {
        onSelectTab('archive');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelectTab]);

  return (
    <header className="app-header">
      {/* Brand & Telemetry */}
      <div
        className="brand-wrapper"
        onClick={() => onSelectTab('discover')}
        style={{ cursor: 'pointer' }}
        title={lang === 'es' ? 'Ir al inicio / Descubrir' : 'Go to Home / Discover'}
      >
        <AxisBrandLogo variant="horizontal" size={28} lang={lang} />
        <div className="brand-telemetry">
          <span
            className="telemetry-pill"
            title={t.brandSub.replace('{count}', String(toolCount))}
          >
            <span className="telemetry-dot" />
            [{toolCount} TOOLS]
          </span>
          <span className="telemetry-badge">MCDA v1.2</span>
        </div>
      </div>

      {/* Primary Navigation Index (Swiss Precision Hierarchy) */}
      <nav className="nav-index-menu" aria-label="Main Navigation">
        <button
          className={`nav-index-item ${activeTab === 'discover' ? 'active' : ''}`}
          onClick={() => onSelectTab('discover')}
          title={lang === 'es' ? 'Atajo de teclado: Tecla 1' : 'Keyboard shortcut: Key 1'}
        >
          <div className="nav-main-label">
            <span className="nav-num">01</span>
            <span>{t.discover}</span>
            <kbd className="nav-kbd-hint">1</kbd>
          </div>
          <span className="nav-sub-label">
            {lang === 'es' ? 'ENTRADA · CONTEXTO' : 'INPUT · CONTEXT'}
          </span>
        </button>

        <button
          className={`nav-index-item ${activeTab === 'workflow' ? 'active' : ''}`}
          onClick={() => onSelectTab('workflow')}
          title={lang === 'es' ? 'Atajo de teclado: Tecla 2' : 'Keyboard shortcut: Key 2'}
        >
          <div className="nav-main-label">
            <span className="nav-num">02</span>
            <span>{t.workflowMap}</span>
            <kbd className="nav-kbd-hint">2</kbd>
          </div>
          <span className="nav-sub-label">
            {lang === 'es' ? 'GRAFO & PIPELINE' : 'GRAPH & PIPELINE'}
          </span>
        </button>

        <button
          className={`nav-index-item ${activeTab === 'archive' ? 'active' : ''}`}
          onClick={() => onSelectTab('archive')}
          title={lang === 'es' ? 'Atajo de teclado: Tecla 3' : 'Keyboard shortcut: Key 3'}
        >
          <div className="nav-main-label">
            <span className="nav-num">03</span>
            <span>{t.archive}</span>
            <kbd className="nav-kbd-hint">3</kbd>
          </div>
          <span className="nav-sub-label">
            {lang === 'es' ? 'MATRIZ & FOSS' : 'MATRIX & FOSS'}
          </span>
        </button>
      </nav>

      {/* Secondary Utilities & External Repositories */}
      <div className="header-utilities">
        {/* GitHub Source Link */}
        <a
          href="https://github.com/luisrodriguez-rgb/AXIS-TOOLMAP"
          target="_blank"
          rel="noopener noreferrer"
          className="utility-github-link"
          title={lang === 'es' ? 'Ver código fuente y repositorio en GitHub' : 'View source code on GitHub'}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span className="github-text">REPO</span>
          <span className="github-arrow">↗</span>
        </a>

        {/* Theme Selector */}
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

        {/* Language Selector */}
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
