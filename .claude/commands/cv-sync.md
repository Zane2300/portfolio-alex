---
description: Contrasta el contenido del sitio con los datos canónicos del CV y propone el plan de actualización
---

Compara lo publicado en `src/i18n/translations.ts` con `.claude/rules/04-datos-canonicos.md`:

1. Experiencia: puestos, fechas y descripciones. Marca los que falten o discrepen.
2. Formación y certificaciones (incluye si el PDF existe en `public/documents/`).
3. Skills: tecnologías del CV que no aparecen en `Skills.astro`.
4. Idiomas y datos de contacto.

Devuelve una tabla `Dato | En el sitio | En el CV | Acción` y, debajo, el plan de edición
ordenado por impacto. **No edites nada todavía**: espera el visto bueno.
