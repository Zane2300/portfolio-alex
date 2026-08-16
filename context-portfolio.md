# Contexto del proyecto — `portfolio-alex`

Documento de contexto para asistentes de IA. Describe qué es el proyecto, cómo está
construido, qué convenciones sigue y cómo se despliega. Actualízalo si cambia la
arquitectura o el flujo de despliegue.

---

## 1. Qué es

Portfolio web personal de **Alex Rosell** (GitHub: `Zane2300`), técnico informático
especializado en **ciberseguridad, administración de sistemas y redes**.

Es un **sitio estático de una sola página** (más rutas secundarias en construcción),
bilingüe **inglés / español**, publicado en GitHub Pages:

- Producción: https://zane2300.github.io/portfolio-alex/
- Repositorio: https://github.com/Zane2300/portfolio-alex

No tiene backend, ni base de datos, ni formularios que envíen datos: todo el contenido
es estático y el contacto se resuelve con enlaces `mailto:` y redes sociales.

> Historia: el proyecto empezó como HTML + CSS + JS plano y se migró a Astro (rama
> `astro-migration`, ya fusionada en `main`). **El `README.md` del repositorio está
> desactualizado**: describe la estructura antigua (`index.html`, `styles.css`,
> `script.js`). La fuente de verdad es este documento y el código en `src/`.

---

## 2. Stack tecnológico

| Área | Tecnología | Versión (package.json) |
|---|---|---|
| Framework | **Astro** (SSG, `output` estático por defecto) | `^5.15.9` |
| Islas interactivas | **Svelte 5** vía `@astrojs/svelte` | `svelte ^5.43.14`, integración `^7.2.2` |
| Estilos | **Tailwind CSS v4** vía `@tailwindcss/vite` | `^4.1.17` |
| Tipado | **TypeScript** (config `astro/tsconfigs/strict`) | `^5.9.3` |
| Gestor de paquetes | npm (`package-lock.json` versionado) | — |
| Hosting | GitHub Pages (carpeta `/docs` de la rama `main`) | — |

Notas relevantes:

- **Tailwind v4 sin `tailwind.config.js`**: la configuración vive en CSS mediante el
  bloque `@theme` de [src/styles/global.css](src/styles/global.css). No busques un
  fichero de config JS; no existe y no debe crearse salvo migración deliberada.
- El plugin de Tailwind se registra en `vite.plugins`, no como integración de Astro
  (ver [astro.config.mjs](astro.config.mjs)).
- Fuente tipográfica: **Onest** cargada desde Google Fonts en el `<head>` del layout.

---

## 3. Configuración clave (`astro.config.mjs`)

```js
site:   'https://zane2300.github.io/portfolio-alex',
base:   '/portfolio-alex',
outDir: 'docs',
integrations: [svelte()],
vite: { plugins: [tailwindcss()] }
```

Tres decisiones que condicionan todo el código:

1. **`base: '/portfolio-alex'`** — el sitio no vive en la raíz del dominio. Cualquier
   enlace o recurso absoluto debe prefijarse con la base. Usa
   `import.meta.env.BASE_URL` (así lo hace [Education.astro:14](src/components/Education.astro#L14)
   para los PDFs de certificados). ⚠️ [LanguageToggle.svelte:7](src/components/LanguageToggle.svelte#L7)
   tiene la base **hardcodeada** (`const base = "/portfolio-alex"`); si cambia la base
   hay que tocar también ese fichero.
2. **`outDir: 'docs'`** — el build **se versiona en git** (`docs/` NO está en
   `.gitignore`, `dist/` sí). GitHub Pages sirve directamente esa carpeta.
3. **`site`** — necesario para URLs canónicas y para el procesado de assets.

---

## 4. Estructura del repositorio

```
portfolio-alex/
├── astro.config.mjs          # config Astro (base, outDir, integraciones)
├── svelte.config.js          # vitePreprocess
├── tsconfig.json             # extends astro/tsconfigs/strict
├── deploy.sh                 # script de preparación del build (bash)
├── package.json
├── README.md                 # ⚠️ desactualizado (describe la versión pre-Astro)
├── public/                   # copiado tal cual al build
│   ├── favicon.svg
│   └── documents/linux-customization-certificate.pdf
├── src/
│   ├── assets/               # imágenes procesadas por astro:assets → .webp
│   │   ├── profile.jpg, profile_2.png
│   │   ├── tech/             # ~30 logos de tecnologías (png)
│   │   └── git_projects_front_page/   # capturas de los proyectos
│   ├── components/           # secciones de la página
│   │   ├── NavBar.astro, Hero.astro, Experience.astro, Projects.astro,
│   │   ├── About.astro, Skills.astro, Education.astro, Contact.astro, Footer.astro
│   │   ├── LanguageToggle.svelte   # isla (client:load)
│   │   └── ThemeToggle.svelte      # isla (client:load)
│   ├── i18n/translations.ts  # ÚNICA fuente de textos (EN + ES), ~530 líneas
│   ├── layouts/PortfolioLayout.astro
│   ├── pages/
│   │   ├── index.astro       # versión EN  → /portfolio-alex/
│   │   ├── es/index.astro    # versión ES  → /portfolio-alex/es/
│   │   ├── projects.astro        # ⚠️ fichero VACÍO (ruta placeholder)
│   │   └── certifications.astro  # ⚠️ fichero VACÍO (ruta placeholder)
│   └── styles/global.css     # @import tailwindcss + @theme (paleta One Dark)
└── docs/                     # BUILD GENERADO Y COMMITEADO (no editar a mano)
    ├── .nojekyll
    ├── index.html, es/index.html, projects/, certifications/
    └── _astro/               # css/js/imágenes .webp con hash
```

---

## 5. Arquitectura de la página

### Composición

`src/pages/index.astro` (EN) y `src/pages/es/index.astro` (ES) son **dos ficheros
gemelos**: importan los mismos componentes, seleccionan `lang` (`"en"` / `"es"`),
cargan `translations[lang]` y pasan a cada componente su porción del diccionario:

```astro
const lang = "en";
const t = translations[lang];
...
<PortfolioLayout lang={lang}>
  <NavBar slot="navbar" lang={lang} t={t.nav} />
  <Hero t={t.hero} />
  <Experience t={t.experience} />
  <Projects t={t.projects} />
  <About t={t.about} />
  <Skills t={t.skills} />
  <Education t={t.education} />
  <Contact t={t.contact} />
  <Footer slot="footer" t={t.footer} />
</PortfolioLayout>
```

**Consecuencia importante:** si añades una sección, hay que editar *ambos* ficheros de
página. Están duplicados a propósito (dos rutas estáticas), no hay routing i18n
dinámico ni `[lang]` catch-all.

`PortfolioLayout.astro` define el documento (`<html lang>` con clase `dark` por
defecto), la fuente, y tres slots: `navbar`, el contenido por defecto y `footer`.

### Secciones y anclas

Navegación por anclas dentro de la misma página; cada sección lleva
`scroll-mt-32` para compensar la navbar sticky:

`#home` (Hero) · `#experience` · `#projects` · `#about` · `#skills` · `#education` · `#contact`

---

## 6. Internacionalización (i18n)

**Todo el texto visible vive en [src/i18n/translations.ts](src/i18n/translations.ts).**
No hay librería de i18n; es un objeto tipado:

```ts
export const LANGS = ["en", "es"];
export type Lang = (typeof LANGS)[number];
export const translations: Record<Lang, Translations> = { en: {...}, es: {...} };
```

El fichero exporta tipos por sección (`NavTexts`, `HeroTexts`, `ExperienceItem`,
`ProjectItem`, `AboutTranslations`, `SkillsTranslations`, `SkillSectionKey`,
`StudyItem`, `CertificationItem`, `ContactTexts`, `FooterTexts`) que los componentes
importan para tipar `Astro.props`.

Reglas y convenciones:

- **Regla de oro:** al añadir/modificar un texto hay que hacerlo en `en` **y** en `es`.
  El tipo `Record<Lang, Translations>` obliga a que ambas ramas tengan la misma forma.
- **Datos vs. textos**: los datos que no se traducen (logos, URLs de imágenes) viven en
  el componente y se enlazan con los textos por una `key`/`id`:
  - `Skills.astro` define secciones con `key: "cyber" | "systems" | "forensics" | "devops" | "web"`
    y hace `t.sections.find(s => s.key === section.key)`.
  - `Projects.astro` define un `imageMap: Record<ProjectItem["id"], ...>` con ids
    `"devops" | "apache" | "dvwa" | "dashboard"`.
  - Si añades un proyecto o una sección de skills: nueva entrada en el diccionario
    (EN + ES) **y** nueva entrada en el mapa del componente.
- **Marcado dentro de traducciones**: se admite el pseudo-tag `<highlight>…</highlight>`,
  que Hero y About sustituyen por `<span class="text-primary">` /
  `<strong class="text-primary">` y renderizan con `set:html`. No es HTML libre: solo
  ese tag, y el contenido es de confianza (lo escribe el autor del repo).
- Rutas de documentos en el diccionario se guardan **sin** la base
  (`"/documents/linux-customization-certificate.pdf"`); el componente antepone
  `import.meta.env.BASE_URL`.

### Cambio de idioma

`LanguageToggle.svelte` es una isla (`client:load`) que navega entre `/portfolio-alex/`
y `/portfolio-alex/es/`. Antes de navegar guarda `window.scrollY` en
`sessionStorage["portfolio-scroll-y"]` y al montar en la página destino restaura ese
scroll y borra la clave — así el cambio de idioma no te devuelve al inicio de la página.
Todos los accesos a `sessionStorage` van en `try/catch`.

---

## 7. Tema (claro / oscuro) y sistema de color

- Paleta base **One Dark**, definida como tokens Tailwind v4 en `@theme`
  ([src/styles/global.css](src/styles/global.css)): `--color-bg`, `--color-bg-elevated`,
  `--color-bg-dark`, `--color-bg-selection`, `--color-text`, `--color-text-muted`,
  acentos (`red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `purple`) y
  `--color-primary` / `-light` / `-dark` (rojo de marca).
- **Modo claro invertido**: en lugar de la convención habitual, el tema oscuro es el
  valor por defecto y el claro se define en `:root:not(.dark)`. El `<html>` sale del
  servidor con `class="dark"`.
- `ThemeToggle.svelte` (isla `client:load`) añade/quita la clase `dark` en
  `document.documentElement`, persiste en `localStorage["theme"]` y, si no hay valor
  guardado, usa `prefers-color-scheme`.
  ⚠️ Al aplicarse en `onMount`, existe un posible *flash* de tema oscuro al cargar en
  modo claro; no hay script inline anti-FOUC.
- En las clases de Tailwind se usan los tokens semánticos: `bg-bg`, `bg-bg-elevated`,
  `text-text`, `text-text-muted`, `border-bg-selection`, `text-primary`,
  `hover:border-primary`… **Usa estos tokens, no colores literales de Tailwind**
  (`bg-gray-800`, etc.).

---

## 8. Convenciones de UI

- Estilo visual: tarjetas redondeadas grandes (`rounded-3xl`), borde
  `border-bg-selection`, fondo `bg-bg-elevated/70..80`, sombra difusa
  `shadow-[0_24px_80px_rgba(0,0,0,0.55)]`. Navbar tipo *pill* con `backdrop-blur-lg`.
- Iconos: **SVG inline** (estilo Tabler Icons), sin librería de iconos.
- Imágenes: componente `<Image>` de `astro:assets`, importadas como módulos desde
  `src/assets/` → Astro las optimiza a `.webp` con hash en el build. `loading="lazy"`
  en todo lo que no es *above the fold*. Lo que va en `public/` (PDFs, favicon) se
  copia sin procesar.
- Responsive mobile-first; los enlaces del navbar se ocultan por debajo de `sm`
  (`hidden sm:flex`).
- Comentarios en el código: mezcla de español e inglés; los rótulos de sección en
  mayúsculas (`<!-- NAVBAR -->`, `{/* BENTO GRID */}`) son el patrón habitual.
- Indentación de 4 espacios en `.astro` y `.svelte`.
- Svelte 5 pero con **sintaxis legacy**: `export let prop`, `on:click`. Los dos
  componentes existentes no usan runas (`$props`, `$state`); mantén la coherencia salvo
  que decidas migrar todo.

---

## 9. Datos personales presentes en el sitio

(Públicos y deliberados; están en el código fuente.)

- Email: `alexrosell2003@gmail.com` · Teléfono: `+34 694 41 48 36`
- Ubicación: Burriana, España
- GitHub: `https://github.com/Zane2300` · LinkedIn: `https://www.linkedin.com/in/alex-rosell-angullo/`
- Experiencia: Ayuntamiento de Burriana (admin. sistemas y redes), Develovements
  (full-stack), Grupo STN (soporte IT).
- Proyectos enlazados: `DevOps_Projects`, `Apache_Hardening`, DVWA y
  `web-browser-dashboard` (este último con demo en vivo).

---

## 10. Desarrollo local

```bash
npm install
npm run dev       # astro dev  → http://localhost:4321/portfolio-alex/
npm run build     # astro build → genera docs/
npm run preview   # astro preview (sirve el build)
```

Recuerda el prefijo `/portfolio-alex/` también en desarrollo: la raíz `/` devuelve 404.

No hay tests, ni linter, ni formateador configurados en el repo.

---

## 11. Despliegue

**Modelo:** GitHub Pages sirviendo la carpeta `/docs` de la rama `main`. El artefacto
de build se commitea; **no hay GitHub Actions ni workflow de CI**.

Flujo (script [deploy.sh](deploy.sh), bash — en Windows se ejecuta con Git Bash):

```bash
./deploy.sh          # npm install + npm run build + touch docs/.nojekyll
git add .
git commit -m "Deploy"
git push
```

El script hace `set -e`, intenta un `dos2unix` sobre sí mismo (por si se editó en
Windows y quedó con CRLF), instala dependencias, construye y crea `docs/.nojekyll`
para que GitHub Pages no procese la carpeta con Jekyll (importante: sin ese fichero,
`_astro/` sería ignorado por empezar con guion bajo).

Reglas al trabajar en este repo:

- **Nunca edites `docs/` a mano.** Se regenera entera en cada build.
- Un cambio en `src/` no está publicado hasta que se reconstruye `docs/` y se hace push.
- Los diffs de despliegue son ruidosos (assets con hash que cambian de nombre); es
  esperado.
- El equivalente en PowerShell del script sería
  `npm install; npm run build; if (-not (Test-Path docs/.nojekyll)) { New-Item -ItemType File docs/.nojekyll }`.

---

## 12. Estado actual y puntos de atención

- Ramas: `main` (activa) y `origin/astro-migration` (histórica, ya integrada).
- `src/pages/projects.astro` y `src/pages/certifications.astro` están **vacíos**: son
  rutas reservadas que generan páginas en blanco en `docs/projects/` y
  `docs/certifications/`. Aún no están enlazadas desde la navbar.
- `README.md` describe la versión pre-Astro del portfolio y su banner
  (`assets/images/web_banner.png`) ya no existe → candidato claro a reescritura.
- `package.json` tiene `"name": ""` (vacío).
- La base `/portfolio-alex` está duplicada entre `astro.config.mjs` y
  `LanguageToggle.svelte`.
- Sin script anti-FOUC para el tema (ver §7).
- Trabajo reciente (commits): traducción completa de las secciones skills, education,
  contact y footer; conservación del scroll al cambiar de idioma; mejoras en las
  tarjetas de soft skills e idiomas.

---

## 13. Checklist para tareas habituales

**Añadir una sección nueva a la página**
1. Componente en `src/components/`, recibiendo `t` por props y tipado desde `i18n/translations.ts`.
2. Tipos + textos EN y ES en `translations.ts` (añadir la clave al tipo `Translations`).
3. Importar y montar en `src/pages/index.astro` **y** `src/pages/es/index.astro`.
4. Si lleva ancla, añadir `id` + `scroll-mt-32` y el enlace en `NavBar.astro` + `nav` del diccionario.

**Añadir un proyecto**
1. Imagen en `src/assets/git_projects_front_page/`.
2. Nuevo `id` en el union type `ProjectItem["id"]` y entrada en el `imageMap` de `Projects.astro`.
3. Entrada en `projects.items` en EN y ES.

**Añadir una tecnología a Skills**
1. Logo PNG en `src/assets/tech/`.
2. Import + entrada en el array `items` de la sección correspondiente en `Skills.astro`.
   (El nombre no se traduce; los títulos/descripciones de sección sí, vía `key`.)

**Añadir un certificado con PDF**
1. PDF en `public/documents/`.
2. Entrada en `education.certifications` (EN + ES) con
   `document: "/documents/<fichero>.pdf"` (sin la base).

**Publicar cambios**
`./deploy.sh` → `git add . && git commit && git push`.

---

## 14. Árbol completo del proyecto

Estado a **16 de agosto de 2026**. Se excluyen `.git/` y `node_modules/` (no
versionado). Los números entre paréntesis son líneas del fichero.

```
portfolio-alex/
│
├── .gitignore                      # ignora dist/, .astro/, node_modules/, .env, .vscode/, .idea/
├── README.md                       # ⚠️ desactualizado (describe la versión pre-Astro)
├── context-portfolio.md            # este documento
├── astro.config.mjs                # base: '/portfolio-alex', outDir: 'docs', svelte + tailwind
├── svelte.config.js                # vitePreprocess()
├── tsconfig.json                   # extends astro/tsconfigs/strict
├── deploy.sh                       # install + build + touch docs/.nojekyll
├── package.json                    # scripts: dev / build / preview / astro
├── package-lock.json               # versionado (npm)
│
├── public/                         # servido tal cual, SIN procesar por Astro
│   ├── favicon.svg
│   └── documents/
│       └── linux-customization-certificate.pdf
│
├── src/
│   ├── assets/                     # procesado por astro:assets → .webp con hash
│   │   ├── profile.jpg                     # foto del Hero
│   │   ├── profile_2.png                   # foto de About
│   │   ├── astro.svg                       # (sin usar)
│   │   ├── background.svg                  # (sin usar)
│   │   │
│   │   ├── git_projects_front_page/        # portadas de los proyectos
│   │   │   ├── apache_hardening.png        #   id "apache"
│   │   │   ├── dashboard.png               #   id "dashboard"
│   │   │   ├── devops_labs_suite.png       #   id "devops"
│   │   │   └── dvwa.png                    #   id "dvwa"
│   │   │
│   │   └── tech/                           # logos de Skills (30 ficheros)
│   │       ├── [cyber]      metasploit · nmap · nessus · openvas · burpsuite · owasp
│   │       │                kali-linux.png  ← importado en Skills.astro pero NO usado
│   │       ├── [systems]    active-directory · fortinet · squid · linux · aruba
│   │       ├── [forensics]  wireshark · autopsy · volatility · ftk_imager ·
│   │       │                Magnet_Forensics · exiftool
│   │       ├── [devops]     docker · jenkins · ansible · prometheus · grafana ·
│   │       │                kubernetes · shell · python
│   │       └── [web]        html · css · javascript · astro · svelte
│   │
│   ├── components/
│   │   ├── NavBar.astro            (58)   pill sticky + anclas + los dos toggles
│   │   ├── Hero.astro              (89)   #home · foto, CTA GitHub/LinkedIn/Email
│   │   ├── Experience.astro        (43)   #experience · timeline laboral
│   │   ├── Projects.astro         (120)   #projects · imageMap por ProjectItem["id"]
│   │   ├── About.astro             (64)   #about · párrafos con <highlight>
│   │   ├── Skills.astro           (202)   #skills · bento grid + soft skills + idiomas
│   │   ├── Education.astro        (114)   #education · estudios + certificados (PDF)
│   │   ├── Contact.astro          (127)   #contact · datos de contacto hardcodeados
│   │   ├── Footer.astro            (72)   año dinámico + enlaces sociales
│   │   ├── LanguageToggle.svelte   (64)   🏝️ isla client:load · EN/ES + scroll restore
│   │   └── ThemeToggle.svelte      (49)   🏝️ isla client:load · dark/light + localStorage
│   │
│   ├── i18n/
│   │   └── translations.ts        (531)   ÚNICA fuente de textos: tipos + { en, es }
│   │
│   ├── layouts/
│   │   └── PortfolioLayout.astro   (42)   <html class="dark"> · slots: navbar / — / footer
│   │
│   ├── pages/                      # routing por ficheros
│   │   ├── index.astro             (29)   → /portfolio-alex/     (lang = "en")
│   │   ├── es/
│   │   │   └── index.astro         (29)   → /portfolio-alex/es/  (lang = "es")
│   │   ├── projects.astro           (0)   ⚠️ VACÍO · placeholder → /projects/
│   │   └── certifications.astro     (0)   ⚠️ VACÍO · placeholder → /certifications/
│   │
│   └── styles/
│       └── global.css              (45)   @import tailwindcss · @theme (One Dark)
│                                          · :root:not(.dark) = tema claro
│
└── docs/                           # ⚠️ BUILD GENERADO Y COMMITEADO — no editar a mano
    ├── .nojekyll                   # evita que GitHub Pages aplique Jekyll a _astro/
    ├── favicon.svg
    ├── index.html                  # ← src/pages/index.astro
    ├── es/index.html               # ← src/pages/es/index.astro
    ├── projects/index.html         # ← placeholder vacío
    ├── certifications/index.html   # ← placeholder vacío
    ├── documents/
    │   └── linux-customization-certificate.pdf   # copiado de public/
    └── _astro/                     # 43 ficheros con hash en el nombre
        ├── index.<hash>.css                # CSS de Tailwind compilado
        ├── LanguageToggle.<hash>.js        # bundle de la isla
        ├── client.svelte.<hash>.js         # runtime de Svelte
        ├── lifecycle.<hash>.js
        └── *.webp                          # todas las imágenes optimizadas
```

### Cómo leer el árbol

- **Lo único que se edita a mano es `src/`, `public/` y los ficheros de config de la
  raíz.** `docs/` es salida de `npm run build`.
- Los nombres con hash de `docs/_astro/` cambian en cada build cuando cambia el
  contenido: es normal ver diffs grandes en los commits de despliegue.
- Cada `.astro` de `components/` corresponde a una sección de la página y recibe su
  fragmento del diccionario por la prop `t`; ninguno importa `translations.ts` para
  leer textos (solo para importar *tipos*). Las páginas son quienes resuelven el idioma.
