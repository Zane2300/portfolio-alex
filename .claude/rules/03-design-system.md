# Regla 03 — Sistema de diseño

## Tokens, no colores literales

Paleta base **One Dark**, declarada como tokens Tailwind v4 en el bloque `@theme` de
`src/styles/global.css`. **No existe `tailwind.config.js` y no debe crearse.**

Tokens disponibles:

| Token | Uso |
|---|---|
| `--color-bg` | fondo de página |
| `--color-bg-elevated` | tarjetas, navbar, superficies elevadas |
| `--color-bg-dark` | fondos hundidos / code blocks |
| `--color-bg-selection` | **bordes** y separadores |
| `--color-text` | texto principal |
| `--color-text-muted` | secundario, metadatos, fechas |
| `--color-primary` / `-light` / `-dark` | rojo de marca (CTAs, acentos, `<highlight>`) |
| `red` `orange` `yellow` `green` `cyan` `blue` `purple` | acentos One Dark para categorías |
| `--color-logo-chip` | **excepción deliberada**: fondo fijo, *idéntico* en claro y oscuro, para los logos monocromos oscuros (VMware, Bash/Shell) que serían ilegibles sobre `bg-bg-dark`. No lleva variante clara **a propósito** |

En clases: `bg-bg`, `bg-bg-elevated/70`, `text-text`, `text-text-muted`,
`border-bg-selection`, `text-primary`, `hover:border-primary`.

⛔ Prohibido: `bg-gray-800`, `text-slate-400`, `border-zinc-700`, `#282c34`, `rgb(...)`
en clases utilitarias. Si necesitas un color que no existe como token, **crea el token**
en `@theme` (y su variante clara) antes de usarlo.

## Tema claro / oscuro (invertido respecto a la convención)

- El **oscuro es el valor por defecto**: los tokens de `@theme` son los del tema oscuro y
  `<html>` sale del servidor con `class="dark"`.
- El **claro** se define en `:root:not(.dark)` sobreescribiendo los mismos tokens.
- `ThemeToggle.svelte` añade/quita la clase en `document.documentElement`, persiste en
  `localStorage["theme"]` y cae a `prefers-color-scheme` si no hay valor.
- ⚠️ Se aplica en `onMount` → hay flash oscuro al cargar en claro. El arreglo es un script
  **inline y bloqueante** en el `<head>` de `PortfolioLayout.astro` (`is:inline`), antes de
  cualquier CSS, que lea `localStorage` y ponga la clase. Es la única excepción aceptada a
  "no metas JS suelto en el layout".
- **Cualquier componente nuevo debe verse bien en los dos temas.** Si usas los tokens sale
  gratis; si usas literales, no. Revisa siempre los dos antes de dar por hecho el trabajo.

## Lenguaje visual

- Tarjetas: `rounded-3xl`, `border border-bg-selection`, `bg-bg-elevated/70..80`,
  sombra difusa `shadow-[0_24px_80px_rgba(0,0,0,0.55)]`.
- Navbar: *pill* sticky con `backdrop-blur-lg`.
- Espaciado generoso; secciones separadas y con `scroll-mt-32`.
- Hover en tarjetas: cambio de borde a `hover:border-primary`, sin animaciones agresivas.
- Tipografía: **Onest** desde Google Fonts en el `<head>` del layout. No añadas una segunda
  familia; jerarquía por peso y tamaño.
- Iconos: SVG inline estilo Tabler (`stroke-width="1.5"`, `currentColor`). Sin librerías.
- Mobile-first. Los enlaces del navbar se ocultan bajo `sm` (`hidden sm:flex`).

## Al crear un componente nuevo

Checklist mental antes de darlo por bueno:

1. ¿Usa solo tokens semánticos? ¿Se ve bien en claro **y** oscuro?
2. ¿Todos los textos vienen por la prop `t` y están en EN+ES?
3. ¿Tiene `id` + `scroll-mt-32` si es sección con ancla?
4. ¿Las imágenes usan `<Image>` con `loading="lazy"` (salvo above-the-fold)?
5. ¿Responsive a 360px de ancho sin scroll horizontal?
6. ¿Semántica correcta? `<section>` con `aria-labelledby`, jerarquía `h2`/`h3` sin saltos,
   contraste ≥ 4.5:1, foco visible (`focus-visible:ring-2 ring-primary`).
7. ¿Indentación de 4 espacios y rótulo en mayúsculas del bloque?

## Cuando Alex pida "que quede más bonito"

No hagas rediseños silenciosos. Propón **una** dirección concreta en 3-4 líneas
(qué cambia, en qué componentes, qué se mantiene) y espera el OK. El estilo actual —oscuro
One Dark, tarjetas grandes, acento rojo— es deliberado; las mejoras van en jerarquía,
espaciado, microinteracciones y consistencia, no en cambiar la paleta.
