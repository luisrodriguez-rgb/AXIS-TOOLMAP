import type { OperatingSystem, DeliverableType, TechnicalLevel } from '../types';

export interface ParsedIntent {
  rawQuery: string;
  detectedProfessionId?: string;
  detectedDeliverable?: DeliverableType;
  detectedBudgetUSD?: number;
  detectedOS?: OperatingSystem;
  detectedStrictPrivacy?: boolean;
  detectedTechnicalLevel?: TechnicalLevel;
  confidence: 'high' | 'medium' | 'low';
  extractedKeywords: string[];
}

interface KeywordRule<T> {
  patterns: RegExp[];
  value: T;
}

const OS_RULES: KeywordRule<OperatingSystem>[] = [
  { patterns: [/\b(mac|macos|apple|osx|macbook)\b/i], value: 'mac' },
  { patterns: [/\b(windows|win|pc)\b/i], value: 'windows' },
  { patterns: [/\b(linux|ubuntu|fedora|debian|arch)\b/i], value: 'linux' },
];

const DELIVERABLE_RULES: KeywordRule<DeliverableType>[] = [
  { patterns: [/\b(ifc|bim|plano|planos|ejecutivo|arquitectur)\b/i], value: 'bim_model' },
  { patterns: [/\b(dashboard|tablero|kpi|metricas|métrica)\b/i], value: 'dashboard' },
  { patterns: [/\b(paper|articulo|artículo|latex|investigaci|tesis)\b/i], value: 'latex_manuscript' },
  { patterns: [/\b(design system|sistema de diseno|tokens|prototipo|ui|ux)\b/i], value: 'design_system' },
  { patterns: [/\b(mvp|landing|crm|base de datos|startup)\b/i], value: 'dashboard' },
  { patterns: [/\b(memoria|calculo estructural|estructural|sismo)\b/i], value: 'structural_calc' },
  { patterns: [/\b(presentacion|presentación|diapositiva|pitch|slides)\b/i], value: 'presentation' },
  { patterns: [/\b(codigo|código|api|backend|frontend|microservicio)\b/i], value: 'code' },
  { patterns: [/\b(render|3d|fotorrealismo|modelado 3d)\b/i], value: 'render' },
];

const PROFESSION_RULES: KeywordRule<string>[] = [
  { patterns: [/\b(arquitecto|arquitectura|bim manager)\b/i], value: 'arquitecto' },
  { patterns: [/\b(industrial|ingenier[ií]a industrial|optimizaci[oó]n)\b/i], value: 'ing-industrial' },
  { patterns: [/\b(investigador|cientifico|científico|academia|docente|profesor)\b/i], value: 'investigador' },
  { patterns: [/\b(disenador|diseñador|ui\/ux|ux designer|product designer)\b/i], value: 'disenador-ui' },
  { patterns: [/\b(fundador|founder|emprendedor|ceo|no-tecnico|no técnico)\b/i], value: 'fundador' },
  { patterns: [/\b(civil|estructural|sismo|calculista|geotecnia)\b/i], value: 'ing-civil' },
  { patterns: [/\b(desarrollador|programador|software engineer|developer)\b/i], value: 'dev-fullstack' },
  { patterns: [/\b(abogado|legal|juridico|jurídico)\b/i], value: 'abogado' },
  { patterns: [/\b(medico|médico|clinico|clínico|salud)\b/i], value: 'medico' },
];

/**
 * Parsea una intención humana en lenguaje natural a variables estructuradas de decisión (Layer B -> Layer A).
 */
export function parseNaturalIntent(text: string): ParsedIntent {
  const extractedKeywords: string[] = [];
  let detectedOS: OperatingSystem | undefined;
  let detectedDeliverable: DeliverableType | undefined;
  let detectedProfessionId: string | undefined;
  let detectedBudgetUSD: number | undefined;
  let detectedStrictPrivacy: boolean | undefined;
  let detectedTechnicalLevel: TechnicalLevel | undefined;

  // 1. Detectar SO
  for (const rule of OS_RULES) {
    if (rule.patterns.some((p) => p.test(text))) {
      detectedOS = rule.value;
      extractedKeywords.push(`OS: ${rule.value}`);
      break;
    }
  }

  // 2. Detectar Entregable
  for (const rule of DELIVERABLE_RULES) {
    if (rule.patterns.some((p) => p.test(text))) {
      detectedDeliverable = rule.value;
      extractedKeywords.push(`Entregable: ${rule.value}`);
      break;
    }
  }

  // 3. Detectar Profesión
  for (const rule of PROFESSION_RULES) {
    if (rule.patterns.some((p) => p.test(text))) {
      detectedProfessionId = rule.value;
      extractedKeywords.push(`Profesión: ${rule.value}`);
      break;
    }
  }

  // 4. Detectar Presupuesto ($0, $20, etc.)
  const budgetZeroMatch = text.match(/\b(\$0|gratis|cero|sin costo|free)\b/i);
  const budgetNumberMatch = text.match(/\$(\d+)|(\d+)\s*(dolares|dólares|usd|\/mes|al mes)/i);

  if (budgetZeroMatch) {
    detectedBudgetUSD = 0;
    extractedKeywords.push('Presupuesto: $0/mes');
  } else if (budgetNumberMatch) {
    const amount = parseInt(budgetNumberMatch[1] || budgetNumberMatch[2], 10);
    if (!isNaN(amount)) {
      detectedBudgetUSD = amount;
      extractedKeywords.push(`Presupuesto: $${amount}/mes`);
    }
  }

  // 5. Detectar Privacidad Estricta / Local
  if (/\b(privacidad|local|confidencial|sensible|soberania|soberanía|offline|on-premise)\b/i.test(text)) {
    detectedStrictPrivacy = true;
    extractedKeywords.push('Privacidad: Estricta / Local');
  }

  // 6. Detectar Nivel Técnico / Tolerancia de Curva
  if (/\b(sin programar|sin codigo|sin código|no-code|no quiero aprender programacion|f[aá]cil)\b/i.test(text)) {
    detectedTechnicalLevel = 'low';
    extractedKeywords.push('Nivel Técnico: Low / No-Code');
  } else if (/\b(avanzado|programador|experto|codigo|código|desarrollo)\b/i.test(text)) {
    detectedTechnicalLevel = 'high';
    extractedKeywords.push('Nivel Técnico: High');
  }

  const matchesCount = [
    detectedOS,
    detectedDeliverable,
    detectedProfessionId,
    detectedBudgetUSD !== undefined,
    detectedStrictPrivacy,
    detectedTechnicalLevel,
  ].filter(Boolean).length;

  let confidence: 'high' | 'medium' | 'low' = 'low';
  if (matchesCount >= 3) confidence = 'high';
  else if (matchesCount >= 1) confidence = 'medium';

  return {
    rawQuery: text,
    detectedProfessionId,
    detectedDeliverable,
    detectedBudgetUSD,
    detectedOS,
    detectedStrictPrivacy,
    detectedTechnicalLevel,
    confidence,
    extractedKeywords,
  };
}
