import type {
  DeliverableType,
  TechnicalLevel,
  UserConstraints,
  UserWorkflowQuery,
} from '../types';

export interface CounterfactualPerturbation {
  id: string;
  label: string;
  variableChanged: string;
  originalValue: string;
  newValue: string;
  patchConstraints: Partial<UserConstraints>;
  expectedChangeHypothesis: string;
}

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
  counterfactualPerturbations: CounterfactualPerturbation[];
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
    counterfactualPerturbations: [
      {
        id: 'p1_budget_zero',
        label: 'Presupuesto $50 → $0/mes',
        variableChanged: 'maxMonthlyBudgetUSD',
        originalValue: '$50/mo',
        newValue: '$0/mo',
        patchConstraints: { maxMonthlyBudgetUSD: 0, strictPrivacy: true },
        expectedChangeHypothesis: 'Excluye herramientas comerciales; conmuta a Bonsai BIM / FreeCAD / Blender con costo $0 y soberanía de datos.',
      },
      {
        id: 'p2_os_linux',
        label: 'SO macOS → Linux',
        variableChanged: 'os',
        originalValue: 'mac',
        newValue: 'linux',
        patchConstraints: { os: 'linux' },
        expectedChangeHypothesis: 'Filtra modeladores exclusivos de Mac/Windows; prioriza herramientas BIM con soporte Linux nativo.',
      },
    ],
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
    counterfactualPerturbations: [
      {
        id: 'p1_curve_high',
        label: 'Curva Low → High (con programación)',
        variableChanged: 'maxLearningCurve',
        originalValue: 'low',
        newValue: 'high',
        patchConstraints: { maxLearningCurve: 'high', maxMonthlyBudgetUSD: 30 },
        expectedChangeHypothesis: 'Habilita RStudio / Python / Jupyter Notebooks para optimización matemática avanzada.',
      },
    ],
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
    counterfactualPerturbations: [
      {
        id: 'p1_budget_relaxed',
        label: 'Presupuesto $0 → $35/mes (con nube)',
        variableChanged: 'maxMonthlyBudgetUSD + strictPrivacy',
        originalValue: '$0/mo + local',
        newValue: '$35/mo + cloud',
        patchConstraints: { maxMonthlyBudgetUSD: 35, strictPrivacy: false },
        expectedChangeHypothesis: 'Permite Overleaf Pro en la nube colaborativo y Elicit para acelerar revisión bibliográfica.',
      },
    ],
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
    counterfactualPerturbations: [
      {
        id: 'p1_zero_cost_sovereign',
        label: 'Presupuesto $30 → $0/mes (FOSS Soberano)',
        variableChanged: 'maxMonthlyBudgetUSD + strictPrivacy',
        originalValue: '$30/mo',
        newValue: '$0/mo',
        patchConstraints: { maxMonthlyBudgetUSD: 0, strictPrivacy: true },
        expectedChangeHypothesis: 'Sustituye Figma por Penpot FOSS con estándares abiertos SVG y sin vendor lock-in.',
      },
    ],
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
      deliverable: 'code',
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
        'Herramientas no-code visuales y frontend asistido por IA (v0)',
        'Base de datos relacional sin servidor (Supabase)',
        'Presupuesto contenido <= $35/mes',
      ],
    },
    counterfactualPerturbations: [
      {
        id: 'p1_founder_high_tech',
        label: 'Perfil Low-Code → Full-Stack Developer',
        variableChanged: 'technicalLevel',
        originalValue: 'low',
        newValue: 'high',
        patchConstraints: { maxLearningCurve: 'high', maxMonthlyBudgetUSD: 60 },
        expectedChangeHypothesis: 'El stack conmuta de v0 + Supabase visual a Cursor / VS Code + Supabase + Docker para ingeniería profunda.',
      },
      {
        id: 'p2_founder_zero_cost',
        label: 'Presupuesto $35 → $0/mes',
        variableChanged: 'maxMonthlyBudgetUSD',
        originalValue: '$35/mo',
        newValue: '$0/mo',
        patchConstraints: { maxMonthlyBudgetUSD: 0 },
        expectedChangeHypothesis: 'Conmuta a AppFlowy + Penpot + Supabase Free Tier con costo mensual $0.',
      },
    ],
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
    counterfactualPerturbations: [
      {
        id: 'p1_civil_mac',
        label: 'SO Windows → macOS',
        variableChanged: 'os',
        originalValue: 'windows',
        newValue: 'mac',
        patchConstraints: { os: 'mac' },
        expectedChangeHypothesis: 'Filtra solvers exclusivos de Windows (Civil 3D / ANSYS sin Mac) hacia MATLAB / FreeCAD / LibreCAD.',
      },
    ],
  },
];

/**
 * Convierte un caso de prueba en una consulta UserWorkflowQuery para ejecución directa en el motor.
 */
export function testCaseToQuery(
  testCase: DecisionTestCase,
  lang: 'es' | 'en' = 'es',
  overrideConstraints?: Partial<UserConstraints>
): UserWorkflowQuery {
  const spec = testCase.layerA_syntheticSpec;
  const constraints: UserConstraints = {
    ...spec.constraints,
    ...(overrideConstraints || {}),
  };

  return {
    persona: {
      primaryRole: spec.role,
      technicalLevel: spec.technicalLevel,
      os: [constraints.os === 'any' ? 'web' : constraints.os],
      activeTools: [],
      domainGroup: testCase.domain.split(' / ')[0],
    },
    needText: testCase.layerB_humanScenario,
    deliverableType: spec.deliverable,
    constraints,
    lang,
  };
}
