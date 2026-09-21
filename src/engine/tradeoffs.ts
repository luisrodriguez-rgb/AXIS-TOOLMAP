import type { Tool, UserWorkflowQuery, UserConstraints, AlternativeOption } from '../types';
import type { ScoreBreakdown } from './scoring';
import { getLocalizedTool } from '../i18n/toolLocalization';

export function generateWhyThisTool(
  tool: Tool,
  query: UserWorkflowQuery,
  breakdown: ScoreBreakdown,
  lang: 'es' | 'en' = 'es'
): string[] {
  const why: string[] = [];
  const locTool = getLocalizedTool(tool, lang);

  // Puntos fuertes específicos de la herramienta
  if (locTool.whatItDoesBest.length > 0) {
    why.push(locTool.whatItDoesBest[0]);
    if (locTool.whatItDoesBest[1]) why.push(locTool.whatItDoesBest[1]);
  }

  // Cumplimiento presupuestario
  if (query.constraints.maxMonthlyBudgetUSD === 0 && locTool.pricing.hasFreeTier) {
    why.push(
      lang === 'en'
        ? `Free tier available (${locTool.pricing.freeTierDetails || 'No cost'})`
        : `Plan gratuito disponible (${locTool.pricing.freeTierDetails || 'Sin costo'})`
    );
  } else if (locTool.pricing.startingPricePerMonthUSD <= query.constraints.maxMonthlyBudgetUSD) {
    why.push(
      lang === 'en'
        ? `Within your budget ($${locTool.pricing.startingPricePerMonthUSD}/mo)`
        : `Dentro de tu presupuesto ($${locTool.pricing.startingPricePerMonthUSD}/mes)`
    );
  }

  // Sinergia con OS o stack
  if (query.constraints.os !== 'any' && locTool.platforms.includes(query.constraints.os)) {
    why.push(
      lang === 'en'
        ? `Native app optimized for ${query.constraints.os.toUpperCase()}`
        : `Aplicación nativa optimizada para ${query.constraints.os.toUpperCase()}`
    );
  }

  // Facilidad y Task fit
  if (locTool.technicalLevelRequired === 'none' && query.persona.technicalLevel === 'none') {
    why.push(
      lang === 'en'
        ? 'Zero code required: accessible visual interface'
        : 'Cero código requerido: interfaz visual accesible'
    );
  } else if (breakdown.taskFit >= 85) {
    why.push(
      lang === 'en'
        ? 'High functional specialization for the required deliverable'
        : 'Alta especialización funcional para el entregable requerido'
    );
  }

  return why.slice(0, 4);
}

export function generateWhatYouSacrifice(
  tool: Tool,
  query: UserWorkflowQuery,
  lang: 'es' | 'en' = 'es'
): string[] {
  const sacrifices: string[] = [];
  const locTool = getLocalizedTool(tool, lang);

  // Limitaciones explícitas de la herramienta
  if (locTool.whatItDoesNotDo.length > 0) {
    sacrifices.push(locTool.whatItDoesNotDo[0]);
    if (locTool.whatItDoesNotDo[1]) sacrifices.push(locTool.whatItDoesNotDo[1]);
  }

  // Si requiere pago
  if (!locTool.pricing.hasFreeTier && locTool.pricing.startingPricePerMonthUSD > 0) {
    sacrifices.push(
      lang === 'en'
        ? `Requires subscription ($${locTool.pricing.startingPricePerMonthUSD}/mo)`
        : `Requiere suscripción obligatoria ($${locTool.pricing.startingPricePerMonthUSD}/mes)`
    );
  }

  // Si no tiene modo offline
  if (!locTool.capabilities.offlineSupport) {
    sacrifices.push(
      lang === 'en'
        ? 'Requires internet connection (no native offline support)'
        : 'Dependencia de conexión a internet (sin soporte offline nativo)'
    );
  }

  // Si el nivel técnico es moderado/alto
  if (locTool.technicalLevelRequired === 'medium' || locTool.technicalLevelRequired === 'high') {
    sacrifices.push(
      lang === 'en'
        ? `${locTool.technicalLevelRequired === 'high' ? 'Steep' : 'Moderate'} learning curve`
        : `Curva de aprendizaje ${locTool.technicalLevelRequired === 'high' ? 'pronunciada' : 'moderada'}`
    );
  }

  // Si privacidad es estricta pero la herramienta es nube enterprise
  if (query.constraints.strictPrivacy && locTool.privacyLevel === 'enterprise_cloud') {
    sacrifices.push(
      lang === 'en'
        ? 'Partial sovereignty: runs on enterprise cloud, not local machine'
        : 'Soberanía parcial: opera en nube enterprise cifrada, no en máquina local'
    );
  }

  return sacrifices.slice(0, 3);
}

export function generateAlternatives(
  candidates: { tool: Tool; breakdown: ScoreBreakdown }[],
  selectedTool: Tool,
  constraints: UserConstraints,
  lang: 'es' | 'en' = 'es'
): AlternativeOption[] {
  // Filtrar las que no sean la herramienta seleccionada y ordenar por score
  const others = candidates
    .filter((c) => c.tool.id !== selectedTool.id)
    .sort((a, b) => b.breakdown.finalScore - a.breakdown.finalScore);

  return others.slice(0, 3).map(({ tool, breakdown }) => {
    const locTool = getLocalizedTool(tool, lang);
    const locSelected = getLocalizedTool(selectedTool, lang);
    const deltaPrice = locTool.pricing.startingPricePerMonthUSD - locSelected.pricing.startingPricePerMonthUSD;
    let reason = '';

    if (deltaPrice < 0) {
      reason =
        lang === 'en'
          ? `More affordable ($${Math.abs(deltaPrice)}/mo less), but ${locTool.whatItDoesNotDo[0] || 'fewer features'}`
          : `Más económica ($${Math.abs(deltaPrice)}/mes menos), pero ${locTool.whatItDoesNotDo[0] || 'con menos funciones'}`;
    } else if (deltaPrice > 0) {
      const budgetWarning =
        locTool.pricing.startingPricePerMonthUSD > constraints.maxMonthlyBudgetUSD
          ? lang === 'en'
            ? ' (exceeds budget)'
            : ' (supera presupuesto)'
          : '';
      reason =
        lang === 'en'
          ? `Higher capability in ${locTool.whatItDoesBest[0] || 'features'}${budgetWarning}, with additional cost of +$${deltaPrice}/mo`
          : `Mayor potencia en ${locTool.whatItDoesBest[0] || 'detalles'}${budgetWarning}, con costo adicional de +$${deltaPrice}/mes`;
    } else {
      reason =
        lang === 'en'
          ? `Equivalent alternative focused on ${locTool.category}`
          : `Alternativa equivalente enfocada en ${locTool.category}`;
    }

    const curveDiff =
      locTool.technicalLevelRequired !== locSelected.technicalLevelRequired
        ? lang === 'en'
          ? `${locTool.technicalLevelRequired} curve`
          : `Curva ${locTool.technicalLevelRequired}`
        : lang === 'en'
          ? 'Same curve'
          : 'Misma curva';

    return {
      tool: locTool,
      matchScore: breakdown.finalScore,
      reason,
      deltaBudgetUSD: deltaPrice,
      deltaLearningCurve: curveDiff,
    };
  });
}
