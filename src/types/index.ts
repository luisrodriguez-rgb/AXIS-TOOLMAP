export type TechnicalLevel = 'none' | 'low' | 'medium' | 'high';
export type OperatingSystem = 'mac' | 'windows' | 'linux' | 'web' | 'ios' | 'android';
export type BillingModel = 'free' | 'freemium' | 'subscription' | 'usage-based' | 'one-time';
export type PrivacyLevel = 'public_cloud' | 'enterprise_cloud' | 'local_only' | 'zero_data_retention';

export type DeliverableType =
  | 'presentation'
  | 'report'
  | 'visualization'
  | 'code'
  | 'render'
  | 'dashboard'
  | 'concept'
  | 'cad_plan'
  | 'bim_model'
  | 'structural_calc'
  | 'cfd_simulation'
  | 'pcb_schematic'
  | 'interactive_prototype'
  | 'computational_notebook'
  | 'financial_model'
  | 'design_system'
  | 'video_master'
  | 'motion_graphics'
  | 'latex_manuscript'
  | 'bib_matrix'
  | 'api_spec'
  | 'journey_map'
  | 'prd_spec'
  | 'security_audit'
  | 'docker_infra'
  | 'environmental_study'
  | 'construction_schedule'
  | 'bom_estimate'
  | 'gis_map'
  | 'brand_guidelines'
  | 'clinical_protocol'
  | 'c4_architecture';

export type WorkflowStageId =
  | 'ingest_research'
  | 'model_process'
  | 'refine_format'
  | 'present_deliver';

export interface WorkflowStage {
  id: WorkflowStageId;
  title: string;
  stepNumber: number;
  description: string;
}

export interface ToolCapability {
  handlesPDF: boolean;
  generatesImages: boolean;
  generatesCode: boolean;
  symbolicMath: boolean;
  interactiveCollaboration: boolean;
  vectorExport: boolean;
  citationsEnabled: boolean;
  dataAnalysis: boolean;
  voiceAudio: boolean;
  presentationBuilder: boolean;
  cad3DModeling: boolean;
  offlineSupport: boolean;
}

export interface Tool {
  id: string;
  name: string;
  tagline: string;
  slug: string;
  websiteUrl: string;
  isNativeAI: boolean;
  category:
    | 'research'
    | 'calculation'
    | 'design_visual'
    | 'presentation'
    | 'data_analysis'
    | 'drafting_3d'
    | 'productivity';
  pricing: {
    hasFreeTier: boolean;
    freeTierDetails?: string;
    startingPricePerMonthUSD: number;
    billingModel: BillingModel;
  };
  platforms: OperatingSystem[];
  technicalLevelRequired: TechnicalLevel;
  privacyLevel: PrivacyLevel;
  capabilities: ToolCapability;
  whatItDoesBest: string[];
  whatItDoesNotDo: string[];
  integrations: string[];
  supportedStages: WorkflowStageId[];
  isOpenSource?: boolean;
  githubRepo?: string;
  license?: string;
  fossAlternativeTo?: string[];
  evidence?: ToolEvidence;
}

export interface ToolEvidence {
  pricingVerifiedAt: string;
  pricingModel: BillingModel;
  pricingRegion: string;
  platformsSupported: OperatingSystem[];
  dataSovereigntyGrade: 'local_first' | 'cloud_encrypted' | 'cloud_proprietary';
  evidenceSource: string;
  lastReviewed: string;
  confidence: 'high' | 'medium' | 'low';
}

export type DataFrictionState = 'automatic' | 'one_click' | 'manual' | 'unsupported';
export type DataFidelityLoss = 'full' | 'partial' | 'lossy';

export interface HardConstraints {
  os?: OperatingSystem | 'any';
  maxBudgetUSD?: number;
  requiresLocalData?: boolean;
  requiredDeliverable?: DeliverableType;
}

export interface SoftPreferences {
  preferLowLearningCurve?: boolean;
  preferCollaboration?: boolean;
  preferAiAssisted?: boolean;
  preferOpenSource?: boolean;
  preferOffline?: boolean;
}

export interface PersonaProfile {
  id: string;
  label: string;
  role: string;
  domain: string;
  domainGroup?: 'AEC' | 'ING' | 'TECH' | 'DATA' | 'DESIGN' | 'SCIENCE' | 'BIZ';
  relevantWorkCodes?: string[];
  relevantDeliverableCodes?: string[];
  technicalLevel: TechnicalLevel;
  os: OperatingSystem[];
  activeTools: string[];
  avatarIcon: string;
  description: string;
  sampleNeeds: {
    label: string;
    query: string;
    deliverable: DeliverableType;
    budget: number;
  }[];
}

export interface UserConstraints {
  maxMonthlyBudgetUSD: number;
  os: OperatingSystem | 'any';
  strictPrivacy: boolean;
  maxLearningCurve: TechnicalLevel;
  requiresSpanish: boolean;
  mustIntegrateWith?: string[];
  softPreferences?: SoftPreferences;
}

export interface UserWorkflowQuery {
  persona: {
    primaryRole: string;
    technicalLevel: TechnicalLevel;
    os: OperatingSystem[];
    activeTools: string[];
    domainGroup?: string;
  };
  needText: string;
  deliverableType: DeliverableType;
  constraints: UserConstraints;
  lang?: 'es' | 'en';
}

export interface AlternativeOption {
  tool: Tool;
  matchScore: number;
  reason: string;
  deltaBudgetUSD: number;
  deltaLearningCurve: string;
}

export interface StageRecommendation {
  stage: WorkflowStage;
  selectedTool: Tool;
  matchScore: number;
  scoreBreakdown: {
    taskFit: number;
    frictionFactor: number;
    constraintCompliance: number;
    ecosystemSynergy: number;
  };
  whyThisTool: string[];
  tradeOffs: string[];
  alternatives: AlternativeOption[];
}

export interface StackRecommendation {
  stages: StageRecommendation[];
  totalEstimatedMonthlyCostUSD: number;
  overallFitScore: number;
  ecosystemSynergyScore: number;
  learningCurveOverall: TechnicalLevel;
  keyStackTradeOff: string;
}
