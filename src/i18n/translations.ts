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
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    github: string;
    linkedin: string;
    email: string;
};

type Translations = {
    nav: NavTexts;
    hero: HeroTexts;
    // add experience, projecs, etc.
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
            titleLine1: "Hi, I'm Alex Rosell",
            titleLine2: "I build secure & reliable systems.",
            subtitle: "+2 years of experience. Cybersecurity & Systems Specialist based in Burriana, Spain. Experienced in networks, systems administration and ethical hacking.",
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
            badge: "CIBERSEGURIDAD · DEVOPS · RED TEAM",
            titleLine1: "Hola, soy Alex Rosell",
            titleLine2: "Diseño sistemas seguros y fiables.",
            subtitle: "+2 años de experiencia. Especialista en Ciberseguridad y Sistemas con base en Burriana, España. Experiencia en redes, administración de sistemas y hacking ético.",
            github: "GitHub",
            linkedin: "LinkedIn",
            email: "Correo",
        },
    },
};