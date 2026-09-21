import type { Tool } from '../types';
import type { Language } from './translations';

export interface ToolTranslation {
  tagline: string;
  whatItDoesBest: string[];
  whatItDoesNotDo: string[];
}

export const TOOL_TRANSLATIONS_EN: Record<string, ToolTranslation> = {
  // 1. INVESTIGACIÓN, REDACCIÓN & CIENCIA
  notebooklm: {
    tagline: 'Research notebook strictly grounded in your provided source documents.',
    whatItDoesBest: [
      'Verifiable point-to-point citations directly linked to your uploaded PDFs and docs',
      'Conversational Audio Overviews summarizing research materials',
      'Zero hallucinations outside of the provided source context',
    ],
    whatItDoesNotDo: [
      'Does not browse the live web in real time',
      'Does not generate images, vector schematics, or executable code',
      'No native desktop application or offline support',
    ],
  },
  perplexity: {
    tagline: 'Conversational search engine with real-time academic and web citations.',
    whatItDoesBest: [
      'Bibliographic and web search with explicit clickable source citations',
      'Dedicated Academic Mode focused on peer-reviewed scientific databases',
      'Flexible access to frontier models (Claude 3.5 Sonnet, GPT-4o)',
    ],
    whatItDoesNotDo: [
      'Does not store bibliographies in BibTeX or manage local metadata',
      'Does not author structured, publication-ready academic manuscripts',
      'Does not operate offline without an active internet connection',
    ],
  },
  elicit: {
    tagline: 'Systematic scientific literature review assistant covering 125M+ papers.',
    whatItDoesBest: [
      'Bulk extraction of methodology, sample size, and conclusion variables across papers',
      'Automated synthesis of findings across hundreds of peer-reviewed articles',
      'Direct semantic search across scientific literature databases',
    ],
    whatItDoesNotDo: [
      'Does not write long argumentative or creative prose',
      'Requires paid credits for extensive deep-search workflows',
      'Does not support local CAD or code execution',
    ],
  },
  consensus: {
    tagline: 'Evidence-based search engine measuring scientific consensus across peer-reviewed papers.',
    whatItDoesBest: [
      'Consensus Meter measuring whether scientific research supports or refutes a hypothesis',
      '100% peer-reviewed citations with journal quality badges (SJR/Impact Factor)',
      'Fast synthesis of medical, social, and technical research literature',
    ],
    whatItDoesNotDo: [
      'Does not analyze private, local, or unpublished documents',
      'Does not generate slide presentations or interactive dashboards',
      'Limited utility for real-time news or general software engineering',
    ],
  },
  zotero: {
    tagline: 'Open-source reference manager with local sovereign PDF storage and BibTeX support.',
    whatItDoesBest: [
      'Sovereign local storage and organization of PDF libraries on your machine',
      'Automated citation insertion in Word, LibreOffice, and Google Docs with 10,000+ CSL styles',
      'Instant metadata extraction from DOIs, ISBNs, and web browser extensions',
    ],
    whatItDoesNotDo: [
      'Does not summarize or analyze paper contents by itself without third-party plugins',
      'Free cloud sync limited to 300 MB (requires external WebDAV for large libraries)',
      'Traditional desktop interface without conversational AI features',
    ],
  },
  scrivener: {
    tagline: 'Non-linear long-form writing studio for books, academic theses, and research dossiers.',
    whatItDoesBest: [
      'Non-linear organization of long manuscripts, dissertations, and research chapters',
      'Split-screen corkboard view with research references alongside active draft text',
      'Comprehensive compilation into PDF, EPUB, DOCX, and LaTeX with fine-grained control',
    ],
    whatItDoesNotDo: [
      'Does not generate text with AI automatically',
      'No simultaneous real-time multi-user cloud collaboration',
      'Steep learning curve due to dozens of hierarchical binder features',
    ],
  },
  overleaf: {
    tagline: 'Collaborative cloud LaTeX editor for scientific publishing, peer review, and math formulas.',
    whatItDoesBest: [
      'Flawless mathematical typography and layout of complex equations with LaTeX',
      'Real-time collaborative editing with track changes and reviewer comments',
      'Direct submission templates for IEEE, Springer, ACM, and Nature journals',
    ],
    whatItDoesNotDo: [
      'Steep learning curve: requires understanding LaTeX syntax and packages',
      'Free tier limits compile time to 1 minute per build',
      'Not designed for fast visual slide decks or corporate marketing brochures',
    ],
  },

  // 2. CÁLCULO, MATEMÁTICAS & SIMULACIÓN
  matlab: {
    tagline: 'Matrix computation, mathematical modeling, and dynamic system simulation platform.',
    whatItDoesBest: [
      'Massive matrix computation and physical dynamic system simulation with Simulink',
      'Standard numerical platform for aerospace, automotive, and signal processing industries',
      'Extensive certified toolboxes for control systems, DSP, and machine learning',
    ],
    whatItDoesNotDo: [
      'Very expensive commercial license for individual professionals and small studios',
      'Heavy proprietary software with high RAM and storage footprint',
      'Not suitable for web UI presentation or quick slide design',
    ],
  },
  'wolfram-alpha': {
    tagline: 'Computational knowledge engine and exact symbolic mathematical calculation platform.',
    whatItDoesBest: [
      'Exact symbolic calculus (integrals, derivatives, differential equations step-by-step)',
      'Curated multidisciplinary knowledge base spanning physics, chemistry, and economics',
      'High-precision 2D/3D plotting of mathematical and algebraic functions',
    ],
    whatItDoesNotDo: [
      'Does not design executive presentations or corporate slide decks',
      'Step-by-step solutions require a paid Pro subscription',
      'Not built for writing extensive prose or narrative literature reviews',
    ],
  },
  ansys: {
    tagline: 'Engineering simulation software for finite element analysis (FEA) and computational fluid dynamics (CFD).',
    whatItDoesBest: [
      'Structural stress, deformation, thermal, and material fatigue analysis under real loads',
      'High-fidelity computational fluid dynamics (CFD) simulation for aerospace and HVAC',
      'Electromagnetic and thermal multiphysics coupling for industrial certification',
    ],
    whatItDoesNotDo: [
      'Extremely high enterprise licensing cost for independent professionals and students',
      'Requires high-end workstations with dedicated GPUs and extensive RAM',
      'Steep learning curve requiring advanced engineering degrees in structural mechanics',
    ],
  },
  solidworks: {
    tagline: 'Industry-standard parametric 3D CAD modeling and mechanical engineering software.',
    whatItDoesBest: [
      'Complex mechanical assembly design with collision and clearance checking',
      'Automated generation of 2D manufacturing drawings with tolerances and BOMs',
      'Dimension-driven parametric modeling that updates all views simultaneously',
    ],
    whatItDoesNotDo: [
      'Runs natively only on Windows OS',
      'Not suited for organic conceptual sculpting or architectural massing',
      'High licensing cost with mandatory annual maintenance contracts',
    ],
  },
  geogebra: {
    tagline: 'Dynamic open mathematics software for geometry, algebra, and 3D calculus.',
    whatItDoesBest: [
      'Interactive visual representation of 3D geometries, surfaces, and vector spaces',
      'Dynamic manipulation of algebraic parameters with real-time graphical feedback',
      '100% free with multiplatform support (Web, Mac, Windows, Linux, iOS, Android)',
    ],
    whatItDoesNotDo: [
      'Not built for structural finite element analysis or mechanical stress simulations',
      'Cannot generate manufacturing-ready G-code or STEP files for CNC milling',
      'Limited to educational and analytical mathematics rather than industrial CAD',
    ],
  },
  octave: {
    tagline: 'High-level numerical computation language with MATLAB-compatible syntax and zero cost.',
    whatItDoesBest: [
      'Matrix calculations and numerical algorithms using syntax identical to MATLAB m-files',
      '100% open source under GNU GPL license with zero subscription fees',
      'Easy scripting and integration with C, C++, and Python pipelines',
    ],
    whatItDoesNotDo: [
      'Simulink clone is less mature and lacks specialized commercial industrial toolboxes',
      'Graphical user interface is more Spartan and basic than commercial IDEs',
      'Execution speed can be slower on certain specialized linear algebra routines without BLAS/LAPACK tuning',
    ],
  },

  // 3. MODELADO 3D, CAD & ARQUITECTURA
  'sketchup-pro': {
    tagline: 'Intuitive and fast 3D volumetric modeling for architecture and interior design.',
    whatItDoesBest: [
      'Conceptual massing and schematic architectural design in minutes with Push/Pull tool',
      'Vast 3D Warehouse library of furniture, building components, and materials',
      'Direct integration with LayOut for 2D construction drawings and client presentations',
    ],
    whatItDoesNotDo: [
      'Poor performance with complex organic curved surfaces and dense meshes (lags)',
      'No native parametric BIM authoring without third-party plugins',
      'High annual subscription cost without perpetual license options',
    ],
  },
  blender: {
    tagline: 'Open-source 3D creation suite for modeling, sculpting, rendering, VFX, and animation.',
    whatItDoesBest: [
      '100% free and open-source with photorealistic rendering via Cycles and EEVEE',
      'Advanced digital sculpting, rigging, procedural geometry nodes, and animation',
      'Massive global community, extensive Python API, and thousands of add-ons',
    ],
    whatItDoesNotDo: [
      'Not designed for dimension-driven parametric mechanical CAD or CNC tolerances',
      'Steep initial learning curve due to hundreds of shortcuts and workspaces',
      'Does not produce 2D municipal architectural permit drawings natively',
    ],
  },
  freecad: {
    tagline: 'Open-source parametric 3D CAD modeler for mechanical engineering and physical parts.',
    whatItDoesBest: [
      'Parametric modeling of mechanical components on your local machine with $0 budget',
      'Absolute data sovereignty without relying on cloud subscriptions or licenses',
      'Direct export to industry standard manufacturing formats (STEP, IGES, STL, DXF)',
    ],
    whatItDoesNotDo: [
      'Interface is less polished and has occasional topological naming bugs compared to SolidWorks',
      'Not suitable for artistic conceptual renders or character animation',
      'Does not document architectural BIM with the speed of Revit',
    ],
  },
  revit: {
    tagline: 'BIM software for architectural design, structural engineering, MEP, and construction.',
    whatItDoesBest: [
      'Unified BIM coordination: floor plans, sections, elevations, and schedules update simultaneously',
      'Multi-disciplinary clash detection between architectural, structural, and MEP systems',
      'Mandatory corporate standard in high-end architecture and construction firms',
    ],
    whatItDoesNotDo: [
      'Extremely expensive subscription license ($355/month or $2,845/year)',
      'Runs only on Windows OS with heavy hardware requirements',
      'High barrier to entry for small practices or individual freelancers',
    ],
  },
  autocad: {
    tagline: 'Industry-standard 2D and 3D computer-aided design (CAD) software for drafting and detailing.',
    whatItDoesBest: [
      'Precision 2D technical drafting, architectural detailing, and construction plans',
      'DWG format is the universally accepted standard across contractors and municipal authorities',
      'Deep LISP scripting automation for repetitive drafting tasks',
    ],
    whatItDoesNotDo: [
      'Does not support parametric BIM coordination (changes do not auto-propagate across 3D models)',
      'High recurring subscription cost for 2D drafting capabilities',
      '3D modeling is rigid and cumbersome compared to modern parametric tools',
    ],
  },

  // 4. OFIMÁTICA, PRODUCTIVIDAD & COMUNICACIÓN
  'microsoft-365': {
    tagline: 'Enterprise productivity suite standard: Word, Excel, PowerPoint, and Teams.',
    whatItDoesBest: [
      'Mandatory standard across corporate, legal, and financial industries for documents and spreadsheets',
      'Advanced financial modeling with Excel VBA, Power Query, and dynamic arrays',
      'Enterprise security, compliance policies, and centralized IT management',
    ],
    whatItDoesNotDo: [
      'Requires continuous per-seat monthly or annual subscriptions',
      'Web versions have reduced functionality compared to native desktop apps',
      'No native support for code syntax highlighting or scientific LaTeX equations',
    ],
  },
  'google-workspace': {
    tagline: 'Cloud-first productivity and real-time collaboration suite: Docs, Sheets, Slides, Drive.',
    whatItDoesBest: [
      'Flawless real-time multi-user simultaneous collaboration in web browsers',
      'Zero installation required; accessible from any computer or mobile device',
      'Seamless integration with Google Drive, Gmail, and Google Meet',
    ],
    whatItDoesNotDo: [
      'Requires persistent internet connection for full functionality',
      'Advanced spreadsheet modeling is limited compared to desktop Excel (10M cell cap)',
      'All data resides on Google public cloud infrastructure',
    ],
  },
  notion: {
    tagline: 'All-in-one connected workspace for notes, docs, project management, and team wikis.',
    whatItDoesBest: [
      'Relational databases with flexible views (Kanban, calendar, timeline, gallery)',
      'Clean modern typography and modular drag-and-drop block structure',
      'Integrated AI for summarizing, drafting, and querying workspace knowledge',
    ],
    whatItDoesNotDo: [
      'Proprietary cloud storage with no native local-first offline storage mode',
      'Performance degrades on very large databases or long nested documents',
      'Not designed for statistical calculations or precision financial modeling',
    ],
  },
  obsidian: {
    tagline: 'Local-first, privacy-focused knowledge base on plain Markdown files.',
    whatItDoesBest: [
      '100% data sovereignty: your notes stay on your local disk in plain text Markdown',
      'Bi-directional linking and interactive visual graph of connected thoughts',
      'Vast community plugin ecosystem (Dataview, Canvas, Excalidraw, Git)',
    ],
    whatItDoesNotDo: [
      'No built-in real-time multi-user collaboration (requires Git or paid Sync)',
      'Steep initial setup if you want complex database workflows',
      'Not designed for client-facing formatted slide decks',
    ],
  },
  chatgpt: {
    tagline: 'Multimodal conversational assistant with deep reasoning and data analysis.',
    whatItDoesBest: [
      'Advanced logical reasoning and complex problem solving with o1/o3 models',
      'Code drafting, refactoring, and debugging across major programming languages',
      'Synthesis and structured extraction from long multimodal documents and images',
    ],
    whatItDoesNotDo: [
      'May produce citation hallucinations if not grounded with specific source files',
      'No deterministic guarantees for mathematical and engineering calculations',
      'Requires active internet connection and cloud account',
    ],
  },
  claude: {
    tagline: 'Frontier AI assistant with 200k context window and exceptional code and prose generation.',
    whatItDoesBest: [
      'Exceptional nuanced writing, editorial style, and complex technical synthesis',
      'Artifacts interface allowing live preview of code, React components, and SVG',
      'Large 200k token context window capable of ingesting entire codebases or books',
    ],
    whatItDoesNotDo: [
      'No built-in web search browsing in standard chat interface',
      'Cannot generate audio, voiceover, or 3D geometry files',
      'Hourly message limits during peak usage on Pro tier',
    ],
  },

  // 5. DISEÑO & ANÁLISIS DE DATOS
  figma: {
    tagline: 'Collaborative interface design, design systems, and interactive prototyping tool.',
    whatItDoesBest: [
      'Vector UI design with Auto Layout, reusable components, and design variables',
      'Real-time multi-user collaboration in a shared infinite canvas',
      'Interactive prototyping to validate user flows before writing code',
    ],
    whatItDoesNotDo: [
      'Proprietary binary file format hosted exclusively on Figma cloud servers',
      'High monthly subscription cost per editor seat',
      'Requires internet connection for full functionality (limited offline mode)',
    ],
  },
  penpot: {
    tagline: 'Open-source web-based design and prototyping platform based on native SVG and web standards.',
    whatItDoesBest: [
      '100% open source under MPL-2.0; can be self-hosted on your own infrastructure',
      'Native SVG and CSS standards under the hood, easing developer handoff',
      'Zero license costs with full data sovereignty and no vendor lock-in',
    ],
    whatItDoesNotDo: [
      'Smaller plugin and community widget ecosystem compared to Figma',
      'Interactive micro-interactions are slightly less advanced than Figma Prototyping',
      'Requires self-hosting setup if you want custom on-premise governance',
    ],
  },
  tableau: {
    tagline: 'Visual analytics platform transforming data into actionable interactive business dashboards.',
    whatItDoesBest: [
      'High-performance visual data discovery and complex interactive dashboard creation',
      'Native connectors to hundreds of SQL databases, cloud warehouses, and APIs',
      'Enterprise-grade governance, row-level security, and scheduled data extracts',
    ],
    whatItDoesNotDo: [
      'Very expensive licensing ($75+/month/creator plus viewer seat fees)',
      'Steep learning curve for complex Level of Detail (LOD) calculations',
      'Not designed for operational data entry or direct spreadsheet editing',
    ],
  },
  'power-bi': {
    tagline: 'Business intelligence and reporting platform tightly integrated with the Microsoft ecosystem.',
    whatItDoesBest: [
      'Seamless integration with Microsoft Fabric, Azure, Excel, and Teams',
      'Powerful DAX modeling and Power Query ETL data transformation engine',
      'Cost-effective entry point for organizations already licensed on Microsoft 365',
    ],
    whatItDoesNotDo: [
      'Power BI Desktop runs natively only on Windows OS',
      'Steep learning curve for advanced DAX modeling and time-intelligence functions',
      'Cloud sharing requires paid Pro or Premium per-user licenses',
    ],
  },
  'apache-superset': {
    tagline: 'Modern open-source data exploration and visualization platform for enterprise scale.',
    whatItDoesBest: [
      '100% open source under Apache-2.0 with zero per-user licensing fees',
      'Connects directly to 40+ SQL databases and query engines (Trino, ClickHouse, Postgres)',
      'Highly scalable cloud-native architecture supporting thousands of concurrent users',
    ],
    whatItDoesNotDo: [
      'Requires technical engineering skills to deploy, configure, and maintain via Docker/K8s',
      'Less visual drag-and-drop flexibility for ad-hoc infographic reporting compared to Tableau',
      'No native Excel-like manual spreadsheet data entry',
    ],
  },
  appflowy: {
    tagline: 'Open-source, local-first collaborative workspace and sovereign alternative to Notion.',
    whatItDoesBest: [
      '100% local-first data ownership built with Rust and Flutter with zero cloud lock-in',
      'Modular document editing with boards, tables, calendars, and offline-first speed',
      'Can be self-hosted on your own server or run completely offline with end-to-end privacy',
    ],
    whatItDoesNotDo: [
      'Younger ecosystem with fewer third-party integrations compared to Notion',
      'Mobile apps have fewer advanced database features than desktop counterparts',
      'No public web publishing of pages without custom domain configuration',
    ],
  },
  mattermost: {
    tagline: 'Secure, open-source collaboration and messaging platform for technical teams.',
    whatItDoesBest: [
      'Complete data sovereignty with self-hosted on-premise deployment under AGPL-3.0',
      'Strict compliance with HIPAA, GDPR, and SOC2 without third-party cloud data exposure',
      'Deep integration with developer tools: Git, Jira, Jenkins, GitLab, and CI/CD pipelines',
    ],
    whatItDoesNotDo: [
      'Requires infrastructure management, backups, and server maintenance',
      'Less consumer-oriented app ecosystem compared to commercial Slack',
      'Voice and video huddle scalability depends on server bandwidth resources',
    ],
  },
  krita: {
    tagline: 'Professional open-source digital painting, illustration, and 2D concept art studio.',
    whatItDoesBest: [
      '100% free and open-source under GPL with advanced brush engines and color management',
      'Native CMYK and HDR canvas support for professional printing and digital art',
      'Frame-by-frame 2D animation timeline with onion skinning and audio scrub',
    ],
    whatItDoesNotDo: [
      'Not designed for batch vector typography or multi-page layout brochures',
      'Text editing tool is less intuitive than Photoshop or Illustrator',
      'Fewer automated cloud AI generative fill features out of the box',
    ],
  },
};

/**
 * Common Spanish to English pattern dictionary for automatic fallback
 */
const SPANISH_TO_ENGLISH_PATTERNS: [RegExp, string][] = [
  [/^Plan gratuito disponible.*$/i, 'Free tier available (No cost)'],
  [/^Dentro de tu presupuesto.*$/i, 'Within your budget'],
  [/^Aplicación nativa optimizada para (.*)$/i, 'Native app optimized for $1'],
  [/^Cero código requerido.*$/i, 'Zero code required: accessible visual interface'],
  [/^Alta especialización funcional.*$/i, 'High functional specialization for the required deliverable'],
  [/^Requiere suscripción obligatoria.*$/i, 'Requires subscription'],
  [/^Dependencia de conexión a internet.*$/i, 'Requires internet connection (no native offline support)'],
  [/^Curva de aprendizaje pronunciada.*$/i, 'Steep learning curve'],
  [/^Curva de aprendizaje moderada.*$/i, 'Moderate learning curve'],
  [/^Soberanía parcial.*$/i, 'Partial sovereignty: runs on enterprise cloud, not local machine'],
  [/^Más económica.*$/i, 'More affordable alternative'],
  [/^Mayor potencia.*$/i, 'Higher capability and performance'],
  [/^Alternativa equivalente.*$/i, 'Equivalent alternative in this category'],
  [/^No busca en la web.*$/i, 'Does not browse the live web in real time'],
  [/^No genera.*$/i, 'Does not generate automated outputs'],
  [/^No tiene aplicación.*$/i, 'No native desktop application or offline mode'],
  [/^No almacena.*$/i, 'Does not store local offline bibliographies'],
  [/^No redacta.*$/i, 'Does not draft long argumentative prose'],
  [/^No analiza.*$/i, 'Does not analyze private local files'],
  [/^No resume.*$/i, 'Does not summarize contents natively without plugins'],
  [/^Solo funciona de forma nativa en Windows.*$/i, 'Runs natively only on Windows OS'],
  [/^Costo de licencia elevado.*$/i, 'High licensing cost with recurring fees'],
  [/^Curva de aprendizaje empinada.*$/i, 'Steep learning curve required'],
  [/^Requiere suscripción continua.*$/i, 'Requires ongoing user subscription'],
];

export function translateTextToEn(text: string): string {
  if (!text) return text;
  for (const [pattern, replacement] of SPANISH_TO_ENGLISH_PATTERNS) {
    if (pattern.test(text)) {
      return text.replace(pattern, replacement);
    }
  }
  return text;
}

/**
 * Returns a localized version of a Tool according to the selected Language.
 */
export function getLocalizedTool(tool: Tool, lang: Language): Tool {
  if (lang === 'es') return tool;

  const translation = TOOL_TRANSLATIONS_EN[tool.id];
  if (translation) {
    return {
      ...tool,
      tagline: translation.tagline,
      whatItDoesBest: translation.whatItDoesBest,
      whatItDoesNotDo: translation.whatItDoesNotDo,
    };
  }

  // Fallback for tools without explicit manual translation entry
  return {
    ...tool,
    tagline: translateTextToEn(tool.tagline),
    whatItDoesBest: tool.whatItDoesBest.map(translateTextToEn),
    whatItDoesNotDo: tool.whatItDoesNotDo.map(translateTextToEn),
  };
}
