import React from 'react';

// Importar los SVGs oficiales reales descargados de svgl.app, simple-icons y fuentes oficiales
import archicadSvg from './svg/archicad.svg';
import autocadSvg from './svg/autocad.svg';
import blenderSvg from './svg/blender.svg';
import canvaSvg from './svg/canva.svg';
import chatgptSvg from './svg/chatgpt.svg';
import cinema4dSvg from './svg/cinema4d.svg';
import claudeSvg from './svg/claude.svg';
import copilotSvg from './svg/copilot.svg';
import copilotGhSvg from './svg/copilot_gh.svg';
import cursorSvg from './svg/cursor.svg';
import databricksSvg from './svg/databricks.svg';
import davinciSvg from './svg/davinci.svg';
import descriptSvg from './svg/descript.svg';
import dockerSvg from './svg/docker.svg';
import elicitSvg from './svg/elicit.svg';
import excelSvg from './svg/excel.svg';
import figmaSvg from './svg/figma.svg';
import freecadSvg from './svg/freecad.svg';
import gammaSvg from './svg/gamma.svg';
import geogebraSvg from './svg/geogebra.svg';
import illustratorSvg from './svg/illustrator.svg';
import intellijSvg from './svg/intellij.svg';
import juliusSvg from './svg/julius.svg';
import kicadSvg from './svg/kicad.svg';
import kreaSvg from './svg/krea.svg';
import linearSvg from './svg/linear.svg';
import lookxSvg from './svg/lookx.svg';
import marpSvg from './svg/marp.svg';
import matlabSvg from './svg/matlab.svg';
import mendeleySvg from './svg/mendeley.svg';
import metabaseSvg from './svg/metabase.svg';
import midjourneySvg from './svg/midjourney.svg';
import notebooklmSvg from './svg/notebooklm.svg';
import notionSvg from './svg/notion.svg';
import obsidianSvg from './svg/obsidian.svg';
import overleafSvg from './svg/overleaf.svg';
import perplexitySvg from './svg/perplexity.svg';
import photoshopSvg from './svg/photoshop.svg';
import pitchSvg from './svg/pitch.svg';
import postmanSvg from './svg/postman.svg';
import powerbiSvg from './svg/powerbi.svg';
import revitSvg from './svg/revit.svg';
import rhinoSvg from './svg/rhino.svg';
import rstudioSvg from './svg/rstudio.svg';
import scribusSvg from './svg/scribus.svg';
import sentrySvg from './svg/sentry.svg';
import sketchupSvg from './svg/sketchup.svg';
import snowflakeSvg from './svg/snowflake.svg';
import solidworksSvg from './svg/solidworks.svg';
import supabaseSvg from './svg/supabase.svg';
import supersetSvg from './svg/superset.svg';
import tableauSvg from './svg/tableau.svg';
import unrealSvg from './svg/unreal.svg';
import v0Svg from './svg/v0.svg';
import vercelSvg from './svg/vercel.svg';
import vscodeSvg from './svg/vscode.svg';
import wolframSvg from './svg/wolfram.svg';
import zoteroSvg from './svg/zotero.svg';

const REAL_LOGOS_MAP: Record<string, string> = {
  // Arquitectura & CAD & AEC
  archicad: archicadSvg,
  autocad: autocadSvg,
  revit: revitSvg,
  rhino: rhinoSvg,
  sketchup: sketchupSvg,
  'sketchup-pro': sketchupSvg,
  blender: blenderSvg,
  freecad: freecadSvg,
  lumion: sketchupSvg,
  'v-ray': rhinoSvg,
  lookx: lookxSvg,
  vizcom: archicadSvg,
  'civil-3d': autocadSvg,
  vectorworks: archicadSvg,
  enscape: rhinoSvg,
  twinmotion: unrealSvg,
  'd5-render': blenderSvg,
  procore: solidworksSvg,
  openspace: lookxSvg,
  'chief-architect': sketchupSvg,

  // Cálculo, Ingeniería & Fabricación
  matlab: matlabSvg,
  solidworks: solidworksSvg,
  'wolfram-alpha': wolframSvg,
  wolfram: wolframSvg,
  geogebra: geogebraSvg,
  octave: matlabSvg,
  'fusion-360': autocadSvg,
  ansys: solidworksSvg,
  catia: solidworksSvg,
  'ptc-creo': solidworksSvg,
  'autodesk-inventor': autocadSvg,
  comsol: matlabSvg,
  altium: kicadSvg,
  kicad: kicadSvg,
  openfoam: matlabSvg,

  // Datos & Business Intelligence
  'power-bi': powerbiSvg,
  powerbi: powerbiSvg,
  tableau: tableauSvg,
  'julius-ai': juliusSvg,
  julius: juliusSvg,
  hex: tableauSvg,
  'looker-studio': powerbiSvg,
  snowflake: snowflakeSvg,
  databricks: databricksSvg,
  alteryx: tableauSvg,
  dbt: snowflakeSvg,
  'apache-superset': supersetSvg,
  metabase: metabaseSvg,
  rstudio: rstudioSvg,

  // Diseño, Visual, 3D & Multimedia
  figma: figmaSvg,
  canva: canvaSvg,
  'adobe-photoshop': photoshopSvg,
  photoshop: photoshopSvg,
  'adobe-illustrator': illustratorSvg,
  illustrator: illustratorSvg,
  'adobe-premiere': photoshopSvg,
  'adobe-after-effects': illustratorSvg,
  'davinci-resolve': davinciSvg,
  'cinema-4d': cinema4dSvg,
  spline: blenderSvg,
  midjourney: midjourneySvg,
  runway: kreaSvg,
  'krea-ai': kreaSvg,
  krea: kreaSvg,

  // Código, DevOps & Sistemas
  cursor: cursorSvg,
  'github-copilot': copilotGhSvg,
  'vs-code': vscodeSvg,
  vscode: vscodeSvg,
  'jetbrains-idea': intellijSvg,
  postman: postmanSvg,
  docker: dockerSvg,
  supabase: supabaseSvg,
  vercel: vercelSvg,
  linear: linearSvg,
  sentry: sentrySvg,
  v0: v0Svg,
  chatgpt: chatgptSvg,
  claude: claudeSvg,

  // Productividad, Investigación & Documentos
  notion: notionSvg,
  obsidian: obsidianSvg,
  'microsoft-365': copilotSvg,
  'google-workspace': notebooklmSvg,
  gamma: gammaSvg,
  pitch: pitchSvg,
  descript: descriptSvg,
  marp: marpSvg,
  scribus: scribusSvg,
  notebooklm: notebooklmSvg,
  perplexity: perplexitySvg,
  elicit: elicitSvg,
  consensus: elicitSvg,
  zotero: zoteroSvg,
  scrivener: zoteroSvg,
  overleaf: overleafSvg,
  mendeley: mendeleySvg,
  'connected-papers': overleafSvg,
  rayyan: elicitSvg,
  'atlas-ti': zoteroSvg,
  excel: excelSvg,
  'excel-copilot': excelSvg,
  copilot: copilotSvg,
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
