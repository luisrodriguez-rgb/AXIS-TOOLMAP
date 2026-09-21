import React from 'react';

// Importar los SVGs oficiales reales descargados de svgl.app, simple-icons y fuentes oficiales
import blenderSvg from './svg/blender.svg';
import canvaSvg from './svg/canva.svg';
import chatgptSvg from './svg/chatgpt.svg';
import claudeSvg from './svg/claude.svg';
import cursorSvg from './svg/cursor.svg';
import elicitSvg from './svg/elicit.svg';
import figmaSvg from './svg/figma.svg';
import freecadSvg from './svg/freecad.svg';
import gammaSvg from './svg/gamma.svg';
import geogebraSvg from './svg/geogebra.svg';
import lookxSvg from './svg/lookx.svg';
import marpSvg from './svg/marp.svg';
import midjourneySvg from './svg/midjourney.svg';
import notebooklmSvg from './svg/notebooklm.svg';
import notionSvg from './svg/notion.svg';
import obsidianSvg from './svg/obsidian.svg';
import perplexitySvg from './svg/perplexity.svg';
import rhinoSvg from './svg/rhino.svg';
import scribusSvg from './svg/scribus.svg';
import v0Svg from './svg/v0.svg';
import wolframSvg from './svg/wolfram.svg';
import zoteroSvg from './svg/zotero.svg';

const REAL_LOGOS_MAP: Record<string, string> = {
  blender: blenderSvg,
  canva: canvaSvg,
  chatgpt: chatgptSvg,
  claude: claudeSvg,
  cursor: cursorSvg,
  elicit: elicitSvg,
  figma: figmaSvg,
  freecad: freecadSvg,
  gamma: gammaSvg,
  geogebra: geogebraSvg,
  lookx: lookxSvg,
  marp: marpSvg,
  midjourney: midjourneySvg,
  notebooklm: notebooklmSvg,
  notion: notionSvg,
  obsidian: obsidianSvg,
  perplexity: perplexitySvg,
  rhino: rhinoSvg,
  scribus: scribusSvg,
  v0: v0Svg,
  wolfram: wolframSvg,
  zotero: zoteroSvg,
};

/**
 * Obtener el logotipo oficial vectorial real de la herramienta.
 * Proviene de repositorios oficiales (svgl.app, simple-icons, fuentes de marca).
 */
export const getToolLogo = (toolId: string, size = 20): React.ReactNode => {
  const normalizedId = toolId.toLowerCase();
  const src = REAL_LOGOS_MAP[normalizedId];

  if (!src) {
    return (
      <span
        style={{
          width: `${size}px`,
          height: `${size}px`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--line)',
          fontSize: `${size * 0.5}px`,
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
        }}
      >
        {toolId.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={`${toolId} official logo`}
      className={`tool-real-logo tool-logo-${normalizedId}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'contain',
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
      }}
      loading="lazy"
    />
  );
};
