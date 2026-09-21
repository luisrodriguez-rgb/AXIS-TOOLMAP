# AXIS — Capa de Decisión para Flujos de Trabajo y Stacks de Herramientas

> **De directorios genéricos de IA a un motor de decisión multicriterio centrado en personas, entregables y restricciones reales.**

AXIS es una plataforma interactiva y motor de decisión diseñado para resolver el problema fundamental del ecosistema de software actual: la sobrecarga de herramientas y la falta de criterio para ensamblar flujos de trabajo coherentes. En lugar de limitarse a listar "las mejores herramientas de IA", AXIS evalúa de forma cruzada la **profesión**, el **artefacto entregable**, el **presupuesto real ($/mes)**, la **tolerancia de curva de aprendizaje** y la **soberanía de datos** para sintetizar pipelines de trabajo óptimos entre software tradicional y nativo en IA.

---

## 1. Filosofía de Diseño: Human-centered Technical Editorial

El diseño de AXIS rechaza los clichés visuales de las startups de IA (gradientes morados genéricos, tarjetas infladas, tipografías predeterminadas) y adopta una disciplina rigurosa inspirada en:
- **Estilo Tipográfico Suizo (International Typographic Style):** Retículas estructuradas de 1px, orden asimétrico y tipografía como elemento primario de navegación e información.
- **Brutalismo Técnico Contenido:** Estructuras expuestas, índices numéricos de 3 dígitos (`001`, `002`), barras de telemetría y especificaciones de ingeniería.
- **Archivo y Catálogo Digital:** Sensación de instrumento de laboratorio o consola de conmutación técnica.

### Sistema de Tokens y Paleta de Color
- **Modo Claro (Lienzo de Archivo):** Fondo `#F5F3EC`, superficie `#FFFFFF`, tinta profunda `#111111`, líneas nítidas `#D4D1C7` y acento de señal `#FF4B22` (International Orange).
- **Modo Oscuro (Pizarra Obsidiana):** Fondo `#101114`, superficie `#17191E`, tinta nítida `#F3F1EB`, líneas técnicas `#2D3039` y acento `#FF5722`.
- **Tipografías:**
  - `Space Grotesk`: Titulares contundentes y encabezados de rack.
  - `IBM Plex Mono`: Metadatos, barras de ajuste ASCII, índices numéricos y especificaciones de fricción.
  - `Inter`: Lectura fluida en descripciones y evidencias.
- **Disciplina Estricta:** Cero emojis. Iconografía técnica y glifos vectoriales de precisión.

---

## 2. Arquitectura de la Aplicación

```
AXIS / TOOLMAP
├── 01 / DESCUBRIR (Intent Instrument)
│   ├── Entrada de intención en lenguaje natural
│   ├── Matriz Suiza 3-Columnas: [A] Profesión, [B] Enfoque de Trabajo, [C] Entregable
│   └── Barra de Restricciones Técnicas (Presupuesto, SO, Curva, Privacidad)
│
├── 02 / MAPA DE FLUJO (Interactive Workflow Canvas)
│   ├── Tríada de Rutas: [RUTA RECOMENDADA], [STACK $0 OPEN-SOURCE], [PRO STUDIO]
│   ├── Barra de Telemetría BOM: Costo Mensual, Ajuste Global, Curva y Sinergia
│   ├── Rack Modular & Cables SVG: Nodos de herramientas conectadas
│   ├── Previsualizaciones de Artefactos: 3D Surface, Render, Cited Document, Slides
│   ├── Conectores "Data Glue": Formatos intercambiados y advertencias de fricción
│   └── Inspector de Trade-offs y Sustitución (Swap)
│
└── 03 / ARCHIVO (Tools Archive)
    ├── Catálogo técnico completo con logotipos oficiales vectoriales
    ├── Filtros por categoría y modelo de precio
    └── Búsqueda en tiempo real por capacidades y limitaciones
```

---

## 3. Características Principales

### A. Tríada de Rutas de Decisión (Decision Triad)
El motor sintetiza simultáneamente 3 alternativas estratégicas para cada consulta:
1. **[ RUTA RECOMENDADA ]:** Balance óptimo ajustado al presupuesto activo del usuario, maximizando la sinergia del ecosistema.
2. **[ STACK $0 OPEN-SOURCE ]:** Forzado a costo estrictamente **$0/mes**, priorizando herramientas comunitarias, autohospedadas o con planes gratuitos perpetuos (Blender, FreeCAD, GeoGebra, Zotero, Obsidian, Marp).
3. **[ PRO STUDIO ]:** Configuración de máxima potencia para estudios y entornos comerciales (herramientas industriales como Revit, ArchiCAD, Rhino, MATLAB, Tableau, Midjourney Pro, Adobe Creative Cloud).

### B. Conectores "Data Glue" & Análisis de Fricción
A diferencia de los asistentes conversacionales que recomiendan herramientas aisladas, AXIS calcula **cómo se transfieren los datos entre etapas**:
- **Formatos explícitos:** `PDF / Citas Markdown`, `PNG Raster 4K`, `3DM / OBJ Poligonal`, `CSV / Relacional`.
- **Nivel de fricción:** `LOW` (traspaso fluido), `MEDIUM` (requiere exportación manual), `HIGH` (incompatibilidad de vectores/mallas o pérdida de capas).

### C. Previsualizaciones de Artefactos de Salida
Cada etapa del rack integra un componente de previsualización técnica del entregable generado:
- **3D Parametric Surface:** Malla isométrica tridimensional vectorial con curvas de nivel para herramientas de cálculo y CAD (Rhino, GeoGebra, Wolfram).
- **Conceptual Render:** Render esquemático arquitectónico con sello de raytracing y resolución para herramientas generativas (Midjourney, LookX).
- **Cited Document Card:** Documento con extractos y citas bibliográficas cruzadas (NotebookLM, Elicit).
- **Slide Presentation Layout:** Esquema de diapositiva con diagramación asimétrica suiza (Gamma, Pitch).

### D. Logotipos Vectoriales Oficiales & Compatibilidad Safari
- Logotipos extraídos directamente de **svgl.app**, **Simple Icons**, **Wikimedia Commons** y repositorios de marca autorizados.
- **Compatibilidad Safari:** Todos los archivos SVG incorporan explícitamente el espacio de nombres `xmlns="http://www.w3.org/2000/svg"`, evitando los errores de imagen rota `[?]` en navegadores WebKit/Safari.
- **Inversión de Contraste en Dark Mode:** Los logotipos monocromáticos (OpenAI, Notion, Cursor, Zotero, Wolfram, FreeCAD, Marp) invierten su luminancia a blanco puro en modo oscuro, mientras que los logos policromáticos (Figma, Canva, Blender, Rhino, GeoGebra, Scribus) preservan sus colores oficiales.

---

## 4. Estructura del Código

```
src/
├── assets/
│   └── logos/
│       ├── svg/                  # SVGs oficiales sanitizados (xmlns garantizado)
│       └── ToolLogos.tsx         # Componente y diccionario de logotipos vectoriales
├── components/
│   ├── ArtifactPreview.tsx       # Previsualizaciones de artefactos entregables
│   ├── Header.tsx                # Índice superior, temas y selector de idioma
│   ├── IntentInstrument.tsx      # Instrumento de entrada y matriz 3-columnas
│   ├── InteractiveWorkflowCanvas.tsx # Rack modular, cables SVG y Tríada de Rutas
│   ├── ToolArchiveTable.tsx      # Tabla técnica del catálogo de herramientas
│   ├── ToolEditorialCard.tsx     # Tarjetas de herramientas con barras ASCII
│   ├── TradeOffInspector.tsx     # Modal de inspección y sustitución (Swap)
│   └── WorkflowMap.tsx           # Desglose secuencial del flujo de trabajo
├── data/
│   ├── presets.ts                # Perfiles profesionales y casos de uso
│   └── tools.ts                  # Dataset ontológico de herramientas calibradas
├── engine/
│   ├── filter.ts                 # Filtros duros de restricciones (SO, presupuesto, privacidad)
│   ├── scoring.ts                # Puntuación multicriterio (MCDA) y afinidad de tarea
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

# 4. Validar tipos y construir bundle de producción
npm run build
```

---

## 6. Scripts de Utilidad

- `scripts/fetch_real_logos.mjs`: Script automatizado para descargar y sanitizar logotipos vectoriales oficiales desde APIs de svgl.app, Simple Icons y Wikimedia Commons, garantizando el atributo `xmlns` para compatibilidad completa en Safari y navegadores basados en WebKit.
