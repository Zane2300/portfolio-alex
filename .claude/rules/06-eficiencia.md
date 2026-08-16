# Regla 06 — Eficiencia, contexto y protocolo de trabajo

Objetivo: resolver la tarea con **el mínimo de lecturas y el mínimo de turnos**, sin
adivinar. Léela al empezar sesión; el resto de reglas, solo cuando toquen.

## Lo que ya sabes (no lo verifiques leyendo ficheros)

El stack, la estructura, los tokens de color, la base URL, el flujo de deploy y los datos del
CV están en `CLAUDE.md` y en `.claude/rules/`. **No abras `astro.config.mjs`, `package.json`
ni `global.css` "para confirmar"** salvo que vayas a modificarlos o que algo contradiga lo
documentado. Si detectas una contradicción, dilo y actualiza la regla.

## Presupuesto de lectura

| Situación | Qué hacer |
|---|---|
| Cambio de texto | `grep` de la clave en `translations.ts` → `Read` con `offset`/`limit` del rango |
| Cambio en una sección | leer **solo** su componente (`Skills.astro`, `Hero.astro`…) |
| Sección nueva | leer un componente existente parecido como plantilla, no tres |
| Duda de estilo | `.claude/rules/03-design-system.md`, no `global.css` |
| Cualquier cosa | ⛔ nunca `docs/`, `node_modules/`, `package-lock.json`, `_astro/` |

`translations.ts` son ~531 líneas: **jamás entero**. `Skills.astro` (202) y `Contact.astro`
(127) son los componentes más gordos; el resto cabe de una pieza sin problema.

Prefiere `grep`/`glob` a `find` recursivo, y una búsqueda precisa a tres genéricas.

## Antes de tocar nada

Plan corto (3-6 líneas): qué ficheros, qué cambia en cada uno, si toca EN+ES, si hace falta
rebuild. Si el cambio pisa >4 ficheros, cambia el diseño o toca `astro.config.mjs`,
**espera confirmación**. Para todo lo demás, ejecuta directamente: Alex no quiere que le
pidas permiso para cambiar una fecha.

## Al editar

- `Edit` sobre el fragmento mínimo. Nunca reescribas un fichero entero para cambiar tres líneas.
- Un cambio en un componente → comprueba si arrastra cambios en `translations.ts` (EN+ES) y en
  **las dos** páginas. Es el fallo más habitual de este repo.
- No refactorices de paso. Si ves algo feo, anótalo y sigue: los arreglos oportunistas
  mezclados con la tarea hacen los diffs ilegibles.
- No añadas dependencias sin preguntar. Este proyecto tiene 4 y así está bien.

## Al terminar

Formato de cierre, máximo 5 líneas:

```
Hecho:
- src/i18n/translations.ts — nueva entrada `experience.items[0]` (EN+ES)
- src/components/Experience.astro — sin cambios (renderiza por array)
Pendiente: ./deploy.sh + commit para publicar.
```

Sin resúmenes largos, sin repetir el código que acabas de escribir, sin "¡Espero que te sea
útil!". Si algo quedó a medias o dudoso, dilo en una línea al final.

## Cuándo preguntar (y cuándo no)

**Pregunta** si: falta un dato real del CV, hay discrepancia entre CV y LinkedIn, el cambio
afecta a la identidad visual, o hay dos arquitecturas razonables (p. ej. rutas i18n dinámicas
vs. páginas gemelas).

**No preguntes** si: es un texto, una fecha, un logo, una clase de Tailwind, un typo, o algo
ya cubierto por las reglas. Hazlo y repórtalo.
