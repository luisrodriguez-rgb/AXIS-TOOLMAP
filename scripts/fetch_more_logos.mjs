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
  docker: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/docker.svg',
  postman: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/postman.svg',
  intellij: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/intellijidea.svg',
  sentry: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/sentry.svg',
  linear: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/linear.svg',
  supabase: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/supabase.svg',
  vercel: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vercel.svg',
  snowflake: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/snowflake.svg',
  databricks: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/databricks.svg',
  dbt: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/dbt.svg',
  superset: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/apachesuperset.svg',
  metabase: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/metabase.svg',
  rstudio: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/rstudio.svg',
  premiere: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/adobepremierepro.svg',
  aftereffects: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/adobeaftereffects.svg',
  davinci: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/davinciresolve.svg',
  cinema4d: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/cinema4d.svg',
  mendeley: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/mendeley.svg',
  kicad: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/kicad.svg',
  openfoam: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/openfoam.svg',
};

async function fetchMore() {
  console.log('Fetching more official SVGs...');
  for (const [id, url] of Object.entries(LOGO_URLS)) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
      });
      if (res.ok) {
        let svgContent = await res.text();
        if (!svgContent.includes('xmlns=')) {
          svgContent = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        const filePath = path.join(targetDir, `${id}.svg`);
        fs.writeFileSync(filePath, svgContent, 'utf-8');
        console.log(`✓ [${id}] Saved (${svgContent.length} bytes)`);
      } else {
        console.error(`✗ [${id}] Failed with status ${res.status}: ${url}`);
      }
    } catch (err) {
      console.error(`✗ [${id}] Error:`, err.message);
    }
  }

  // Sanitizar todos los SVGs para garantizar xmlns
  const files = fs.readdirSync(targetDir);
  for (const file of files) {
    if (file.endsWith('.svg')) {
      const p = path.join(targetDir, file);
      let content = fs.readFileSync(p, 'utf-8');
      if (!content.includes('xmlns=')) {
        content = content.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
        fs.writeFileSync(p, content, 'utf-8');
        console.log(`✓ Sanitized xmlns in ${file}`);
      }
    }
  }
}

fetchMore();
