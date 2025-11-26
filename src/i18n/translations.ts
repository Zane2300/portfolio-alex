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

type ExperienceTexts = {

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
    experience: ExperienceTexts;
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