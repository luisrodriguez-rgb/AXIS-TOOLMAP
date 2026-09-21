<div align="center">

[![AXIS — Capa de Decisión para Flujos de Trabajo y Stacks de Herramientas](public/brand/axis-logo.png)](https://github.com/luisrodriguez-rgb/AXIS-TOOLMAP)

### `001 / 002 / 003 · DECISION LAYER`
**De directorios genéricos de IA a un motor de decisión multicriterio (MCDA) centrado en personas, entregables, soberanía de datos y restricciones operativas reales.**

[![GitHub stars](https://img.shields.io/github/stars/luisrodriguez-rgb/AXIS-TOOLMAP?style=flat-square&color=FF4B22)](https://github.com/luisrodriguez-rgb/AXIS-TOOLMAP)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg?style=flat-square)](https://vitejs.dev/)
[![FOSS Intelligence](https://img.shields.io/badge/FOSS-Intelligence_Enabled-2ea44f.svg?style=flat-square)](#7-modulo-de-inteligencia-open-source-foss-y-alternativas-a-software-privativo)

</div>

# AXIS — A Decision Layer for How You Work (Work Stack Decision Engine)

> **De directorios genéricos de software a una capa de decisión arquitectónica: evaluamos personas, tareas, restricciones operativas y soberanía de datos para sintetizar pipelines de herramientas viables con trazabilidad de trade-offs.**

![AXIS Demostración Interactiva](./public/screenshots/demo.webp)

AXIS es una plataforma técnica y motor de decisión diseñado para resolver el problema estructural del ecosistema de software contemporáneo: la saturación de herramientas, la fatiga de suscripciones SaaS y la ausencia de criterio técnico para articular flujos de trabajo coherentes.

En lugar de limitarse a listar herramientas aisladas, AXIS opera bajo una arquitectura de decisión rigurosa:
$$\text{CONTEXTO} \longrightarrow \text{OBJETIVO} \longrightarrow \text{ENTREGABLE} \longrightarrow \text{RESTRICCIONES DURAS} \longrightarrow \text{PIPELINE} \longrightarrow \text{TRADE-OFFS}$$

---

## 1. El Problema que Resuelve AXIS

### El Fallo de los Directorios Tradicionales

Los directorios de software e IA convencionales (estilo "Top 100 Tools") fallan por tres razones fundamentales:

1. **Descontextualización Total:** Presentan listas alfabéticas o por popularidad sin entender si el usuario es un arquitecto que necesita emitir planos IFC acotados o un estudiante de ingeniería que necesita un modelo de optimización sin programar.
2. **Aislamiento de Etapas:** Sugieren aplicaciones sueltas sin considerar la interoperabilidad formativa ni la pérdida de fidelidad en la transferencia de datos.
3. **Ceguera Financiera y Operativa:** Ignoran las restricciones duras de presupuesto, curvas de aprendizaje prohibitivas y requisitos de privacidad local o soberanía de datos.

| Dimensión de Análisis | Directorios Tradicionales | AXIS (Work Stack Decision Engine) |
| :--- | :--- | :--- |
| **Unidad de Decisión** | Herramienta individual aislada | Flujo de trabajo secuencial (Pipeline de 3-4 etapas interoperables) |
| **Criterio de Orden** | Popularidad, patrocinio o votos | Filtro estricto de **Hard Constraints** + Heurística MCDA interna |
| **Restricciones Duras** | Filtros básicos de categoría | **Hard Constraints** excluyentes (Presupuesto, SO, Privacidad local) |
| **Interoperabilidad** | Inexistente (el usuario adivina formatos) | **Data Glue**: Matriz de fricción y nivel de fidelidad (*Fidelity Loss*) |
| **Explicación** | Puntuación decimal opaca | Razonamiento explícito: *Why this fits*, *What you give up*, *Trade-offs* |
| **Sustitución** | Comparativa estática A vs B | **Trade-off Inspector**: Recálculo reactivo del impacto en todo el stack |

---

## 2. Filosofía de Diseño: Human-Centered Technical Editorial

El diseño de AXIS rechaza deliberadamente las convenciones estéticas infladas de las startups de IA (gradientes morados genéricos, bordes redondeados excesivos, tipografías predeterminadas) y adopta una disciplina rigurosa inspirada en:

- **Estilo Tipográfico Suizo (International Typographic Style):** Retículas estructuradas de 1px, orden asimétrico y la tipografía como elemento primario de jerarquía e información.
- **Brutalismo Técnico Contenido:** Estructuras expuestas, índices numéricos de 3 dígitos (`[001]`, `[002]`), barras de telemetría y especificaciones de ingeniería.
- **Sensación de Instrumento de Precisión:** Interfaz calibrada que evoca consolas de conmutación técnica, racks de laboratorio y matrices de decisión.
- **Regla Estricta:** Cero emojis. Iconografía técnica y glifos vectoriales de precisión.

![AXIS Instrumento de Entrada y Descubrimiento](./public/screenshots/discover-instrument.png)

### Sistema de Tokens y Paleta de Color

- **Modo Claro (Lienzo de Archivo):**
  - Fondo: `#F5F3EC`
  - Superficie: `#FFFFFF`
  - Tinta profunda: `#111111`
  - Tinta secundaria: `#444444`
  - Líneas nítidas: `#D4D1C7`
  - Acento de señal: `#FF4B22` (International Orange)
- **Modo Oscuro (Pizarra Obsidiana):**
  - Fondo: `#101114`
  - Superficie: `#17191E`
  - Tinta nítida: `#F3F1EB`
  - Líneas técnicas: `#2D3039`
  - Acento de señal: `#FF5722`
- **Tipografías:**
  - `Space Grotesk`: Titulares contundentes y encabezados de rack modular.
  - `IBM Plex Mono`: Metadatos, barras de telemetría ASCII, índices numéricos y especificaciones de fricción.
  - `Inter`: Lectura fluida en descripciones, capacidades y evidencias.

---

## 3. Arquitectura del Sistema y Módulos de la Interfaz

La plataforma opera en cuatro niveles funcionales interconectados de forma reactiva:

```
AXIS / DECISION ENGINE
├── 01 / DESCUBRIR (Intent Instrument & Control Matrix)
│   ├── Natural Intent Intake Bar: Entrada libre en lenguaje natural (Layer B → Layer A)
│   ├── Chips de Escenarios Empíricos: 6 casos de prueba de referencia
│   ├── Extracción de Tokens en Tiempo Real (SO, Presupuesto, Entregable, Privacidad, Curva)
│   ├── Matriz Suiza de Control (32 x 32 x 32):
│   │   ├── [A] PROFESIÓN: 32 carreras en 8 macro-dominios con filtros rápidos
│   │   ├── [B] ENFOQUE DE TRABAJO: Smart Scoping adaptado al perfil activo
│   │   └── [C] ARTEFACTO ENTREGABLE: 32 tipos de entregables técnicos normalizados
│   └── Barra de Restricciones Técnicas: Presupuesto ($0 a $300+/mes), SO, Curva y Privacidad
│
├── 02 / MAPA DE FLUJO (Interactive Workflow Canvas)
│   ├── Tríada de Rutas Estratégicas Neutrales:
│   │   ├── [RUTA BALANCEADA / BALANCED ROUTE] (Óptimo compromiso de capacidades y costo)
│   │   ├── [RUTA $0 FOSS SOBERANA / $0 FOSS SOVEREIGN ROUTE] (Soberanía local y formatos abiertos)
│   │   └── [RUTA PRO MÁXIMA CAPACIDAD / PRO MAX CAPABILITY ROUTE] (Potencia sin restricción de gasto)
│   ├── Barra de Telemetría BOM con Vocabulario Adaptativo por Dominio
│   ├── Grafo Secuencial de Nodos: Racks por etapa con logos SVG sanitizados
│   ├── Conectores "Data Glue": Matriz de Fricción (AUTOMATIC/ONE CLICK/MANUAL) y Fidelidad (FULL/PARTIAL/LOSSY)
│   └── Trade-off Inspector: Recálculo reactivo del delta de costo, soberanía y fricción al sustituir piezas
│
├── 03 / ARCHIVO (Tools Archive & Evidence Matrix)
│   ├── Catálogo técnico de 95+ herramientas indexadas y calibradas ($0 a $450/mes)
│   ├── Ontología de Evidencia: Verificación de precios, modelos de licenciamiento y nivel de confianza
│   ├── Logotipos vectoriales oficiales sanitizados con namespace xmlns (WebKit/Safari)
│   ├── Filtro de Código Abierto (FOSS) y modal de Condiciones de Sustitución Comercial vs Libre
│   └── Búsqueda en tiempo real por capacidades, limitaciones y lo que NO hace la herramienta
│
└── 04 / DECISION QUALITY LAB (Auditoría Empírica de 5 Dimensiones)
    ├── Batería de 6 casos empíricos de prueba en dos capas (Layer B Humano / Layer A Sintético)
    ├── Auditoría automatizada de 5 dimensiones:
    │   ├── 1. Constraint Compliance (Presupuesto duro, SO, Privacidad local)
    │   ├── 2. Task / Output Fit (Capacidad real de emisión del entregable)
    │   ├── 3. Workflow Coherence (Alimentación secuencial entre etapas)
    │   ├── 4. Data Glue & Fidelity Loss (Pérdida de metadatos o retrabajo)
    │   └── 5. Human Adoption Audit (Reducción de incertidumbre)
    └── Aplicación directa de cualquier caso de prueba al Canvas principal con un clic
```

---

## 4. Innovaciones Clave

### A. Separación Estricta: Hard Constraints vs. Soft Preferences

Para evitar que una herramienta con alta afinidad técnica sea recomendada cuando viola una restricción innegociable, AXIS separa formalmente:

* **Hard Constraints (Filtro Excluyente):**
  * Si falla el sistema operativo, el presupuesto absoluto o la privacidad local requerida, la herramienta queda **estrictamente fuera** del conjunto de candidatos elegibles.
* **Soft Preferences (Ordenador Heurístico Interno):**
  * Tolerancia de curva de aprendizaje, preferencia por código abierto, colaboración interactiva o herramientas nativas en IA modulan los pesos del motor MCDA.
  * La puntuación matemática permanece como una capa interna del motor; la interfaz prioriza el **razonamiento cualitativo**: *Why this fits*, *What you give up* y *What changes if you swap it*.

### B. Data Glue: Fricción y Pérdida de Fidelidad (*Fidelity Loss*)

AXIS modela el contrato de transferencia entre herramientas adyacentes no solo por el formato de archivo, sino por el nivel de fricción y la integridad del dato:

* **Estados de Fricción:**
  * `[AUTOMATIC]`: Sincronización nativa directa sin intervención manual.
  * `[ONE CLICK]`: Exportación e importación directa en formatos abiertos estándar (IFC, SVG, CSV).
  * `[MANUAL]`: Requiere conversión de formato, limpieza de datos o script intermedio.
  * `[UNSUPPORTED]`: Incompatibilidad de flujo; riesgo de retrabajo severo.
* **Nivel de Fidelidad de Datos:**
  * `FIDELITY: FULL`: Conservación íntegra de esquemas, fórmulas o entidades paramétricas.
  * `FIDELITY: PARTIAL`: Pérdida de metadatos o propiedades paramétricas (ej. BIM $\rightarrow$ OBJ pierde entidades paramétricas IFC).
  * `FIDELITY: LOSSY`: Rasterización o pérdida irreversible de escalabilidad o precisión analítica.

---

## 5. Catálogo de 32 Profesiones Indexadas

AXIS agrupa sus 32 arquetipos profesionales calibrados en 8 macro-dominios:

| Macro-Dominio | Código | Profesión Calibrada | Enfoque Típico | Entregable Primario |
| :--- | :--- | :--- | :--- | :--- |
| **AEC & Arquitectura** | `[001]` | Arquitecto Residencial & Urbanista | Modelado 3D, Planimetría, Renders | Planos DWG/PDF, Renders, BIM |
| | `[002]` | Ingeniero Civil / Estructural | Análisis FEM, Planimetría, Esfuerzos | Memoria de Cálculo, Planos |
| | `[003]` | Gerente de Construcción & Obra | Coordinación BIM, Mediciones, RFIs | Cronograma Gantt, Cómputos BOM |
| | `[004]` | Especialista GIS & Topografía | Nubes LiDAR, Modelos DEM, Rasters | Mapa GIS, Trazado Topográfico |
| **Ingeniería & Hard-Tech** | `[005]` | Ingeniero Mecánico & Automotriz | CAD Paramétrico, FEA, CFD | Planos GD&T, Simulación CFD |
| | `[006]` | Ingeniero Electrónico & Hardware | Esquemáticos, Ruteo PCB, DRC | Gerber PCB, Esquemático |
| | `[007]` | Ingeniero Industrial & Operaciones | Optimización, Líneas, Logística | Dashboards BI, Modelo Financiero |
| | `[008]` | Ingeniero Químico & Procesos | Termodinámica, PFD, Balances | Simulación CFD, Memoria Técnica |
| | `[009]` | Ingeniero Biomédico & Bioingeniería | Biomecánica, Señales Fisiológicas | Memoria de Cálculo, Protocolo |
| | `[010]` | Ingeniero Ambiental & Sostenibilidad | Huella de Carbono, Matriz ESG | Estudio de Impacto EIA, Dashboard |
| **Software & Cloud** | `[011]` | Ingeniero de Software / Fullstack | APIs, Microservicios, Frontend | Código Fuente, OpenAPI Spec |
| | `[012]` | Ingeniero DevOps & Cloud Infrastructure | CI/CD, Contenedores, Terraform | Manifiestos K8s, Arquitectura C4 |
| | `[013]` | Analista de Ciberseguridad & DevSecOps | SAST/DAST, OWASP, Pentesting | Auditoría de Seguridad, Reporte |
| **Datos & Cuantitativa** | `[014]` | Científico de Datos / Machine Learning | Pipelines ETL, Modelos ML, Clustering | Cuaderno Jupyter, Dashboard BI |
| | `[015]` | Analista Financiero & Finanzas Quant | Valoración DCF, Monte Carlo, Flujos | Modelo Financiero Excel, Dashboard |
| | `[016]` | Matemático Aplicado & Modelador | Sistemas Dinámicos, Álgebra, MILP | Visualización 3D, Código |
| | `[017]` | Economista & Analista Econométrico | Datos de Panel, Series de Tiempo | Cuaderno Quarto, Informe Macro |
| **Diseño & Creatividad** | `[018]` | Diseñador UI/UX & Producto Digital | Design Systems, Prototipado, UXR | Prototipo Figma, Journey Map |
| | `[019]` | Diseñador Gráfico & Marca | Branding, Tipografía, Packaging | Manual de Marca, Lámina |
| | `[020]` | Diseñador Industrial & Producto Físico | Bocetado, NURBS, CMF, STEP | Render Fotorrealista, Malla 3D |
| | `[021]` | Animador 3D & Motion Designer | Motion Graphics, Cinemáticas 3D | Animación Lottie/MP4, Master |
| | `[022]` | Editor de Video & Colorista | Montaje Rítmico, LUTs, Mezcla Audio | Video Master Editado, Subtítulos |
| **Investigación & Salud** | `[023]` | Investigador Académico & Científico | IMRaD, Citas DOIs, Bibliografía | Manuscrito LaTeX, Matriz BibTeX |
| | `[024]` | Médico & Investigador Clínico | Ensayos RCT, CONSORT, Bioética | Protocolo Clínico, Metaanálisis |
| | `[025]` | Biólogo & Bioinformático | Secuenciación NGS, Docking Molecular | Cuaderno Reproducible, Malla 3D |
| | `[026]` | Redactor Técnico & Documentalista | Docs-as-Code, Markdown, Manuales | Documentación OpenAPI, Manual |
| | `[027]` | Docente Universitario & Pedagogo | Diseño Curricular, Rúbricas, Clases | Lámina de Clase, Guía de Estudio |
| **Negocios & Legal** | `[028]` | Fundador & Product Manager | PRDs, OKRs, Pitch Decks, Backlog | Documento PRD, Pitch Deck |
| | `[029]` | Consultor de Estrategia de Negocios | Diagnóstico FODA, Porter, M&A | Informe Estratégico, Lámina |
| | `[030]` | Estratega de Growth Marketing | Embudo de Conversión, CAC/LTV | Dashboard Analítico, Presentación |
| | `[031]` | Abogado & Compliance Legal Tech | Contratos B2B, GDPR, IA Act, SLAs | Dictamen Legal, Matriz Normativa |
| **Educación STEM** | `[032]` | Estudiante Universitario STEM | Cálculo, Física, Modelos Simbólicos | Informe de Laboratorio, Gráficos |

---

## 6. Motor de Puntuación Multicriterio (MCDA Engine)

El motor evalúa a cada candidata en 4 vectores heurísticos independientes:

$$\text{Score} = w_1 \cdot \text{TaskFit} + w_2 \cdot \text{FrictionFactor} + w_3 \cdot \text{ConstraintCompliance} + w_4 \cdot \text{EcosystemSynergy}$$

1. **Ajuste de Tarea (`TaskFit` - 35%):** Evalúa capacidades intrínsecas para resolver el artefacto requerido (`cad3DModeling`, `symbolicMath`, `vectorExport`, `citationsEnabled`, etc.).
2. **Factor de Menor Fricción (`FrictionFactor` - 25%):** Mide la accesibilidad de la curva de aprendizaje en contraste con el nivel técnico del usuario.
3. **Cumplimiento de Restricciones (`ConstraintCompliance` - 25%):** Validación de presupuesto mensual y compatibilidad de SO.
4. **Sinergia del Ecosistema (`EcosystemSynergy` - 15%):** Bonifica combinaciones con integraciones directas probadas.

---

## 7. Catálogo Ontológico de 95+ Herramientas Indexadas

AXIS indexa 95+ herramientas con ontología de evidencia empírica:

| Campo de Evidencia | Descripción | Ejemplo |
| :--- | :--- | :--- |
| `pricingVerifiedAt` | Fecha de verificación de precios oficiales | `2026-09` |
| `pricingModel` | Modelo contractual | `free`, `subscription`, `usage-based` |
| `platformsSupported` | Plataformas auditadas | `['mac', 'windows', 'linux', 'web']` |
| `dataSovereigntyGrade` | Grado de soberanía del dato | `local_first`, `cloud_encrypted` |
| `confidence` | Confianza en la exactitud del dato | `high` (oficial), `medium` (comunidad) |
| `lastReviewed` | Fecha de última auditoría técnica | `2026-09` |

![AXIS Matriz de Archivo de 95+ Herramientas](./public/screenshots/archive-90-tools.png)

### Desglose por Categorías Técnicas

- **Arquitectura, BIM & AEC:** Autodesk Revit ($355/mo), Autodesk AutoCAD ($250/mo), Autodesk Civil 3D ($325/mo), Graphisoft ArchiCAD ($290/mo), Vectorworks Architect ($153/mo), Procore Construction ($375/mo), OpenSpace AI ($190/mo), Chief Architect Premier ($199/mo), Rhino 3D, SketchUp Pro, Blender, FreeCAD.
- **Ingeniería, Simulación & Electrónica:** Dassault Systèmes CATIA ($450/mo), PTC Creo Parametric ($230/mo), Autodesk Inventor ($290/mo), MathWorks MATLAB & Simulink ($250/mo), COMSOL Multiphysics ($260/mo), Ansys Mechanical & CFD ($300/mo), Altium Designer ($325/mo), KiCad EDA ($0), OpenFOAM ($0), GNU Octave ($0).
- **Datos, ML & Business Intelligence:** Snowflake ($120/mo), Databricks ($150/mo), Alteryx Designer ($350/mo), Microsoft Power BI Pro ($10/mo), Tableau Creator ($75/mo), dbt Core/Cloud ($50/mo), Apache Superset ($0), Metabase ($0 / $85/mo), Posit/RStudio ($0 / $25/mo), Julius AI ($20/mo), Google Looker Studio ($0).
- **Desarrollo, DevOps & Cloud:** JetBrains IntelliJ IDEA Ultimate ($29/mo), Postman ($14/mo), Docker Desktop ($5/mo), Supabase ($25/mo), Vercel ($20/mo), Linear ($10/mo), Sentry ($29/mo), Visual Studio Code ($0), Cursor Pro ($20/mo), GitHub Copilot ($10/mo), v0 by Vercel.
- **Diseño, 3D & Creatividad:** Adobe Premiere Pro ($38/mo), Adobe After Effects ($38/mo), DaVinci Resolve Studio ($0 / $25/mo), Maxon Cinema 4D ($99/mo), Spline 3D ($9/mo), Chaos Enscape ($49/mo), Twinmotion ($0 / $37/mo), D5 Render ($0 / $38/mo), Midjourney Pro ($30/mo), Runway Gen-3 ($12/mo), Krea AI ($10/mo), LookX AI ($20/mo), Vizcom ($15/mo).
- **Investigación & Documentos:** Zotero ($0), Overleaf Pro ($21/mo), Mendeley ($0), Connected Papers ($5/mo), Rayyan AI ($30/mo), ATLAS.ti ($45/mo), Elicit Plus ($10/mo), Perplexity Pro ($20/mo), NotebookLM ($0), Consensus AI ($20/mo).

### Sanitización de Logotipos SVG y Compatibilidad Multi-Navegador

- **Soporte WebKit / Safari:** Todos los logotipos vectoriales incorporan obligatoriamente el atributo de espacio de nombres `xmlns="http://www.w3.org/2000/svg"`, eliminando el problema recurrente de imágenes rotas en navegadores Safari en macOS e iOS.
- **Inversión de Luminancia en Modo Oscuro:** Los logotipos monocromáticos (OpenAI, Notion, Cursor, Zotero, Wolfram, FreeCAD, Marp, Docker, Vercel) invierten su color a blanco puro en modo oscuro, mientras que los logotipos cromáticos oficiales (Figma, Canva, Blender, Rhino, GeoGebra, Scribus) conservan sus colores de marca exactos.

---

## 8. Inspector de Trade-offs y Sustitución en Tiempo Real (Swap)

Cuando el usuario desea explorar alternativas en cualquier etapa del flujo:

1. Hace clic en `⇄ SUSTITUIR PIEZA` / `⇄ SWAP TOOL` en el nodo correspondiente del canvas.
2. Se abre el **TradeOffInspector**, que expone:
   - Desglose porcentual y barras de los 4 vectores heurísticos.
   - Puntos fuertes verificados (`[+]`) y límites explícitos (`[!]`) de la herramienta actual.
   - Consecuencias reactivas sobre el pipeline completo:
     * $\Delta \text{ Costo mensual}$
     * $\Delta \text{ Soberanía / Privacidad}$
     * $\Delta \text{ Fricción y Fidelidad de Data Glue}$
     * $\Delta \text{ Curva de adopción del equipo}$
3. Al seleccionar una alternativa, toda la telemetría del stack se recalcula instantáneamente.

![AXIS Inspector de Trade-offs y Sustitución](./public/screenshots/tradeoff-inspector.png)

---

## 9. Inteligencia FOSS y Condiciones de Sustitución (Migration Trade-offs)

AXIS mantiene una postura rigurosamente neutral: no asume que "lo comercial es malo" ni que "lo libre es siempre superior". Reconoce las fortalezas genuinas de cada modelo:

* **Ventajas del Software Comercial:** Soporte corporativo SLA, estándares de facto en la industria, ecosistema pulido y menor curva de onboarding inicial.
* **Ventajas de las Alternativas FOSS:** Soberanía absoluta del dato, cero costos de licencia recurrente, formatos abiertos auditables y capacidad de self-hosting.

| Software Comercial | Alternativa FOSS | Repositorio GitHub | Licencia | Condiciones de Sustitución / Migration Trade-offs |
| :--- | :--- | :--- | :--- | :--- |
| **Figma** ($15–$75/mes) | **Penpot** | `penpot/penpot` | MPL-2.0 | Mantener Figma si el equipo requiere plugins corporativos masivos; migrar a Penpot si se exige autoalojamiento y control de SVG/CSS nativo. |
| **SolidWorks** ($150+/mes) | **FreeCAD** | `FreeCAD/FreeCAD` | LGPL-2.1 | Mantener SolidWorks en líneas de ensamblaje con tolerancias aeroespaciales; migrar a FreeCAD para modelado paramétrico libre sin licencias nodales. |
| **Tableau** ($75/mes) | **Apache Superset** | `apache/superset` | Apache-2.0 | Mantener Tableau para reportes ejecutivos no técnicos; migrar a Superset para consultas SQL directas en bases analíticas a gran escala. |
| **Notion** ($10–$18/mes) | **AppFlowy** | `AppFlowy-IO/AppFlowy` | AGPL-3.0 | Mantener Notion para colaboración en nube pública ligera; migrar a AppFlowy para resguardo local-first de documentos confidenciales. |
| **Slack / Teams** ($8–$15/asiento) | **Mattermost** | `mattermost/mattermost-server` | AGPL-3.0 | Mantener Slack para integraciones SaaS inmediatas; migrar a Mattermost para cumplimiento estricto HIPAA/GDPR en servidores propios. |
| **Adobe Photoshop** ($22.99/mes) | **Krita** | `KDE/krita` | GPL-3.0 | Mantener Photoshop para flujos vinculados a Adobe Creative Cloud; migrar a Krita para ilustración y retoque digital con perfiles CMYK libres de telemetría. |
| **Autodesk Revit** ($355/mes) | **Bonsai (Blender BIM)** | `IfcOpenShell/IfcOpenShell` | LGPL-3.0 | Mantener Revit si el cliente exige archivo propietario `.rvt`; migrar a Bonsai para autoría nativa abierta en estándar internacional IFC. |

---

## 10. Decision Quality Lab: Benchmark de 5 Dimensiones

Para verificar que AXIS no se limite a reproducir sesgos preconfigurados, la plataforma integra un **laboratorio interno de auditoría** con 6 escenarios empíricos evaluados en dos capas:

* **Layer B (Entrada Humana en Lenguaje Natural):** Captura la necesidad tal como la expresa una persona real.
* **Layer A (Especificación Sintética):** Restricciones duras y parámetros de decisión procesados por el motor.

| Caso | Perfil Real | Expresión Humana (Layer B) | Restricción Dura (Layer A) | Dimensión Crítica |
| :--- | :--- | :--- | :--- | :--- |
| **[01]** | **Arquitecto** | *"Planos ejecutivos con modelo IFC para coordinación en macOS con $50/mes"* | Mac, IFC, $\le \$50/\text{mes}$ | Interoperabilidad IFC sin pérdida de datos BIM |
| **[02]** | **Estudiante Ing. Industrial** | *"Dashboard y modelo de optimización en Mac sin programar pesado y $20/mes"* | Mac, Curva Low, $\le \$20/\text{mes}$ | Curva de aprendizaje baja y costo accesible |
| **[03]** | **Investigador Académico** | *"Paper LaTeX con citas rigurosas y datos médicos confidenciales con $0"* | Linux/Mac, $0, Privacidad local | Soberanía total (Zero retention) y bibliografía |
| **[04]** | **Diseñador UI/UX** | *"Design System con tokens y handoff a frontend en Web/Mac"* | Web/Mac, Colaboración | Exportación vectorial limpia sin fricción |
| **[05]** | **Fundador No-Técnico** | *"MVP con landing page, base de datos y correos sin programar con $35/mes"* | Web, No-code, $\le \$35/\text{mes}$ | Velocidad de entrega y costo contenido |
| **[06]** | **Ingeniero Civil** | *"Memoria de cálculo estructural con normas y trazabilidad en Windows"* | Windows, Curva High, $\le \$80/\text{mes}$ | Precisión matemática y tipografía de ecuaciones |

### Las 5 Dimensiones de Calidad Evaluadas:
1. **Constraint Compliance:** 100% de cumplimiento en presupuesto duro, SO y privacidad.
2. **Task / Output Fit:** Verificación empírica de capacidades para generar el artefacto entregable.
3. **Workflow Coherence:** Conexión secuencial lógica entre etapas sin redundancias.
4. **Data Glue & Fidelity:** Auditoría de fricción (`AUTOMATIC`, `ONE CLICK`, `MANUAL`) y pérdida de fidelidad (`FULL`, `PARTIAL`, `LOSSY`).
5. **Human Adoption Audit:** Checklist de reducción de incertidumbre (¿Una persona experta adoptaría este flujo?).

---

## 11. Estructura del Repositorio

```
AXIS/
├── public/
│   ├── brand/                    # Activos oficiales de marca (logo, guías de retícula)
│   ├── favicon.ico               # Favicon multi-resolución para soporte universal
│   ├── favicon.svg               # Favicon con isotipo técnico oficial
│   ├── apple-touch-icon.png      # Icono de alta resolución para dispositivos Apple
│   └── screenshots/              # Capturas y video WebP de demostración
│
├── src/
│   ├── assets/
│   │   └── logos/                # SVGs oficiales sanitizados con namespace xmlns
│   │
│   ├── components/
│   │   ├── ArtifactPreview.tsx   # Previsualizador técnico de artefactos
│   │   ├── AxisBrandLogo.tsx     # Logotipo oficial reactivo SVG (Full, Mark, Horizontal)
│   │   ├── DecisionQualityLab.tsx # Laboratorio de auditoría de 6 casos empíricos
│   │   ├── Header.tsx            # Cabecera con telemetría suiza, atajos [1][2][3] y enlace a GitHub
│   │   ├── HeadToHeadComparison.tsx # Modal de análisis comparativo Comercial vs FOSS
│   │   ├── IntentInstrument.tsx  # Intake bar de lenguaje natural y matriz suiza 3-columnas
│   │   ├── InteractiveWorkflowCanvas.tsx # Canvas interactivo con Tríada de Rutas
│   │   ├── ToolArchiveTable.tsx  # Matriz de archivo con filtro FOSS y disparador comparativo
│   │   └── TradeOffInspector.tsx # Modal de inspección y sustitución reactiva (Swap)
│   │
│   ├── data/
│   │   ├── decisionTestCases.ts  # Batería de 6 casos empíricos (Layer A & Layer B)
│   │   ├── presets.ts            # 32 perfiles profesionales calibrados para Smart Scoping
│   │   └── tools.ts              # Dataset ontológico de 95+ herramientas con metadatos FOSS
│   │
│   ├── engine/
│   │   ├── filter.ts             # Filtrado estricto de restricciones duras (Hard Constraints)
│   │   ├── naturalIntentParser.ts # Parser determinista de lenguaje natural
│   │   ├── pipelineSynthesizer.ts # Ensamblaje secuencial de etapas y trade-offs
│   │   ├── routeSynthesizer.ts   # Síntesis de Tríada de Rutas y Data Glue con fidelidad
│   │   ├── scoring.ts            # Motor MCDA de 4 vectores heurísticos
│   │   └── tradeoffs.ts          # Generador de evidencias y alternativas bilingües
│   │
│   ├── i18n/
│   │   ├── toolLocalization.ts   # Traducción bilingüe completa del dataset de herramientas
│   │   └── translations.ts       # Diccionario integral 100% bilingüe (ES/EN)
│   │
│   ├── styles/
│   │   ├── base.css              # Reset, fuentes Google y variables base
│   │   ├── components.css        # Estilos de la matriz suiza, archivo y modal
│   │   ├── lab.css               # Estilos suizos del Decision Quality Lab
│   │   ├── tokens.css            # Tokens de diseño y variables CSS
│   │   └── visual-canvas.css     # Estilos del rack interactivo y cables Data Glue
│   │
│   ├── types/
│   │   └── index.ts              # Definiciones TypeScript estrictas (Hard/Soft constraints, FOSS)
│   ├── App.tsx                   # Estado raíz, routing reactivo y cálculo de query
│   └── main.tsx                  # Punto de entrada de la aplicación
│
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 11. Guía de Instalación y Ejecución Local

### Prerrequisitos

- Node.js 18.0 o superior
- Gestor de paquetes npm, pnpm o yarn

### Instrucciones

```bash
# 1. Clonar el repositorio
git clone https://github.com/luisrodriguez-rgb/AXIS-TOOLMAP.git
cd AXIS-TOOLMAP

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo en localhost:5173
npm run dev

# 4. Compilar para producción (validación de TypeScript con 0 errores)
npm run build

# 5. Previsualizar bundle de producción localmente
npm run preview
```

---
