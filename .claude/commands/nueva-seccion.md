---
description: Crea una sección nueva de la home con todos sus pasos (componente, i18n, ambas páginas, ancla)
---

Crea la sección: $ARGUMENTS

Sigue la skill `portfolio-ui` sin saltarte ningún paso:

1. Componente en `src/components/`, textos por prop `t`, tipado desde `i18n/translations.ts`.
2. Tipo + textos EN **y** ES en `translations.ts`.
3. Montaje en `src/pages/index.astro` **y** `src/pages/es/index.astro`.
4. `id` + `scroll-mt-32` + enlace en `NavBar.astro` + clave en `nav` (EN+ES).
5. `npm run build` para verificar.

Antes de escribir código, enseña el plan con los ficheros exactos y espera confirmación.
