# Portfolio — Alex Rosell Angullo

Portfolio personal de **Alex Rosell Angullo** ([@Zane2300](https://github.com/Zane2300)),
técnico de sistemas e infraestructura con orientación a seguridad.

🌐 **[zane2300.github.io/portfolio-alex](https://zane2300.github.io/portfolio-alex/)**

Sitio **estático y bilingüe** (EN/ES), sin backend ni base de datos. El contacto es por
`mailto:` y redes; no hay formularios que envíen datos a ningún sitio.

---

## Stack

| Área | Tecnología |
|---|---|
| Framework | [Astro 5](https://astro.build) (generación estática) |
| Islas interactivas | [Svelte 5](https://svelte.dev) — toggle de tema y de idioma |
| Estilos | [Tailwind CSS 4](https://tailwindcss.com), sin `tailwind.config.js` |
| Tipos | TypeScript (`astro/tsconfigs/strict`) |
| Despliegue | GitHub Pages desde la carpeta `docs/` de `main` |

La paleta es **One Dark**, declarada como tokens en el bloque `@theme` de
`src/styles/global.css`. El tema oscuro es el valor por defecto; el claro se define
sobreescribiendo los mismos tokens en `:root:not(.dark)`.

---

## Puesta en marcha

```bash
npm install
npm run dev      # http://localhost:4321/portfolio-alex/
```

> El sitio se sirve bajo la base `/portfolio-alex`, así que la raíz `/` devuelve 404.
> Es lo esperado: en producción vive en un subdirectorio de GitHub Pages.

```bash
npm run build    # genera docs/
npm run preview  # sirve el build local
```

---

## Estructura

```
src/
├── assets/
│   ├── tech/                     logos de la sección Skills
│   ├── certifications/           badges de los emisores de certificaciones
│   └── git_projects_front_page/  portadas de proyectos
├── components/                   una sección de la home por fichero + 2 islas Svelte
├── i18n/translations.ts          ÚNICA fuente de todos los textos (EN + ES)
├── layouts/PortfolioLayout.astro
├── pages/
│   ├── index.astro               → /portfolio-alex/      (inglés)
│   └── es/index.astro            → /portfolio-alex/es/   (español)
└── styles/global.css             Tailwind + tokens One Dark
public/                           PDFs de certificados, favicon
docs/                             build generado — no se edita a mano
```

### Dos reglas que conviene saber antes de tocar nada

1. **Ningún texto visible se escribe en un componente.** Todo vive en
   `src/i18n/translations.ts` y llega a cada componente por la prop `t`. Cualquier texto
   nuevo se añade en **inglés y en español** en el mismo cambio: el tipo
   `Record<Lang, Translations>` no admite que falte uno.
2. **Hay dos páginas gemelas** (`index.astro` y `es/index.astro`). Añadir una sección
   implica montarla en las dos.

---

## Despliegue

GitHub Pages sirve `/docs` de la rama `main` y **el build está commiteado**: si no se
reconstruye, el cambio en `src/` no está publicado.

```bash
./deploy.sh      # npm install + npm run build + docs/.nojekyll
git add .
git commit -m "..."
git push
```

`.nojekyll` es imprescindible: sin él, GitHub Pages ignora la carpeta `_astro/` por empezar
por guion bajo y el sitio sale sin estilos.

---

## Contacto

- **LinkedIn:** [linkedin.com/in/alex-rosell-angullo](https://www.linkedin.com/in/alex-rosell-angullo/)
- **GitHub:** [github.com/Zane2300](https://github.com/Zane2300)
- **Email:** alexrosell2003@gmail.com
