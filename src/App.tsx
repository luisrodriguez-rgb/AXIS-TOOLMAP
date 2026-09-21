import React, { useState, useMemo, useEffect } from 'react';
import './styles/base.css';
import './styles/components.css';
import './styles/visual-canvas.css';
import { TOOLS_DATASET } from './data/tools';
import { PERSONA_PRESETS } from './data/presets';
import type {
  PersonaProfile,
  DeliverableType,
  UserConstraints,
  UserWorkflowQuery,
  WorkflowStageId,
  StageRecommendation,
} from './types';
import type { Language } from './i18n/translations';
import { Header, type ActiveTab } from './components/Header';
import { IntentInstrument } from './components/IntentInstrument';
import { WorkflowMap } from './components/WorkflowMap';
import { ToolArchiveTable } from './components/ToolArchiveTable';
import { TradeOffInspector } from './components/TradeOffInspector';
import { InteractiveWorkflowCanvas } from './components/InteractiveWorkflowCanvas';
import { synthesizeTriadRoutes, type RouteId } from './engine/routeSynthesizer';

export const App: React.FC = () => {
  // 1. Estado de Tema (Dark Mode / Light Mode)
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // 2. Estado de Idioma (Español / English)
  const [lang, setLang] = useState<Language>('es');

  // 3. Sincronizar data-theme en el documento HTML
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  // 4. Navegación activa (01 DISCOVER / 02 WORKFLOW MAP / 03 ARCHIVE)
  const [activeTab, setActiveTab] = useState<ActiveTab>('discover');

  // 5. Estado de Perfil Inicial (Arquitecto Residencial por defecto)
  const [activePersona, setActivePersona] = useState<PersonaProfile>(PERSONA_PRESETS[1]);
  const [needText, setNeedText] = useState<string>(activePersona.sampleNeeds[0].query);
  const [deliverableType, setDeliverableType] = useState<DeliverableType>(
    activePersona.sampleNeeds[0].deliverable
  );

  // 6. Estado de Restricciones
  const [constraints, setConstraints] = useState<UserConstraints>({
    maxMonthlyBudgetUSD: 30,
    os: 'mac',
    strictPrivacy: false,
    maxLearningCurve: 'none',
    requiresSpanish: true,
  });

  // 7. Sustituciones manuales (Swap)
  const [manualOverrides, setManualOverrides] = useState<Record<WorkflowStageId, string>>(
    {} as Record<WorkflowStageId, string>
  );

  // 8. Modal de Inspección de Trade-offs
  const [inspectedStage, setInspectedStage] = useState<StageRecommendation | null>(null);

  // 9. Estado de Ruta Activa de la Tríada de Decisión
  const [currentRouteId, setCurrentRouteId] = useState<RouteId>('recommended');

  // 10. Manejador de cambio de Preset
  const handleSelectPreset = (preset: PersonaProfile) => {
    setActivePersona(preset);
    setManualOverrides({} as Record<WorkflowStageId, string>);
    if (preset.sampleNeeds.length > 0) {
      setNeedText(preset.sampleNeeds[0].query);
      setDeliverableType(preset.sampleNeeds[0].deliverable);
      setConstraints((prev) => ({
        ...prev,
        maxMonthlyBudgetUSD: preset.sampleNeeds[0].budget,
        os: preset.os[0] || 'any',
        maxLearningCurve: preset.technicalLevel,
      }));
    }
  };

  // 11. Manejador de Swap (Sustitución de herramienta en una etapa)
  const handleSwapTool = (stageId: WorkflowStageId, newToolId: string) => {
    setManualOverrides((prev) => ({
      ...prev,
      [stageId]: newToolId,
    }));
  };

  // 12. Cálculo reactivo e instantáneo de la Tríada de Rutas de Decisión
  const currentQuery: UserWorkflowQuery = useMemo(() => {
    return {
      persona: {
        primaryRole: activePersona.role,
        technicalLevel: activePersona.technicalLevel,
        os: activePersona.os,
        activeTools: activePersona.activeTools,
        domainGroup: activePersona.domainGroup,
      },
      needText,
      deliverableType,
      constraints,
      lang,
    };
  }, [activePersona, needText, deliverableType, constraints, lang]);

  const routes = useMemo(() => {
    return synthesizeTriadRoutes(currentQuery, TOOLS_DATASET, manualOverrides);
  }, [currentQuery, manualOverrides]);

  const activeStack = routes[currentRouteId].stack;

  return (
    <div className="app-container" data-theme={theme}>
      {/* Header con navegación de índice, Dark Mode y selector de idioma */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        toolCount={TOOLS_DATASET.length}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      <main>
        {activeTab === 'discover' && (
          <>
            {/* 01 / DISCOVER: Instrumento de Entrada + Matriz Suiza 3-Columnas */}
            <IntentInstrument
              needText={needText}
              onNeedTextChange={setNeedText}
              selectedDeliverable={deliverableType}
              onDeliverableChange={setDeliverableType}
              activePersona={activePersona}
              onSelectPreset={handleSelectPreset}
              allPresets={PERSONA_PRESETS}
              constraints={constraints}
              onChangeConstraints={setConstraints}
              onMapWork={() => setActiveTab('workflow')}
              lang={lang}
            />
          </>
        )}

        {activeTab === 'workflow' && (
          <>
            {/* 02 / WORKFLOW MAP: Canvas Interactivo de Tríada de Rutas */}
            <InteractiveWorkflowCanvas
              currentRouteId={currentRouteId}
              onSelectRoute={setCurrentRouteId}
              routes={routes}
              activeStack={activeStack}
              onOpenInspector={(rec) => setInspectedStage(rec)}
              lang={lang}
              domainGroup={activePersona.domainGroup}
            />

            {/* Desglose editorial paso a paso con opciones de swap */}
            <div style={{ marginTop: '36px' }}>
              <WorkflowMap
                stack={activeStack}
                onOpenInspector={(rec) => setInspectedStage(rec)}
                lang={lang}
              />
            </div>
          </>
        )}

        {activeTab === 'archive' && (
          <>
            {/* 03 / ARCHIVE: Catálogo denso y matriz de búsqueda con logos vectoriales */}
            <ToolArchiveTable tools={TOOLS_DATASET} lang={lang} />
          </>
        )}
      </main>

      {/* Modal / Inspector de Trade-offs y Swaps con hoja de especificación técnica */}
      <TradeOffInspector
        recommendation={inspectedStage}
        onClose={() => setInspectedStage(null)}
        onSwapTool={handleSwapTool}
        lang={lang}
      />
    </div>
  );
};

export default App;

