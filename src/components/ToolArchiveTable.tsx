import React, { useState, useMemo } from 'react';
import type { Tool } from '../types';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import { getToolLogo } from '../assets/logos/ToolLogos';

interface ToolArchiveTableProps {
  tools: Tool[];
  lang: Language;
}

export const ToolArchiveTable: React.FC<ToolArchiveTableProps> = ({ tools, lang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const t = TRANSLATIONS[lang].archive;
  const tCategories = TRANSLATIONS[lang].categories;

  const categories = [
    { id: 'all', label: tCategories.all },
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
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.whatItDoesBest.some((w) => w.toLowerCase().includes(searchQuery.toLowerCase())) ||
        tool.whatItDoesNotDo.some((w) => w.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        categoryFilter === 'all' ||
        tool.category === categoryFilter ||
        (categoryFilter === 'design_visual' && (tool.category === 'design_visual' || tool.category === 'drafting_3d'));

      return matchesSearch && matchesCategory;
    });
  }, [tools, searchQuery, categoryFilter]);

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
              <th style={{ width: '60px' }}>{t.colIndex}</th>
              <th style={{ width: '180px' }}>{t.colTool}</th>
              <th style={{ width: '130px' }}>{t.colType}</th>
              <th style={{ width: '140px' }}>{t.colCategory}</th>
              <th>{t.colBest}</th>
              <th>{t.colNotDo}</th>
              <th style={{ width: '110px' }}>{t.colPrice}</th>
              <th style={{ width: '140px' }}>{t.colPlatforms}</th>
            </tr>
          </thead>
          <tbody>
            {filteredTools.map((tool, idx) => (
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
                    }}
                  >
                    {tool.isNativeAI ? t.nativeAi : t.traditional}
                  </span>
                </td>
                <td className="archive-col-mono" style={{ textTransform: 'uppercase' }}>
                  {categoryLabels[tool.category] || tool.category.toUpperCase()}
                </td>
                <td style={{ fontSize: '0.8rem', color: 'var(--ink)' }}>
                  ✓ {tool.whatItDoesBest[0]}
                </td>
                <td style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
                  ! {tool.whatItDoesNotDo[0] || 'N/A'}
                </td>
                <td className="archive-col-mono" style={{ fontWeight: 700 }}>
                  {tool.pricing.hasFreeTier
                    ? tool.pricing.startingPricePerMonthUSD === 0
                      ? '$0'
                      : t.freeTier
                    : `$${tool.pricing.startingPricePerMonthUSD}/MO`}
                </td>
                <td className="archive-col-mono" style={{ fontSize: '0.7rem' }}>
                  {tool.platforms.map((p) => p.toUpperCase()).join(' · ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
