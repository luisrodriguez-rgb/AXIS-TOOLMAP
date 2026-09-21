import type {
  OperatingSystem,
  DeliverableType,
  TechnicalLevel,
  FieldProvenance,
} from '../types';

export interface ParsedIntent {
  rawQuery: string;
  detectedProfessionId?: string;
  detectedProfession?: string;
  detectedDeliverable?: DeliverableType;
  detectedBudgetUSD?: number;
  detectedOS?: OperatingSystem;
  detectedStrictPrivacy?: boolean;
  detectedTechnicalLevel?: TechnicalLevel;
  confidence: 'high' | 'medium' | 'low';
  extractedKeywords: string[];
  provenance: {
    profession: FieldProvenance<string | undefined>;
    deliverable: FieldProvenance<DeliverableType | undefined>;
    budget: FieldProvenance<number | undefined>;
    os: FieldProvenance<OperatingSystem | undefined>;
    privacy: FieldProvenance<boolean | undefined>;
    technicalLevel: FieldProvenance<TechnicalLevel | undefined>;
  };
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
  { patterns: [/\b(dashboard|tablero|kpi|metricas|métrica|power bi|tableau)\b/i], value: 'dashboard' },
  { patterns: [/\b(paper|articulo|artículo|latex|investigaci|tesis)\b/i], value: 'latex_manuscript' },
  { patterns: [/\b(design system|sistema de diseno|tokens|prototipo|ui|ux)\b/i], value: 'design_system' },
  { patterns: [/\b(mvp|landing|landing page|startup|app web|no-code|sin programar)\b/i], value: 'code' },
  { patterns: [/\b(crm|base de datos|database|leads|clientes)\b/i], value: 'code' },
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
 * Parsea una intención humana en lenguaje natural a variables estructuradas con procedencia y evidencia textual (Layer B -> Layer A).
 */
export function parseNaturalIntent(text: string): ParsedIntent {
  const extractedKeywords: string[] = [];

  // 1. Detectar SO con procedencia
  let osProv: FieldProvenance<OperatingSystem | undefined> = {
    value: undefined,
    provenance: 'unknown',
  };
  for (const rule of OS_RULES) {
    for (const pattern of rule.patterns) {
      const match = text.match(pattern);
      if (match) {
        osProv = {
          value: rule.value,
          provenance: 'explicit',
          evidenceText: match[0],
          explanation: `Detectado explícitamente en el texto: "${match[0]}"`,
        };
        extractedKeywords.push(`OS: ${rule.value}`);
        break;
      }
    }
    if (osProv.value) break;
  }

  // 2. Detectar Entregable con procedencia y patrones semánticos indirectos
  let delivProv: FieldProvenance<DeliverableType | undefined> = {
    value: undefined,
    provenance: 'unknown',
  };
  for (const rule of DELIVERABLE_RULES) {
    for (const pattern of rule.patterns) {
      const match = text.match(pattern);
      if (match) {
        delivProv = {
          value: rule.value,
          provenance: 'explicit',
          evidenceText: match[0],
          explanation: `Entregable explícito: "${match[0]}"`,
        };
        extractedKeywords.push(`Entregable: ${rule.value}`);
        break;
      }
    }
    if (delivProv.value) break;
  }

  // Patrón semántico inferido de MVP / Producto funcional
  if (!delivProv.value) {
    const mvpInferMatch = text.match(/(validar (una )?idea|tener algo funcional|mostrar a (mis )?primeros usuarios|lanzar un producto)/i);
    if (mvpInferMatch) {
      delivProv = {
        value: 'code',
        provenance: 'inferred',
        evidenceText: mvpInferMatch[0],
        explanation: `Inferido MVP / Web App desde la expresión de validación: "${mvpInferMatch[0]}"`,
      };
      extractedKeywords.push('Entregable (inferido): Web MVP / Code');
    }
  }

  // 3. Detectar Profesión con procedencia
  let profProv: FieldProvenance<string | undefined> = {
    value: undefined,
    provenance: 'unknown',
  };
  for (const rule of PROFESSION_RULES) {
    for (const pattern of rule.patterns) {
      const match = text.match(pattern);
      if (match) {
        profProv = {
          value: rule.value,
          provenance: 'explicit',
          evidenceText: match[0],
          explanation: `Rol profesional explícito: "${match[0]}"`,
        };
        extractedKeywords.push(`Profesión: ${rule.value}`);
        break;
      }
    }
    if (profProv.value) break;
  }

  // Inferencia indirecta de rol fundador
  if (!profProv.value) {
    const founderInferMatch = text.match(/(primeros usuarios|validar (una )?idea|lanzar startup|mi negocio)/i);
    if (founderInferMatch) {
      profProv = {
        value: 'fundador',
        provenance: 'inferred',
        evidenceText: founderInferMatch[0],
        explanation: `Rol de Fundador inferido desde contexto de negocio: "${founderInferMatch[0]}"`,
      };
      extractedKeywords.push('Profesión (inferida): Fundador');
    }
  }

  // 4. Detectar Presupuesto con procedencia
  let budgetProv: FieldProvenance<number | undefined> = {
    value: undefined,
    provenance: 'unknown',
  };
  const budgetZeroMatch = text.match(/\b(\$0|gratis|cero|sin costo|free)\b/i);
  const budgetNumberMatch = text.match(/\$(\d+)|(\d+)\s*(dolares|dólares|usd|\/mes|al mes)/i);
  const budgetLowMatch = text.match(/\b(presupuesto bajo|poco presupuesto|econ[oó]mico|sin gastar mucho)\b/i);

  if (budgetZeroMatch) {
    budgetProv = {
      value: 0,
      provenance: 'explicit',
      evidenceText: budgetZeroMatch[0],
      explanation: `Presupuesto cero explícito: "${budgetZeroMatch[0]}"`,
    };
    extractedKeywords.push('Presupuesto: $0/mes');
  } else if (budgetNumberMatch) {
    const amount = parseInt(budgetNumberMatch[1] || budgetNumberMatch[2], 10);
    if (!isNaN(amount)) {
      budgetProv = {
        value: amount,
        provenance: 'explicit',
        evidenceText: budgetNumberMatch[0],
        explanation: `Presupuesto numérico explícito: "${budgetNumberMatch[0]}"`,
      };
      extractedKeywords.push(`Presupuesto: $${amount}/mes`);
    }
  } else if (budgetLowMatch) {
    budgetProv = {
      value: 35,
      provenance: 'inferred',
      evidenceText: budgetLowMatch[0],
      explanation: `Presupuesto estimado de entrada inferido: "${budgetLowMatch[0]}" (~$35/mes)`,
    };
    extractedKeywords.push('Presupuesto (inferido): $35/mes');
  }

  // 5. Detectar Privacidad Estricta con procedencia
  let privProv: FieldProvenance<boolean | undefined> = {
    value: undefined,
    provenance: 'unknown',
  };
  const privMatch = text.match(/\b(privacidad|local|confidencial|sensible|soberania|soberanía|offline|on-premise|sin subir (a la nube|datos))\b/i);
  if (privMatch) {
    privProv = {
      value: true,
      provenance: 'explicit',
      evidenceText: privMatch[0],
      explanation: `Requisito de soberanía local explícito: "${privMatch[0]}"`,
    };
    extractedKeywords.push('Privacidad: Estricta / Local');
  }

  // 6. Detectar Nivel Técnico con procedencia
  let techProv: FieldProvenance<TechnicalLevel | undefined> = {
    value: undefined,
    provenance: 'unknown',
  };
  const techLowMatch = text.match(/\b(sin programar|sin codigo|sin código|no-code|no s[eé] programar|no quiero aprender programaci[oó]n|f[aá]cil|no t[eé]cnico)\b/i);
  const techHighMatch = text.match(/\b(avanzado|programador|experto|codigo|código|desarrollo|fullstack|backend|ingeniero)\b/i);

  if (techLowMatch) {
    techProv = {
      value: 'low',
      provenance: 'explicit',
      evidenceText: techLowMatch[0],
      explanation: `Preferencia no-code explícita: "${techLowMatch[0]}"`,
    };
    extractedKeywords.push('Nivel Técnico: Low / No-Code');
  } else if (techHighMatch) {
    techProv = {
      value: 'high',
      provenance: 'explicit',
      evidenceText: techHighMatch[0],
      explanation: `Perfil técnico avanzado explícito: "${techHighMatch[0]}"`,
    };
    extractedKeywords.push('Nivel Técnico: High');
  }

  const explicitCount = [
    osProv.provenance === 'explicit',
    delivProv.provenance === 'explicit',
    profProv.provenance === 'explicit',
    budgetProv.provenance === 'explicit',
    privProv.provenance === 'explicit',
    techProv.provenance === 'explicit',
  ].filter(Boolean).length;

  const totalDetected = [
    osProv.value !== undefined,
    delivProv.value !== undefined,
    profProv.value !== undefined,
    budgetProv.value !== undefined,
    privProv.value !== undefined,
    techProv.value !== undefined,
  ].filter(Boolean).length;

  let confidence: 'high' | 'medium' | 'low' = 'low';
  if (explicitCount >= 3) confidence = 'high';
  else if (totalDetected >= 2) confidence = 'medium';

  return {
    rawQuery: text,
    detectedProfessionId: profProv.value,
    detectedProfession: profProv.value,
    detectedDeliverable: delivProv.value,
    detectedBudgetUSD: budgetProv.value,
    detectedOS: osProv.value,
    detectedStrictPrivacy: privProv.value,
    detectedTechnicalLevel: techProv.value,
    confidence,
    extractedKeywords,
    provenance: {
      profession: profProv,
      deliverable: delivProv,
      budget: budgetProv,
      os: osProv,
      privacy: privProv,
      technicalLevel: techProv,
    },
  };
}
