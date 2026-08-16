// src/i18n/translations.ts

export const LANGS = ["en", "es"];
export type Lang = (typeof LANGS)[number];

type NavTexts = {
    home: string;
    experience: string;
    projects: string;
    about: string;
    skills: string;
    education: string;
    contact: string;
};

type HeroTexts = {
    badge: string;
    greeting: string;
    titleLine: string;
    subtitle: string;
    github: string;
    linkedin: string;
    email: string;
};

export type ExperienceItem = {
    role: string;
    company: string;
    period: string;
    description: string;
};

export type ProjectItem = {
    id: "devops" | "apache" | "dvwa" | "dashboard";
    title: string;
    subtitle: string;
    description: string;
    tech: string[];
    codeUrl: string;
    liveUrl: string | null;
    imageAlt: string;
};

export type AboutTranslations = {
    title: string;
    paragraphs: string[];
};

export type SkillSectionKey = "security" | "systems" | "automation";

export type SkillsSectionText = {
    key: SkillSectionKey;
    title: string;
    description: string;
};

export type LanguageEntry = {
    name: string;
    level: string;
};

export type SoftSkillKey =
    | "mentoring"
    | "communication"
    | "incidents"
    | "diagnosis"
    | "selfTaught";

export type SoftSkillItem = {
    key: SoftSkillKey;
    text: string;
};

export type SkillsTranslations = {
    title: string;
    sections: SkillsSectionText[];
    softSkillsTitle: string;
    softSkills: SoftSkillItem[];
    languagesTitle: string;
    languages: LanguageEntry[];
};

export type StudyItem = {
    title: string;
    place: string;
    period: string;
    description: string;
};

export type CertificationItem = {
    // Cruza con el badge del emisor en Education.astro (los assets viven en el componente)
    id: "chrome-enterprise" | "linux-intro" | "linux-customization";
    title: string;
    place: string;
    date: string;
    description: string;
    document: string | null;
    verifyUrl: string | null;
    // Solo se muestra cuando el verificador pide el código a mano (Hack4u). Si el enlace
    // de verificación resuelve solo (Accredible), va a null y no se publica.
    credentialId: string | null;
};

export type EducationTranslations = {
    title: string;
    formalTitle: string;
    certificationsTitle: string;
    viewCertificateLabel: string;
    verifyLabel: string;
    credentialIdLabel: string;
    studies: StudyItem[];
    certifications: CertificationItem[];
};

type ContactTexts = {
    title: string;
    subtitle: string;
    emailButton: string;
    linkedinButton: string;
    fields: {
        email: string;
        phone: string;
        location: string;
        github: string;
    };
};

type FooterTexts = {
    footer: string;
    builtWith: string;
    github: string;
    linkedin: string;
    email: string;
};

type Translations = {
    nav: NavTexts;
    hero: HeroTexts;
    experience: {
        title: string;
        items: ExperienceItem[];
    };
    projects: {
        title: string;
        codeLabel: string;
        previewLabel: string;
        items: ProjectItem[];
    };
    about: AboutTranslations;
    skills: SkillsTranslations;
    education: EducationTranslations;
    contact: ContactTexts;
    footer: FooterTexts;
};

export const translations: Record<Lang, Translations> = {
    en: {
        nav: {
            home: "Home",
            experience: "Experience",
            projects: "Projects",
            about: "About",
            skills: "Skills",
            education: "Education",
            contact: "Contact",
        },
        hero: {
            badge: "CYBERSECURITY · SYSTEMS · AUTOMATION",
            greeting: "Hi, I'm",
            titleLine: "I build secure & reliable systems.",
            subtitle: "3 years of experience. <highlight>Cybersecurity & Systems Specialist</highlight> based in Burriana, Spain. Experienced in networks, systems administration and ethical hacking.",
            github: "GitHub",
            linkedin: "LinkedIn",
            email: "Email",
        },
        experience: {
            title: "Work Experience",
            items: [
                {
                    role: "L1 Service Desk Technician",
                    company: "Ciberia Tech",
                    period: "Jan 2026 – Present",
                    description: "Integration and continuous improvement of systems under Zero-Touch and Zero-Trust policies. Design of AI-powered automation workflows with Anthropic Claude and n8n to speed up the work of both end users and service desk technicians. Day-to-day operations on Atlassian Suite and Google Workspace.",
                },
                {
                    role: "Systems & Network Administrator",
                    company: "Ayuntamiento de Burriana",
                    period: "Aug 2023 – Aug 2024",
                    description: "Administration of Fortinet firewalls, managed switches and Active Directory. Datacenter expansion, support for public employees, incident management and coordination of two interns.",
                },
                {
                    role: "Full-Stack Developer",
                    company: "Develovements",
                    period: "Mar 2023 – Aug 2023",
                    description: "Full development of a complete web application (frontend in Next.js + backend in NestJS), and contribution of improvements and bug fixes to existing Python-based projects.",
                },
                {
                    role: "IT Support Technician",
                    company: "Grupo STN",
                    period: "Mar 2021 – Jul 2021",
                    description: "User support (CAU), configuration of Aruba switches and collaboration on internal software development tasks.",
                },
            ],
        },
        projects: {
            title: "Projects",
            codeLabel: "Code",
            previewLabel: "Preview",
            items: [
                {
                    id: "devops",
                    title: "DevOps Labs & Automation Suite",
                    subtitle: "CI/CD · Docker · Jenkins · Ansible · Prometheus · Grafana · K3s",
                    description: "Collection of DevOps labs: Jenkins pipelines, Dockerized applications and automated tests for a Python project. Focused on learning CI/CD, containers and good practices for software delivery.",
                    tech: ["Docker", "Jenkins", "Ansible", "Prometheus", "Grafana", "K3s"],
                    codeUrl: "https://github.com/Zane2300/DevOps_Projects",
                    liveUrl: null,
                    imageAlt: "Front page of DevOps Labs & Automation Suite project.",
                },
                {
                    id: "apache",
                    title: "Apache Hardening",
                    subtitle: "Web Server Security",
                    description: "Hardening of an Apache web server on Linux: secure virtual hosts, HTTPS, security headers, logging and best practices to reduce attack surface for public-facing web services.",
                    tech: ["Apache", "Linux", "Security", "Bash"],
                    codeUrl: "https://github.com/Zane2300/Apache_Hardening",
                    liveUrl: null,
                    imageAlt: "Front page of the Apache Hardening project.",
                },
                {
                    id: "dvwa",
                    title: "DVWA Labs & Writeups",
                    subtitle: "Offensive Security · Web Hacking",
                    description: "Practice environment based on Damn Vulnerable Web Application (DVWA) with notes, scripts and exploitation paths for common web vulnerabilities: SQLi, XSS, CSRF, auth bypass and more.",
                    tech: ["DVWA", "Web Security", "Kali Linux"],
                    codeUrl: "https://github.com/Zane2300/DVWA",
                    liveUrl: null,
                    imageAlt: "Front page of the DVWA labs and writeups project.",
                },
                {
                    id: "dashboard",
                    title: "Web Browser Dashboard",
                    subtitle: "Productivity · Custom Start Page",
                    description: "A custom browser dashboard with quick links, widgets and a clean aesthetic, designed to serve as a personal start page and experimentation ground for HTML, CSS and JavaScript.",
                    tech: ["HTML", "CSS", "JavaScript"],
                    codeUrl: "https://github.com/Zane2300/web-browser-dashboard",
                    liveUrl: "https://zane2300.github.io/web-browser-dashboard/",
                    imageAlt: "Front page of the Web Browser Dashboard project.",
                },
            ],
        },
        about: {
            title: "About Me",
            paragraphs: [
                "I’m a <highlight>cybersecurity & systems specialist</highlight> focused on securing infrastructures and reducing operational risk. I work with firewalls, networks and Active Directory to keep critical systems stable, resilient and protected.",
                "I’ve supported corporate and public-sector environments, handling firewall administration, switch management, datacenter expansion and incident response — helping teams strengthen their security posture and operate more efficiently.",
                "I’m driven by technical challenges: identifying weaknesses, hardening services and applying practical solutions that improve reliability and reduce attack surface.",
                "Right now I’m focused on <highlight>infrastructure security</highlight> and <highlight>automation</highlight>: hardening the systems I run, applying Zero-Trust principles and building workflows that take repetitive work away from technicians and users alike.",
            ],
        },
        skills: {
            title: "Skills & Tech Stack",
            sections: [
                {
                    key: "security",
                    title: "Security & Hardening",
                    description: "Hardening infrastructure, reducing attack surface and testing defences with offensive tooling in lab environments.",
                },
                {
                    key: "systems",
                    title: "Systems & Networks",
                    description: "Windows and Linux infrastructure, Active Directory, virtualization and secure network services.",
                },
                {
                    key: "automation",
                    title: "Automation & DevOps",
                    description: "Containers, configuration management and AI-assisted workflows that remove repetitive work.",
                },
            ],
            softSkillsTitle: "Soft Skills",
            softSkills: [
                { key: "mentoring", text: "Leadership & mentoring in technical teams." },
                { key: "communication", text: "Clear, direct communication with stakeholders." },
                { key: "incidents", text: "Teamwork under pressure and incident response." },
                { key: "diagnosis", text: "Diagnosing production incidents: isolating the root cause before changing anything." },
                { key: "selfTaught", text: "Self-taught, curious and proactive." },
            ],
            languagesTitle: "Languages",
            languages: [
                { name: "Spanish", level: "Native" },
                { name: "Valencian", level: "Native" },
                { name: "English", level: "B1" },
            ],
        },
        education: {
            title: "Education & Certifications",
            formalTitle: "Formal Education",
            certificationsTitle: "Certifications",
            viewCertificateLabel: "View Certificate",
            verifyLabel: "Verify",
            credentialIdLabel: "Credential ID",
            studies: [
                {
                    title: "Master's Degree in Cybersecurity",
                    place: "IES Caminàs",
                    period: "2024 – 2025",
                    description: "Advanced training focused on network defense, secure systems and threat analysis.",
                },
                {
                    title: "Senior Technician in Multiplatform Application Development",
                    place: "Ágil Centros",
                    period: "2021 – 2023",
                    description: "Technical education centered on software development and cross-platform solutions.",
                },
                {
                    title: "Technician in Microcomputer Systems and Networks",
                    place: "IES Jaume I",
                    period: "2019 – 2021",
                    description: "Foundational studies in IT support, hardware maintenance and basic networking.",
                },
            ],
            certifications: [
                {
                    id: "chrome-enterprise",
                    title: "Chrome Enterprise Premium Proficiency Badge",
                    place: "Google",
                    date: "Apr 2026",
                    description: "Covers browser deployment, management and advanced security through hands-on modules in the Google Admin console: management fundamentals, context-aware access controls, data loss prevention (DLP), content filtering and identity synchronisation.",
                    document: "/documents/google-chrome-enterprise-premium-proficiency-badge.pdf",
                    verifyUrl: "https://chromeenterprisecertified.accredible.com/65b7b710-3199-430e-85ec-f1b530b74d1a#acc.PZGj9Hyg",
                    credentialId: null,
                },
                {
                    id: "linux-intro",
                    title: "Introduction to Linux",
                    place: "Hack4u",
                    date: "Dec 2025",
                    description: "Hack4u course on Linux fundamentals, completed with every assessment test passed.",
                    document: "/documents/hack4u-linux-introduction-certificate.pdf",
                    verifyUrl: "https://hack4u.io/check-certificate/",
                    credentialId: "1184-5652-1771-1047",
                },
                {
                    id: "linux-customization",
                    title: "Linux Environment Customization",
                    place: "Hack4u",
                    date: "Oct 2025",
                    description: "Linux workstation customization and workflow optimization following S4vitar’s professional setup.",
                    document: "/documents/hack4u-linux-customization-certificate.pdf",
                    verifyUrl: "https://hack4u.io/check-certificate/",
                    credentialId: "7022-4692-3666-6154",
                },
            ],
        },
        contact: {
            title: "Contact",
            subtitle: "Let’s work together!",
            emailButton: "Email me",
            linkedinButton: "LinkedIn",
            fields: {
                email: "Email",
                phone: "Phone",
                location: "Location",
                github: "GitHub",
            },
        },
        footer: {
            footer: "Alex Rosell. All rights reserved.",
            builtWith: "Built with Astro & Svelte",
            github: "GitHub",
            linkedin: "LinkedIn",
            email: "Email",
        },
    },

    es: {
        nav: {
            home: "Inicio",
            experience: "Experiencia",
            projects: "Proyectos",
            about: "Sobre mí",
            skills: "Skills",
            education: "Formación",
            contact: "Contacto",
        },
        hero: {
            badge: "CIBERSEGURIDAD · SISTEMAS · AUTOMATIZACIÓN",
            greeting: "Hola, soy",
            titleLine: "Diseño sistemas seguros y fiables.",
            subtitle: "3 años de experiencia. <highlight>Especialista en Ciberseguridad y Sistemas</highlight> con base en Burriana, España. Experiencia en redes, administración de sistemas y hacking ético.",
            github: "GitHub",
            linkedin: "LinkedIn",
            email: "Correo",
        },
        experience: {
            title: "Experiencia profesional",
                items: [
                    {
                        role: "Técnico L1 CAU",
                        company: "Ciberia Tech",
                        period: "ene 2026 – actualidad",
                        description: "Integración y mejora continua de sistemas bajo políticas Zero-Touch y Zero-Trust. Diseño de flujos de automatización con IA mediante Anthropic Claude y n8n para agilizar el trabajo de usuarios y técnicos del CAU. Operativa diaria sobre Atlassian Suite y Google Workspace.",
                    },
                    {
                        role: "Administrador de sistemas y redes",
                        company: "Ayuntamiento de Burriana",
                        period: "ago 2023 – ago 2024",
                        description: "Administración de cortafuegos Fortinet, switches gestionados y Active Directory. Ampliación del centro de datos, soporte a personal funcionario, gestión de incidencias y coordinación de dos personas en prácticas.",
                    },
                    {
                        role: "Desarrollador Full-Stack",
                        company: "Develovements",
                        period: "mar 2023 – ago 2023",
                        description: "Desarrollo completo de una aplicación web (frontend en Next.js + backend en NestJS) y aportación de mejoras y corrección de errores en proyectos existentes basados en Python.",
                    },
                    {
                        role: "Técnico de soporte IT",
                        company: "Grupo STN",
                        period: "mar 2021 – jul 2021",
                        description: "Soporte a usuarios (CAU), configuración de switches Aruba y colaboración en tareas de desarrollo de software interno.",
                    },
                ],
        },
        projects: {
            title: "Proyectos",
            codeLabel: "Código",
            previewLabel: "Demo",
            items: [
                {
                    id: "devops",
                    title: "DevOps Labs & Automation Suite",
                    subtitle: "CI/CD · Docker · Jenkins · Ansible · Prometheus · Grafana · K3s",
                    description: "Colección de laboratorios DevOps: pipelines en Jenkins, aplicaciones dockerizadas y pruebas automatizadas para un proyecto en Python. Centrado en aprender CI/CD, contenedores y buenas prácticas de despliegue.",
                    tech: ["Docker", "Jenkins", "Ansible", "Prometheus", "Grafana", "K3s"],
                    codeUrl: "https://github.com/Zane2300/DevOps_Projects",
                    liveUrl: null,
                    imageAlt: "Portada del proyecto DevOps Labs & Automation Suite.",
                },
                {
                    id: "apache",
                    title: "Apache Hardening",
                    subtitle: "Seguridad en servidores web",
                    description: "Bastionado de un servidor web Apache en Linux: virtual hosts seguros, HTTPS, cabeceras de seguridad, logging y buenas prácticas para reducir la superficie de ataque en servicios expuestos a Internet.",
                    tech: ["Apache", "Linux", "Seguridad", "Bash"],
                    codeUrl: "https://github.com/Zane2300/Apache_Hardening",
                    liveUrl: null,
                    imageAlt: "Portada del proyecto Apache Hardening.",
                },
                {
                    id: "dvwa",
                    title: "DVWA Labs & Writeups",
                    subtitle: "Seguridad ofensiva · Web Hacking",
                    description: "Entorno de práctica basado en Damn Vulnerable Web Application (DVWA) con notas, scripts y rutas de explotación para vulnerabilidades web comunes: SQLi, XSS, CSRF, bypass de autenticación y más.",
                    tech: ["DVWA", "Seguridad Web", "Kali Linux"],
                    codeUrl: "https://github.com/Zane2300/DVWA",
                    liveUrl: null,
                    imageAlt: "Portada del proyecto de laboratorios y writeups de DVWA.",
                },
                {
                    id: "dashboard",
                    title: "Web Browser Dashboard",
                    subtitle: "Productividad · Página de inicio personalizada",
                    description: "Un panel personalizado para el navegador con accesos rápidos, widgets y una estética limpia, diseñado como página de inicio personal y terreno de pruebas para HTML, CSS y JavaScript.",
                    tech: ["HTML", "CSS", "JavaScript"],
                    codeUrl: "https://github.com/Zane2300/web-browser-dashboard",
                    liveUrl: "https://zane2300.github.io/web-browser-dashboard/",
                    imageAlt: "Portada del proyecto Web Browser Dashboard.",
                },
            ],
        },
        about: {
            title: "Sobre mí",
            paragraphs: [
                "Soy <highlight>especialista en ciberseguridad y sistemas</highlight>, centrado en securizar infraestructuras y reducir el riesgo operativo. Trabajo con cortafuegos, redes y Active Directory para mantener sistemas críticos estables, resilientes y protegidos.",
                "He trabajado tanto en entornos corporativos como en la administración pública, gestionando firewalls, switches gestionados, ampliaciones de datacenter y respuesta a incidencias, ayudando a los equipos a reforzar su postura de seguridad y a operar de forma más eficiente.",
                "Me motivan los retos técnicos: identificar debilidades, bastionar servicios y aplicar soluciones prácticas que mejoren la fiabilidad y reduzcan la superficie de ataque.",
                "Ahora mismo estoy centrado en la <highlight>seguridad de la infraestructura</highlight> y en la <highlight>automatización</highlight>: fortificar los sistemas que administro, aplicar principios Zero-Trust y construir flujos que quiten trabajo repetitivo a técnicos y usuarios.",
            ],
        },
        skills: {
            title: "Habilidades y stack tecnológico",
            sections: [
                {
                    key: "security",
                    title: "Seguridad y fortificación",
                    description: "Fortificación de infraestructuras, reducción de la superficie de ataque y validación de defensas con herramientas ofensivas en laboratorio.",
                },
                {
                    key: "systems",
                    title: "Sistemas y redes",
                    description: "Infraestructura Windows y Linux, Active Directory, virtualización y servicios de red seguros.",
                },
                {
                    key: "automation",
                    title: "Automatización y DevOps",
                    description: "Contenedores, gestión de configuración y flujos asistidos por IA que eliminan trabajo repetitivo.",
                },
            ],
            softSkillsTitle: "Competencias personales",
            softSkills: [
                { key: "mentoring", text: "Liderazgo y mentoring en equipos técnicos." },
                { key: "communication", text: "Comunicación clara y directa con personas clave." },
                { key: "incidents", text: "Trabajo en equipo bajo presión y respuesta a incidencias." },
                { key: "diagnosis", text: "Diagnóstico de incidencias en producción: aislar la causa antes de tocar el sistema." },
                { key: "selfTaught", text: "Autodidacta, curioso y proactivo." },
            ],
            languagesTitle: "Idiomas",
            languages: [
                { name: "Español", level: "Nativo" },
                { name: "Valenciano", level: "Nativo" },
                { name: "Inglés", level: "B1" },
            ],
        },
        education: {
            title: "Formación y certificaciones",
            formalTitle: "Formación reglada",
            certificationsTitle: "Certificaciones",
            viewCertificateLabel: "Ver certificado",
            verifyLabel: "Verificar",
            credentialIdLabel: "ID de credencial",
            studies: [
                {
                    title: "Máster en Ciberseguridad",
                    place: "IES Caminàs",
                    period: "2024 – 2025",
                    description: "Formación avanzada centrada en defensa de redes, sistemas seguros y análisis de amenazas.",
                },
                {
                    title: "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)",
                    place: "Ágil Centros",
                    period: "2021 – 2023",
                    description: "Formación técnica orientada al desarrollo de software y soluciones multiplataforma.",
                },
                {
                    title: "Técnico en Sistemas Microinformáticos y Redes (SMR)",
                    place: "IES Jaume I",
                    period: "2019 – 2021",
                    description: "Estudios base en soporte IT, mantenimiento de hardware y redes básicas.",
                },
            ],
            certifications: [
                {
                    id: "chrome-enterprise",
                    title: "Chrome Enterprise Premium Proficiency Badge",
                    place: "Google",
                    date: "abr 2026",
                    description: "Cubre la implementación, administración y seguridad avanzada del navegador mediante módulos prácticos en la consola de Google: fundamentos de gestión, controles de acceso por contexto, prevención de pérdida de datos (DLP), filtrado de contenido y sincronización de identidades.",
                    document: "/documents/google-chrome-enterprise-premium-proficiency-badge.pdf",
                    verifyUrl: "https://chromeenterprisecertified.accredible.com/65b7b710-3199-430e-85ec-f1b530b74d1a#acc.PZGj9Hyg",
                    credentialId: null,
                },
                {
                    id: "linux-intro",
                    title: "Introducción a Linux",
                    place: "Hack4u",
                    date: "dic 2025",
                    description: "Curso de fundamentos de Linux de Hack4u, superando las pruebas de evaluación.",
                    document: "/documents/hack4u-linux-introduction-certificate.pdf",
                    verifyUrl: "https://hack4u.io/check-certificate/",
                    credentialId: "1184-5652-1771-1047",
                },
                {
                    id: "linux-customization",
                    title: "Personalización de entorno en Linux",
                    place: "Hack4u",
                    date: "oct 2025",
                    description: "Personalización de estación de trabajo Linux y optimización del flujo de trabajo siguiendo la configuración profesional de S4vitar.",
                    document: "/documents/hack4u-linux-customization-certificate.pdf",
                    verifyUrl: "https://hack4u.io/check-certificate/",
                    credentialId: "7022-4692-3666-6154",
                },
            ],
        },
        contact: {
            title: "Contacto",
            subtitle: "¡Trabajemos juntos!",
            emailButton: "Envíame un email",
            linkedinButton: "LinkedIn",
            fields: {
                email: "Correo",
                phone: "Teléfono",
                location: "Ubicación",
                github: "GitHub",
            },
        },
        footer: {
            footer: "Alex Rosell. Todos los derechos reservados.",
            builtWith: "Hecho con Astro y Svelte",
            github: "GitHub",
            linkedin: "LinkedIn",
            email: "Correo",
        },
    },
};