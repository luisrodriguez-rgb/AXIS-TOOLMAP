import React from 'react';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';

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
      <div className="brand-wrapper">
        <div className="brand-title">AXIS / TOOLMAP</div>
        <div className="brand-sub">
          {t.brandSub.replace('{count}', String(toolCount))}
        </div>
      </div>

      {/* Navegación Primaria (Jerarquía Principal) */}
      <nav className="nav-index-menu">
        <button
          className={`nav-index-item ${activeTab === 'discover' ? 'active' : ''}`}
          onClick={() => onSelectTab('discover')}
        >
          <span className="nav-num">01</span>
          <span>{t.discover}</span>
        </button>

        <button
          className={`nav-index-item ${activeTab === 'workflow' ? 'active' : ''}`}
          onClick={() => onSelectTab('workflow')}
        >
          <span className="nav-num">02</span>
          <span>{t.workflowMap}</span>
        </button>

        <button
          className={`nav-index-item ${activeTab === 'archive' ? 'active' : ''}`}
          onClick={() => onSelectTab('archive')}
        >
          <span className="nav-num">03</span>
          <span>{t.archive}</span>
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
