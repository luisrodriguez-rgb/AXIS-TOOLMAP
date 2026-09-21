import type { PersonaProfile } from '../types';

export const PERSONA_PRESETS: PersonaProfile[] = [
  {
    id: 'architect',
    label: 'Arquitecto / Proyectista',
    role: 'Arquitecto',
    domain: 'Arquitectura, BIM & Construcción',
    technicalLevel: 'medium',
    os: ['mac', 'windows'],
    activeTools: ['archicad', 'rhino', 'figma'],
    avatarIcon: 'Compass',
    description:
      'Desarrolla proyectos arquitectónicos y ejecutivos. Maneja modelos BIM, planos, geometrías complejas y renders fotorrealistas con presupuestos profesionales.',
    sampleNeeds: [
      {
        label: 'Propuesta Conceptual y Renders de Fachada',
        query:
          'Tengo bocetos a mano y planos en PDF de una casa campestre. Necesito generar renders conceptuales de fachada y montar una presentación ejecutiva para convencer al cliente.',
        deliverable: 'presentation',
        budget: 60,
      },
      {
        label: 'Investigación de Normativa y Memoria Descriptiva',
        query:
          'Tengo 8 documentos PDF del plan de ordenamiento territorial municipal y necesito redactar la memoria descriptiva citando exactamente los artículos de norma aplicables.',
        deliverable: 'report',
        budget: 20,
      },
    ],
  },
  {
    id: 'civil-engineer',
    label: 'Ingeniero Civil / Estructural',
    role: 'Ingeniero',
    domain: 'Ingeniería Estructural & Cálculo',
    technicalLevel: 'high',
    os: ['windows', 'mac'],
    activeTools: ['autocad', 'excel', 'matlab'],
    avatarIcon: 'Cpu',
    description:
      'Diseña y calcula estructuras de hormigón y acero. Requiere modelado CAD preciso, análisis de elementos finitos y memorias de cálculo auditables.',
    sampleNeeds: [
      {
        label: 'Cálculo Estructural y Visualización de Esfuerzos',
        query:
          'Necesito calcular y simular diagramas de momento flector y deformación en vigas continuas de acero con gráficos 3D precisos y memoria técnica.',
        deliverable: 'visualization',
        budget: 150,
      },
      {
        label: 'Planos de Encofrado y Cuantía de Armaduras',
        query:
          'Generar planos técnicos 2D detallados con cotas y planillas de despiece de armaduras a partir de un modelo geométrico.',
        deliverable: 'render',
        budget: 100,
      },
    ],
  },
  {
    id: 'software-engineer',
    label: 'Ingeniero de Software / Dev',
    role: 'Ingeniero de Software',
    domain: 'Desarrollo de Software & Arquitectura Cloud',
    technicalLevel: 'high',
    os: ['mac', 'linux'],
    activeTools: ['cursor', 'vs-code', 'docker'],
    avatarIcon: 'Code',
    description:
      'Construye sistemas backend, frontend y APIs. Necesita agentes de código inteligentes, testing automatizado y arquitectura de datos escalable.',
    sampleNeeds: [
      {
        label: 'Prototipo Rápido Full-Stack con Base de Datos',
        query:
          'Quiero construir un prototipo funcional de una app web con autenticación, base de datos relacional Postgres y UI interactiva en menos de 48 horas.',
        deliverable: 'code',
        budget: 40,
      },
      {
        label: 'Diagrama de Arquitectura y Especificación de API',
        query:
          'Diseñar un diagrama de arquitectura de microservicios con especificación OpenAPI y documentación técnica para el equipo.',
        deliverable: 'concept',
        budget: 20,
      },
    ],
  },
  {
    id: 'student',
    label: 'Estudiante Universitario',
    role: 'Estudiante',
    domain: 'Ingeniería / Ciencias / Métodos Cuantitativos',
    technicalLevel: 'low',
    os: ['mac', 'windows'],
    activeTools: ['notion', 'excel'],
    avatarIcon: 'GraduationCap',
    description:
      'Cursa materias cuantitativas complejas. Tiene presupuesto limitado ($0 - $15 USD/mes) y necesita visualizar conceptos matemáticos y analizar datos sin fricción.',
    sampleNeeds: [
      {
        label: 'Cálculo Multivariable y Visualización',
        query:
          'Estoy estudiando cálculo y necesito comprender integrales dobles y triples visualmente, con gráficos 3D paso a paso y fuentes de mis apuntes.',
        deliverable: 'visualization',
        budget: 0,
      },
      {
        label: 'Análisis de Encuesta de Producción',
        query:
          'Tengo un archivo Excel con 450 respuestas de tiempos de ciclo y quiero encontrar patrones de cuello de botella y generar gráficos para mi informe.',
        deliverable: 'dashboard',
        budget: 15,
      },
    ],
  },
  {
    id: 'founder-pm',
    label: 'Fundador / Product Manager',
    role: 'Fundador / PM',
    domain: 'Estrategia, Producto & Startups',
    technicalLevel: 'medium',
    os: ['mac', 'windows'],
    activeTools: ['notion', 'linear', 'slack'],
    avatarIcon: 'Briefcase',
    description:
      'Lidera el ciclo de vida del producto. Sintetiza feedback de usuarios, define OKRs, analiza cohortes de retención y presenta a comités o inversores.',
    sampleNeeds: [
      {
        label: 'Síntesis de Feedback & Pitch Deck',
        query:
          'Tengo 200 transcripciones de entrevistas con usuarios en texto. Necesito clusterizar las principales fricciones, priorizar soluciones y armar una presentación para el comité directivo.',
        deliverable: 'presentation',
        budget: 50,
      },
      {
        label: 'Dashboard de Cohortes y Churn',
        query:
          'Quiero analizar cohortes de usuarios y métricas de churn desde un archivo CSV y generar un reporte ejecutivo con recomendaciones estratégicas.',
        deliverable: 'dashboard',
        budget: 30,
      },
    ],
  },
  {
    id: 'ux-designer',
    label: 'Diseñador UX / Visual',
    role: 'Diseñador',
    domain: 'Diseño de Producto, Interfaces & Branding',
    technicalLevel: 'medium',
    os: ['mac'],
    activeTools: ['figma', 'canva', 'midjourney'],
    avatarIcon: 'Palette',
    description:
      'Diseña experiencias digitales, sistemas de diseño (Design Systems), prototipos interactivos y activos visuales de alto impacto estético.',
    sampleNeeds: [
      {
        label: 'Sistema de Diseño y Prototipo Interactivo',
        query:
          'Necesito crear un Design System con tokens de diseño, componentes reutilizables y un prototipo navegable de alta fidelidad para testear con usuarios.',
        deliverable: 'code',
        budget: 45,
      },
      {
        label: 'Identidad Visual y Render de Moodboard',
        query:
          'Crear una identidad visual completa con paleta de color, tipografía suiza y renders conceptuales generativos para una marca de tecnología.',
        deliverable: 'concept',
        budget: 35,
      },
    ],
  },
  {
    id: 'data-scientist',
    label: 'Científico de Datos / Analista',
    role: 'Científico de Datos',
    domain: 'Business Intelligence & Machine Learning',
    technicalLevel: 'high',
    os: ['mac', 'linux', 'windows'],
    activeTools: ['power-bi', 'excel', 'tableau'],
    avatarIcon: 'Database',
    description:
      'Extrae valor de grandes volúmenes de datos. Construye modelos estadísticos, pipelines ETL y dashboards interactivos para toma de decisiones ejecutivas.',
    sampleNeeds: [
      {
        label: 'Dashboard Ejecutivo en Tiempo Real',
        query:
          'Conectar múltiples fuentes de datos SQL y Google Sheets en un dashboard ejecutivo interactivo con KPIs de ventas, margen y predicción trimestral.',
        deliverable: 'dashboard',
        budget: 80,
      },
      {
        label: 'Análisis Predictivo y Clustering de Clientes',
        query:
          'Realizar segmentación de clientes mediante algoritmos de clustering y generar visualizaciones claras de los grupos para el equipo comercial.',
        deliverable: 'report',
        budget: 50,
      },
    ],
  },
  {
    id: 'academic-researcher',
    label: 'Investigador Académico / Científico',
    role: 'Investigador',
    domain: 'Ciencias, Academia & Publicaciones',
    technicalLevel: 'medium',
    os: ['mac', 'linux'],
    activeTools: ['zotero', 'obsidian', 'overleaf'],
    avatarIcon: 'BookOpen',
    description:
      'Escribe artículos indexados (Q1/Q2) y tesis doctorales. Exige citas rigurosas, soberanía y privacidad de datos estricta, y rechaza herramientas que alucinen fuentes.',
    sampleNeeds: [
      {
        label: 'Revisión Sistemática de Literatura y Citas Cruzadas',
        query:
          'Tengo 150 papers en PDF sobre nuevos materiales sostenibles. Necesito sintetizar el estado del arte con citas cruzadas exactas y total rigor bibliográfico sin que invente fuentes.',
        deliverable: 'report',
        budget: 25,
      },
      {
        label: 'Manuscrito LaTeX con Gráficos Vectoriales',
        query:
          'Preparar un manuscrito en formato IEEE/ACM en LaTeX con bibliografía BibTeX y figuras vectoriales de alta resolución para someter a revisión por pares.',
        deliverable: 'report',
        budget: 15,
      },
    ],
  },
];
