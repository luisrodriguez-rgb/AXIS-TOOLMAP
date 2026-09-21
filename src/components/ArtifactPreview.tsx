import React from 'react';

interface ArtifactPreviewProps {
  toolId: string;
  category: string;
}

export const ArtifactPreview: React.FC<ArtifactPreviewProps> = ({ toolId, category }) => {
  // Render de arquitectura / concepto (Vizcom / Midjourney / Krea)
  if (toolId === 'vizcom' || toolId === 'midjourney' || toolId === 'krea-ai' || category === 'drafting_3d') {
    return (
      <div className="artifact-preview-box">
        <div className="preview-label-tag">OUTPUT: CONCEPTUAL RENDER SCHEMATIC</div>
        <svg viewBox="0 0 280 110" className="preview-svg" fill="none">
          {/* Wireframe sketch lines on left */}
          <path d="M20 85L80 50L130 70L80 100L20 85Z" stroke="var(--ink-muted)" strokeWidth="1.2" strokeDasharray="3 2" />
          <path d="M80 50V20L130 40V70" stroke="var(--ink-muted)" strokeWidth="1.2" strokeDasharray="3 2" />
          <path d="M20 85V55L80 20" stroke="var(--ink-muted)" strokeWidth="1.2" strokeDasharray="3 2" />

          {/* Dividing scanline */}
          <line x1="140" y1="10" x2="140" y2="100" stroke="var(--signal)" strokeWidth="1.5" />

          {/* Shaded rendered volume on right */}
          <polygon points="150,85 210,50 260,70 210,100" fill="var(--bg-muted)" stroke="var(--ink)" strokeWidth="1.5" />
          <polygon points="210,50 210,20 260,40 260,70" fill="var(--line)" stroke="var(--ink)" strokeWidth="1.5" />
          <polygon points="150,85 150,55 210,20 210,50" fill="var(--bg-subtle)" stroke="var(--ink)" strokeWidth="1.5" />
          {/* Shadow plane */}
          <ellipse cx="205" cy="98" rx="45" ry="6" fill="rgba(0,0,0,0.12)" />
        </svg>
      </div>
    );
  }

  // Visualización matemática y cálculo 3D (GeoGebra / Wolfram Alpha)
  if (toolId === 'geogebra' || toolId === 'wolfram-alpha' || category === 'calculation') {
    return (
      <div className="artifact-preview-box">
        <div className="preview-label-tag">OUTPUT: 3D PARAMETRIC SURFACE (z = f(x,y))</div>
        <svg viewBox="0 0 280 110" className="preview-svg" fill="none">
          {/* Coordinate axes */}
          <line x1="40" y1="90" x2="240" y2="90" stroke="var(--line)" strokeWidth="1" />
          <line x1="140" y1="100" x2="140" y2="15" stroke="var(--line)" strokeWidth="1" />
          <line x1="140" y1="90" x2="70" y2="105" stroke="var(--line)" strokeWidth="1" />

          {/* Parametric grid mesh */}
          <path d="M50 75 Q100 35 140 60 T230 45" stroke="var(--signal)" strokeWidth="1.5" fill="none" />
          <path d="M60 82 Q110 42 150 67 T240 52" stroke="var(--ink)" strokeWidth="1" fill="none" />
          <path d="M70 89 Q120 49 160 74 T250 59" stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="2 2" fill="none" />
          
          {/* Mesh verticals */}
          <line x1="80" y1="58" x2="95" y2="86" stroke="var(--line-strong)" strokeWidth="0.75" />
          <line x1="120" y1="48" x2="135" y2="76" stroke="var(--line-strong)" strokeWidth="0.75" />
          <line x1="160" y1="62" x2="175" y2="90" stroke="var(--line-strong)" strokeWidth="0.75" />
          <line x1="200" y1="50" x2="215" y2="78" stroke="var(--line-strong)" strokeWidth="0.75" />
        </svg>
      </div>
    );
  }

  // Documentos con citas de fuentes (NotebookLM / Zotero / Obsidian / Claude)
  if (toolId === 'notebooklm' || toolId === 'zotero' || toolId === 'obsidian' || category === 'research') {
    return (
      <div className="artifact-preview-box">
        <div className="preview-label-tag">OUTPUT: CITED KNOWLEDGE CARD</div>
        <div className="preview-doc-card">
          <div className="preview-doc-line" style={{ width: '85%' }} />
          <div className="preview-doc-line" style={{ width: '95%' }} />
          <div className="preview-doc-citation-row">
            <div className="preview-doc-line" style={{ width: '60%' }} />
            <span className="preview-citation-badge">[REF: P. 42]</span>
          </div>
          <div className="preview-doc-line" style={{ width: '75%' }} />
        </div>
      </div>
    );
  }

  // Presentaciones ejecutivas (Pitch / Gamma / Canva)
  if (toolId === 'pitch' || toolId === 'gamma' || toolId === 'canva' || category === 'presentation') {
    return (
      <div className="artifact-preview-box">
        <div className="preview-label-tag">OUTPUT: EDITORIAL SLIDE LAYOUT</div>
        <div className="preview-slide-layout">
          <div className="preview-slide-header-line" />
          <div className="preview-slide-cols">
            <div className="preview-slide-left">
              <div className="preview-doc-line" style={{ width: '100%' }} />
              <div className="preview-doc-line" style={{ width: '80%' }} />
            </div>
            <div className="preview-slide-card">
              <div className="preview-metric-num">94%</div>
              <div className="preview-metric-sub">CONVERSION</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Análisis de datos y dashboards (Julius AI / Power BI / Excel)
  return (
    <div className="artifact-preview-box">
      <div className="preview-label-tag">OUTPUT: QUANTITATIVE ANALYTICS</div>
      <svg viewBox="0 0 280 100" className="preview-svg" fill="none">
        <rect x="30" y="55" width="22" height="35" fill="var(--bg-muted)" stroke="var(--ink)" strokeWidth="1" />
        <rect x="65" y="35" width="22" height="55" fill="var(--bg-muted)" stroke="var(--ink)" strokeWidth="1" />
        <rect x="100" y="20" width="22" height="70" fill="var(--signal)" stroke="var(--signal)" strokeWidth="1" />
        <rect x="135" y="45" width="22" height="45" fill="var(--bg-muted)" stroke="var(--ink)" strokeWidth="1" />
        <rect x="170" y="30" width="22" height="60" fill="var(--bg-muted)" stroke="var(--ink)" strokeWidth="1" />
        <path d="M41 50 L76 30 L111 15 L146 40 L181 25" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
    </div>
  );
};
