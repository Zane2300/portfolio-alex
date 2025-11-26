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

type ProjectsTexts = {

};

type AboutTexts = {

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
    projects: ProjectsTexts;
    about: AboutTexts;
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

        },
        about: {

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

        },
        about: {

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