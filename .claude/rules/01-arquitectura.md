# Regla 01 — Arquitectura y estructura

## Mapa mental del repo

```
src/
├── assets/          imágenes procesadas por astro:assets → .webp con hash
│   ├── tech/                     ~30 logos de Skills
│   └── git_projects_front_page/  portadas de proyectos
├── components/      una sección de la home por fichero (.astro) + 2 islas (.svelte)
├── i18n/translations.ts          ÚNICA fuente de textos (EN + ES) ~531 líneas
├── layouts/PortfolioLayout.astro <html class="dark"> + slots navbar / — / footer
├── pages/
│   ├── index.astro               → /portfolio-alex/      (lang = "en")
│   ├── es/index.astro            → /portfolio-alex/es/   (lang = "es")
│   ├── projects.astro            ⚠️ VACÍO
│   └── certifications.astro      ⚠️ VACÍO
└── styles/global.css             @import tailwindcss + @theme (One Dark)
public/              copiado tal cual (favicon, PDFs de certificados)
docs/                ⛔ BUILD GENERADO — no leer, no editar
```

## Flujo de datos

Las **páginas** resuelven el idioma; los **componentes** son tontos y reciben su trozo
del diccionario por la prop `t`:

```astro
const lang = "en";
const t = translations[lang];
<Hero t={t.hero} />
```

Los componentes importan de `i18n/translations.ts` **solo tipos** (`HeroTexts`,
`ProjectItem`, `StudyItem`…), nunca los textos. Si un componente nuevo necesita textos,
tipa `Astro.props` con el tipo de su sección y añade la clave al tipo `Translations`.

## Datos vs. textos

Lo que no se traduce (logos, imágenes, URLs) vive en el componente y se cruza con el
diccionario por `key` / `id`:

- `Skills.astro`: secciones con `key: "security" | "systems" | "automation"`,
  resueltas con `t.sections.find(s => s.key === section.key)`. Tres tarjetas de 5 logos +
  la de idiomas en el cuarto hueco del grid 2×2; soft skills va a lo ancho debajo.
- `Projects.astro`: `imageMap: Record<ProjectItem["id"], ImageMetadata>` con ids
  `"devops" | "apache" | "dvwa" | "dashboard"`.

**Añadir un elemento = entrada en el diccionario (EN+ES) + entrada en el mapa del componente.**
Si solo haces una de las dos, TypeScript o el render te lo parten.

## Rutas y anclas

Navegación por anclas en la misma página. Cada sección lleva `id` + `scroll-mt-32`
(compensa la navbar sticky):

`#home` · `#experience` · `#projects` · `#about` · `#skills` · `#education` · `#contact`

Los enlaces del navbar salen de `t.nav`, así que un ancla nueva se declara en tres
sitios: componente (`id`), `NavBar.astro` y la clave `nav` del diccionario (EN+ES).

## Base URL

`base: '/portfolio-alex'` — el sitio **no vive en la raíz del dominio**.

- Recursos de `public/`: prefija con `import.meta.env.BASE_URL`
  (patrón ya usado en `Education.astro` para los PDFs).
- En el diccionario, las rutas se guardan **sin** base: `"/documents/foo.pdf"`.
- `LanguageToggle.svelte` tiene `const base = "/portfolio-alex"` **hardcodeado**.
  Si alguna vez se migra a dominio propio hay que tocar `astro.config.mjs` **y** ese fichero.

## Imágenes

- De `src/assets/` → componente `<Image>` de `astro:assets`, importada como módulo.
  Astro las optimiza a `.webp` con hash.
- `loading="lazy"` en todo lo que no esté above-the-fold (el Hero no).
- De `public/` → se copia sin procesar. Solo para PDFs, favicon y similares.
- Formato de logos de tech: `src/assets/tech/`, nombre en minúsculas con guiones.
  **SVG preferido para logos nuevos** (pasa por `astro:assets` igual que el PNG y escala
  mejor); los PNG existentes se quedan como están — su migración a SVG está **pendiente**
  y se hará en un commit dedicado, no de paso.
- Logos monocromos oscuros (VMware, Bash/Shell) son ilegibles sobre `bg-bg-dark` en tema
  oscuro: se marcan con `chip: true` en el array de `Skills.astro` y reciben el fondo fijo
  `bg-logo-chip`, idéntico en ambos temas.

## Convenciones de código

- Indentación de **4 espacios** en `.astro` y `.svelte`.
- Rótulos de sección en mayúsculas como comentario: `<!-- NAVBAR -->`, `{/* BENTO GRID */}`.
- Comentarios: mezcla ES/EN aceptada; no reescribas los existentes por coherencia.
- Iconos: **SVG inline** estilo Tabler. No instales librerías de iconos.
- Svelte 5 en **sintaxis legacy** (`export let`, `on:click`, `onMount`). Mantén la coherencia;
  si algún día se migra a runas, se migra **todo** en un commit dedicado.
- Toda isla se monta con `client:load` porque son toggles visibles de entrada.
  Para cualquier isla nueva no crítica, prefiere `client:visible` o `client:idle`.
