import type { Tool, UserWorkflowQuery, UserConstraints, AlternativeOption } from '../types';
import type { ScoreBreakdown } from './scoring';

export function generateWhyThisTool(
  tool: Tool,
  query: UserWorkflowQuery,
  breakdown: ScoreBreakdown
): string[] {
  const why: string[] = [];

  // Puntos fuertes específicos de la herramienta
  if (tool.whatItDoesBest.length > 0) {
    why.push(tool.whatItDoesBest[0]);
    if (tool.whatItDoesBest[1]) why.push(tool.whatItDoesBest[1]);
  }

  // Cumplimiento presupuestario
  if (query.constraints.maxMonthlyBudgetUSD === 0 && tool.pricing.hasFreeTier) {
    why.push(`Plan gratuito disponible (${tool.pricing.freeTierDetails || 'Sin costo'})`);
  } else if (tool.pricing.startingPricePerMonthUSD <= query.constraints.maxMonthlyBudgetUSD) {
    why.push(`Dentro de tu presupuesto ($${tool.pricing.startingPricePerMonthUSD}/mes)`);
  }

  // Sinergia con OS o stack
  if (query.constraints.os !== 'any' && tool.platforms.includes(query.constraints.os)) {
    why.push(`Aplicación nativa optimizada para ${query.constraints.os.toUpperCase()}`);
  }

  // Facilidad y Task fit
  if (tool.technicalLevelRequired === 'none' && query.persona.technicalLevel === 'none') {
    why.push('Cero código requerido: interfaz visual accesible');
  } else if (breakdown.taskFit >= 85) {
    why.push('Alta especialización funcional para el entregable requerido');
  }

  return why.slice(0, 4);
}

export function generateWhatYouSacrifice(tool: Tool, query: UserWorkflowQuery): string[] {
  const sacrifices: string[] = [];

  // Limitaciones explícitas de la herramienta
  if (tool.whatItDoesNotDo.length > 0) {
    sacrifices.push(tool.whatItDoesNotDo[0]);
    if (tool.whatItDoesNotDo[1]) sacrifices.push(tool.whatItDoesNotDo[1]);
  }

  // Si requiere pago
  if (!tool.pricing.hasFreeTier && tool.pricing.startingPricePerMonthUSD > 0) {
    sacrifices.push(`Requiere suscripción obligatoria ($${tool.pricing.startingPricePerMonthUSD}/mes)`);
  }

  // Si no tiene modo offline
  if (!tool.capabilities.offlineSupport) {
    sacrifices.push('Dependencia de conexión a internet (sin soporte offline nativo)');
  }

  // Si el nivel técnico es moderado/alto
  if (tool.technicalLevelRequired === 'medium' || tool.technicalLevelRequired === 'high') {
    sacrifices.push(`Curva de aprendizaje ${tool.technicalLevelRequired === 'high' ? 'pronunciada' : 'moderada'}`);
  }

  // Si privacidad es estricta pero la herramienta es nube enterprise
  if (query.constraints.strictPrivacy && tool.privacyLevel === 'enterprise_cloud') {
    sacrifices.push('Soberanía parcial: opera en nube enterprise cifrada, no en máquina local');
  }

  return sacrifices.slice(0, 3);
}

export function generateAlternatives(
  candidates: { tool: Tool; breakdown: ScoreBreakdown }[],
  selectedTool: Tool,
  constraints: UserConstraints
): AlternativeOption[] {
  // Filtrar las que no sean la herramienta seleccionada y ordenar por score
  const others = candidates
    .filter((c) => c.tool.id !== selectedTool.id)
    .sort((a, b) => b.breakdown.finalScore - a.breakdown.finalScore);

  return others.slice(0, 3).map(({ tool, breakdown }) => {
    const deltaPrice = tool.pricing.startingPricePerMonthUSD - selectedTool.pricing.startingPricePerMonthUSD;
    let reason = '';

    if (deltaPrice < 0) {
      reason = `Más económica ($${Math.abs(deltaPrice)}/mes menos), pero ${tool.whatItDoesNotDo[0] || 'con menos funciones'}`;
    } else if (deltaPrice > 0) {
      const budgetWarning = tool.pricing.startingPricePerMonthUSD > constraints.maxMonthlyBudgetUSD ? ' (supera presupuesto)' : '';
      reason = `Mayor potencia en ${tool.whatItDoesBest[0] || 'detalles'}${budgetWarning}, con costo adicional de +$${deltaPrice}/mes`;
    } else {
      reason = `Alternativa equivalente enfocada en ${tool.category}`;
    }

    const curveDiff =
      tool.technicalLevelRequired !== selectedTool.technicalLevelRequired
        ? `Curva ${tool.technicalLevelRequired}`
        : 'Misma curva';

    return {
      tool,
      matchScore: breakdown.finalScore,
      reason,
      deltaBudgetUSD: deltaPrice,
      deltaLearningCurve: curveDiff,
    };
  });
}
