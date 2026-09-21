import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '../src/assets/logos/svg');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const LOGO_URLS = {
  perplexity: 'https://api.svgl.app/svg/perplexity.svg',
  notion: 'https://api.svgl.app/svg/notion.svg',
  chatgpt: 'https://api.svgl.app/svg/openai.svg',
  claude: 'https://api.svgl.app/svg/claude-ai-icon.svg',
  cursor: 'https://api.svgl.app/svg/cursor_light.svg',
  v0: 'https://api.svgl.app/svg/v0_light.svg',
  figma: 'https://api.svgl.app/svg/figma.svg',
  canva: 'https://api.svgl.app/svg/canva.svg',
  obsidian: 'https://api.svgl.app/svg/obsidian.svg',
  blender: 'https://api.svgl.app/svg/blender.svg',
  midjourney: 'https://api.svgl.app/svg/midjourney.svg',
  notebooklm: 'https://api.svgl.app/svg/gemini.svg',
  zotero: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/zotero.svg',
  freecad: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/freecad.svg',
  wolfram: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/wolfram.svg',
  scribus: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Scribus_logo.svg',
  marp: 'https://marp.app/assets/marp.svg',
  rhino: 'https://www.rhino3d.com/reseller/graphics/RhinoLogo.svg',
  geogebra: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Geogebra.svg',
  gamma: 'https://cdn.worldvectorlogo.com/logos/gamma.svg',
};

async function fetchAll() {
  console.log('Fetching official SVGs...');
  for (const [id, url] of Object.entries(LOGO_URLS)) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
      });
      if (res.ok) {
        const svgContent = await res.text();
        const filePath = path.join(targetDir, `${id}.svg`);
        fs.writeFileSync(filePath, svgContent, 'utf-8');
        console.log(`✓ [${id}] Saved from ${url} (${svgContent.length} bytes)`);
      } else {
        console.error(`✗ [${id}] Failed with status ${res.status}: ${url}`);
      }
    } catch (err) {
      console.error(`✗ [${id}] Error fetching ${url}:`, err.message);
    }
  }
}

fetchAll();
