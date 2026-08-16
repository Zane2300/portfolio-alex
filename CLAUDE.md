# CLAUDE.md — portfolio-alex

Portfolio personal de **Alex Rosell Angullo** (Zane2300). Sitio **estático**, bilingüe
EN/ES, publicado en GitHub Pages desde la carpeta `docs/` de `main`.

- Producción: https://zane2300.github.io/portfolio-alex/
- Sin backend, sin BBDD, sin formularios que envíen datos. Contacto vía `mailto:` y redes.

---

## Stack (no lo re-descubras leyendo ficheros)

| Área | Tecnología | Nota |
|---|---|---|
| Framework | Astro 5 (SSG) | `output` estático por defecto |
| Islas | Svelte 5 con **sintaxis legacy** (`export let`, `on:click`) | no runas |
| Estilos | Tailwind **v4** sin `tailwind.config.js` | config en `@theme` de `src/styles/global.css` |
| Tipos | TypeScript `astro/tsconfigs/strict` | |
| Paquetes | npm | `package-lock.json` versionado |
| Deploy | GitHub Pages `/docs` | build **commiteado**, sin CI |

```bash
npm run dev      # http://localhost:4321/portfolio-alex/   (la raíz / da 404)
npm run build    # genera docs/
./deploy.sh      # install + build + touch docs/.nojekyll
```

---

## Reglas de oro (rompe una y rompes el sitio)

1. **`docs/` es artefacto de build.** Nunca lo leas ni lo edites. Se regenera entero.
2. **Todo texto visible vive en `src/i18n/translations.ts`.** Cero literales en componentes.
3. **Cada cambio de texto se hace en `en` Y en `es`.** El tipo `Record<Lang, Translations>` lo exige.
4. **Dos páginas gemelas**: `src/pages/index.astro` (EN) y `src/pages/es/index.astro` (ES).
   Añadir una sección implica **editar ambas**.
5. **`base: '/portfolio-alex'`**: prefija recursos con `import.meta.env.BASE_URL`.
   Está hardcodeada también en `LanguageToggle.svelte` — si cambia, toca los dos sitios.
6. **Solo tokens semánticos de color** (`bg-bg`, `text-text-muted`, `text-primary`…).
   Nunca `bg-gray-800`, `text-red-500` ni hex sueltos.
7. **No inventes datos del CV.** Fechas, cargos, certificaciones y contacto salen de
   `.claude/rules/04-datos-canonicos.md`. Si algo no está ahí, pregunta.
8. No hay tests, ni linter, ni formateador. No los añadas sin que Alex lo pida.

---

## Índice de reglas — léelas **bajo demanda**, no todas de golpe

| Fichero | Léelo cuando… |
|---|---|
| `.claude/rules/01-arquitectura.md` | toques páginas, layout, componentes, rutas o assets |
| `.claude/rules/02-i18n.md` | añadas/edites cualquier texto o el toggle de idioma |
| `.claude/rules/03-design-system.md` | escribas clases Tailwind, colores, tarjetas, iconos o tema claro/oscuro |
| `.claude/rules/04-datos-canonicos.md` | toques experiencia, estudios, certificaciones, skills o contacto |
| `.claude/rules/05-despliegue.md` | vayas a construir, commitear o publicar |
| `.claude/rules/06-eficiencia.md` | (léela **siempre** al empezar sesión: protocolo de trabajo y ahorro de tokens) |

Las skills de `.claude/skills/` se auto-invocan por su `description`; no hace falta que
las cargues a mano.

---

## Protocolo de respuesta

- **Idioma: español**, tono directo y técnico. Nada de preámbulos ni resúmenes de lo obvio.
- Antes de tocar código: **plan en 3-6 líneas** con los ficheros exactos que vas a editar.
  Si el cambio afecta a >4 ficheros o al diseño, espera confirmación.
- Ediciones **quirúrgicas**: `Edit` sobre el fragmento, nunca reescribir un fichero entero.
- Al terminar: lista de ficheros tocados + qué falta (build/deploy) en ≤5 líneas.
  No pegues el diff completo, ya lo ve en su editor.
- Si una decisión tiene dos caminos razonables (p. ej. migrar a runas de Svelte 5 o no),
  di cuál eliges y por qué en una frase; no abras un debate.

---

## Estado actual y backlog conocido

Deuda técnica ya identificada (no la "descubras" otra vez, y no la arregles sin pedirlo
salvo que la tarea la toque de lleno):

- Base `/portfolio-alex` duplicada en `astro.config.mjs` y `LanguageToggle.svelte`.
- Sin `sitemap`, sin Open Graph, sin `<meta description>` por idioma → ver skill `portfolio-audit`.
- Los logos de `src/assets/tech/` son PNG heredados; los nuevos entran en SVG. **Migrar los
  PNG a SVG está pendiente** y va en un commit dedicado, no de paso.
- El logo de Bash/Shell se ve mal (casi blanco); de momento va con fondo `bg-logo-chip`.
- `deploy.sh` **no limpia `docs/` antes de construir**: al borrar una ruta hay que
  comprobar que no queda publicada del build anterior.

Cerrado en la revisión de agosto 2026 (no lo "descubras" otra vez):
contenido al día con el CV, rutas vacías `projects`/`certifications` borradas, anti-FOUC
aplicado, `README.md` reescrito, `package.json` con nombre, `kali-linux.png` en uso,
Skills podado a 3 categorías de 5.

Prioridad por defecto si Alex pide "mejorar el portfolio" y no concreta:
**1)** SEO/OG/a11y → **2)** migración de logos PNG a SVG → **3)** unificar la base URL
duplicada.
