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

type SkillsTexts = {

};

type EducationTexts = {

};

type ContactTexts = {

};

type FooterTexts = {

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
    skills: SkillsTexts;
    education: EducationTexts;
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
            badge: "CYBERSECURITY · DEVOPS · RED TEAM",
            greeting: "Hi, I'm",
            titleLine: "I build secure & reliable systems.",
            subtitle: "+2 years of experience. <highlight>Cybersecurity & Systems Specialist</highlight> based in Burriana, Spain. Experienced in networks, systems administration and ethical hacking.",
            github: "GitHub",
            linkedin: "LinkedIn",
            email: "Email",
        },
        experience: {
            title: "Work Experience",
            items: [
                {
                    role: "Systems & Network Administrator",
                    company: "Ayuntamiento de Burriana",
                    period: "Aug 2023 – Aug 2024",
                    description: "Administration of Fortinet firewalls, managed switches and Active Directory. Datacenter expansion, support for public employees, incident management and coordination of two interns.",
                },
                {
                    role: "Full-Stack Developer",
                    company: "Develovements",
                    period: "Mar 2023 – Jul 2023",
                    description: "Full development of a complete web application (frontend in Next.js + backend in NestJS), and contribution of improvements and bug fixes to existing Python-based projects.",
                },
                {
                    role: "IT Support Technician",
                    company: "Grupo STN",
                    period: "Mar 2021 – Jun 2021",
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
                `I’m a <highlight>cybersecurity & systems specialist</highlight> focused on securing infrastructures and reducing operational risk. I work with firewalls, networks and Active Directory to keep critical systems stable, resilient and protected.`,
                `I’ve supported corporate and public-sector environments, handling firewall administration, switch management, datacenter expansion and incident response — helping teams strengthen their security posture and operate more efficiently.`,
                `I’m driven by technical challenges: identifying weaknesses, hardening services and applying practical solutions that improve reliability and reduce attack surface.`,
                `Right now I’m deepening my expertise in <highlight>digital forensics</highlight>, <highlight>Red Team operations</highlight> and <highlight>DevOps security</highlight>, combining a hands-on mindset with continuous learning and a strong focus on problem-solving.`,
            ],
        },
        skills: {

        },
        education: {

        },
        contact: {

        },
        footer: {

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
            badge: "CIBERSEGURIDAD · DEVOPS · RED TEAM",
            greeting: "Hola, soy",
            titleLine: "Diseño sistemas seguros y fiables.",
            subtitle: "+2 años de experiencia. <highlight>Especialista en Ciberseguridad y Sistemas</highlight> con base en Burriana, España. Experiencia en redes, administración de sistemas y hacking ético.",
            github: "GitHub",
            linkedin: "LinkedIn",
            email: "Correo",
        },
        experience: {
            title: "Experiencia profesional",
                items: [
                    {
                        role: "Administrador de sistemas y redes",
                        company: "Ayuntamiento de Burriana",
                        period: "ago 2023 – ago 2024",
                        description: "Administración de cortafuegos Fortinet, switches gestionados y Active Directory. Ampliación del centro de datos, soporte a personal funcionario, gestión de incidencias y coordinación de dos personas en prácticas.",
                    },
                    {
                        role: "Desarrollador Full-Stack",
                        company: "Develovements",
                        period: "mar 2023 – jul 2023",
                        description: "Desarrollo completo de una aplicación web (frontend en Next.js + backend en NestJS) y aportación de mejoras y corrección de errores en proyectos existentes basados en Python.",
                    },
                    {
                        role: "Técnico de soporte IT",
                        company: "Grupo STN",
                        period: "mar 2021 – jun 2021",
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
                `Soy <highlight>especialista en ciberseguridad y sistemas</highlight>, centrado en securizar infraestructuras y reducir el riesgo operativo. Trabajo con cortafuegos, redes y Active Directory para mantener sistemas críticos estables, resilientes y protegidos.`,
                `He trabajado tanto en entornos corporativos como en la administración pública, gestionando firewalls, switches gestionados, ampliaciones de datacenter y respuesta a incidencias, ayudando a los equipos a reforzar su postura de seguridad y a operar de forma más eficiente.`,
                `Me motivan los retos técnicos: identificar debilidades, bastionar servicios y aplicar soluciones prácticas que mejoren la fiabilidad y reduzcan la superficie de ataque.`,
                `Actualmente estoy profundizando en <highlight>informática forense</highlight>, <highlight>operaciones de Red Team</highlight> y <highlight>seguridad en entornos DevOps</highlight>, combinando una mentalidad práctica con aprendizaje continuo y un fuerte foco en la resolución de problemas.`,
            ],
        },
        skills: {

        },
        education: {

        },
        contact: {

        },
        footer: {

        },
    },
};