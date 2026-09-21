import type {
  DeliverableType,
  TechnicalLevel,
  UserConstraints,
  UserWorkflowQuery,
} from '../types';

export interface DecisionTestCase {
  id: string;
  caseNumber: string;
  title: string;
  domain: string;
  // Layer B: Expresión humana en lenguaje natural
  layerB_humanScenario: string;
  // Layer A: Especificación sintética estructurada
  layerA_syntheticSpec: {
    role: string;
    deliverable: DeliverableType;
    constraints: UserConstraints;
    technicalLevel: TechnicalLevel;
  };
  referenceHypothesis: {
    stagesExpected: string[];
    keyExpectedCharacteristics: string[];
  };
}

export const DECISION_TEST_CASES: DecisionTestCase[] = [
  {
    id: 'case_01_architect',
    caseNumber: '01',
    title: 'Arquitecto — Planos Ejecutivos & Modelo IFC',
    domain: 'AEC / Arquitectura',
    layerB_humanScenario:
      'Soy arquitecto, trabajo en macOS y necesito entregar planos ejecutivos con modelo IFC para coordinación de obra con ingenieros, con presupuesto moderado de $50/mes.',
    layerA_syntheticSpec: {
      role: 'Arquitecto',
      deliverable: 'bim_model',
      technicalLevel: 'medium',
      constraints: {
        maxMonthlyBudgetUSD: 50,
        os: 'mac',
        strictPrivacy: false,
        maxLearningCurve: 'medium',
        requiresSpanish: true,
      },
    },
    referenceHypothesis: {
      stagesExpected: ['ingest_research', 'model_process', 'refine_format'],
      keyExpectedCharacteristics: [
        'Compatibilidad nativa con macOS o Web',
        'Exportación a estándar abierto IFC / DWG',
        'Costo dentro de $50/mes o combinación de FOSS (Bonsai BIM/Blender) con visualización',
      ],
    },
  },
  {
    id: 'case_02_industrial_student',
    caseNumber: '02',
    title: 'Estudiante Ing. Industrial — Dashboard & Optimización',
    domain: 'ING / Operaciones',
    layerB_humanScenario:
      'Soy estudiante de ingeniería industrial, tengo que entregar un dashboard y un modelo de optimización, uso Mac, no quiero aprender programación pesada y tengo $20 al mes.',
    layerA_syntheticSpec: {
      role: 'Ingeniero Industrial',
      deliverable: 'dashboard',
      technicalLevel: 'low',
      constraints: {
        maxMonthlyBudgetUSD: 20,
        os: 'mac',
        strictPrivacy: false,
        maxLearningCurve: 'low',
        requiresSpanish: true,
      },
    },
    referenceHypothesis: {
      stagesExpected: ['ingest_research', 'model_process', 'present_deliver'],
      keyExpectedCharacteristics: [
        'Curva baja / no-code para estudiante',
        'Costo total <= $20/mes',
        'Herramienta de análisis/solver accesible sin terminal (ej. Excel/Superset/Tableau Public)',
      ],
    },
  },
  {
    id: 'case_03_researcher',
    caseNumber: '03',
    title: 'Investigador Académico — Paper LaTeX & Datos Médicos',
    domain: 'SCIENCE / Biomedicina',
    layerB_humanScenario:
      'Soy investigador universitario, necesito redactar un paper con citas rigurosas y análisis estadístico reproducible con datos médicos confidenciales y presupuesto $0.',
    layerA_syntheticSpec: {
      role: 'Investigador Académico',
      deliverable: 'latex_manuscript',
      technicalLevel: 'high',
      constraints: {
        maxMonthlyBudgetUSD: 0,
        os: 'linux',
        strictPrivacy: true,
        maxLearningCurve: 'high',
        requiresSpanish: false,
      },
    },
    referenceHypothesis: {
      stagesExpected: ['ingest_research', 'model_process', 'refine_format'],
      keyExpectedCharacteristics: [
        'Presupuesto exacto $0 (100% FOSS / Open Stack)',
        'Soberanía total de datos (privacidad local estricta, zero data retention)',
        'Gestión bibliográfica rigurosa (Zotero) + motor reproducible (Python/R/Jupyter)',
      ],
    },
  },
  {
    id: 'case_04_designer',
    caseNumber: '04',
    title: 'Diseñador UI/UX — Design System & Handoff',
    domain: 'DESIGN / Digital Product',
    layerB_humanScenario:
      'Diseño productos digitales, necesito armar un sistema de diseño con tokens reutilizables y handoff colaborativo para un equipo de desarrollo frontend en Mac/Web.',
    layerA_syntheticSpec: {
      role: 'Diseñador UI / Visual',
      deliverable: 'design_system',
      technicalLevel: 'medium',
      constraints: {
        maxMonthlyBudgetUSD: 30,
        os: 'web',
        strictPrivacy: false,
        maxLearningCurve: 'medium',
        requiresSpanish: false,
      },
    },
    referenceHypothesis: {
      stagesExpected: ['ingest_research', 'model_process', 'present_deliver'],
      keyExpectedCharacteristics: [
        'Colaboración interactiva en tiempo real',
        'Exportación de tokens vectoriales limpios (SVG / CSS)',
        'Figma o alternativa FOSS soberana Penpot',
      ],
    },
  },
  {
    id: 'case_05_founder',
    caseNumber: '05',
    title: 'Fundador No-Técnico — MVP & CRM de Clientes',
    domain: 'BIZ / Startups',
    layerB_humanScenario:
      'Soy fundador no técnico, quiero lanzar un MVP con landing page, base de datos de clientes y automatización de correos sin contratar programadores con presupuesto bajo de $35/mes.',
    layerA_syntheticSpec: {
      role: 'Fundador / Estratega de Negocio',
      deliverable: 'dashboard',
      technicalLevel: 'low',
      constraints: {
        maxMonthlyBudgetUSD: 35,
        os: 'web',
        strictPrivacy: false,
        maxLearningCurve: 'low',
        requiresSpanish: true,
      },
    },
    referenceHypothesis: {
      stagesExpected: ['ingest_research', 'model_process', 'present_deliver'],
      keyExpectedCharacteristics: [
        'Herramientas no-code visuales',
        'Presupuesto contenido <= $35/mes',
        'Interoperabilidad rápida mediante webhook o conector nativo',
      ],
    },
  },
  {
    id: 'case_06_civil_engineer',
    caseNumber: '06',
    title: 'Ingeniero Civil — Memoria de Cálculo Estructural',
    domain: 'ING / Estructuras',
    layerB_humanScenario:
      'Soy ingeniero civil, uso Windows y requiero entregar una memoria de cálculo estructural detallada con normas de sismo-resistencia y trazabilidad matemática con $80/mes.',
    layerA_syntheticSpec: {
      role: 'Ingeniero Civil',
      deliverable: 'structural_calc',
      technicalLevel: 'high',
      constraints: {
        maxMonthlyBudgetUSD: 80,
        os: 'windows',
        strictPrivacy: false,
        maxLearningCurve: 'high',
        requiresSpanish: true,
      },
    },
    referenceHypothesis: {
      stagesExpected: ['ingest_research', 'model_process', 'refine_format'],
      keyExpectedCharacteristics: [
        'Soporte nativo para Windows',
        'Cálculo simbólico y numérico de alta precisión',
        'Exportación de memorias con ecuaciones tipográficas',
      ],
    },
  },
];

/**
 * Convierte un caso de prueba en una consulta UserWorkflowQuery para ejecución directa en el motor.
 */
export function testCaseToQuery(testCase: DecisionTestCase, lang: 'es' | 'en' = 'es'): UserWorkflowQuery {
  const spec = testCase.layerA_syntheticSpec;
  return {
    persona: {
      primaryRole: spec.role,
      technicalLevel: spec.technicalLevel,
      os: [spec.constraints.os === 'any' ? 'web' : spec.constraints.os],
      activeTools: [],
      domainGroup: testCase.domain.split(' / ')[0],
    },
    needText: testCase.layerB_humanScenario,
    deliverableType: spec.deliverable,
    constraints: spec.constraints,
    lang,
  };
}
