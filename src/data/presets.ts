import type { PersonaProfile } from '../types';

export const PERSONA_PRESETS: PersonaProfile[] = [
  {
    id: 'industrial-engineering-student',
    label: 'Estudiante de Ingeniería Industrial',
    role: 'Estudiante Universitario',
    domain: 'Ingeniería / Métodos Cuantitativos',
    technicalLevel: 'low',
    os: ['mac'],
    activeTools: ['notion', 'excel'],
    avatarIcon: 'GraduationCap',
    description:
      'Cursa materias cuantitativas complejas. Usa Mac, tiene presupuesto limitado ($0 - $15 USD/mes) y necesita visualizar conceptos matemáticos y analizar datos sin programar desde cero.',
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
    id: 'residential-architect',
    label: 'Arquitecto Residencial',
    role: 'Arquitecto / Proyectista Independiente',
    domain: 'Arquitectura & Construcción',
    technicalLevel: 'none',
    os: ['mac'],
    activeTools: ['archicad', 'figma'],
    avatarIcon: 'Compass',
    description:
      'Desarrolla proyectos de vivienda unifamiliar. Trabaja en Mac, maneja planos, PDFs y referencias visuales. Necesita crear renders conceptuales y presentaciones de venta sin programar con hasta $30 USD/mes.',
    sampleNeeds: [
      {
        label: 'Propuesta Conceptual de Vivienda',
        query:
          'Tengo bocetos a mano y planos en PDF de una casa campestre. Necesito generar renders conceptuales de fachada y montar una presentación ejecutiva para convencer al cliente.',
        deliverable: 'presentation',
        budget: 30,
      },
      {
        label: 'Investigación de Normativa y Memoria',
        query:
          'Tengo 8 documentos PDF del plan de ordenamiento territorial municipal y necesito redactar la memoria descriptiva citando exactamente los artículos de norma aplicables.',
        deliverable: 'report',
        budget: 10,
      },
    ],
  },
  {
    id: 'product-strategist',
    label: 'Product Manager / Estratega',
    role: 'Líder de Producto',
    domain: 'Tecnología & Negocios',
    technicalLevel: 'medium',
    os: ['mac'],
    activeTools: ['notion', 'figma', 'slack'],
    avatarIcon: 'Briefcase',
    description:
      'Lidera equipos multidisciplinarios. Necesita sintetizar feedback cualitativo de usuarios, analizar métricas de retención y preparar presentaciones de impacto para inversores y stakeholders.',
    sampleNeeds: [
      {
        label: 'Síntesis de Feedback & Roadmap',
        query:
          'Tengo 200 transcripciones de entrevistas con usuarios en texto. Necesito clusterizar las principales fricciones, priorizar soluciones y armar una presentación para el comité directivo.',
        deliverable: 'presentation',
        budget: 50,
      },
      {
        label: 'Análisis de Métricas de Retención',
        query:
          'Quiero analizar cohortes de usuarios y métricas de churn desde un archivo CSV y generar un reporte ejecutivo con recomendaciones estratégicas.',
        deliverable: 'dashboard',
        budget: 30,
      },
    ],
  },
  {
    id: 'academic-researcher',
    label: 'Investigador Académico',
    role: 'Docente / Investigador Doctoral',
    domain: 'Ciencias & Humanidades',
    technicalLevel: 'medium',
    os: ['mac', 'linux'],
    activeTools: ['zotero', 'obsidian'],
    avatarIcon: 'BookOpen',
    description:
      'Escribe artículos indexados y tesis. Exige citas rigurosas, soberanía y privacidad de datos estricta, y rechaza herramientas que alucinen referencias bibliográficas.',
    sampleNeeds: [
      {
        label: 'Revisión Sistemática de Literatura',
        query:
          'Tengo 150 papers en PDF sobre nuevos materiales sostenibles. Necesito sintetizar el estado del arte con citas cruzadas exactas y total rigor bibliográfico sin que invente fuentes.',
        deliverable: 'report',
        budget: 20,
      },
    ],
  },
];
