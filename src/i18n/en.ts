/** English dictionary — Phase 2 content. */
export const en = {
  meta: {
    title:
      "João Pedro Borges Araújo — Software Engineer · NestJS · Node.js | Franca, Brazil",
    description:
      "Software Engineer focused on backend with NestJS, Node.js, and TypeScript. APIs, integrations, and internal systems — Franca, SP, Brazil. Open to full-time and freelance. Since May 2023.",
  },
  a11y: {
    skipToContent: "Skip to content",
    mainNav: "Main navigation",
    mobileNav: "Navigation menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    themeToggle: "Toggle light or dark theme",
    language: "Language",
    switchToLight: "Use light theme",
    switchToDark: "Use dark theme",
    copyCredential: "Copy credential code",
    copied: "Copied",
    heroVisual: "Orbit of Integrations — 3D visual of the service core and integrations",
    photoPlaceholder: "Professional photo coming soon",
    externalLink: "opens in a new tab",
  },
  nav: {
    home: "Home",
    about: "About",
    education: "Education",
    stack: "Stack",
    experience: "Experience",
    projects: "Projects",
    contact: "Contact",
  },
  cta: {
    talk: "Get in touch",
    projects: "View projects",
    cv: "Download CV",
    schedule: "Schedule a call",
  },
  hero: {
    brand: "João Pedro Borges Araújo",
    brandLines: ["João Pedro", "Borges Araújo"] as const,
    headline:
      "Software Engineer · NestJS · Node.js · JavaScript · TypeScript · TypeORM · Sequelize · MySQL · Firebird · RabbitMQ",
    support:
      "Backend specialist with Node.js and NestJS: APIs, integrations, and robust, scalable internal systems.",
    location: "Franca, São Paulo, Brazil",
    whatsappMessage:
      "Hi João Pedro, I saw your portfolio and would like to schedule a call.",
    orbitListLabel: "Orbit integrations",
    orbitDismiss: "Dismiss detail",
    orbitNodes: {
      api: {
        title: "API",
        blurb: "HTTP/REST contracts and gateways that connect clients to the core.",
      },
      db: {
        title: "DB",
        blurb: "MySQL, Firebird, and TypeORM/Sequelize — consistent, migratable data.",
      },
      queue: {
        title: "Queue",
        blurb: "RabbitMQ and messaging for async, decoupled workflows.",
      },
      commerce: {
        title: "Commerce",
        blurb: "Order, payment, and catalog integrations with external systems.",
      },
      erp: {
        title: "ERP",
        blurb: "Bridges to ERPs and legacy internal systems, built for resilience.",
      },
    },
  },
  about: {
    title: "About",
    body: "I have been working as a programmer since May 2023 ({duration} of experience). My specialty is backend with JavaScript (Node.js), developing and maintaining robust, scalable solutions. I graduated in Multiplatform Software Development from Fatec Franca Dr. Thomaz Novelino, with 2640 course hours, including an internship and extension activities. Always looking for new challenges and opportunities for professional growth.",
    sinceAnchor: "since May 2023",
    availability: "Open to CLT employment and freelance projects.",
    availabilityClt: "CLT",
    availabilityFreelance: "Freelance",
  },
  education: {
    title: "Education and certifications",
    fatec: {
      institution:
        "Fatec Franca — Faculdade de Tecnologia “Dr. Thomaz Novelino”",
      degree: "Technologist in Multiplatform Software Development (DSM)",
      period: "August 2022 – June 2025",
      hours: "2640 course hours, including internship and extension activities",
    },
    etec: {
      institution: "ETEC Dr. Júlio Cardoso",
      degree: "High school",
      period: "2018 – 2020",
    },
    frontendCert: {
      name: "Front-End Basics",
      type: "DSM course micro-certificate",
      issued: "January 2024",
      credentialLabel: "Credential",
      copy: "Copy",
    },
    technologist: {
      name: "Technologist in Multiplatform Software Development",
      note: "Degree / completion certification — aligned with the Fatec DSM diploma.",
    },
  },
  stack: {
    title: "Stack",
    categories: {
      backend: "Backend",
      data: "Data and messaging",
      frontend: "Frontend and mobile",
      infra: "Infra and tools",
    },
    items: {
      nestjs: "NestJS",
      nodejs: "Node.js",
      javascript: "JavaScript",
      typescript: "TypeScript",
      python: "Python",
      typeorm: "TypeORM",
      sequelize: "Sequelize",
      mysql: "MySQL",
      firebird: "Firebird",
      postgresql: "PostgreSQL",
      rabbitmq: "RabbitMQ",
      react: "React",
      reactNative: "React Native",
      vue: "Vue.js",
      flutter: "Flutter",
      docker: "Docker",
    },
    featured: "Featured",
  },
  experience: {
    title: "Experience",
    employer: "Deltatec — Assistência Técnica",
    location: "Franca, SP",
    present: "Present",
    backend: {
      role: "Back End Developer",
      period: "June 2023 – Present",
      bullets: [
        "Development of the internal logistics and management system.",
        "Stack: Node.js, TypeScript, NestJS.",
        "Integrations with Tray e-commerce and Onclick ERP.",
        "Server and database management: MySQL, Firebird, and PostgreSQL.",
      ],
    },
    support: {
      role: "Customer support",
      period: "February 2021 – June 2023",
      summary:
        "Customer support at the same company, before moving into the Back End role.",
    },
  },
  projects: {
    title: "Projects",
    visit: "Visit",
    items: {
      imobil: {
        name: "Imobil — Property Management",
        description: "Property management platform.",
      },
      "grupo-fenix": {
        name: "Grupo Fênix presentation site",
        description: "Institutional / presentation site for Grupo Fênix.",
      },
      "mep-decor": {
        name: "Mep Decor catalog",
        description: "Mep Decor digital catalog.",
      },
      "pe-quente": {
        name: "Pé Quente catalog",
        description: "Pé Quente digital catalog.",
      },
      "language-interpreter": {
        name: "language-interpreter",
        description: "NPM package for language interpretation.",
      },
    },
  },
  contact: {
    title: "Contact",
    intro: "Fixed details and a form — submit opens your email client.",
    email: "Email",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    github: "GitHub",
    form: {
      name: "Name",
      email: "Email",
      subject: "Subject (optional)",
      message: "Message",
      submit: "Send via email",
      sending: "Opening email client…",
      mailtoHint:
        "If your email client does not open, copy the address and send manually:",
      required: "Required field",
      invalidEmail: "Enter a valid email",
      defaultSubject: "Portfolio contact",
      bodyName: "Name",
      bodyEmail: "Email",
    },
  },
  faq: {
    title: "Frequently asked questions",
    stack: {
      question: "What is your stack?",
      answer:
        "Primary: NestJS, Node.js, and TypeORM. I also work with JavaScript/TypeScript, Sequelize, MySQL, Firebird, PostgreSQL, Docker, RabbitMQ, React, React Native, Vue.js, Flutter, and Python.",
    },
    availability: {
      question: "Are you available for freelance?",
      answer:
        "Yes. I am open to full-time (CLT) roles and freelance projects.",
    },
    experience: {
      question: "How long have you been coding professionally?",
      answer:
        "I have worked as a programmer since May 2023, focused on JavaScript/Node.js backend.",
    },
  },
  footer: {
    rights: "João Pedro Borges Araújo",
    copyright: "All rights reserved.",
    location: "Franca, São Paulo, Brazil",
    cv: "Download CV",
    social: "Social",
    markdown: "Markdown content",
    llms: "llms.txt",
  },
  blog: {
    title: "Blog",
    comingSoon: "Coming soon — structural prep for future posts.",
    back: "Back to home",
  },
  shell: {
    placeholder: "Content coming soon",
  },
  motion: {
    timelineLabel: "Timeline progress",
  },
  eggs: {
    konamiToast: "Integration mode on — teal boosted for a few seconds.",
    terminalTitle: "$ whoami",
    terminalBody:
      "joao@borges:~$ Software Engineer · NestJS / Node.js\nsince may 2023 · Franca, SP · open to CLT & freelance",
    terminalClose: "exit",
    shortcutsTitle: "Shortcuts",
    shortcutsDescription: "Quick navigation and easter eggs. Esc closes this panel.",
    shortcutsClose: "Close",
    shortcuts: [
      { keys: "?", action: "Open this shortcuts list" },
      { keys: "Esc", action: "Close overlays" },
      { keys: "#contact", action: "Jump to Contact" },
      { keys: "#projects", action: "Jump to Projects" },
      { keys: "Konami", action: "Temporary visual surprise" },
    ],
    nestFavorite: "favorite stack ★ NestJS",
    coffeeToast: "Virtual coffee served. Thanks for exploring.",
  },
  hello: "Hello",
} as const;
