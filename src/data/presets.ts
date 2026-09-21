import type { PersonaProfile } from '../types';

export const PERSONA_PRESETS: PersonaProfile[] = [
  // ==========================================
  // 1. AEC, ARQUITECTURA & CONSTRUCCIÓN
  // ==========================================
  {
    id: 'architect',
    label: 'Arquitecto Residencial & Urbanista',
    role: 'Arquitecto',
    domain: 'Arquitectura, BIM & Construcción',
    domainGroup: 'AEC',
    relevantWorkCodes: ['002', '003', '004', '023'],
    relevantDeliverableCodes: ['003', '004', '005', '001', '002'],
    technicalLevel: 'medium',
    os: ['mac', 'windows'],
    activeTools: ['archicad', 'rhino', 'figma'],
    avatarIcon: 'Compass',
    description:
      'Desarrolla proyectos arquitectónicos y ejecutivos. Maneja modelos BIM, planos, geometrías complejas y renders fotorrealistas con presupuestos profesionales.',
    sampleNeeds: [
      {
        label: 'Propuesta Conceptual y Renders de Fachada',
        query:
          'Tengo bocetos a mano y planos en PDF de una casa campestre. Necesito generar renders conceptuales de fachada y montar una presentación ejecutiva para convencer al cliente.',
        deliverable: 'presentation',
        budget: 60,
      },
      {
        label: 'Investigación de Normativa y Memoria Descriptiva',
        query:
          'Tengo 8 documentos PDF del plan de ordenamiento territorial municipal y necesito redactar la memoria descriptiva citando exactamente los artículos de norma aplicables.',
        deliverable: 'report',
        budget: 20,
      },
    ],
  },
  {
    id: 'civil-engineer',
    label: 'Ingeniero Civil / Estructural',
    role: 'Ingeniero Civil',
    domain: 'Ingeniería Estructural & Cálculo',
    domainGroup: 'AEC',
    relevantWorkCodes: ['003', '005', '023', '032'],
    relevantDeliverableCodes: ['003', '007', '026', '027', '002'],
    technicalLevel: 'high',
    os: ['windows', 'mac'],
    activeTools: ['autocad', 'excel', 'matlab'],
    avatarIcon: 'Cpu',
    description:
      'Diseña y calcula estructuras de hormigón y acero. Requiere modelado CAD preciso, análisis de elementos finitos y memorias de cálculo auditables.',
    sampleNeeds: [
      {
        label: 'Cálculo Estructural y Visualización de Esfuerzos',
        query:
          'Necesito calcular y simular diagramas de momento flector y deformación en vigas continuas de acero con gráficos 3D precisos y memoria técnica.',
        deliverable: 'structural_calc',
        budget: 150,
      },
      {
        label: 'Planos de Encofrado y Cuantía de Armaduras',
        query:
          'Generar planos técnicos 2D detallados con cotas y planillas de despiece de armaduras a partir de un modelo geométrico.',
        deliverable: 'cad_plan',
        budget: 100,
      },
    ],
  },
  {
    id: 'construction-manager',
    label: 'Gerente de Construcción & Director de Obra',
    role: 'Gerente de Construcción',
    domain: 'AEC & Gestión de Obras',
    domainGroup: 'AEC',
    relevantWorkCodes: ['023', '003', '014', '031'],
    relevantDeliverableCodes: ['026', '027', '002', '001'],
    technicalLevel: 'medium',
    os: ['windows', 'mac'],
    activeTools: ['procore', 'excel', 'revit'],
    avatarIcon: 'Briefcase',
    description:
      'Supervisa la ejecución en campo, control de subcontratos, RFIs, certificaciones de avance y coordinación del modelo BIM constructivo.',
    sampleNeeds: [
      {
        label: 'Control de Avance y Cronograma de Obra',
        query:
          'Coordinar el modelo BIM con el cronograma de obra de 12 meses y generar reportes ejecutivos semanales de desvíos para el comité de obra.',
        deliverable: 'construction_schedule',
        budget: 180,
      },
      {
        label: 'Cómputo Métrico y Presupuesto de Materiales',
        query:
          'Extraer cantidades de obra y mediciones automáticas del modelo para armar el pliego de compras y presupuesto de hormigón y acero.',
        deliverable: 'bom_estimate',
        budget: 90,
      },
    ],
  },
  {
    id: 'gis-specialist',
    label: 'Especialista GIS, Topografía & Geodesia',
    role: 'Especialista GIS',
    domain: 'Geomática, Topografía & Territorio',
    domainGroup: 'AEC',
    relevantWorkCodes: ['028', '003', '011', '013'],
    relevantDeliverableCodes: ['028', '003', '002', '013'],
    technicalLevel: 'high',
    os: ['windows', 'linux'],
    activeTools: ['civil-3d', 'python', 'excel'],
    avatarIcon: 'Layers',
    description:
      'Procesa nubes de puntos LiDAR, modelos digitales de elevación (DEM), ortofotos y capas vectoriales territoriales para planificación física.',
    sampleNeeds: [
      {
        label: 'Análisis de Pendientes y Cuencas Hidrográficas',
        query:
          'Generar curvas de nivel y mapa de pendientes a partir de un archivo LiDAR LAS para delimitar áreas inundables y zonas de riesgo.',
        deliverable: 'gis_map',
        budget: 75,
      },
      {
        label: 'Trazado Topográfico y Rasantes de Corredor',
        query:
          'Diseñar el alineamiento horizontal y perfil longitudinal de una vía rural calculando volúmenes de corte y relleno.',
        deliverable: 'cad_plan',
        budget: 120,
      },
    ],
  },

  // ==========================================
  // 2. INGENIERÍA TRADICIONAL & HARD-TECH
  // ==========================================
  {
    id: 'mechanical-engineer',
    label: 'Ingeniero Mecánico & Automotriz',
    role: 'Ingeniero Mecánico',
    domain: 'Diseño Mecánico & Simulación CAE',
    domainGroup: 'ING',
    relevantWorkCodes: ['002', '005', '006', '023'],
    relevantDeliverableCodes: ['003', '007', '008', '006', '002'],
    technicalLevel: 'high',
    os: ['windows'],
    activeTools: ['solidworks', 'catia', 'ansys'],
    avatarIcon: 'Cpu',
    description:
      'Diseña componentes mecánicos, ensamblajes industriales, sistemas de transmisión y valida esfuerzos térmicos y dinámicos mediante CAE.',
    sampleNeeds: [
      {
        label: 'Diseño de Reductor y Validación FEA',
        query:
          'Diseñar ensamble de caja reductora con engranajes helicoidales y validar tensiones de Von Mises en los ejes sometidos a fatiga.',
        deliverable: 'structural_calc',
        budget: 200,
      },
      {
        label: 'Planos de Fabricación y Tolerancias GD&T',
        query:
          'Generar planos técnicos de mecanizado CNC con tolerancias geométricas y dimensionales normalizadas según ISO 1101.',
        deliverable: 'cad_plan',
        budget: 80,
      },
    ],
  },
  {
    id: 'electrical-engineer',
    label: 'Ingeniero Electrónico & Hardware (PCB)',
    role: 'Ingeniero Electrónico',
    domain: 'Electrónica, Circuitos & Embebidos',
    domainGroup: 'ING',
    relevantWorkCodes: ['007', '005', '032', '010'],
    relevantDeliverableCodes: ['009', '010', '007', '002'],
    technicalLevel: 'high',
    os: ['windows', 'linux'],
    activeTools: ['altium', 'kicad', 'matlab'],
    avatarIcon: 'Cpu',
    description:
      'Desarrolla sistemas embebidos, esquemáticos analógicos/digitales, diseño de placas multicapa de alta velocidad y análisis de integridad de señal.',
    sampleNeeds: [
      {
        label: 'Diseño de PCB de 4 Capas con MCU ARM',
        query:
          'Crear esquemático y ruteo de circuito impreso para microcontrolador STM32 con transceiver CAN bus y fuente switching de bajo ruido.',
        deliverable: 'pcb_schematic',
        budget: 120,
      },
      {
        label: 'Simulación de Filtros Activos y Respuesta en Frecuencia',
        query:
          'Calcular y simular la respuesta en magnitud y fase de un filtro Butterworth pasa-bajos de 4to orden antes de fabricación.',
        deliverable: 'visualization',
        budget: 40,
      },
    ],
  },
  {
    id: 'industrial-engineer',
    label: 'Ingeniero Industrial & Operaciones',
    role: 'Ingeniero Industrial',
    domain: 'Optimización, Cadena de Suministro & Lean',
    domainGroup: 'ING',
    relevantWorkCodes: ['014', '023', '031', '011'],
    relevantDeliverableCodes: ['012', '026', '027', '014', '002'],
    technicalLevel: 'medium',
    os: ['windows', 'mac'],
    activeTools: ['excel', 'power-bi', 'python'],
    avatarIcon: 'Layers',
    description:
      'Optimiza cadenas de suministro, equilibra líneas de producción, reduce mermas y modela sistemas de colas y logística industrial.',
    sampleNeeds: [
      {
        label: 'Simulación de Capacidad y Tiempos de Ciclo',
        query:
          'Modelar el flujo de materiales en una planta de ensamblaje para identificar cuellos de botella y balancear la línea de trabajo.',
        deliverable: 'dashboard',
        budget: 70,
      },
      {
        label: 'Pronóstico de Demanda y Gestión de Inventarios',
        query:
          'Desarrollar un modelo de series temporales para predecir la demanda de 500 SKUs y calcular stocks de seguridad óptimos.',
        deliverable: 'financial_model',
        budget: 50,
      },
    ],
  },
  {
    id: 'chemical-engineer',
    label: 'Ingeniero Químico & Procesos',
    role: 'Ingeniero Químico',
    domain: 'Ingeniería de Procesos & Termodinámica',
    domainGroup: 'ING',
    relevantWorkCodes: ['006', '011', '032', '013'],
    relevantDeliverableCodes: ['008', '013', '002', '007'],
    technicalLevel: 'high',
    os: ['windows', 'linux'],
    activeTools: ['openfoam', 'matlab', 'excel'],
    avatarIcon: 'Cpu',
    description:
      'Modela reactores, columnas de destilación, balances de materia y energía y fenómenos de transporte fluidodinámicos en plantas químicas.',
    sampleNeeds: [
      {
        label: 'Simulación CFD de Mezclador Estático',
        query:
          'Simular la hidrodinámica y pérdida de carga de un fluido no newtoniano en un mezclador estático industrial mediante CFD.',
        deliverable: 'cfd_simulation',
        budget: 160,
      },
      {
        label: 'Balance de Materia y Energía en Estado Estacionario',
        query:
          'Elaborar el diagrama de flujo de procesos (PFD) y balance integral de calor para una caldera de biomasa de 5 MW.',
        deliverable: 'report',
        budget: 90,
      },
    ],
  },
  {
    id: 'biomedical-engineer',
    label: 'Ingeniero Biomédico & Bioingeniería',
    role: 'Ingeniero Biomédico',
    domain: 'Tecnología Médica & Biomecánica',
    domainGroup: 'ING',
    relevantWorkCodes: ['002', '007', '013', '020'],
    relevantDeliverableCodes: ['009', '030', '013', '002'],
    technicalLevel: 'high',
    os: ['windows', 'mac'],
    activeTools: ['matlab', 'solidworks', 'comsol'],
    avatarIcon: 'Cpu',
    description:
      'Desarrolla instrumental médico, implantes ortopédicos biocompatibles, procesamiento de señales fisiológicas y normativas FDA/CE.',
    sampleNeeds: [
      {
        label: 'Diseño de Prótesis y Análisis de Esfuerzos en Hueso',
        query:
          'Modelar una prótesis de cadera en titanio y evaluar la transferencia de cargas en el fémur mediante simulación biomecánica.',
        deliverable: 'structural_calc',
        budget: 180,
      },
      {
        label: 'Filtrado y Procesamiento de Señal ECG',
        query:
          'Diseñar un pipeline de procesamiento digital para eliminar artefactos respiratorios en señales electrocardiográficas de 12 derivaciones.',
        deliverable: 'visualization',
        budget: 60,
      },
    ],
  },
  {
    id: 'environmental-engineer',
    label: 'Ingeniero Ambiental & Sostenibilidad',
    role: 'Ingeniero Ambiental',
    domain: 'Sostenibilidad, Aguas & Huella de Carbono',
    domainGroup: 'ING',
    relevantWorkCodes: ['028', '011', '013', '023'],
    relevantDeliverableCodes: ['025', '028', '002', '012'],
    technicalLevel: 'medium',
    os: ['mac', 'windows'],
    activeTools: ['excel', 'python', 'notion'],
    avatarIcon: 'Layers',
    description:
      'Calcula huellas de carbono corporativas (Scope 1, 2, 3), modela dispersión de contaminantes y diseña plantas de tratamiento de agua.',
    sampleNeeds: [
      {
        label: 'Estudio de Impacto Ambiental y Matriz de Riesgos',
        query:
          'Redactar la evaluación de impacto ambiental de una planta fotovoltaica evaluando fauna, hidrología y matriz de mitigación.',
        deliverable: 'environmental_study',
        budget: 80,
      },
      {
        label: 'Dashboard Corporativo de Emisiones ESG',
        query:
          'Integrar el consumo eléctrico y de combustible de 15 sucursales para generar el informe de sostenibilidad bajo estándares GRI.',
        deliverable: 'dashboard',
        budget: 60,
      },
    ],
  },

  // ==========================================
  // 3. SOFTWARE, CLOUD & DEVSECOPS
  // ==========================================
  {
    id: 'software-engineer',
    label: 'Ingeniero de Software / Fullstack',
    role: 'Ingeniero de Software',
    domain: 'Desarrollo de Software & Arquitectura Web',
    domainGroup: 'TECH',
    relevantWorkCodes: ['008', '009', '010', '030'],
    relevantDeliverableCodes: ['010', '020', '031', '024'],
    technicalLevel: 'high',
    os: ['mac', 'linux'],
    activeTools: ['cursor', 'vs-code', 'docker'],
    avatarIcon: 'Code',
    description:
      'Construye sistemas backend, frontend y APIs. Necesita agentes de código inteligentes, testing automatizado y arquitectura de datos escalable.',
    sampleNeeds: [
      {
        label: 'Prototipo Fullstack con Base de Datos y Auth',
        query:
          'Necesito desarrollar un MVP funcional con autenticación, base de datos PostgreSQL y frontend moderno en TypeScript con despliegue en la nube.',
        deliverable: 'code',
        budget: 40,
      },
      {
        label: 'Especificación de Arquitectura y APIs OpenAPI',
        query:
          'Diseñar la arquitectura de microservicios, contratos de API OpenAPI y modelo de datos relacional para una plataforma transaccional.',
        deliverable: 'api_spec',
        budget: 20,
      },
    ],
  },
  {
    id: 'devops-engineer',
    label: 'Ingeniero DevOps & Cloud Infrastructure',
    role: 'Ingeniero DevOps',
    domain: 'Infraestructura Cloud, CI/CD & Kubernetes',
    domainGroup: 'TECH',
    relevantWorkCodes: ['027', '026', '008', '010'],
    relevantDeliverableCodes: ['024', '031', '023', '010'],
    technicalLevel: 'high',
    os: ['linux', 'mac'],
    activeTools: ['docker', 'vs-code', 'github-copilot'],
    avatarIcon: 'Terminal',
    description:
      'Automatiza pipelines de despliegue continuo (CI/CD), orquesta clústeres de contenedores y administra infraestructura como código (Terraform).',
    sampleNeeds: [
      {
        label: 'Pipeline CI/CD y Despliegue Multi-Entorno',
        query:
          'Configurar flujos de GitHub Actions con pruebas automáticas, escaneo de seguridad y despliegue a clúster Kubernetes sin tiempo de inactividad.',
        deliverable: 'docker_infra',
        budget: 90,
      },
      {
        label: 'Diagrama de Arquitectura de Nube C4',
        query:
          'Diagramar la topología de red en AWS con balanceadores, zonas privadas y replicación de base de datos para auditoría SOC2.',
        deliverable: 'c4_architecture',
        budget: 35,
      },
    ],
  },
  {
    id: 'cybersecurity-analyst',
    label: 'Analista de Ciberseguridad & DevSecOps',
    role: 'Analista de Ciberseguridad',
    domain: 'Seguridad Ofensiva, Defensiva & Compliance',
    domainGroup: 'TECH',
    relevantWorkCodes: ['026', '010', '008', '027'],
    relevantDeliverableCodes: ['023', '002', '010', '031'],
    technicalLevel: 'high',
    os: ['linux', 'mac'],
    activeTools: ['sentry', 'python', 'vs-code'],
    avatarIcon: 'Terminal',
    description:
      'Evalúa vulnerabilidades en aplicaciones, audita dependencias de software (SCA/SAST) y diseña políticas de respuesta ante incidentes.',
    sampleNeeds: [
      {
        label: 'Auditoría de Seguridad y Reporte de Vulnerabilidades',
        query:
          'Escanear el código fuente de una API REST para detectar riesgos OWASP Top 10, credenciales expuestas y fallos de autenticación.',
        deliverable: 'security_audit',
        budget: 110,
      },
      {
        label: 'Plan de Respuesta ante Incidentes y Políticas de Cero Confianza',
        query:
          'Elaborar el manual de contingencia ante ataques de ransomware y especificación de políticas de acceso con autenticación multifactor.',
        deliverable: 'report',
        budget: 50,
      },
    ],
  },

  // ==========================================
  // 4. DATOS, ANALÍTICA & CIENCIA CUANTITATIVA
  // ==========================================
  {
    id: 'data-scientist',
    label: 'Científico de Datos / Machine Learning',
    role: 'Científico de Datos',
    domain: 'Business Intelligence & Machine Learning',
    domainGroup: 'DATA',
    relevantWorkCodes: ['011', '012', '013', '020'],
    relevantDeliverableCodes: ['013', '012', '002', '010'],
    technicalLevel: 'high',
    os: ['mac', 'linux', 'windows'],
    activeTools: ['power-bi', 'excel', 'tableau'],
    avatarIcon: 'Database',
    description:
      'Extrae valor de grandes volúmenes de datos. Construye modelos estadísticos, pipelines ETL y dashboards interactivos para toma de decisiones ejecutivas.',
    sampleNeeds: [
      {
        label: 'Dashboard Ejecutivo en Tiempo Real',
        query:
          'Conectar múltiples fuentes de datos SQL y Google Sheets en un dashboard ejecutivo interactivo con KPIs de ventas, margen y predicción trimestral.',
        deliverable: 'dashboard',
        budget: 80,
      },
      {
        label: 'Cuaderno de Análisis Predictivo y Clustering',
        query:
          'Realizar segmentación de clientes mediante algoritmos de clustering y generar visualizaciones claras de los grupos en un notebook reproducible.',
        deliverable: 'computational_notebook',
        budget: 50,
      },
    ],
  },
  {
    id: 'financial-analyst',
    label: 'Analista Financiero & Finanzas Cuantitativas',
    role: 'Analista Financiero',
    domain: 'Finanzas Corporativas, M&A & Trading',
    domainGroup: 'DATA',
    relevantWorkCodes: ['015', '014', '013', '029'],
    relevantDeliverableCodes: ['014', '012', '001', '002'],
    technicalLevel: 'medium',
    os: ['windows', 'mac'],
    activeTools: ['excel', 'power-bi', 'python'],
    avatarIcon: 'Database',
    description:
      'Construye modelos de valoración de empresas (DCF), análisis de sensibilidad económica, proyecciones de flujo de caja y carteras de inversión.',
    sampleNeeds: [
      {
        label: 'Modelo DCF y Análisis de Sensibilidad Monte Carlo',
        query:
          'Construir un modelo financiero en Excel con supuestos macroeconómicos, flujo de caja descontado y simulación Monte Carlo de tasas de interés.',
        deliverable: 'financial_model',
        budget: 95,
      },
      {
        label: 'Dashboard de Rentabilidad y Control de Presupuesto',
        query:
          'Crear un tablero en Power BI que compare el gasto real versus presupuestado por centro de costos y calcule variaciones porcentuales.',
        deliverable: 'dashboard',
        budget: 65,
      },
    ],
  },
  {
    id: 'applied-mathematician',
    label: 'Matemático Aplicado & Modelador Cuantitativo',
    role: 'Matemático Aplicado',
    domain: 'Matemática Computacional & Optimización',
    domainGroup: 'DATA',
    relevantWorkCodes: ['032', '012', '013', '020'],
    relevantDeliverableCodes: ['013', '018', '007', '002'],
    technicalLevel: 'high',
    os: ['linux', 'mac'],
    activeTools: ['matlab', 'wolfram-alpha', 'python'],
    avatarIcon: 'Cpu',
    description:
      'Resuelve problemas de optimización combinatoria, sistemas dinámicos no lineales, ecuaciones diferenciales parciales y cálculo simbólico.',
    sampleNeeds: [
      {
        label: 'Modelado de Sistema Dinámico y Espacio de Fases',
        query:
          'Resolver numéricamente un sistema de ecuaciones diferenciales no lineales y trazar el espacio de fases en 3D con atractores extraños.',
        deliverable: 'visualization',
        budget: 130,
      },
      {
        label: 'Algoritmo de Optimización de Rutas Logísticas',
        query:
          'Implementar un modelo de programación lineal entera mixta (MILP) para minimizar distancias de reparto con ventanas de tiempo.',
        deliverable: 'code',
        budget: 45,
      },
    ],
  },
  {
    id: 'econometrician',
    label: 'Economista & Analista Econométrico',
    role: 'Economista',
    domain: 'Macroeconomía, Políticas Públicas & Econometría',
    domainGroup: 'DATA',
    relevantWorkCodes: ['011', '013', '015', '020'],
    relevantDeliverableCodes: ['013', '014', '018', '002'],
    technicalLevel: 'high',
    os: ['mac', 'windows', 'linux'],
    activeTools: ['rstudio', 'matlab', 'overleaf'],
    avatarIcon: 'Database',
    description:
      'Estima modelos de regresión con datos de panel, series de tiempo macroeconómicas (VAR/ARIMA) y evalúa el impacto de políticas públicas.',
    sampleNeeds: [
      {
        label: 'Regresión de Discontinuidad y Evaluación de Impacto',
        query:
          'Estimar el impacto causal de un subsidio educativo usando un diseño de regresión discontinua con errores estándar robustos agrupados.',
        deliverable: 'computational_notebook',
        budget: 70,
      },
      {
        label: 'Informe Macroeconómico de Inflación y Tipo de Cambio',
        query:
          'Redactar un reporte de coyuntura macroeconómica integrando proyecciones econométricas de inflación con gráficos vectoriales para publicación.',
        deliverable: 'report',
        budget: 35,
      },
    ],
  },

  // ==========================================
  // 5. DISEÑO, ARTE & PRODUCCIÓN AUDIOVISUAL
  // ==========================================
  {
    id: 'ux-designer',
    label: 'Diseñador UI/UX & Producto Digital',
    role: 'Diseñador UI/UX',
    domain: 'Diseño de Interfaces & Sistemas Digitales',
    domainGroup: 'DESIGN',
    relevantWorkCodes: ['016', '025', '009', '024'],
    relevantDeliverableCodes: ['011', '021', '015', '022'],
    technicalLevel: 'medium',
    os: ['mac'],
    activeTools: ['figma', 'canva', 'midjourney'],
    avatarIcon: 'Palette',
    description:
      'Diseña experiencias digitales, sistemas de diseño (Design Systems), prototipos interactivos y activos visuales de alto impacto estético.',
    sampleNeeds: [
      {
        label: 'Sistema de Diseño y Prototipo Interactivo',
        query:
          'Necesito crear un Design System con tokens de diseño, componentes reutilizables y un prototipo navegable de alta fidelidad para testear con usuarios.',
        deliverable: 'design_system',
        budget: 45,
      },
      {
        label: 'Mapa de Experiencia y Customer Journey',
        query:
          'Mapear todos los puntos de contacto del usuario en un flujo de checkout de comercio electrónico identificando puntos de dolor y oportunidades.',
        deliverable: 'journey_map',
        budget: 30,
      },
    ],
  },
  {
    id: 'graphic-designer',
    label: 'Diseñador Gráfico & Identidad de Marca',
    role: 'Diseñador Gráfico',
    domain: 'Branding, Tipografía & Comunicación Visual',
    domainGroup: 'DESIGN',
    relevantWorkCodes: ['016', '004', '017', '029'],
    relevantDeliverableCodes: ['029', '001', '015', '004'],
    technicalLevel: 'low',
    os: ['mac', 'windows'],
    activeTools: ['adobe-illustrator', 'adobe-photoshop', 'figma'],
    avatarIcon: 'Palette',
    description:
      'Construye manuales de identidad visual, tipografías personalizadas, packaging impreso y material editorial con rigor tipográfico.',
    sampleNeeds: [
      {
        label: 'Manual de Identidad Visual y Guía Gráfica',
        query:
          'Crear el manual de normas gráficas completo para una nueva marca tecnológica: paleta de colores, tipografías suizas y usos correctos.',
        deliverable: 'brand_guidelines',
        budget: 55,
      },
      {
        label: 'Diseño de Packaging y Troqueles de Imprenta',
        query:
          'Preparar el archivo de arte final para una caja de producto con capas de barniz sectorizado, troquel y especificaciones de color CMYK.',
        deliverable: 'presentation',
        budget: 40,
      },
    ],
  },
  {
    id: 'industrial-designer',
    label: 'Diseñador Industrial & Producto Físico',
    role: 'Diseñador Industrial',
    domain: 'Diseño de Producto, Ergonomía & CMF',
    domainGroup: 'DESIGN',
    relevantWorkCodes: ['002', '004', '016', '023'],
    relevantDeliverableCodes: ['006', '004', '011', '003'],
    technicalLevel: 'medium',
    os: ['mac', 'windows'],
    activeTools: ['rhino', 'blender', 'vizcom'],
    avatarIcon: 'Palette',
    description:
      'Conceptualiza productos de consumo, carcasas ergonómicas de plástico inyectado y especifica materiales, acabados y texturas (CMF).',
    sampleNeeds: [
      {
        label: 'Bocetado Rápido y Renders de Concepto de Auriculares',
        query:
          'Convertir bocetos a mano de auriculares ergonómicos en renders fotorrealistas con iluminación de estudio y materiales metálicos.',
        deliverable: 'render',
        budget: 50,
      },
      {
        label: 'Superficies NURBS y Archivo STEP para Matriz de Inyección',
        query:
          'Modelar en 3D la carcasa con ángulos de desmolde de 1.5 grados y nervaduras internas lista para cotizar molde de inyección.',
        deliverable: 'visualization',
        budget: 90,
      },
    ],
  },
  {
    id: 'motion-designer',
    label: 'Animador 3D & Motion Designer',
    role: 'Motion Designer',
    domain: 'Motion Graphics, Animación 3D & VFX',
    domainGroup: 'DESIGN',
    relevantWorkCodes: ['017', '018', '019', '004'],
    relevantDeliverableCodes: ['017', '016', '004', '006'],
    technicalLevel: 'high',
    os: ['mac', 'windows'],
    activeTools: ['cinema-4d', 'adobe-after-effects', 'blender'],
    avatarIcon: 'Palette',
    description:
      'Crea animaciones comerciales, cabeceras de programas, cinemáticas 3D de producto y microinteracciones vectoriales dinámicas.',
    sampleNeeds: [
      {
        label: 'Teaser Comercial en 3D con Efectos MoGraph',
        query:
          'Animar un reloj inteligente en Cinema 4D despiezándose en el aire con iluminación volumétrica y postproducción en After Effects.',
        deliverable: 'motion_graphics',
        budget: 140,
      },
      {
        label: 'Microanimaciones UI en Formato Lottie',
        query:
          'Diseñar un set de 6 iconos animados vectoriales ligeros para estados de carga, confirmación y error en una aplicación móvil.',
        deliverable: 'code',
        budget: 35,
      },
    ],
  },
  {
    id: 'video-editor',
    label: 'Editor de Video & Colorista (Postproducción)',
    role: 'Editor de Video',
    domain: 'Cine, Televisión & Contenido Digital',
    domainGroup: 'DESIGN',
    relevantWorkCodes: ['018', '019', '017', '001'],
    relevantDeliverableCodes: ['016', '017', '001', '002'],
    technicalLevel: 'high',
    os: ['mac', 'windows'],
    activeTools: ['davinci-resolve', 'adobe-premiere', 'descript'],
    avatarIcon: 'Palette',
    description:
      'Edita piezas documentales y comerciales, realiza etalonaje de color profesional con curvas logarítmicas y mezcla de sonido estéreo.',
    sampleNeeds: [
      {
        label: 'Montaje y Etalonaje de Color para Spot Comercial',
        query:
          'Sincronizar tomas en formato Blackmagic RAW de dos cámaras, realizar corte rítmico, corrección de color cinemática y mezcla de audio.',
        deliverable: 'video_master',
        budget: 70,
      },
      {
        label: 'Edición Basada en Texto y Subtitulado Dinámico',
        query:
          'Editar una entrevista de 40 minutos eliminando pausas y muletillas directamente desde la transcripción y exportar subtítulos quemados.',
        deliverable: 'video_master',
        budget: 30,
      },
    ],
  },

  // ==========================================
  // 6. INVESTIGACIÓN, ACADEMIA & SALUD
  // ==========================================
  {
    id: 'academic-researcher',
    label: 'Investigador Académico & Científico',
    role: 'Investigador',
    domain: 'Ciencias, Academia & Publicaciones',
    domainGroup: 'SCIENCE',
    relevantWorkCodes: ['001', '020', '021', '013'],
    relevantDeliverableCodes: ['018', '019', '013', '002'],
    technicalLevel: 'medium',
    os: ['mac', 'linux'],
    activeTools: ['zotero', 'obsidian', 'overleaf'],
    avatarIcon: 'BookOpen',
    description:
      'Escribe artículos indexados (Q1/Q2) y tesis doctorales. Exige citas rigurosas, soberanía y privacidad de datos estricta, y rechaza alucinaciones.',
    sampleNeeds: [
      {
        label: 'Revisión Sistemática de Literatura y Citas Cruzadas',
        query:
          'Tengo 150 papers en PDF sobre nuevos materiales sostenibles. Necesito sintetizar el estado del arte con citas cruzadas exactas y total rigor bibliográfico.',
        deliverable: 'bib_matrix',
        budget: 25,
      },
      {
        label: 'Manuscrito LaTeX con Gráficos Vectoriales',
        query:
          'Preparar un manuscrito en formato IEEE/ACM en LaTeX con bibliografía BibTeX y figuras vectoriales de alta resolución para someter a revisión por pares.',
        deliverable: 'latex_manuscript',
        budget: 15,
      },
    ],
  },
  {
    id: 'clinical-researcher',
    label: 'Médico & Investigador Clínico',
    role: 'Investigador Clínico',
    domain: 'Medicina, Farmacia & Ensayos Clínicos',
    domainGroup: 'SCIENCE',
    relevantWorkCodes: ['021', '013', '001', '020'],
    relevantDeliverableCodes: ['030', '019', '002', '018'],
    technicalLevel: 'medium',
    os: ['mac', 'windows'],
    activeTools: ['zotero', 'excel', 'notion'],
    avatarIcon: 'BookOpen',
    description:
      'Conduce ensayos clínicos, sintetiza evidencia de ensayos aleatorizados (RCT), elabora protocolos de bioética y reporta reacciones adversas.',
    sampleNeeds: [
      {
        label: 'Protocolo de Ensayo Clínico y Análisis de Evidencia',
        query:
          'Estructurar un protocolo clínico fase III conforme a directrices CONSORT evaluando eficacia terapéutica y criterios de inclusión.',
        deliverable: 'clinical_protocol',
        budget: 65,
      },
      {
        label: 'Metaanálisis y Síntesis de Riesgo Relativo',
        query:
          'Sintetizar datos de 12 estudios clínicos para calcular el riesgo relativo acumulado con gráficos Forest Plot para publicación médica.',
        deliverable: 'report',
        budget: 40,
      },
    ],
  },
  {
    id: 'bioinformatician',
    label: 'Biólogo & Bioinformático',
    role: 'Bioinformático',
    domain: 'Genómica, Biología Computacional & Datos Ómicos',
    domainGroup: 'SCIENCE',
    relevantWorkCodes: ['011', '012', '013', '020'],
    relevantDeliverableCodes: ['013', '018', '010', '002'],
    technicalLevel: 'high',
    os: ['linux', 'mac'],
    activeTools: ['python', 'rstudio', 'docker'],
    avatarIcon: 'Cpu',
    description:
      'Procesa secuencias de ADN/ARN de nueva generación (NGS), realiza alineamiento genómico, análisis de expresión diferencial y plegamiento de proteínas.',
    sampleNeeds: [
      {
        label: 'Pipeline de Análisis de Expresión Diferencial ARN-Seq',
        query:
          'Procesar matrices de conteo de lecturas de ARN para identificar genes sobreexpresados con gráficos de volcán (Volcano Plot) y mapas de calor.',
        deliverable: 'computational_notebook',
        budget: 85,
      },
      {
        label: 'Modelado 3D de Interacción Ligando-Proteína',
        query:
          'Simular el acoplamiento molecular (docking) entre una pequeña molécula y el sitio activo de un receptor enzimático para cribado de fármacos.',
        deliverable: 'visualization',
        budget: 60,
      },
    ],
  },
  {
    id: 'technical-writer',
    label: 'Redactor Técnico & Documentalista',
    role: 'Redactor Técnico',
    domain: 'Documentación Técnica & Manuales de Ingeniería',
    domainGroup: 'SCIENCE',
    relevantWorkCodes: ['030', '001', '020', '024'],
    relevantDeliverableCodes: ['002', '020', '022', '032'],
    technicalLevel: 'medium',
    os: ['mac', 'linux', 'windows'],
    activeTools: ['notion', 'marp', 'obsidian'],
    avatarIcon: 'BookOpen',
    description:
      'Redacta manuales de operación, guías para desarrolladores, especificaciones de arquitectura y portales de documentación accesibles.',
    sampleNeeds: [
      {
        label: 'Portal de Documentación de Desarrollador Docs-as-Code',
        query:
          'Crear un sitio de documentación técnica en Markdown con ejemplos de código interactivos, búsqueda estática y diagramas Mermaid.',
        deliverable: 'report',
        budget: 20,
      },
      {
        label: 'Manual de Usuario con Capturas y Procedimientos Paso a Paso',
        query:
          'Elaborar el manual técnico de instalación y mantenimiento de un equipo industrial con diagramas explicativos y advertencias de seguridad.',
        deliverable: 'presentation',
        budget: 25,
      },
    ],
  },
  {
    id: 'educator',
    label: 'Docente Universitario & Pedagogo Digital',
    role: 'Docente',
    domain: 'Educación Superior & Diseño Instruccional',
    domainGroup: 'SCIENCE',
    relevantWorkCodes: ['001', '029', '020', '031'],
    relevantDeliverableCodes: ['001', '002', '032', '019'],
    technicalLevel: 'low',
    os: ['mac', 'windows'],
    activeTools: ['gamma', 'canva', 'notebooklm'],
    avatarIcon: 'GraduationCap',
    description:
      'Diseña programas curriculares, rúbricas de evaluación por competencias, presentaciones magistrales y talleres prácticos asistidos por IA.',
    sampleNeeds: [
      {
        label: 'Diseño de Asignatura y Presentaciones Interactivas',
        query:
          'Estructurar las 16 semanas de una cátedra universitaria con objetivos de aprendizaje, lecturas obligatorias y diapositivas visuales de clase.',
        deliverable: 'presentation',
        budget: 30,
      },
      {
        label: 'Guía de Aprendizaje y Estudio de Casos Clínicos',
        query:
          'Crear un cuaderno de ejercicios y casos de estudio reales con preguntas de razonamiento crítico y rúbrica de calificación analítica.',
        deliverable: 'report',
        budget: 15,
      },
    ],
  },

  // ==========================================
  // 7. NEGOCIOS, PRODUCTO & LEGAL
  // ==========================================
  {
    id: 'founder-pm',
    label: 'Fundador & Product Manager',
    role: 'Fundador / PM',
    domain: 'Estrategia, Producto & Startups',
    domainGroup: 'BIZ',
    relevantWorkCodes: ['024', '029', '025', '015'],
    relevantDeliverableCodes: ['022', '001', '021', '014'],
    technicalLevel: 'medium',
    os: ['mac', 'windows'],
    activeTools: ['notion', 'linear', 'slack'],
    avatarIcon: 'Briefcase',
    description:
      'Lidera el ciclo de vida del producto. Sintetiza feedback de usuarios, define OKRs, analiza cohortes de retención y presenta a comités o inversores.',
    sampleNeeds: [
      {
        label: 'Síntesis de Feedback & Pitch Deck para Inversores',
        query:
          'Tengo 200 transcripciones de entrevistas con usuarios en texto. Necesito clusterizar las principales fricciones, priorizar soluciones y armar un pitch deck.',
        deliverable: 'presentation',
        budget: 50,
      },
      {
        label: 'Documento de Requerimientos de Producto (PRD)',
        query:
          'Redactar la especificación técnica y funcional completa (PRD) de una nueva pasarela de pago con flujos de excepción y métricas de éxito.',
        deliverable: 'prd_spec',
        budget: 25,
      },
    ],
  },
  {
    id: 'business-consultant',
    label: 'Consultor de Estrategia de Negocios',
    role: 'Consultor de Negocios',
    domain: 'Consultoría Estratégica, M&A & Reestructuración',
    domainGroup: 'BIZ',
    relevantWorkCodes: ['029', '015', '014', '001'],
    relevantDeliverableCodes: ['001', '002', '014', '012'],
    technicalLevel: 'medium',
    os: ['windows', 'mac'],
    activeTools: ['pitch', 'excel', 'power-bi'],
    avatarIcon: 'Briefcase',
    description:
      'Diagnostica modelos operativos, elabora matrices de posicionamiento de mercado, benchmarking competitivo y planes de transformación corporativa.',
    sampleNeeds: [
      {
        label: 'Diagnóstico Estratégico y Presentación para el Directorio',
        query:
          'Elaborar un informe estratégico con matriz FODA, análisis de 5 fuerzas de Porter y recomendaciones para la junta directiva en diapositivas.',
        deliverable: 'presentation',
        budget: 65,
      },
      {
        label: 'Benchmarking Competitivo de Precios y Características',
        query:
          'Comparar 10 competidores directos en una matriz multicriterio identificando vacíos de mercado y ventajas competitivas sostenibles.',
        deliverable: 'report',
        budget: 40,
      },
    ],
  },
  {
    id: 'growth-marketer',
    label: 'Estratega de Marketing Digital & Growth',
    role: 'Estratega de Growth',
    domain: 'Adquisición de Usuarios, CAC/LTV & Embudos',
    domainGroup: 'BIZ',
    relevantWorkCodes: ['014', '013', '031', '029'],
    relevantDeliverableCodes: ['012', '001', '021', '002'],
    technicalLevel: 'medium',
    os: ['mac', 'windows'],
    activeTools: ['canva', 'excel', 'notion'],
    avatarIcon: 'Briefcase',
    description:
      'Gestiona campañas de captación de clientes multicanal, optimiza tasas de conversión (CRO), analiza costes de adquisición (CAC) y retención (LTV).',
    sampleNeeds: [
      {
        label: 'Estrategia de Lanzamiento y Campañas de Adquisición',
        query:
          'Diseñar el plan de marketing de contenidos, calendario editorial para 30 días y estructura de campañas de anuncios pagados para un nuevo SaaS.',
        deliverable: 'presentation',
        budget: 45,
      },
      {
        label: 'Dashboard de Rendimiento de Embudo y Atribución',
        query:
          'Cruzar métricas de Google Analytics, anuncios y ventas para visualizar el coste por lead y conversión de cada canal publicitario.',
        deliverable: 'dashboard',
        budget: 35,
      },
    ],
  },
  {
    id: 'legal-tech-lawyer',
    label: 'Abogado & Compliance Legal Tech',
    role: 'Abogado',
    domain: 'Derecho Corporativo, Contratos & Privacidad',
    domainGroup: 'BIZ',
    relevantWorkCodes: ['022', '001', '021', '031'],
    relevantDeliverableCodes: ['002', '019', '001', '032'],
    technicalLevel: 'low',
    os: ['windows', 'mac'],
    activeTools: ['microsoft-365', 'notion', 'zotero'],
    avatarIcon: 'Briefcase',
    description:
      'Redacta contratos comerciales, audita cumplimiento normativo (GDPR, IA Act), revisa cláusulas de propiedad intelectual y gestiona litigios.',
    sampleNeeds: [
      {
        label: 'Auditoría de Cumplimiento de Privacidad y Términos de Servicio',
        query:
          'Revisar la política de privacidad y términos de uso de una plataforma con IA asegurando conformidad estricta con el reglamento europeo GDPR.',
        deliverable: 'report',
        budget: 70,
      },
      {
        label: 'Redacción de Acuerdo de Licencia de Software (SLA / EULA)',
        query:
          'Redactar un contrato B2B de licenciamiento de software que incluya niveles de servicio garantizados (SLA), limitación de responsabilidad y confidencialidad.',
        deliverable: 'report',
        budget: 50,
      },
    ],
  },

  // ==========================================
  // 8. ESTUDIANTE STEM
  // ==========================================
  {
    id: 'student',
    label: 'Estudiante Universitario STEM',
    role: 'Estudiante',
    domain: 'Ingeniería / Ciencias / Métodos Cuantitativos',
    domainGroup: 'ING',
    relevantWorkCodes: ['001', '020', '032', '013'],
    relevantDeliverableCodes: ['002', '018', '013', '001'],
    technicalLevel: 'low',
    os: ['mac', 'windows'],
    activeTools: ['notion', 'excel'],
    avatarIcon: 'GraduationCap',
    description:
      'Cursa materias cuantitativas complejas. Tiene presupuesto limitado ($0 - $15 USD/mes) y necesita visualizar conceptos matemáticos y analizar datos sin fricción.',
    sampleNeeds: [
      {
        label: 'Cálculo Multivariable y Visualización de Superficies',
        query:
          'Tengo ejercicios de integrales dobles y triples sobre superficies no regladas. Necesito visualizar el sólido en 3D para entender los límites de integración.',
        deliverable: 'visualization',
        budget: 0,
      },
      {
        label: 'Informe de Laboratorio de Física con Gráficos',
        query:
          'Tengo mediciones experimentales de un péndulo simple con errores. Necesito ajustar una curva por mínimos cuadrados y armar el informe con tablas.',
        deliverable: 'report',
        budget: 10,
      },
    ],
  },
];
