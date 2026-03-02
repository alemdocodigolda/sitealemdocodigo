export const languages = ["pt", "en"] as const;
export const uiLanguages = ["pt", "en"] as const;
export type Lang = (typeof languages)[number];

export const languageMeta: Record<
  Lang,
  { label: string; flag: string; path: string; locale: string; ogLocale: string }
> = {
  pt: { label: "Português", flag: "🇵🇹", path: "/", locale: "pt-PT", ogLocale: "pt_PT" },
  en: { label: "English", flag: "🇬🇧", path: "/en/", locale: "en", ogLocale: "en_GB" },
};

export function getLanguageLinks(current: Lang) {
  return uiLanguages.map((code) => ({
    code,
    label: languageMeta[code].label,
    flag: languageMeta[code].flag,
    href: languageMeta[code].path,
    active: code === current,
  }));
}

type FlowOption = { label: string; next: string };
type FlowState = {
  bubbles: string[];
  options: FlowOption[];
  link?: { label: string; url: string | null };
  scrollTo?: string;
};

interface SiteContent {
  layout: {
    title: string;
    description: string;
  };
  nav: {
    about: string;
    projects: string;
    contact: string;
    menuAria: string;
    langAria: string;
  };
  hero: {
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    chatName: string;
    statusOnline: string;
    pills: [string, string, string];
    inputPlaceholder: string;
    sendAria: string;
    scrollHint: string;
    unknownMessage: string;
    flow: Record<string, FlowState>;
  };
  about: {
    tag: string;
    titleBefore: string;
    titleHighlight: string;
    text1: string;
    text2: string;
    values: [string, string, string, string];
    code: {
      keyType: string;
      valueType: string;
      keyLocation: string;
      keyFocus: string;
      valueFocus: [string, string, string];
      keyTechnology: string;
      valueTechnology: string;
      keyModel: string;
      valueModel: string;
      keyBuild: string;
      ideaVar: string;
      returnWord: string;
      fnResearch: string;
      fnPrototype: string;
      fnLaunch: string;
      fnScale: string;
      comment: string;
    };
  };
  projects: {
    tag: string;
    titleBefore: string;
    titleHighlight: string;
    subtitle: string;
    featured: string;
    visit: string;
    sitesModal: {
      title: string;
      subtitle: string;
      features: string[];
      cta: string;
      close: string;
      selectOption: string;
    };
    items: Array<{
      name: string;
      url: string;
      area: string;
      color: string;
      icon: string;
      featured?: boolean;
      cta?: string;
      disabled?: boolean;
      modal?: boolean;
      description: string;
      tags: string[];
    }>;
  };
  contact: {
    panel: {
      redTooltip: string;
      yellowTooltip: string;
      greenTooltip: string;
      title: string;
      online: string;
      tag: string;
      headingBefore: string;
      headingHighlight: string;
      description: string;
      locationLabel: string;
      phoneLabel: string;
      terminalCommands: [string, string, string];
    };
    form: {
      nameLabel: string;
      namePlaceholder: string;
      companyLabel: string;
      companyPlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      contactLabel: string;
      contactPlaceholder: string;
      reasonLabel: string;
      reasonPlaceholder: string;
      reasonOptions: string[];
      messageLabel: string;
      messagePlaceholder: string;
      submitDefault: string;
      submitSending: string;
      submitSuccess: string;
      note: string;
      errorRequired: string;
      errorEmail: string;
    };
  };
  footer: {
    brand: string;
    projectsTitle: string;
    companyTitle: string;
    aboutLink: string;
    projectsLink: string;
    contactLink: string;
    rights: string;
    madeWith: string;
  };
}

export const siteContent: Record<Lang, SiteContent> = {
  pt: {
    layout: {
      title: "Além do Código — IA, Automação e Soluções Digitais",
      description:
        "Criamos soluções de IA, automação e produtos digitais para empresas que querem crescer.",
    },
    nav: {
      about: "Sobre",
      projects: "Projetos",
      contact: "Contacto",
      menuAria: "Menu",
      langAria: "Selecionar idioma",
    },
    hero: {
      titleBefore: "Construímos o",
      titleHighlight: "Futuro",
      titleAfter: "do Crédito e do Imobiliário",
      chatName: "Assistente ADC",
      statusOnline: "Online agora",
      pills: ["FinTech", "PropTech", "IA"],
      inputPlaceholder: "Escreve a tua pergunta…",
      sendAria: "Enviar",
      scrollHint: "Explora o site",
      unknownMessage:
        "Não encontrei uma resposta direta para isso. 🤔 Tenta perguntar sobre os nossos **projetos**, **tecnologia**, **quem somos** ou **contacto**!",
      flow: {
        start: {
          bubbles: [
            "Olá! 👋 Bem-vindo à **Além do Código**.",
            "Somos uma empresa de tecnologia especializada em **Inteligência Artificial**. Construímos os nossos próprios produtos nas áreas do crédito e imobiliário.",
            "Por onde queres começar?",
          ],
          options: [
            { label: "👥 Quem são?", next: "quemSomos" },
            { label: "🚀 Os nossos projetos", next: "projetos" },
            { label: "📍 Localização & contacto", next: "contacto" },
          ],
        },
        quemSomos: {
          bubbles: [
            "Somos uma empresa de tecnologia e informação baseada em **Faro, Portugal**.",
            "Não somos uma consultora nem uma software house. Construímos os nossos **próprios produtos** nas áreas do crédito, imobiliário e serviços financeiros.",
            "A IA é a nossa vantagem competitiva real.",
          ],
          options: [
            { label: "🚀 Ver os projetos", next: "projetos" },
            { label: "💡 Que tecnologia usam?", next: "tecnologia" },
            { label: "📍 Onde estão?", next: "contacto" },
          ],
        },
        tecnologia: {
          bubbles: [
            "Usamos **Inteligência Artificial** de forma prática: modelos de linguagem (LLMs), automação de processos, pesquisa semântica e análise de dados.",
            "Tudo construído internamente, integrado nos nossos próprios produtos. Sem jargão vazio, com resultados.",
          ],
          options: [
            { label: "🚀 Ver os projetos", next: "projetos" },
            { label: "🔄 Voltar ao início", next: "start" },
          ],
        },
        projetos: {
          bubbles: [
            "Temos **5 projetos ativos**, todos nas áreas do crédito, imobiliário e serviços financeiros.",
            "Qual queres conhecer?",
          ],
          options: [
            { label: "📋 CRMCredito.pt", next: "crmcredito" },
            { label: "🏠 CréditoCasa.pt", next: "creditocasa" },
            { label: "⚡ SimulaSite.pt", next: "simulasite" },
            { label: "🌐 Sites para Intermediários", next: "sitesIntermediarios" },
          ],
        },
        sitesIntermediarios: {
          bubbles: [
            "Criamos **sites profissionais** para intermediários de crédito registados no Banco de Portugal.",
            "Identidade visual única, conteúdo legal obrigatório pré-configurado e posicionamento digital desde o primeiro dia. Tudo o que o Banco de Portugal exige, com o design que o teu negócio merece.",
          ],
          link: { label: "Saber mais & pedir orçamento →", url: "https://alemdocodigo.pt/#contacto" },
          options: [
            { label: "← Ver outros projetos", next: "projetos" },
            { label: "✉️ Falar connosco", next: "falarConnosco" },
          ],
        },
        crmcredito: {
          bubbles: [
            "**CRMCredito.pt** é uma plataforma CRM especializada para intermediários de crédito.",
            "Centraliza processos, automatiza fluxos de trabalho, integra com bancos e tem painéis de IA para análise de desempenho.",
          ],
          link: { label: "Visitar CRMCredito.pt →", url: "https://www.crmcredito.pt" },
          options: [
            { label: "← Ver outros projetos", next: "projetos" },
            { label: "📍 Contacto", next: "contacto" },
          ],
        },
        creditocasa: {
          bubbles: [
            "**CréditoCasa.pt** é o primeiro portal em Portugal que combina pesquisa imobiliária com crédito habitação, usando IA.",
            "O utilizador descreve o que procura em linguagem natural e a IA encontra o imóvel e o financiamento ideal.",
          ],
          link: { label: "Visitar CréditoCasa.pt →", url: "https://www.creditocasa.pt" },
          options: [
            { label: "← Ver outros projetos", next: "projetos" },
            { label: "📍 Contacto", next: "contacto" },
          ],
        },
        simulasite: {
          bubbles: [
            "**SimulaSite.pt** é um SaaS que permite incorporar simuladores financeiros em qualquer site, sem programação.",
            "Mais de 15 calculadoras disponíveis. Instalação em menos de 2 minutos.",
          ],
          link: { label: "Visitar SimulaSite.pt →", url: "https://www.simulasite.pt" },
          options: [
            { label: "← Ver outros projetos", next: "projetos" },
            { label: "📍 Contacto", next: "contacto" },
          ],
        },
        pededirdoc: {
          bubbles: [
            "**PedeDirDocumentos.pt** simplifica o pedido e gestão de documentos, tornando processos burocráticos mais rápidos e acessíveis.",
          ],
          link: { label: "Em breve disponível", url: null },
          options: [
            { label: "← Ver outros projetos", next: "projetos" },
            { label: "📍 Contacto", next: "contacto" },
          ],
        },
        contacto: {
          bubbles: [
            "Estamos em **Faro, Portugal** 📍",
            "R. Dom Francisco Gomes 4 1A, 8000-306\n\n📞 +351 967 015 157\n✉️ geral@alemdocodigo.pt",
            "Preferes enviar uma mensagem diretamente?",
          ],
          options: [
            { label: "✉️ Escrever mensagem", next: "falarConnosco" },
            { label: "🚀 Ver projetos", next: "projetos" },
            { label: "🔄 Recomeçar", next: "start" },
          ],
        },
        falarConnosco: {
          bubbles: [
            "Ótimo! Já te levo ao formulário de contacto. Respondemos sempre em menos de 24 horas. 📬",
          ],
          scrollTo: "contacto",
          options: [{ label: "🔄 Recomeçar", next: "start" }],
        },
      },
    },
    about: {
      tag: "Sobre nós",
      titleBefore: "Tecnologia Com",
      titleHighlight: "Propósito",
      text1:
        "Somos uma empresa de tecnologia e informação baseada em Faro, especializada em Inteligência Artificial aplicada ao setor financeiro e imobiliário. Não somos uma software house nem uma consultora. Construímos os nossos próprios produtos e plataformas.",
      text2:
        "A nossa missão é simples: usar a tecnologia para tornar o acesso ao crédito e ao imobiliário mais inteligente, mais transparente e mais eficiente, tanto para profissionais do setor como para quem procura casa ou financiamento.",
      values: [
        "Produtos próprios, não serviços a terceiros",
        "IA como vantagem competitiva real",
        "Foco em crédito, imobiliário e finanças",
        "Tecnologia construída em Portugal",
      ],
      code: {
        keyType: "tipo",
        valueType: "Empresa Tecnológica",
        keyLocation: "localização",
        keyFocus: "foco",
        valueFocus: ["Intermediação de Crédito", "Imobiliário", "Serviços Financeiros"],
        keyTechnology: "tecnologia",
        valueTechnology: "Inteligência Artificial",
        keyModel: "modelo",
        valueModel: "Produtos Próprios",
        keyBuild: "construir",
        ideaVar: "ideia",
        returnWord: "return",
        fnResearch: "investigar",
        fnPrototype: "prototipar",
        fnLaunch: "lançar",
        fnScale: "escalar",
        comment: "Além do código, além do óbvio.",
      },
    },
    projects: {
      tag: "Os nossos projetos",
      titleBefore: "O Que",
      titleHighlight: "Construímos",
      subtitle:
        "Plataformas e produtos tecnológicos desenvolvidos internamente, cada um a resolver um problema real no setor financeiro e imobiliário.",
      featured: "Em destaque",
      visit: "Visitar",
      sitesModal: {
        title: "O que está incluído",
        subtitle: "Tudo o que precisas para marcar presença online com profissionalismo e conformidade com as normas do Banco de Portugal.",
        features: [
          "Identidade visual única e profissional",
          "Conformidade com as normas do Banco de Portugal",
          "SEO técnico otimizado desde o primeiro dia",
          "Blog e notícias para posicionamento orgânico",
          "Formulário de contacto e captura de leads",
          "Domínio e hospedagem: adquira connosco ou configuramos o seu",
          "Integração com SimulaSite (simuladores financeiros)",
          "Design adaptado a mobile (100% responsive)",
          "Site 100% seu, com acesso total e sem dependências",
          "Política de privacidade e RGPD pré-configurados",
          "Painel para gerir conteúdo de forma autónoma",
          "Google Analytics integrado: visitas, leads e tráfego em tempo real",
        ],
        cta: "Pedir orçamento",
        close: "Fechar",
        selectOption: "Sites para Intermediários de Crédito",
      },
      items: [
        {
          name: "CRM Crédito",
          url: "https://www.crmcredito.pt",
          area: "FinTech · Crédito",
          color: "cyan",
          icon: "📋",
          description:
            "Plataforma CRM especializada para intermediários de crédito. Centraliza a gestão de processos, automatiza fluxos de trabalho e integra com bancos, substituindo folhas de cálculo por um sistema inteligente com painéis de IA.",
          tags: ["CRM", "Automação", "IA", "Crédito Habitação"],
        },
        {
          name: "CréditoCasa.pt",
          url: "https://www.creditocasa.pt",
          area: "PropTech · FinTech",
          color: "violet",
          icon: "🏠",
          featured: true,
          description:
            "O primeiro portal em Portugal que combina pesquisa imobiliária com crédito habitação, usando Inteligência Artificial. O utilizador descreve o que procura em linguagem natural e a IA encontra o imóvel e o financiamento ideal.",
          tags: ["Imobiliário", "IA Generativa", "Crédito", "Contactos"],
        },
        {
          name: "SimulaSite",
          url: "https://www.simulasite.pt",
          area: "SaaS · FinTech",
          color: "green",
          icon: "⚡",
          description:
            "SaaS que permite a agências imobiliárias e intermediários de crédito incorporar simuladores financeiros nos seus sites, sem programação. Mais de 15 calculadoras disponíveis, instalação em menos de 2 minutos.",
          tags: ["SaaS", "Simuladores", "Imobiliário", "Geração de leads"],
        },
        {
          name: "Pedir Documentos",
          url: "https://www.pededirdocumentos.pt",
          area: "LegalTech · Automação",
          color: "cyan",
          icon: "📄",
          cta: "Brevemente",
          disabled: true,
          description:
            "Plataforma para simplificar o pedido e gestão de documentos. Automatiza processos burocráticos, tornando-os mais rápidos e acessíveis.",
          tags: ["Documentos", "Automação", "Legal"],
        },
        {
          name: "Sites para Intermediários de Crédito",
          url: "https://alemdocodigo.pt/#contacto",
          area: "FinTech · Compliance BdP",
          color: "violet",
          icon: "🌐",
          cta: "Pedir orçamento",
          modal: true,
          description:
            "Criamos sites profissionais para intermediários de crédito registados no Banco de Portugal: identidade única, conteúdo legal obrigatório e posicionamento digital desde o primeiro dia.",
          tags: ["Banco de Portugal", "Identidade Digital", "Compliance", "Intermediários"],
        },
      ],
    },
    contact: {
      panel: {
        redTooltip: "WhatsApp",
        yellowTooltip: "Ligar",
        greenTooltip: "Escrever mensagem",
        title: "connection.init",
        online: "online",
        tag: "Contacto",
        headingBefore: "Vamos",
        headingHighlight: "Conversar",
        description:
          "Tens curiosidade sobre os nossos produtos? Fala connosco, explora uma parceria ou deixa-nos a tua opinião.",
        locationLabel: "Localização",
        phoneLabel: "Telefone / WhatsApp",
        terminalCommands: [
          "ligar +351 967 015 157",
          "explorar --projetos crmcredito.pt",
          "whatsapp +351967015157",
        ],
      },
      form: {
        nameLabel: "Nome",
        namePlaceholder: "O teu nome",
        companyLabel: "Empresa",
        companyPlaceholder: "Nome da tua empresa",
        emailLabel: "E-mail",
        emailPlaceholder: "email@empresa.pt",
        contactLabel: "Contacto",
        contactPlaceholder: "+351 9XX XXX XXX",
        reasonLabel: "O que te trouxe aqui?",
        reasonPlaceholder: "Selecionar...",
        reasonOptions: ["CRM Crédito", "CréditoCasa.pt", "SimulaSite", "Pedir Documentos", "Sites para Intermediários de Crédito", "Parceria", "Outro"],
        messageLabel: "Mensagem",
        messagePlaceholder:
          "Tens alguma questão sobre os nossos produtos, ou queres explorar uma parceria?",
        submitDefault: "Enviar Mensagem",
        submitSending: "A enviar...",
        submitSuccess: "Mensagem enviada ✓",
        note: "Os teus dados estão seguros connosco. Respondemos pessoalmente em menos de 24h.",
        errorRequired: "Campo obrigatório",
        errorEmail: "E-mail inválido",
      },
    },
    footer: {
      brand: "Empresa de Tecnologia & IA",
      projectsTitle: "Projetos",
      companyTitle: "Empresa",
      aboutLink: "Sobre nós",
      projectsLink: "Os nossos projetos",
      contactLink: "Contacto",
      rights: "© 2026 Além do Código. Todos os direitos reservados.",
      madeWith: "Feito com IA em Portugal 🇵🇹",
    },
  },
  en: {
    layout: {
      title: "Beyond Code — AI, Automation & Digital Solutions",
      description:
        "We build AI, automation, and digital products for companies that want to scale.",
    },
    nav: {
      about: "About",
      projects: "Projects",
      contact: "Contact",
      menuAria: "Menu",
      langAria: "Select language",
    },
    hero: {
      titleBefore: "We Build The",
      titleHighlight: "Future",
      titleAfter: "Of Credit And Real Estate",
      chatName: "ADC Assistant",
      statusOnline: "Online now",
      pills: ["FinTech", "PropTech", "AI"],
      inputPlaceholder: "Type your question…",
      sendAria: "Send",
      scrollHint: "Explore the site",
      unknownMessage:
        "I could not find a direct answer for that. 🤔 Try asking about our **projects**, **technology**, **who we are**, or **contact**!",
      flow: {
        start: {
          bubbles: [
            "Hello! 👋 Welcome to **Beyond Code**.",
            "We are a technology company focused on **Artificial Intelligence**. We build our own products in credit and real estate.",
            "Where would you like to start?",
          ],
          options: [
            { label: "👥 Who are you?", next: "quemSomos" },
            { label: "🚀 Our projects", next: "projetos" },
            { label: "📍 Location & contact", next: "contacto" },
          ],
        },
        quemSomos: {
          bubbles: [
            "We are a technology and information company based in **Faro, Portugal**.",
            "We are not a consultancy or a software house. We build our **own products** in credit, real estate, and financial services.",
            "AI is our real competitive advantage.",
          ],
          options: [
            { label: "🚀 View projects", next: "projetos" },
            { label: "💡 What technology do you use?", next: "tecnologia" },
            { label: "📍 Where are you located?", next: "contacto" },
          ],
        },
        tecnologia: {
          bubbles: [
            "We use **Artificial Intelligence** in a practical way: language models (LLMs), process automation, semantic search, and data analytics.",
            "Everything is built in-house and integrated into our own products. No empty jargon, just results.",
          ],
          options: [
            { label: "🚀 View projects", next: "projetos" },
            { label: "🔄 Back to start", next: "start" },
          ],
        },
        projetos: {
          bubbles: [
            "We currently have **5 active projects**, all focused on credit, real estate, and financial services.",
            "Which one do you want to explore?",
          ],
          options: [
            { label: "📋 CRMCredito.pt", next: "crmcredito" },
            { label: "🏠 CréditoCasa.pt", next: "creditocasa" },
            { label: "⚡ SimulaSite.pt", next: "simulasite" },
            { label: "🌐 Sites for Intermediaries", next: "sitesIntermediarios" },
          ],
        },
        sitesIntermediarios: {
          bubbles: [
            "We build **professional websites** for credit intermediaries registered with Banco de Portugal.",
            "Unique visual identity, mandatory legal content pre-configured, and digital presence from day one. Everything the regulator requires, with the design your business deserves.",
          ],
          link: { label: "Learn more & request a quote →", url: "https://alemdocodigo.pt/en/#contacto" },
          options: [
            { label: "← View other projects", next: "projetos" },
            { label: "✉️ Contact us", next: "falarConnosco" },
          ],
        },
        crmcredito: {
          bubbles: [
            "**CRMCredito.pt** is a CRM platform built for credit intermediaries.",
            "It centralizes processes, automates workflows, integrates with banks, and includes AI dashboards for performance analysis.",
          ],
          link: { label: "Visit CRMCredito.pt →", url: "https://www.crmcredito.pt" },
          options: [
            { label: "← View other projects", next: "projetos" },
            { label: "📍 Contact", next: "contacto" },
          ],
        },
        creditocasa: {
          bubbles: [
            "**CréditoCasa.pt** is the first Portuguese portal combining property search with mortgage credit using AI.",
            "Users describe what they need in natural language and AI finds the ideal property and financing.",
          ],
          link: { label: "Visit CréditoCasa.pt →", url: "https://www.creditocasa.pt" },
          options: [
            { label: "← View other projects", next: "projetos" },
            { label: "📍 Contact", next: "contacto" },
          ],
        },
        simulasite: {
          bubbles: [
            "**SimulaSite.pt** is a SaaS platform that embeds financial simulators into any site, no coding required.",
            "Over 15 calculators available. Setup in less than 2 minutes.",
          ],
          link: { label: "Visit SimulaSite.pt →", url: "https://www.simulasite.pt" },
          options: [
            { label: "← View other projects", next: "projetos" },
            { label: "📍 Contact", next: "contacto" },
          ],
        },
        pededirdoc: {
          bubbles: [
            "**PedeDirDocumentos.pt** simplifies requesting and managing documents, making bureaucracy faster and more accessible.",
          ],
          link: { label: "Available soon", url: null },
          options: [
            { label: "← View other projects", next: "projetos" },
            { label: "📍 Contact", next: "contacto" },
          ],
        },
        contacto: {
          bubbles: [
            "We are based in **Faro, Portugal** 📍",
            "R. Dom Francisco Gomes 4 1A, 8000-306\n\n📞 +351 967 015 157\n✉️ geral@alemdocodigo.pt",
            "Would you like to send us a message directly?",
          ],
          options: [
            { label: "✉️ Write a message", next: "falarConnosco" },
            { label: "🚀 View projects", next: "projetos" },
            { label: "🔄 Restart", next: "start" },
          ],
        },
        falarConnosco: {
          bubbles: [
            "Great! I will take you to the contact form now. We always reply within 24 hours. 📬",
          ],
          scrollTo: "contacto",
          options: [{ label: "🔄 Restart", next: "start" }],
        },
      },
    },
    about: {
      tag: "About us",
      titleBefore: "Technology With",
      titleHighlight: "Purpose",
      text1:
        "We are a technology and information company based in Faro, specialized in Artificial Intelligence for the financial and real estate sectors. We are not a software house or consultancy. We build our own products and platforms.",
      text2:
        "Our mission is simple: use technology to make access to credit and real estate smarter, more transparent, and more efficient, both for professionals and for people searching for a home or financing.",
      values: [
        "Own products, not third-party services",
        "AI as a real competitive edge",
        "Focus on credit, real estate, and finance",
        "Technology built in Portugal",
      ],
      code: {
        keyType: "type",
        valueType: "Tech Company",
        keyLocation: "location",
        keyFocus: "focus",
        valueFocus: ["Credit Brokerage", "Real Estate", "Financial Services"],
        keyTechnology: "technology",
        valueTechnology: "Artificial Intelligence",
        keyModel: "model",
        valueModel: "Own Products",
        keyBuild: "build",
        ideaVar: "idea",
        returnWord: "return",
        fnResearch: "research",
        fnPrototype: "prototype",
        fnLaunch: "launch",
        fnScale: "scale",
        comment: "Beyond code, beyond the obvious.",
      },
    },
    projects: {
      tag: "Our projects",
      titleBefore: "What We",
      titleHighlight: "Build",
      subtitle:
        "Platforms and technology products developed in-house, each one solving a real problem in finance and real estate.",
      featured: "Featured",
      visit: "Visit",
      sitesModal: {
        title: "What's included",
        subtitle: "Everything you need to establish a professional and compliant online presence from day one.",
        features: [
          "Unique professional visual identity",
          "Full compliance with Banco de Portugal regulations",
          "Technical SEO optimized from day one",
          "Blog and news section for organic positioning",
          "Contact form and lead capture",
          "Domain & hosting: purchase through us or we configure yours",
          "SimulaSite integration (financial simulators)",
          "Mobile-first responsive design",
          "100% yours, with full access and no lock-in",
          "Privacy policy and GDPR pre-configured",
          "Content management panel for full autonomy",
          "Google Analytics integrated: visits, leads and traffic in real time",
        ],
        cta: "Request a quote",
        close: "Close",
        selectOption: "Sites for Credit Intermediaries",
      },
      items: [
        {
          name: "CRM Crédito",
          url: "https://www.crmcredito.pt",
          area: "FinTech · Credit",
          color: "cyan",
          icon: "📋",
          description:
            "CRM platform for credit intermediaries. It centralizes process management, automates workflows, and integrates with banks, replacing spreadsheets with an intelligent system powered by AI dashboards.",
          tags: ["CRM", "Automation", "AI", "Mortgage Credit"],
        },
        {
          name: "CréditoCasa.pt",
          url: "https://www.creditocasa.pt",
          area: "PropTech · FinTech",
          color: "violet",
          icon: "🏠",
          featured: true,
          description:
            "The first Portuguese portal that combines property search and mortgage credit using Artificial Intelligence. Users describe what they need in natural language and AI finds the ideal property and financing.",
          tags: ["Real Estate", "Generative AI", "Credit", "Contacts"],
        },
        {
          name: "SimulaSite",
          url: "https://www.simulasite.pt",
          area: "SaaS · FinTech",
          color: "green",
          icon: "⚡",
          description:
            "SaaS that allows agencies and credit intermediaries to embed financial simulators on their sites, no coding required. Over 15 calculators available, setup in under 2 minutes.",
          tags: ["SaaS", "Simulators", "Real Estate", "Lead Generation"],
        },
        {
          name: "Request Documents",
          url: "https://www.pededirdocumentos.pt",
          area: "LegalTech · Automation",
          color: "cyan",
          icon: "📄",
          cta: "Coming Soon",
          disabled: true,
          description:
            "Platform that simplifies document requests and management. It automates bureaucracy to make processes faster and easier.",
          tags: ["Documents", "Automation", "Legal"],
        },
        {
          name: "Sites for Credit Intermediaries",
          url: "https://alemdocodigo.pt/en/#contacto",
          area: "FinTech · BdP Compliance",
          color: "violet",
          icon: "🌐",
          cta: "Request a quote",
          modal: true,
          description:
            "Professional websites for credit intermediaries registered with Banco de Portugal: unique identity, mandatory legal content and digital presence from day one.",
          tags: ["Banco de Portugal", "Digital Identity", "Compliance", "Intermediaries"],
        },
      ],
    },
    contact: {
      panel: {
        redTooltip: "WhatsApp",
        yellowTooltip: "Call",
        greenTooltip: "Write message",
        title: "connection.init",
        online: "online",
        tag: "Contact",
        headingBefore: "Let's",
        headingHighlight: "Talk",
        description:
          "Curious about our products? Talk to us, explore a partnership, or share your feedback.",
        locationLabel: "Location",
        phoneLabel: "Phone / WhatsApp",
        terminalCommands: [
          "call +351 967 015 157",
          "explore --projects crmcredito.pt",
          "whatsapp +351967015157",
        ],
      },
      form: {
        nameLabel: "Name",
        namePlaceholder: "Your name",
        companyLabel: "Company",
        companyPlaceholder: "Your company name",
        emailLabel: "Email",
        emailPlaceholder: "email@company.com",
        contactLabel: "Contact",
        contactPlaceholder: "+351 9XX XXX XXX",
        reasonLabel: "What brought you here?",
        reasonPlaceholder: "Select...",
        reasonOptions: ["CRM Crédito", "CréditoCasa.pt", "SimulaSite", "Request Documents", "Sites for Credit Intermediaries", "Partnership", "Other"],
        messageLabel: "Message",
        messagePlaceholder:
          "Do you have questions about our products, or would you like to explore a partnership?",
        submitDefault: "Send Message",
        submitSending: "Sending...",
        submitSuccess: "Message sent ✓",
        note: "Your data is safe with us. We reply personally within 24 hours.",
        errorRequired: "Required field",
        errorEmail: "Invalid email",
      },
    },
    footer: {
      brand: "Technology & AI Company",
      projectsTitle: "Projects",
      companyTitle: "Company",
      aboutLink: "About us",
      projectsLink: "Our projects",
      contactLink: "Contact",
      rights: "© 2026 Beyond Code. All rights reserved.",
      madeWith: "Built with AI in Portugal 🇵🇹",
    },
  },
};
