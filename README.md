# AXIS — Capa de Decisión para Flujos de Trabajo y Stacks de Herramientas

> **De directorios genéricos de IA a un motor de decisión multicriterio centrado en personas, entregables y restricciones reales.**

![AXIS Demostración Interactiva](./public/screenshots/demo.webp)

AXIS es una plataforma interactiva y motor de decisión diseñado para resolver el problema fundamental del ecosistema de software contemporáneo: la sobrecarga de herramientas y la ausencia de criterio técnico para ensamblar flujos de trabajo coherentes. En lugar de limitarse a listar "las mejores herramientas de IA", AXIS evalúa de forma cruzada la **profesión del usuario**, el **artefacto entregable**, el **presupuesto real ($/mes)**, la **tolerancia de curva de aprendizaje** y la **soberanía de datos** para sintetizar pipelines de trabajo óptimos entre software comercial consolidado, herramientas de código abierto ($0) y plataformas nativas en IA.

---

## 1. Filosofía de Diseño: Human-centered Technical Editorial

El diseño de AXIS rechaza los clichés visuales de las startups de IA (gradientes morados genéricos, tarjetas infladas, tipografías predeterminadas) y adopta una disciplina rigurosa inspirada en:
- **Estilo Tipográfico Suizo (International Typographic Style):** Retículas estructuradas de 1px, orden asimétrico y tipografía como elemento primario de navegación e información.
- **Brutalismo Técnico Contenido:** Estructuras expuestas, índices numéricos de 3 dígitos (`001`, `002`), barras de telemetría y especificaciones de ingeniería.
- **Archivo y Catálogo Digital:** Sensación de instrumento de laboratorio o consola de conmutación técnica.

![AXIS Instrumento de Entrada y Descubrimiento](./public/screenshots/discover-instrument.png)

### Sistema de Tokens y Paleta de Color
- **Modo Claro (Lienzo de Archivo):** Fondo `#F5F3EC`, superficie `#FFFFFF`, tinta profunda `#111111`, líneas nítidas `#D4D1C7` y acento de señal `#FF4B22` (International Orange).
- **Modo Oscuro (Pizarra Obsidiana):** Fondo `#101114`, superficie `#17191E`, tinta nítida `#F3F1EB`, líneas técnicas `#2D3039` y acento `#FF5722`.
- **Tipografías:**
  - `Space Grotesk`: Titulares contundentes y encabezados de rack modular.
  - `IBM Plex Mono`: Metadatos, barras de ajuste ASCII, índices numéricos y especificaciones de fricción.
  - `Inter`: Lectura fluida en descripciones, capacidades y evidencias.
- **Disciplina Estricta:** Cero emojis. Iconografía técnica y glifos vectoriales de precisión.

---

## 2. Jerarquía de Navegación y Arquitectura del Sistema

La interfaz de AXIS se estructura en tres niveles operacionales desacoplados:

```
AXIS / TOOLMAP
├── 01 / DESCUBRIR (Intent Instrument)
│   ├── Entrada de intención en lenguaje natural con presets instantáneos
│   ├── Matriz Suiza 3-Columnas: [A] Profesión (8 arquetipos), [B] Enfoque de Trabajo, [C] Entregable
│   ├── Barra de Restricciones Técnicas: Presupuesto ($0 a $300+/mes), SO, Curva de aprendizaje y Privacidad
│   └── Botón de transición directa al Canvas: [ MAPEAR MI TRABAJO → ]
│
├── 02 / MAPA DE FLUJO (Interactive Workflow Canvas)
│   ├── Tríada de Rutas: [RUTA RECOMENDADA], [STACK $0 OPEN-SOURCE], [PRO STUDIO]
│   ├── Barra de Telemetría BOM: Costo Mensual ($/mo), Ajuste Global (%), Curva de Aprendizaje y Sinergia
│   ├── Rack Modular & Conexiones SVG: Nodos de herramientas activas por etapa
│   ├── Previsualizaciones de Artefactos: 3D Surface, Render Esquemático, Cited Document, Slide Layout
│   ├── Conectores "Data Glue": Formatos intercambiados y advertencias de fricción
│   └── Inspector de Trade-offs y Sustitución Técnica (Swap)
│
└── 03 / ARCHIVO (Tools Archive)
    ├── Catálogo técnico de 90 herramientas calibradas (gratuitas y comerciales de alta gama)
    ├── Logotipos vectoriales oficiales sanitizados con soporte multiplataforma y Safari
    ├── Filtros por categoría, modelo de licenciamiento y compatibilidad de SO
    └── Búsqueda en tiempo real por capacidades, limitaciones y qué NO hace la herramienta
```

---

## 3. Características Principales

### A. Catálogo Expandido de 90 Herramientas Reales
El catálogo incluye 90 soluciones tecnológicas calibradas con precios de mercado verificados (desde $0 hasta $450/mes):
- **Arquitectura, BIM & AEC:** Autodesk Revit ($355/mo), Autodesk AutoCAD ($250/mo), Autodesk Civil 3D ($325/mo), Graphisoft ArchiCAD ($290/mo), Vectorworks Architect ($153/mo), Procore Construction ($375/mo), OpenSpace AI ($190/mo), Chief Architect Premier ($199/mo), Rhino 3D, SketchUp Pro, Blender, FreeCAD.
- **Ingeniería, Simulación & Electrónica:** Dassault Systèmes CATIA ($450/mo), PTC Creo Parametric ($230/mo), Autodesk Inventor ($290/mo), MathWorks MATLAB & Simulink ($250/mo), COMSOL Multiphysics ($260/mo), Ansys Mechanical & CFD ($300/mo), Altium Designer ($325/mo), KiCad EDA ($0), OpenFOAM ($0), GNU Octave ($0).
- **Datos, ML & Business Intelligence:** Snowflake ($120/mo), Databricks ($150/mo), Alteryx Designer ($350/mo), Microsoft Power BI Pro ($10/mo), Tableau Creator ($75/mo), dbt Core/Cloud ($50/mo), Apache Superset ($0), Metabase ($0 / $85/mo), Posit/RStudio ($0 / $25/mo), Julius AI ($20/mo), Google Looker Studio ($0).
- **Desarrollo, DevOps & Infraestructura:** JetBrains IntelliJ IDEA Ultimate ($29/mo), Postman ($14/mo), Docker Desktop ($5/mo), Supabase ($25/mo), Vercel ($20/mo), Linear ($10/mo), Sentry ($29/mo), Visual Studio Code ($0), Cursor Pro ($20/mo), GitHub Copilot ($10/mo), v0 by Vercel.
- **Diseño, 3D & Creatividad:** Adobe Premiere Pro ($38/mo), Adobe After Effects ($38/mo), DaVinci Resolve Studio ($0 / $25/mo), Maxon Cinema 4D ($99/mo), Spline 3D ($9/mo), Chaos Enscape ($49/mo), Twinmotion ($0 / $37/mo), D5 Render ($0 / $38/mo), Midjourney Pro ($30/mo), Runway Gen-3 ($12/mo), Krea AI ($10/mo), LookX AI ($20/mo), Vizcom ($15/mo).
- **Investigación & Documentos:** Zotero ($0), Overleaf Pro ($21/mo), Mendeley ($0), Connected Papers ($5/mo), Rayyan AI ($30/mo), ATLAS.ti ($45/mo), Elicit Plus ($10/mo), Perplexity Pro ($20/mo), NotebookLM ($0), Consensus AI ($20/mo).

![AXIS Matriz de Archivo de 90 Herramientas](./public/screenshots/archive-90-tools.png)

### B. Tríada de Rutas de Decisión (Decision Triad)
El motor sintetiza simultáneamente 3 alternativas estratégicas para cada consulta:
1. **[ RUTA RECOMENDADA ]:** Balance óptimo ajustado al presupuesto activo del usuario, maximizando la sinergia del ecosistema.
2. **[ STACK $0 OPEN-SOURCE ]:** Forzado a costo estrictamente **$0/mes**, priorizando herramientas comunitarias, autohospedadas o con planes gratuitos perpetuos (Blender, FreeCAD, GeoGebra, Zotero, Obsidian, Marp, KiCad, OpenFOAM).
3. **[ PRO STUDIO ]:** Configuración de máxima potencia para estudios y entornos comerciales (herramientas industriales de alto calibre como Revit, Civil 3D, CATIA, MATLAB, Tableau, Premiere Pro, Ansys).

![AXIS Canvas con Ruta Pro Studio y Telemetría BOM](./public/screenshots/workflow-pro-studio.png)

### C. Conectores "Data Glue" & Análisis de Fricción
A diferencia de los asistentes conversacionales que recomiendan herramientas aisladas, AXIS calcula **cómo se transfieren los datos entre etapas**:
- **Formatos explícitos:** `PDF / Citas Markdown`, `PNG Raster 4K`, `3DM / OBJ Poligonal`, `CSV / Relacional`, `STEP / IFC BIM`.
- **Nivel de fricción:** `LOW` (traspaso nativo fluido), `MEDIUM` (requiere exportación/conversión manual), `HIGH` (incompatibilidad de vectores/mallas o pérdida de capas).

### D. Modal de Inspección de Trade-offs y Sustitución (Swap)
Permite inspeccionar en detalle el desglose de ajuste funcional, curva de aprendizaje y costo de cada herramienta, permitiendo sustituir cualquier nodo del stack en tiempo real con recálculo automático de la telemetría BOM.

![AXIS Inspector de Trade-offs y Sustitución](./public/screenshots/tradeoff-inspector.png)

### E. Logotipos Vectoriales Oficiales & Compatibilidad Safari
- Logotipos extraídos directamente de **svgl.app**, **Simple Icons**, **Wikimedia Commons** y repositorios oficiales de marca.
- **Compatibilidad Safari:** Todos los archivos SVG incorporan explícitamente el espacio de nombres `xmlns="http://www.w3.org/2000/svg"`, evitando los errores de imagen rota `[?]` en navegadores WebKit/Safari.
- **Inversión de Contraste en Dark Mode:** Los logotipos monocromáticos (OpenAI, Notion, Cursor, Zotero, Wolfram, FreeCAD, Marp, Docker, Vercel) invierten su luminancia a blanco puro en modo oscuro, mientras que los logos policromáticos (Figma, Canva, Blender, Rhino, GeoGebra, Scribus) preservan sus colores oficiales.

---

## 4. Estructura del Código

```
src/
├── assets/
│   └── logos/
│       ├── svg/                  # 37+ SVGs oficiales sanitizados (xmlns garantizado)
│       └── ToolLogos.tsx         # Componente y diccionario de mapeo de logotipos
├── components/
│   ├── ArtifactPreview.tsx       # Previsualizaciones de artefactos entregables (3D, Render, Citas)
│   ├── Header.tsx                # Índice superior, temas (Dark/Light) y selector de idioma (ES/EN)
│   ├── IntentInstrument.tsx      # Instrumento de entrada y matriz 3-columnas (8 profesiones)
│   ├── InteractiveWorkflowCanvas.tsx # Rack modular, cables SVG y Tríada de Rutas
│   ├── ToolArchiveTable.tsx      # Tabla técnica del catálogo denso (90 herramientas)
│   ├── ToolEditorialCard.tsx     # Tarjetas de herramientas con barras ASCII
│   ├── TradeOffInspector.tsx     # Modal de inspección y sustitución (Swap)
│   └── WorkflowMap.tsx           # Desglose secuencial del flujo de trabajo
├── data/
│   ├── presets.ts                # 8 perfiles profesionales y casos de uso calibrados
│   └── tools.ts                  # Dataset ontológico de 90 herramientas con precios reales
├── engine/
│   ├── filter.ts                 # Filtros duros de restricciones (SO, presupuesto, privacidad)
│   ├── scoring.ts                # Puntuación multicriterio (MCDA) y afinidad de dominio profesional
│   ├── pipelineSynthesizer.ts    # Ensamblado del stack paso a paso
│   ├── routeSynthesizer.ts       # Síntesis de la Tríada de Rutas y Data Glue
│   └── tradeoffs.ts              # Detección de compromisos y alternativas de swap
├── i18n/
│   └── translations.ts           # Diccionario completo Español / Inglés
└── styles/
    ├── base.css                  # Variables CSS, reset y tipografía
    ├── components.css            # Estilos del instrumento, header y archivo
    ├── tokens.css                # Tokens de espaciado y colores
    └── visual-canvas.css         # Estilos del rack interactivo y previsualizaciones
```

---

## 5. Instalación y Ejecución Local

### Prerrequisitos
- Node.js 18+
- npm o pnpm

### Comandos

```bash
# 1. Clonar el repositorio y navegar a la carpeta
cd AXIS

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo en localhost:5173
npm run dev

# 4. Validar tipos de TypeScript y construir bundle de producción
npm run build
```

---

## 6. Scripts de Utilidad

- `scripts/fetch_more_logos.mjs`: Script automatizado para descargar y sanitizar logotipos vectoriales oficiales desde Simple Icons y fuentes de marca, asegurando el atributo `xmlns="http://www.w3.org/2000/svg"` para garantizar la visualización nítida y sin fallos en Safari y WebKit.
