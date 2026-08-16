---
name: portfolio-i18n
description: Gestiona los textos bilingües EN/ES del portfolio en src/i18n/translations.ts — añadir claves nuevas, reescribir copy, traducir, verificar que ambos idiomas están simétricos o depurar el toggle de idioma. Úsala SIEMPRE que haya que tocar cualquier texto visible del sitio, aunque el encargo suene a "cambia este título", "mejora la descripción del hero", "esto está solo en español" o "falta la traducción"; en este repo ningún texto se escribe directamente en un componente.
---

# i18n del portfolio

No hay librería: un objeto tipado `Record<Lang, Translations>` con `en` y `es`. Lee
`.claude/rules/02-i18n.md` para el detalle; aquí va el procedimiento.

## Antes de escribir: localiza, no leas

El fichero ronda las 531 líneas. Leerlo entero es tirar contexto.

```bash
grep -n "hero:\|experience:\|projects:\|about:\|skills:\|education:\|contact:\|footer:" src/i18n/translations.ts
grep -n "^\s*en:\|^\s*es:" src/i18n/translations.ts
```

Con eso tienes el mapa de offsets. Lee solo el rango que vas a tocar.

## Añadir una clave nueva

Orden estricto, porque TypeScript va a chillar en cuanto rompas la simetría:

1. **Tipo** de la sección (`HeroTexts`, `ContactTexts`…) — añade el campo.
2. Rama **`en`** — añade el valor.
3. Rama **`es`** — añade el valor.
4. Componente — consume vía la prop `t`.
5. Si es una sección nueva entera: añade la clave al tipo `Translations` y pásala desde
   **las dos** páginas (`src/pages/index.astro` y `src/pages/es/index.astro`).

## Verificar simetría EN/ES

Antes de dar por cerrada la tarea:

```bash
npm run build     # el tipado detecta claves ausentes
```

Y para una comprobación rápida sin build, compara los nombres de clave de ambos bloques con
`grep -n` acotado por offsets. Si una rama tiene una clave que la otra no, el build falla:
mejor descubrirlo tú que Alex.

## Calidad del copy

- **ES**: natural, técnico, sin calcos del inglés. Es su idioma nativo y se nota si suena raro.
- **EN**: registro de perfil técnico internacional. *IT Technician*, *Systems & Network
  Administrator*, *Cybersecurity*. Nada de traducción literal del ES.
- Longitudes parecidas entre idiomas: el diseño es de tarjetas y un ES un 30% más largo
  rompe el grid.
- Nombres propios (empresas, titulaciones oficiales, certificaciones, tecnologías) **no se
  traducen**. En EN se admite glosa: `Grado Superior (Higher Vocational Degree)`.
- Verbos de acción y resultados concretos en las descripciones de experiencia, no genéricos:
  "Administración de firewalls Fortinet y Active Directory" > "Tareas de sistemas".

## Marcado permitido

Solo `<highlight>…</highlight>`, y solo en Hero y About (se renderiza con `set:html`).
Nada de `<a>`, `<br>` ni HTML libre dentro del diccionario: si necesitas un enlace en medio
de un párrafo, parte el texto en varias claves y compón en el componente.

## Rutas dentro del diccionario

Siempre **sin** la base: `"/documents/foo.pdf"`. El componente antepone
`import.meta.env.BASE_URL`. Meter la base aquí produce `/portfolio-alex/portfolio-alex/...` → 404.

## Toggle de idioma

`LanguageToggle.svelte` alterna entre dos rutas fijas y conserva el scroll vía
`sessionStorage["portfolio-scroll-y"]`, siempre en `try/catch`. Si se añaden rutas
bilingües nuevas (`/projects/` ↔ `/es/projects/`), hay que **mapear la ruta actual** en vez
de alternar entre dos constantes: refactoriza la función, no encadenes `if`s.
