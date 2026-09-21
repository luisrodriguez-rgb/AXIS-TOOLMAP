import React, { useState, useMemo } from 'react';
import type { Tool } from '../types';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import { getToolLogo } from '../assets/logos/ToolLogos';
import { getLocalizedTool } from '../i18n/toolLocalization';
import { HeadToHeadComparison } from './HeadToHeadComparison';

interface ToolArchiveTableProps {
  tools: Tool[];
  lang: Language;
}

export const ToolArchiveTable: React.FC<ToolArchiveTableProps> = ({ tools, lang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [comparisonPair, setComparisonPair] = useState<{ commercial: Tool; foss: Tool } | null>(null);

  const t = TRANSLATIONS[lang].archive;
  const tCategories = TRANSLATIONS[lang].categories;

  const categories = [
    { id: 'all', label: tCategories.all },
    { id: 'foss', label: t.fossPill },
    { id: 'research', label: tCategories.research },
    { id: 'calculation', label: tCategories.calculation },
    { id: 'design_visual', label: tCategories.design_visual },
    { id: 'presentation', label: tCategories.presentation },
    { id: 'data_analysis', label: tCategories.data_analysis },
    { id: 'productivity', label: tCategories.productivity },
  ];

  const categoryLabels: Record<string, string> = {
    research: tCategories.research,
    calculation: tCategories.calculation,
    design_visual: tCategories.design_visual,
    drafting_3d: tCategories.drafting_3d,
    presentation: tCategories.presentation,
    data_analysis: tCategories.data_analysis,
    productivity: tCategories.productivity,
  };

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const locTool = getLocalizedTool(tool, lang);
      const matchesSearch =
        locTool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        locTool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        locTool.whatItDoesBest.some((w) => w.toLowerCase().includes(searchQuery.toLowerCase())) ||
        locTool.whatItDoesNotDo.some((w) => w.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesCategory = false;
      if (categoryFilter === 'all') {
        matchesCategory = true;
      } else if (categoryFilter === 'foss') {
        matchesCategory = Boolean(tool.isOpenSource);
      } else if (categoryFilter === 'design_visual') {
        matchesCategory = tool.category === 'design_visual' || tool.category === 'drafting_3d';
      } else {
        matchesCategory = tool.category === categoryFilter;
      }

      return matchesSearch && matchesCategory;
    });
  }, [tools, searchQuery, categoryFilter, lang]);

  // Handler para abrir la comparativa cara a cara
  const handleOpenComparison = (tool: Tool) => {
    if (!tool.fossAlternativeTo || tool.fossAlternativeTo.length === 0) return;
    const counterpartId = tool.fossAlternativeTo[0];
    const counterpart = tools.find((t) => t.id === counterpartId || t.slug === counterpartId);
    if (!counterpart) return;

    if (tool.isOpenSource) {
      setComparisonPair({ commercial: counterpart, foss: tool });
    } else {
      setComparisonPair({ commercial: tool, foss: counterpart });
    }
  };

  return (
    <section className="archive-container">
      {/* Header bar */}
      <div className="section-index-header" style={{ margin: '20px 20px 0 20px', paddingBottom: '12px' }}>
        <h2>
          <span className="section-num">{t.sectionNum}</span>
          <span>{t.sectionTitle}</span>
        </h2>
        <div className="section-meta-right">
          {t.indexedCount
            .replace('{filtered}', String(filteredTools.length))
            .replace('{total}', String(tools.length))}
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="archive-header-bar">
        <input
          type="text"
          className="archive-search-input"
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`matrix-btn-check ${categoryFilter === cat.id ? 'active' : ''}`}
              style={{
                padding: '4px 10px',
                border: '1px solid var(--line)',
                background: categoryFilter === cat.id ? 'var(--ink)' : 'var(--bg-surface)',
                color: categoryFilter === cat.id ? 'var(--ink-inverse)' : 'var(--ink)',
                cursor: 'pointer',
                fontWeight: cat.id === 'foss' ? 700 : 500,
              }}
              onClick={() => setCategoryFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Swiss dense table */}
      <div style={{ overflowX: 'auto' }}>
        <table className="archive-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>{t.colIndex}</th>
              <th style={{ width: '180px' }}>{t.colTool}</th>
              <th style={{ width: '110px' }}>{t.colType}</th>
              <th style={{ width: '120px' }}>{t.colCategory}</th>
              <th>{t.colBest}</th>
              <th>{t.colNotDo}</th>
              <th style={{ width: '100px' }}>{t.colPrice}</th>
              <th style={{ width: '120px' }}>{t.colPlatforms}</th>
              <th style={{ width: '130px' }}>{t.colFoss}</th>
            </tr>
          </thead>
          <tbody>
            {filteredTools.map((tool, idx) => {
              const locTool = getLocalizedTool(tool, lang);
              const hasFossPair = tool.fossAlternativeTo && tool.fossAlternativeTo.length > 0;

              return (
                <tr key={tool.id}>
                  <td className="archive-col-mono" style={{ color: 'var(--signal)', fontWeight: 700 }}>
                    {String(idx + 1).padStart(3, '0')}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {getToolLogo(tool.id, 18)}
                      <div>
                        <div className="archive-col-name">{tool.name}</div>
                        <a
                          href={tool.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="archive-col-mono"
                          style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}
                        >
                          {t.visitSite}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className="archive-col-mono"
                      style={{
                        padding: '2px 6px',
                        background: tool.isNativeAI ? 'var(--signal-bg)' : 'var(--bg-subtle)',
                        border: `1px solid ${tool.isNativeAI ? 'var(--signal-border)' : 'var(--line)'}`,
                        color: tool.isNativeAI ? 'var(--signal)' : 'var(--ink)',
                        fontWeight: 600,
                        fontSize: '0.68rem',
                      }}
                    >
                      {tool.isNativeAI ? t.nativeAi : t.traditional}
                    </span>
                  </td>
                  <td className="archive-col-mono" style={{ textTransform: 'uppercase' }}>
                    {categoryLabels[tool.category] || tool.category.toUpperCase()}
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--ink)' }}>
                    ✓ {locTool.whatItDoesBest[0]}
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
                    ! {locTool.whatItDoesNotDo[0] || 'N/A'}
                  </td>
                  <td className="archive-col-mono" style={{ fontWeight: 700 }}>
                    {tool.pricing.hasFreeTier
                      ? tool.pricing.startingPricePerMonthUSD === 0
                        ? '$0'
                        : t.freeTier
                      : `$${tool.pricing.startingPricePerMonthUSD}/MO`}
                  </td>
                  <td className="archive-col-mono" style={{ fontSize: '0.68rem' }}>
                    {tool.platforms.map((p) => p.toUpperCase()).join(' · ')}
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {tool.isOpenSource ? (
                        <span
                          className="mono-text"
                          style={{
                            fontSize: '0.65rem',
                            padding: '1px 5px',
                            background: 'var(--signal-bg)',
                            color: 'var(--signal)',
                            border: '1px solid var(--signal-border)',
                            fontWeight: 700,
                            display: 'inline-block',
                            width: 'fit-content',
                          }}
                        >
                          FOSS · {tool.license || 'OSI'}
                        </span>
                      ) : null}

                      {hasFossPair && (
                        <button
                          onClick={() => handleOpenComparison(tool)}
                          className="mono-text"
                          style={{
                            padding: '2px 6px',
                            background: 'var(--bg-canvas)',
                            border: '1px solid var(--line)',
                            color: 'var(--ink)',
                            fontSize: '0.65rem',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontWeight: 700,
                            width: 'fit-content',
                          }}
                          title={lang === 'es' ? 'Comparar cara a cara con alternativa' : 'Compare head-to-head with alternative'}
                        >
                          {t.vsFossBtn}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal Comparativo Cara a Cara (Head-to-Head) */}
      {comparisonPair && (
        <HeadToHeadComparison
          commercialTool={comparisonPair.commercial}
          fossTool={comparisonPair.foss}
          onClose={() => setComparisonPair(null)}
          lang={lang}
        />
      )}
    </section>
  );
};
