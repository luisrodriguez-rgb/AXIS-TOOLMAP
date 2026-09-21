import type { Tool, UserConstraints } from '../types';

export interface FilterResult {
  passes: boolean;
  disqualificationReason?: string;
  isHardFiltered: boolean;
}

export function evaluateHardConstraints(tool: Tool, constraints: UserConstraints): FilterResult {
  // 1. Filtro de Presupuesto
  // Si el usuario requiere presupuesto $0 (gratis) y la herramienta no tiene capa gratuita
  if (constraints.maxMonthlyBudgetUSD === 0 && !tool.pricing.hasFreeTier) {
    return {
      passes: false,
      disqualificationReason: `No tiene capa gratuita (inicia en $${tool.pricing.startingPricePerMonthUSD}/mes)`,
      isHardFiltered: true,
    };
  }

  // Si el precio base supera por más del 150% el presupuesto máximo del usuario
  if (
    constraints.maxMonthlyBudgetUSD > 0 &&
    !tool.pricing.hasFreeTier &&
    tool.pricing.startingPricePerMonthUSD > constraints.maxMonthlyBudgetUSD * 1.5
  ) {
    return {
      passes: false,
      disqualificationReason: `Supera significativamente el presupuesto ($${tool.pricing.startingPricePerMonthUSD}/mes vs $${constraints.maxMonthlyBudgetUSD}/mes)`,
      isHardFiltered: true,
    };
  }

  // 2. Filtro de Sistema Operativo
  if (constraints.os !== 'any') {
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

  // 3. Filtro de Privacidad Estricta
  if (constraints.strictPrivacy) {
    // Si exige privacidad estricta, descartar herramientas que solo tengan nube pública sin retención cero
    if (tool.privacyLevel === 'public_cloud') {
      return {
        passes: false,
        disqualificationReason: 'Almacena datos en nube pública no compatible con privacidad estricta',
        isHardFiltered: true,
      };
    }
  }

  return {
    passes: true,
    isHardFiltered: false,
  };
}
