import type { Tool, UserConstraints } from '../types';

export interface FilterResult {
  passes: boolean;
  disqualificationReason?: string;
  isHardFiltered: boolean;
}

export function evaluateHardConstraints(tool: Tool, constraints: UserConstraints): FilterResult {
  // 1. Filtro Estricto de Presupuesto (Hard Constraint)
  if (constraints.maxMonthlyBudgetUSD === 0 && !tool.pricing.hasFreeTier && tool.pricing.startingPricePerMonthUSD > 0) {
    return {
      passes: false,
      disqualificationReason: `Requiere suscripción de pago (inicia en $${tool.pricing.startingPricePerMonthUSD}/mes) y el presupuesto es $0`,
      isHardFiltered: true,
    };
  }

  // Si el precio de partida excede el presupuesto máximo y la herramienta no tiene capa gratuita funcional
  if (
    constraints.maxMonthlyBudgetUSD > 0 &&
    !tool.pricing.hasFreeTier &&
    tool.pricing.startingPricePerMonthUSD > constraints.maxMonthlyBudgetUSD
  ) {
    return {
      passes: false,
      disqualificationReason: `Excede el presupuesto fijado ($${tool.pricing.startingPricePerMonthUSD}/mes > $${constraints.maxMonthlyBudgetUSD}/mes)`,
      isHardFiltered: true,
    };
  }

  // 2. Filtro Estricto de Sistema Operativo (Hard Constraint)
  if (constraints.os && constraints.os !== 'any') {
    const isSupported =
      tool.platforms.includes(constraints.os) || tool.platforms.includes('web');
    if (!isSupported) {
      return {
        passes: false,
        disqualificationReason: `Incompatible con tu sistema operativo (${constraints.os.toUpperCase()})`,
        isHardFiltered: true,
      };
    }
  }

  // 3. Filtro Estricto de Privacidad Local / Soberanía (Hard Constraint)
  if (constraints.strictPrivacy) {
    if (tool.privacyLevel === 'public_cloud') {
      return {
        passes: false,
        disqualificationReason: 'Almacena datos en nube pública de terceros (incompatible con política local-only / privacidad estricta)',
        isHardFiltered: true,
      };
    }
  }

  return {
    passes: true,
    isHardFiltered: false,
  };
}

/**
 * Filtra el conjunto completo de herramientas antes de cualquier cálculo MCDA.
 * Garantiza que ninguna herramienta con Hard Constraint violada entre en la terna o pipeline.
 */
export function filterCandidatesByHardConstraints(
  tools: Tool[],
  constraints: UserConstraints
): { passing: Tool[]; rejected: { tool: Tool; reason: string }[] } {
  const passing: Tool[] = [];
  const rejected: { tool: Tool; reason: string }[] = [];

  for (const tool of tools) {
    const res = evaluateHardConstraints(tool, constraints);
    if (res.passes) {
      passing.push(tool);
    } else {
      rejected.push({ tool, reason: res.disqualificationReason || 'Fallo de restricción dura' });
    }
  }

  return { passing, rejected };
}
