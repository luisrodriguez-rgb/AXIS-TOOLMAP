import React, { useState, useMemo } from 'react';
import type { DeliverableType, PersonaProfile, UserConstraints, OperatingSystem, TechnicalLevel } from '../types';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import { parseNaturalIntent } from '../engine/naturalIntentParser';
import { DECISION_TEST_CASES } from '../data/decisionTestCases';

interface IntentInstrumentProps {
  needText: string;
  onNeedTextChange: (text: string) => void;
  selectedDeliverable: DeliverableType;
  onDeliverableChange: (deliverable: DeliverableType) => void;
  activePersona: PersonaProfile;
  onSelectPreset: (preset: PersonaProfile) => void;
  allPresets: PersonaProfile[];
  constraints: UserConstraints;
  onChangeConstraints: (constraints: UserConstraints) => void;
  onMapWork: () => void;
  lang: Language;
}

export const IntentInstrument: React.FC<IntentInstrumentProps> = ({
  needText,
  onNeedTextChange,
  selectedDeliverable,
  onDeliverableChange,
  activePersona,
  onSelectPreset,
  allPresets,
  constraints,
  onChangeConstraints,
  onMapWork,
  lang,
}) => {
  const t = TRANSLATIONS[lang].discover;

  // Estados de búsqueda y filtrado por columna
  const [searchProf, setSearchProf] = useState('');
  const [domainFilter, setDomainFilter] = useState<string>('ALL');
  const [searchWork, setSearchWork] = useState('');
  const [searchOutput, setSearchOutput] = useState('');

  // Smart Scoping: Por defecto mostrar solo las opciones relevantes a la carrera activa
  const [scopeWorkMode, setScopeWorkMode] = useState<'relevant' | 'all'>('relevant');
  const [scopeOutputMode, setScopeOutputMode] = useState<'relevant' | 'all'>('relevant');

  // Parser de lenguaje natural reactivo
  const parsedIntent = useMemo(() => parseNaturalIntent(needText), [needText]);

  const handleApplyScenario = (scenarioText: string) => {
    onNeedTextChange(scenarioText);
    const parsed = parseNaturalIntent(scenarioText);

    if (parsed.detectedDeliverable) {
      onDeliverableChange(parsed.detectedDeliverable);
    }
    if (
      parsed.detectedOS ||
      parsed.detectedBudgetUSD !== undefined ||
      parsed.detectedStrictPrivacy !== undefined ||
      parsed.detectedTechnicalLevel
    ) {
      onChangeConstraints({
        ...constraints,
        ...(parsed.detectedOS ? { os: parsed.detectedOS } : {}),
        ...(parsed.detectedBudgetUSD !== undefined ? { maxMonthlyBudgetUSD: parsed.detectedBudgetUSD } : {}),
        ...(parsed.detectedStrictPrivacy !== undefined ? { strictPrivacy: parsed.detectedStrictPrivacy } : {}),
        ...(parsed.detectedTechnicalLevel ? { maxLearningCurve: parsed.detectedTechnicalLevel } : {}),
      });
    }
    if (parsed.detectedProfessionId) {
      const profId = parsed.detectedProfessionId.toLowerCase();
      const match = allPresets.find(
        (p) =>
          p.id === parsed.detectedProfessionId ||
          p.role.toLowerCase().includes(profId)
      );
      if (match) {
        onSelectPreset(match);
      }
    }
  };

  // 1. Catálogo de 32 Profesiones Calibradas
  const professions = useMemo(() => [
    // AEC & Arquitectura
    { id: 'architect', label: lang === 'es' ? 'Arquitecto Residencial & Urbanista' : 'Residential & Urban Architect', domain: 'AEC', code: '001' },
    { id: 'civil-engineer', label: lang === 'es' ? 'Ingeniero Civil / Estructural' : 'Civil / Structural Engineer', domain: 'AEC', code: '002' },
    { id: 'construction-manager', label: lang === 'es' ? 'Gerente de Construcción & Obra' : 'Construction Manager', domain: 'AEC', code: '003' },
    { id: 'gis-specialist', label: lang === 'es' ? 'Especialista GIS & Topografía' : 'GIS & Topography Specialist', domain: 'AEC', code: '004' },

    // Ingeniería Tradicional & Hard-Tech
    { id: 'mechanical-engineer', label: lang === 'es' ? 'Ingeniero Mecánico & Automotriz' : 'Mechanical & Automotive Engineer', domain: 'ING', code: '005' },
    { id: 'electrical-engineer', label: lang === 'es' ? 'Ingeniero Electrónico & PCB' : 'Electrical & PCB Engineer', domain: 'ING', code: '006' },
    { id: 'industrial-engineer', label: lang === 'es' ? 'Ingeniero Industrial & Operaciones' : 'Industrial & Operations Engineer', domain: 'ING', code: '007' },
    { id: 'chemical-engineer', label: lang === 'es' ? 'Ingeniero Químico & Procesos' : 'Chemical & Process Engineer', domain: 'ING', code: '008' },
    { id: 'biomedical-engineer', label: lang === 'es' ? 'Ingeniero Biomédico' : 'Biomedical Engineer', domain: 'ING', code: '009' },
    { id: 'environmental-engineer', label: lang === 'es' ? 'Ingeniero Ambiental & Sostenibilidad' : 'Environmental & ESG Engineer', domain: 'ING', code: '010' },

    // Software & Cloud
    { id: 'software-engineer', label: lang === 'es' ? 'Ingeniero de Software / Fullstack' : 'Software Engineer / Fullstack', domain: 'TECH', code: '011' },
    { id: 'devops-engineer', label: lang === 'es' ? 'Ingeniero DevOps & Cloud' : 'DevOps & Cloud Engineer', domain: 'TECH', code: '012' },
    { id: 'cybersecurity-analyst', label: lang === 'es' ? 'Analista de Ciberseguridad' : 'Cybersecurity Analyst', domain: 'TECH', code: '013' },

    // Datos & Analítica
    { id: 'data-scientist', label: lang === 'es' ? 'Científico de Datos / ML' : 'Data Scientist / Machine Learning', domain: 'DATA', code: '014' },
    { id: 'financial-analyst', label: lang === 'es' ? 'Analista Financiero & Cuantitativo' : 'Financial Analyst & Quant', domain: 'DATA', code: '015' },
    { id: 'applied-mathematician', label: lang === 'es' ? 'Matemático Aplicado & Modelador' : 'Applied Mathematician', domain: 'DATA', code: '016' },
    { id: 'econometrician', label: lang === 'es' ? 'Economista & Econometría' : 'Economist & Econometrician', domain: 'DATA', code: '017' },

    // Diseño & Creatividad
    { id: 'ux-designer', label: lang === 'es' ? 'Diseñador UI/UX & Producto' : 'UI/UX & Product Designer', domain: 'DESIGN', code: '018' },
    { id: 'graphic-designer', label: lang === 'es' ? 'Diseñador Gráfico & Marca' : 'Graphic & Brand Designer', domain: 'DESIGN', code: '019' },
    { id: 'industrial-designer', label: lang === 'es' ? 'Diseñador Industrial & CMF' : 'Industrial Designer', domain: 'DESIGN', code: '020' },
    { id: 'motion-designer', label: lang === 'es' ? 'Animador 3D & Motion' : '3D & Motion Designer', domain: 'DESIGN', code: '021' },
    { id: 'video-editor', label: lang === 'es' ? 'Editor de Video & Colorista' : 'Video Editor & Colorist', domain: 'DESIGN', code: '022' },

    // Investigación, Salud & Academia
    { id: 'academic-researcher', label: lang === 'es' ? 'Investigador Académico & Científico' : 'Academic Researcher', domain: 'SCIENCE', code: '023' },
    { id: 'clinical-researcher', label: lang === 'es' ? 'Médico / Investigador Clínico' : 'Clinical Researcher', domain: 'SCIENCE', code: '024' },
    { id: 'bioinformatician', label: lang === 'es' ? 'Biólogo & Bioinformático' : 'Bioinformatician', domain: 'SCIENCE', code: '025' },
    { id: 'technical-writer', label: lang === 'es' ? 'Redactor Técnico & Documentalista' : 'Technical Writer', domain: 'SCIENCE', code: '026' },
    { id: 'educator', label: lang === 'es' ? 'Docente Universitario' : 'University Educator', domain: 'SCIENCE', code: '027' },

    // Negocios, Producto & Legal
    { id: 'founder-pm', label: lang === 'es' ? 'Fundador & Product Manager' : 'Founder & Product Manager', domain: 'BIZ', code: '028' },
    { id: 'business-consultant', label: lang === 'es' ? 'Consultor de Estrategia' : 'Strategy Consultant', domain: 'BIZ', code: '029' },
    { id: 'growth-marketer', label: lang === 'es' ? 'Estratega de Growth Marketing' : 'Growth Marketing Strategist', domain: 'BIZ', code: '030' },
    { id: 'legal-tech-lawyer', label: lang === 'es' ? 'Abogado & Legal Tech' : 'Legal Tech Lawyer', domain: 'BIZ', code: '031' },

    // Estudiante STEM
    { id: 'student', label: lang === 'es' ? 'Estudiante Universitario STEM' : 'STEM University Student', domain: 'ING', code: '032' },
  ], [lang]);

  // 2. Catálogo de 32 Enfoques de Trabajo
  const workTypes = useMemo(() => [
    { code: '001', label: lang === 'es' ? 'Síntesis Documental' : 'Document Synthesis', text: lang === 'es' ? 'Extracción de citas y síntesis de literatura científica.' : 'Citation extraction and scientific literature synthesis.' },
    { code: '002', label: lang === 'es' ? 'Modelado Paramétrico 3D' : '3D Parametric CAD', text: lang === 'es' ? 'Geometrías tridimensionales complejas y superficies NURBS.' : 'Complex 3D geometry and NURBS surfaces.' },
    { code: '003', label: lang === 'es' ? 'Planimetría Técnica 2D' : '2D Technical Drafting', text: lang === 'es' ? 'Planos acotados, plantas constructivas, secciones y alzados.' : 'Dimensioned floorplans, sections, elevations.' },
    { code: '004', label: lang === 'es' ? 'Render Fotorrealista' : 'Photoreal Rendering', text: lang === 'es' ? 'Iluminación física, texturas PBR, rebotes de luz y atmósfera.' : 'Physical lighting, PBR materials, ray-tracing.' },
    { code: '005', label: lang === 'es' ? 'Simulación FEM Estructural' : 'Structural FEM Analysis', text: lang === 'es' ? 'Cálculo de esfuerzos mecánicos, deformaciones y tensiones.' : 'Stress and deflection finite element analysis.' },
    { code: '006', label: lang === 'es' ? 'Dinámica de Fluidos CFD' : 'CFD Fluid Dynamics', text: lang === 'es' ? 'Simulación de flujo aerodinámico, turbulencia y calor.' : 'Fluid flow, turbulence, and heat simulation.' },
    { code: '007', label: lang === 'es' ? 'Diseño de PCB & Circuitos' : 'PCB Schematic & Routing', text: lang === 'es' ? 'Captura esquemática, ruteo multicapa y reglas DRC.' : 'Schematic capture, multi-layer routing, DRC.' },
    { code: '008', label: lang === 'es' ? 'Arquitectura Backend & APIs' : 'Backend & API Architecture', text: lang === 'es' ? 'Microservicios, contratos OpenAPI y esquemas relacionales.' : 'Microservices, OpenAPI specs, SQL schemas.' },
    { code: '009', label: lang === 'es' ? 'Desarrollo Frontend & UI' : 'Frontend UI Prototyping', text: lang === 'es' ? 'Componentes interactivos, TypeScript, animaciones y WebGL.' : 'Interactive components, TypeScript, WebGL.' },
    { code: '010', label: lang === 'es' ? 'Auditoría & Refactorización' : 'Code Audit & Refactoring', text: lang === 'es' ? 'Análisis estático de código, linters y cobertura de pruebas.' : 'Static analysis, linters, test coverage.' },
    { code: '011', label: lang === 'es' ? 'Limpieza & ETL de Datos' : 'Data Cleaning & ETL', text: lang === 'es' ? 'Transformación de datos crudos, dbt y pipelines SQL.' : 'Raw data transformation and SQL pipelines.' },
    { code: '012', label: lang === 'es' ? 'Entrenamiento de Modelos ML' : 'ML Model Training', text: lang === 'es' ? 'Ajuste fino de modelos predictivos y métricas de evaluación.' : 'Model fine-tuning and evaluation metrics.' },
    { code: '013', label: lang === 'es' ? 'Visualización Estadística' : 'Statistical Visualization', text: lang === 'es' ? 'Gráficos de dispersión, boxplots y curvas de distribución.' : 'Scatter plots, boxplots, distributions.' },
    { code: '014', label: lang === 'es' ? 'Dashboards en Tiempo Real' : 'Real-time Dashboards', text: lang === 'es' ? 'Tableros ejecutivos con KPIs interactivos y filtros.' : 'Executive scorecards and interactive KPIs.' },
    { code: '015', label: lang === 'es' ? 'Modelado Financiero & DCF' : 'Financial Modeling & DCF', text: lang === 'es' ? 'Proyecciones de flujo de caja y análisis de sensibilidad.' : 'Cash flow projections and sensitivity models.' },
    { code: '016', label: lang === 'es' ? 'Design Systems & Tokens' : 'Design Systems & Tokens', text: lang === 'es' ? 'Jerarquía tipográfica, variables de color y componentes UI.' : 'Typography tokens, colors, UI components.' },
    { code: '017', label: lang === 'es' ? 'Animación Motion Graphics' : 'Motion Graphics Animation', text: lang === 'es' ? 'Curvas de velocidad, keyframes dinámicos y render Lottie.' : 'Speed curves, keyframes, Lottie renders.' },
    { code: '018', label: lang === 'es' ? 'Edición de Video en Línea de Tiempo' : 'Timeline Video Editing', text: lang === 'es' ? 'Corte rítmico, soporte multicámara y mezcla de audio.' : 'Rhythmic cutting, multicam, stereo mix.' },
    { code: '019', label: lang === 'es' ? 'Colorimetría & Etalonaje' : 'Color Grading & LUTs', text: lang === 'es' ? 'Nodos de color, curvas logarítmicas y master de video.' : 'Color nodes, log curves, master deliverable.' },
    { code: '020', label: lang === 'es' ? 'Redacción de Paper / Tesis' : 'Paper & Thesis Writing', text: lang === 'es' ? 'Estructura científica IMRaD y gestión de citas BibTeX.' : 'IMRaD scientific structure, BibTeX citations.' },
    { code: '021', label: lang === 'es' ? 'Revisión Sistemática' : 'Systematic Literature Review', text: lang === 'es' ? 'Cribado ciego de resúmenes y diagrama de flujo PRISMA.' : 'Blind abstract screening, PRISMA flow.' },
    { code: '022', label: lang === 'es' ? 'Patentes & Propiedad Intelectual' : 'Patent & IP Drafting', text: lang === 'es' ? 'Reivindicaciones de patente y búsqueda de arte previo.' : 'Patent claims drafting, prior-art search.' },
    { code: '023', label: lang === 'es' ? 'Pliegos de Licitación & Costos' : 'Tender Specs & Costing', text: lang === 'es' ? 'Especificaciones técnicas, mediciones de obra y BOM.' : 'Technical specs, work measurements, BOM.' },
    { code: '024', label: lang === 'es' ? 'Gestión de Backlog & Sprints' : 'Sprint Planning & Backlog', text: lang === 'es' ? 'Historias de usuario, criterios de aceptación y epics.' : 'User stories, acceptance criteria, epics.' },
    { code: '025', label: lang === 'es' ? 'Investigación de Usuarios (UXR)' : 'User Research & Interviews', text: lang === 'es' ? 'Transcripciones, codificación temática cualitativa.' : 'Transcripts, qualitative thematic coding.' },
    { code: '026', label: lang === 'es' ? 'Auditoría de Ciberseguridad' : 'Security Audit & Pentest', text: lang === 'es' ? 'Detección de vulnerabilidades y puntuación de vector CVSS.' : 'Vulnerability scanning, CVSS scoring.' },
    { code: '027', label: lang === 'es' ? 'Orquestación CI/CD & Nube' : 'CI/CD & Cloud Orchestration', text: lang === 'es' ? 'Manifiestos Docker, Terraform y despliegues sin downtime.' : 'Docker manifests, Terraform, deployment.' },
    { code: '028', label: lang === 'es' ? 'Análisis Espacial & GIS' : 'Spatial & GIS Analysis', text: lang === 'es' ? 'Capas vectoriales, modelos DEM y rásters territoriales.' : 'Vector layers, DEM, territorial rasters.' },
    { code: '029', label: lang === 'es' ? 'Pitch Deck para Directorio' : 'Boardroom Pitch Deck', text: lang === 'es' ? 'Narrativa ejecutiva, tracción de mercado y proyecciones.' : 'Executive narrative, traction, projections.' },
    { code: '030', label: lang === 'es' ? 'Documentación de APIs' : 'API Documentation', text: lang === 'es' ? 'Especificación OpenAPI, llamadas curl interactivas y SDKs.' : 'Swagger specs, curl code examples, SDKs.' },
    { code: '031', label: lang === 'es' ? 'Automatización sin Código' : 'No-Code Workflow Automation', text: lang === 'es' ? 'Conexión de webhooks, sincronización y triggers.' : 'Webhooks, multi-tool sync, triggers.' },
    { code: '032', label: lang === 'es' ? 'Modelado Matemático Simbólico' : 'Symbolic Math Modeling', text: lang === 'es' ? 'Ecuaciones analíticas, álgebra lineal y cálculo.' : 'Analytical equations, matrices, calculus.' },
  ], [lang]);

  // 3. Catálogo de 32 Artefactos Entregables
  const outputTypes: { id: DeliverableType; label: string; code: string }[] = useMemo(() => [
    { id: 'presentation', label: lang === 'es' ? 'Lámina Ejecutiva / Pitch Deck' : 'Executive Pitch Deck', code: '001' },
    { id: 'report', label: lang === 'es' ? 'Informe Técnico / Memoria Descriptiva' : 'Technical Report / Paper', code: '002' },
    { id: 'cad_plan', label: lang === 'es' ? 'Planos Constructivos Acotados (DWG/PDF)' : 'Dimensioned CAD Plans (DWG/PDF)', code: '003' },
    { id: 'render', label: lang === 'es' ? 'Render Arquitectónico Fotorrealista' : 'Photoreal Architectural Render', code: '004' },
    { id: 'bim_model', label: lang === 'es' ? 'Modelo 3D BIM Paramétrico (IFC/Revit)' : 'Parametric 3D BIM Model (IFC)', code: '005' },
    { id: 'visualization', label: lang === 'es' ? 'Malla Isométrica 3D & NURBS' : '3D Isometric Mesh & NURBS', code: '006' },
    { id: 'structural_calc', label: lang === 'es' ? 'Memoria de Cálculo Estructural' : 'Structural Calculation Sheet', code: '007' },
    { id: 'cfd_simulation', label: lang === 'es' ? 'Estudio de Flujo Fluidodinámico CFD' : 'CFD Fluid Flow Study', code: '008' },
    { id: 'pcb_schematic', label: lang === 'es' ? 'Diagrama Esquemático & Gerber PCB' : 'PCB Schematic & Gerber Files', code: '009' },
    { id: 'code', label: lang === 'es' ? 'Repositorio de Software & Componentes' : 'Software Codebase & Components', code: '010' },
    { id: 'interactive_prototype', label: lang === 'es' ? 'Prototipo Interactivo Figma / WebGL' : 'Interactive Prototype (Figma/WebGL)', code: '011' },
    { id: 'dashboard', label: lang === 'es' ? 'Dashboard Interactivo de BI' : 'Interactive BI Dashboard', code: '012' },
    { id: 'computational_notebook', label: lang === 'es' ? 'Cuaderno Reproducible (Jupyter/Quarto)' : 'Reproducible Notebook (Jupyter/Quarto)', code: '013' },
    { id: 'financial_model', label: lang === 'es' ? 'Modelo Financiero Proyectado (Excel)' : 'Projected Financial Model (Excel)', code: '014' },
    { id: 'design_system', label: lang === 'es' ? 'Sistema de Diseño (Design System)' : 'Design System & UI Tokens', code: '015' },
    { id: 'video_master', label: lang === 'es' ? 'Video Master Editado & Color' : 'Edited Master Video & Color', code: '016' },
    { id: 'motion_graphics', label: lang === 'es' ? 'Animación Motion Graphics (Lottie/MP4)' : 'Motion Graphics Animation', code: '017' },
    { id: 'latex_manuscript', label: lang === 'es' ? 'Manuscrito Académico LaTeX (IEEE)' : 'Academic LaTeX Manuscript (IEEE)', code: '018' },
    { id: 'bib_matrix', label: lang === 'es' ? 'Matriz Bibliográfica con DOIs' : 'Bibliographic Matrix with DOIs', code: '019' },
    { id: 'api_spec', label: lang === 'es' ? 'Especificación OpenAPI / Swagger' : 'OpenAPI / Swagger API Spec', code: '020' },
    { id: 'journey_map', label: lang === 'es' ? 'Customer Journey & Mapa de Empatía' : 'Customer Journey & Empathy Map', code: '021' },
    { id: 'prd_spec', label: lang === 'es' ? 'Documento PRD de Requerimientos' : 'Product Requirements Doc (PRD)', code: '022' },
    { id: 'security_audit', label: lang === 'es' ? 'Informe de Auditoría de Seguridad' : 'Security Vulnerability Audit', code: '023' },
    { id: 'docker_infra', label: lang === 'es' ? 'Manifiestos de Infraestructura (K8s)' : 'Infrastructure Manifests (Docker/K8s)', code: '024' },
    { id: 'environmental_study', label: lang === 'es' ? 'Estudio de Impacto Ambiental (EIA)' : 'Environmental Impact Study (EIS)', code: '025' },
    { id: 'construction_schedule', label: lang === 'es' ? 'Cronograma de Obra (Gantt/WBS)' : 'Construction Schedule (Gantt)', code: '026' },
    { id: 'bom_estimate', label: lang === 'es' ? 'Cómputos Métricos & Presupuesto (BOM)' : 'Bill of Materials & Cost Estimate', code: '027' },
    { id: 'gis_map', label: lang === 'es' ? 'Mapa Temático Geoespacial (GIS)' : 'Geospatial Thematic Map (GIS)', code: '028' },
    { id: 'brand_guidelines', label: lang === 'es' ? 'Manual de Identidad de Marca' : 'Brand Guidelines & Identity Manual', code: '029' },
    { id: 'clinical_protocol', label: lang === 'es' ? 'Protocolo de Ensayo Clínico' : 'Clinical Trial Protocol Sheet', code: '030' },
    { id: 'c4_architecture', label: lang === 'es' ? 'Diagrama de Arquitectura C4' : 'C4 System Architecture Diagram', code: '031' },
    { id: 'concept', label: lang === 'es' ? 'Mapa Conceptual & Nodos' : 'Concept & Node Diagram', code: '032' },
  ], [lang]);

  // Filtros dinámicos con Smart Scoping
  const filteredProfessions = useMemo(() => {
    return professions.filter((p) => {
      const matchDomain = domainFilter === 'ALL' || p.domain === domainFilter;
      const matchText = searchProf === '' || p.label.toLowerCase().includes(searchProf.toLowerCase());
      return matchDomain && matchText;
    });
  }, [professions, domainFilter, searchProf]);

  const filteredWorkTypes = useMemo(() => {
    return workTypes.filter((w) => {
      const matchScope =
        scopeWorkMode === 'all' ||
        !activePersona.relevantWorkCodes ||
        activePersona.relevantWorkCodes.length === 0 ||
        activePersona.relevantWorkCodes.includes(w.code);

      const matchSearch =
        searchWork === '' ||
        w.label.toLowerCase().includes(searchWork.toLowerCase()) ||
        w.text.toLowerCase().includes(searchWork.toLowerCase());

      return matchScope && matchSearch;
    });
  }, [workTypes, searchWork, scopeWorkMode, activePersona.relevantWorkCodes]);

  const filteredOutputTypes = useMemo(() => {
    return outputTypes.filter((o) => {
      const matchScope =
        scopeOutputMode === 'all' ||
        !activePersona.relevantDeliverableCodes ||
        activePersona.relevantDeliverableCodes.length === 0 ||
        activePersona.relevantDeliverableCodes.includes(o.code);

      const matchSearch =
        searchOutput === '' || o.label.toLowerCase().includes(searchOutput.toLowerCase());

      return matchScope && matchSearch;
    });
  }, [outputTypes, searchOutput, scopeOutputMode, activePersona.relevantDeliverableCodes]);

  const domainPills = [
    { id: 'ALL', label: lang === 'es' ? 'TODAS (32)' : 'ALL (32)' },
    { id: 'AEC', label: 'AEC' },
    { id: 'ING', label: lang === 'es' ? 'INGENIERÍA' : 'ENG' },
    { id: 'TECH', label: 'DEV / TECH' },
    { id: 'DATA', label: lang === 'es' ? 'DATOS' : 'DATA' },
    { id: 'DESIGN', label: lang === 'es' ? 'DISEÑO' : 'DESIGN' },
    { id: 'SCIENCE', label: lang === 'es' ? 'CIENCIA' : 'SCIENCE' },
    { id: 'BIZ', label: lang === 'es' ? 'NEGOCIOS' : 'BIZ' },
  ];

  return (
    <div className="discover-instrument">
      {/* Top Input Header */}
      <div className="instrument-top-row">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
          <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--signal)' }}>
            {t.sectionTag}
          </span>
          <span className="mono-text" style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
            {t.sectionSub}
          </span>
        </div>

        <h1 className="instrument-headline">
          {t.headline}
        </h1>
        <p className="instrument-sub">
          {t.sub}
        </p>

        {/* Natural Intent Intake Bar (Layer B -> Layer A) */}
        <div className="natural-intent-container">
          <div className="scenario-chips-row">
            <span className="chips-label">
              {lang === 'es' ? 'ESCENARIOS REALES DE PRUEBA:' : 'REAL TEST SCENARIOS:'}
            </span>
            <div className="chips-list">
              {DECISION_TEST_CASES.map((tc) => (
                <button
                  key={tc.id}
                  type="button"
                  className="scenario-chip-btn"
                  onClick={() => handleApplyScenario(tc.layerB_humanScenario)}
                  title={tc.title}
                >
                  <span className="chip-num">[{tc.caseNumber}]</span>
                  <span>{tc.title.split(' — ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="instrument-input-wrapper">
            <textarea
              className="instrument-textarea"
              value={needText}
              onChange={(e) => onNeedTextChange(e.target.value)}
              placeholder={t.placeholder}
              rows={3}
            />
          </div>

          {/* Real-time Extracted Tokens Bar con Procedencia */}
          <div className="extracted-tokens-bar">
            <div className="tokens-left">
              <span className="tokens-label">
                {lang === 'es' ? 'INTENCIÓN DETECTADA:' : 'PARSED INTENT:'}
              </span>
              {parsedIntent.extractedKeywords.length > 0 ? (
                <>
                  {parsedIntent.extractedKeywords.map((kw, i) => (
                    <span key={i} className="intent-token-pill">
                      {kw}
                    </span>
                  ))}
                  {/* Chips de Procedencia de Variables */}
                  {parsedIntent.provenance.deliverable.provenance !== 'unknown' && (
                    <span className={`intent-provenance-pill ${parsedIntent.provenance.deliverable.provenance}`}>
                      ENTREGABLE: {parsedIntent.provenance.deliverable.value} [{parsedIntent.provenance.deliverable.provenance.toUpperCase()}]
                    </span>
                  )}
                  {parsedIntent.provenance.os.provenance !== 'unknown' && (
                    <span className={`intent-provenance-pill ${parsedIntent.provenance.os.provenance}`}>
                      SO: {parsedIntent.provenance.os.value} [{parsedIntent.provenance.os.provenance.toUpperCase()}]
                    </span>
                  )}
                  {parsedIntent.provenance.budget.provenance !== 'unknown' && (
                    <span className={`intent-provenance-pill ${parsedIntent.provenance.budget.provenance}`}>
                      PRESUPUESTO: ${parsedIntent.provenance.budget.value}/mes [{parsedIntent.provenance.budget.provenance.toUpperCase()}]
                    </span>
                  )}
                </>
              ) : (
                <span className="intent-token-empty">
                  {lang === 'es' ? 'Describe tu entregable o restricciones...' : 'Describe your deliverable or constraints...'}
                </span>
              )}
            </div>
            <span className={`confidence-badge ${parsedIntent.confidence}`}>
              {lang === 'es' ? 'CONFIANZA: ' : 'CONFIDENCE: '}
              {parsedIntent.confidence.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Control Matrix Divider */}
        <div className="matrix-divider-bar">
          <span className="divider-label">
            {lang === 'es'
              ? 'MATRIZ DE CALIBRACIÓN Y CONTROL (3 COLUMNAS DE PRECISIÓN)'
              : 'CALIBRATION & CONTROL MATRIX (3 PRECISION COLUMNS)'}
          </span>
          <span className="divider-sub">
            {lang === 'es'
              ? 'Ajusta manualmente o verifica los parámetros seleccionados'
              : 'Manually adjust or verify selected parameters'}
          </span>
        </div>
      </div>

      {/* 3-Column Context Grid (Swiss Matrix) */}
      <div className="matrix-grid">
        {/* Column 1: Profession */}
        <div className="matrix-col">
          <div className="matrix-col-header">
            <span>{t.colProfession}</span>
            <span style={{ color: 'var(--signal)' }}>{activePersona.label}</span>
          </div>

          <div className="matrix-toolbar">
            <input
              type="text"
              className="matrix-search-input"
              placeholder={t.filterCareers}
              value={searchProf}
              onChange={(e) => setSearchProf(e.target.value)}
            />
            <div className="matrix-filter-pills">
              {domainPills.map((pill) => (
                <button
                  key={pill.id}
                  className={`matrix-filter-pill ${domainFilter === pill.id ? 'active' : ''}`}
                  onClick={() => setDomainFilter(pill.id)}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          <div className="matrix-options-list">
            {filteredProfessions.map((prof) => {
              const isMatch =
                activePersona.id === prof.id ||
                activePersona.role.toLowerCase().includes(prof.label.toLowerCase()) ||
                activePersona.label.toLowerCase().includes(prof.label.toLowerCase());
              return (
                <button
                  key={prof.id}
                  className={`matrix-btn ${isMatch ? 'active' : ''}`}
                  onClick={() => {
                    const preset =
                      allPresets.find((p) => p.id === prof.id) ||
                      allPresets.find((p) =>
                        p.label.toLowerCase().includes(prof.label.toLowerCase()) ||
                        p.role.toLowerCase().includes(prof.label.toLowerCase())
                      ) ||
                      allPresets[0];
                    onSelectPreset(preset);
                    if (preset.sampleNeeds && preset.sampleNeeds.length > 0) {
                      onDeliverableChange(preset.sampleNeeds[0].deliverable);
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="matrix-btn-code">[{prof.code}]</span>
                    <span>{prof.label}</span>
                  </div>
                  <span className="matrix-btn-check">{isMatch ? t.activeStatus : '○'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Column 2: Work Mode with Smart Scoping */}
        <div className="matrix-col">
          <div className="matrix-col-header">
            <span>{t.colWork}</span>
            <span>{t.colWorkSub}</span>
          </div>

          <div className="matrix-toolbar">
            <input
              type="text"
              className="matrix-search-input"
              placeholder={t.filterTasks}
              value={searchWork}
              onChange={(e) => setSearchWork(e.target.value)}
            />
            <div className="matrix-filter-pills" style={{ marginTop: '4px' }}>
              <button
                className={`matrix-filter-pill ${scopeWorkMode === 'relevant' ? 'active' : ''}`}
                onClick={() => setScopeWorkMode('relevant')}
              >
                {t.relevantPill}
              </button>
              <button
                className={`matrix-filter-pill ${scopeWorkMode === 'all' ? 'active' : ''}`}
                onClick={() => setScopeWorkMode('all')}
              >
                {t.allPill}
              </button>
            </div>
            <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)', marginTop: '4px' }}>
              {filteredWorkTypes.length} {t.actionsAvailable} {scopeWorkMode === 'relevant' ? `· ${t.smartScopeActive}` : ''}
            </div>
          </div>

          <div className="matrix-options-list">
            {filteredWorkTypes.map((work) => (
              <button
                key={work.code}
                className="matrix-btn"
                onClick={() => {
                  onNeedTextChange(`${needText.trim()} ${work.label}: ${work.text}`);
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>
                    <span className="matrix-btn-code">[{work.code}]</span>
                    <span style={{ fontWeight: 600 }}>{work.label}</span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginTop: '2px' }}>
                    {work.text}
                  </span>
                </div>
                <span className="matrix-btn-check" style={{ marginLeft: '8px' }}>{t.addBtn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Column 3: Output Artifact with Smart Scoping */}
        <div className="matrix-col">
          <div className="matrix-col-header">
            <span>{t.colOutput}</span>
            <span style={{ color: 'var(--signal)' }}>{selectedDeliverable.toUpperCase()}</span>
          </div>

          <div className="matrix-toolbar">
            <input
              type="text"
              className="matrix-search-input"
              placeholder={t.filterDeliverables}
              value={searchOutput}
              onChange={(e) => setSearchOutput(e.target.value)}
            />
            <div className="matrix-filter-pills" style={{ marginTop: '4px' }}>
              <button
                className={`matrix-filter-pill ${scopeOutputMode === 'relevant' ? 'active' : ''}`}
                onClick={() => setScopeOutputMode('relevant')}
              >
                {t.relevantPill}
              </button>
              <button
                className={`matrix-filter-pill ${scopeOutputMode === 'all' ? 'active' : ''}`}
                onClick={() => setScopeOutputMode('all')}
              >
                {t.allPill}
              </button>
            </div>
            <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)', marginTop: '4px' }}>
              {filteredOutputTypes.length} {t.artifactsAvailable} {scopeOutputMode === 'relevant' ? `· ${t.smartScopeActive}` : ''}
            </div>
          </div>

          <div className="matrix-options-list">
            {filteredOutputTypes.map((out) => {
              const isSelected = out.id === selectedDeliverable;
              return (
                <button
                  key={out.code}
                  className={`matrix-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => onDeliverableChange(out.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="matrix-btn-code">[{out.code}]</span>
                    <span>{out.label}</span>
                  </div>
                  <span className="matrix-btn-check">{isSelected ? t.selectedStatus : '○'}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Constraints Bar */}
      <div className="constraints-bar-editorial">
        <div className="constraint-cell">
          <div className="constraint-label">
            <span>{t.budgetLabel}</span>
            <span className="constraint-value">
              {constraints.maxMonthlyBudgetUSD === 0
                ? t.freeBadge
                : `$${constraints.maxMonthlyBudgetUSD} USD/MO`}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="300"
            step="10"
            value={constraints.maxMonthlyBudgetUSD}
            onChange={(e) => onChangeConstraints({ ...constraints, maxMonthlyBudgetUSD: Number(e.target.value) })}
            className="slider-technical"
          />
        </div>

        <div className="constraint-cell">
          <div className="constraint-label">
            <span>{t.platformLabel}</span>
            <span className="constraint-value">{constraints.os.toUpperCase()}</span>
          </div>
          <select
            className="select-technical"
            value={constraints.os}
            onChange={(e) => onChangeConstraints({ ...constraints, os: e.target.value as OperatingSystem | 'any' })}
          >
            <option value="mac">macOS</option>
            <option value="windows">Windows</option>
            <option value="linux">Linux</option>
            <option value="any">Any / Web</option>
          </select>
        </div>

        <div className="constraint-cell">
          <div className="constraint-label">
            <span>{t.curveLabel}</span>
            <span className="constraint-value">{constraints.maxLearningCurve.toUpperCase()}</span>
          </div>
          <select
            className="select-technical"
            value={constraints.maxLearningCurve}
            onChange={(e) => onChangeConstraints({ ...constraints, maxLearningCurve: e.target.value as TechnicalLevel })}
          >
            <option value="none">{t.curveZero}</option>
            <option value="low">{t.curveLow}</option>
            <option value="medium">{t.curveMed}</option>
            <option value="high">{t.curveHigh}</option>
          </select>
        </div>

        <div className="constraint-cell">
          <div className="constraint-label">
            <span>{t.privacyLabel}</span>
            <span className="constraint-value">
              {constraints.strictPrivacy ? t.privacyStrict.toUpperCase() : t.privacyStandard.toUpperCase()}
            </span>
          </div>
          <select
            className="select-technical"
            value={constraints.strictPrivacy ? 'strict' : 'standard'}
            onChange={(e) => onChangeConstraints({ ...constraints, strictPrivacy: e.target.value === 'strict' })}
          >
            <option value="standard">{t.privacyStandard}</option>
            <option value="strict">{t.privacyStrict}</option>
          </select>
        </div>
      </div>

      {/* Bottom Bar with Archetypes and Action */}
      <div className="instrument-bottom-bar">
        <div className="sample-queries-tagline" style={{ overflowX: 'auto', paddingBottom: '4px' }}>
          <span style={{ fontWeight: 700, color: 'var(--ink)', flexShrink: 0 }}>{t.archetypes}</span>
          {allPresets.slice(0, 10).map((preset) => (
            <button
              key={preset.id}
              className={`sample-tag-btn ${activePersona.id === preset.id ? 'active' : ''}`}
              onClick={() => {
                onSelectPreset(preset);
                if (preset.sampleNeeds && preset.sampleNeeds.length > 0) {
                  onDeliverableChange(preset.sampleNeeds[0].deliverable);
                }
              }}
              style={{ flexShrink: 0 }}
            >
              {preset.label}
            </button>
          ))}
          {allPresets.length > 10 && (
            <span style={{ fontSize: '0.7rem', color: 'var(--ink-muted)', alignSelf: 'center', flexShrink: 0 }}>
              +{allPresets.length - 10} {lang === 'es' ? 'más en Columna [A]' : 'more in Column [A]'}
            </span>
          )}
        </div>

        <button className="btn-map-work" onClick={onMapWork}>
          <span>{t.mapWorkBtn}</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
