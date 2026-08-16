---
name: portfolio-ui
description: Crea o modifica secciones y componentes visuales del portfolio en Astro/Svelte con Tailwind v4 — nuevas secciones con ancla, rediseño de tarjetas, grids, navbar, islas interactivas, tema claro/oscuro o responsive. Úsala SIEMPRE que el encargo suene a "haz una sección de X", "que quede mejor", "rediseña esto", "no se ve bien en móvil", "arregla el flash del tema" o cualquier cambio de aspecto o maquetación, para no romper los tokens de color ni la simetría entre las dos páginas de idioma.
---

# UI y componentes

Lee `.claude/rules/03-design-system.md` (tokens, tema, lenguaje visual) y
`.claude/rules/01-arquitectura.md` (props, anclas, imágenes) antes de maquetar.

## Crear una sección nueva de la home

Los cuatro pasos, en orden, y **ninguno es opcional**:

1. **Componente** en `src/components/<Nombre>.astro`, tipando `Astro.props` con el tipo de
   su sección importado de `src/i18n/translations.ts`. Recibe todo el texto por la prop `t`.
2. **Textos + tipo** en `translations.ts`: campo nuevo en el tipo `Translations` y valores en
   `en` **y** `es`.
3. **Montaje en las dos páginas**: `src/pages/index.astro` y `src/pages/es/index.astro`.
   Son gemelas a propósito; si solo editas una, el sitio queda cojo en un idioma.
4. **Ancla**: `id="..."` + `scroll-mt-32` en la sección, enlace en `NavBar.astro` y entrada
   en la clave `nav` del diccionario (EN + ES).

Como plantilla, copia el componente existente más parecido (`Experience.astro` para listas
verticales, `Skills.astro` para grids tipo bento, `Education.astro` si hay documentos).
Uno, no tres: con uno ya tienes el patrón.

## Reglas de maquetación

- Solo **tokens semánticos**: `bg-bg`, `bg-bg-elevated/70`, `text-text`, `text-text-muted`,
  `border-bg-selection`, `text-primary`. Cero `bg-gray-*`, cero hex sueltos.
  ¿Necesitas un color nuevo? Créalo como token en `@theme` de `global.css` **con su variante
  clara** en `:root:not(.dark)`.
- Tarjetas: `rounded-3xl`, borde `border-bg-selection`, sombra difusa, hover a
  `hover:border-primary`.
- Iconos: SVG inline estilo Tabler (`stroke-width="1.5"`, `currentColor`). Sin librerías.
- Imágenes de `src/assets/` con `<Image>` de `astro:assets` y `loading="lazy"` salvo Hero.
- Mobile-first, 4 espacios de indentación, rótulo del bloque en mayúsculas como comentario.

## Islas Svelte

- Solo se convierte en isla lo que **necesita** JS de cliente. Todo lo demás, Astro puro:
  este sitio es estático y su gracia es enviar casi cero JS.
- Sintaxis **legacy** de Svelte 5 (`export let`, `on:click`, `onMount`), como las dos islas
  existentes. No mezcles runas.
- Directiva: `client:load` solo si es visible e interactivo de entrada (los dos toggles);
  para el resto, `client:visible` o `client:idle`.
- Accesos a `localStorage` / `sessionStorage` siempre en `try/catch`.

## Accesibilidad (no negociable en un portfolio de un perfil técnico)

- Jerarquía de encabezados sin saltos; una sola `h1` (el Hero).
- `<section aria-labelledby="...">` apuntando al `h2` de la sección.
- Contraste ≥ 4.5:1 en **los dos temas**.
- Foco visible: `focus-visible:ring-2 focus-visible:ring-primary`.
- Todo control accionable es `<button>` o `<a>` real, con `aria-label` si solo lleva icono.
- Imágenes con `alt` descriptivo; decorativas con `alt=""`.

## El flash de tema (arreglo estándar)

`ThemeToggle.svelte` aplica la clase en `onMount` → parpadeo oscuro al cargar en claro.
Arreglo: script **inline y bloqueante** (`is:inline`) en el `<head>` de
`PortfolioLayout.astro`, antes del CSS, que lea `localStorage["theme"]` (con fallback a
`prefers-color-scheme`) y ponga la clase en `document.documentElement`. Es la única excepción
aceptada a "nada de JS suelto en el layout".

## Antes de cerrar

Revisa: los dos idiomas · los dos temas · 360px de ancho · sin scroll horizontal · build
limpio. Y si el cambio afectó al diseño de forma perceptible, descríbelo en dos líneas para
que Alex sepa qué mirar.
