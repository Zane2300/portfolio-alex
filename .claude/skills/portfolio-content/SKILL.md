---
name: portfolio-content
description: Añade o actualiza contenido real del CV en el portfolio — puestos de trabajo, estudios, certificaciones, tecnologías de Skills, proyectos de GitHub, idiomas o datos de contacto. Úsala SIEMPRE que Alex mencione "actualizar el portfolio", "añadir mi nuevo trabajo", "meter esta certificación", "añadir un proyecto", "poner esta tecnología", "actualizar el CV en la web" o cualquier cosa que implique tocar datos de su trayectoria profesional, aunque no diga explícitamente qué fichero hay que editar.
---

# Contenido del portfolio (datos reales)

Cada dato de esta web es un dato de CV real. La regla número uno es **no inventar**: fechas,
cargos, IDs de credencial y nombres de empresa salen de `.claude/rules/04-datos-canonicos.md`
o de lo que Alex diga en la conversación. Si falta algo, pregunta antes de escribir.

Lee `.claude/rules/04-datos-canonicos.md` al empezar y `.claude/rules/02-i18n.md` si vas a
tocar textos (que es casi siempre).

## Regla estructural común a todos los casos

El contenido vive repartido en dos capas:

- **Textos** → `src/i18n/translations.ts`, en `en` **y** en `es`.
- **Assets y mapas** (logos, portadas, PDFs) → en el componente y en `src/assets/` o `public/`.

Se cruzan por `key` / `id`. Si añades en una capa y no en la otra, o el build falla o el
elemento sale sin imagen.

---

## Caso 1 — Añadir un puesto de trabajo

1. Localiza el bloque: `grep -n "experience:" src/i18n/translations.ts`.
2. Añade el `ExperienceItem` **al principio del array** (orden cronológico inverso: lo más
   reciente arriba) en `en` y en `es`.
3. Un puesto en curso lleva el "actualidad" / "Present" del propio diccionario — no lo
   hardcodees en el componente.
4. `Experience.astro` renderiza por array: normalmente **no hay que tocarlo**.
5. Si el puesto aporta tecnologías nuevas, propón añadirlas a Skills (caso 3) en el mismo turno.

**Ejemplo real pendiente:** Ciberia Tech · Técnico L1 CAU · ene. 2026 – actualidad ·
Barcelona (remoto) · Zero-Touch / Zero-Trust, automatización con IA para usuarios y técnicos CAU.

## Caso 2 — Añadir una certificación

1. Si hay PDF: colócalo en `public/documents/` con nombre en `kebab-case` descriptivo
   (`google-chrome-enterprise-premium.pdf`).
2. Entrada en `education.certifications` (EN + ES) con:
   - nombre, emisor, fecha,
   - `document: "/documents/<fichero>.pdf"` — **sin** la base; la antepone el componente.
3. Si no hay PDF pero sí URL de verificación, usa el enlace en lugar del documento y mantén
   la coherencia visual con el resto de tarjetas.
4. El ID de credencial es opcional en la web; si se muestra, va como metadato `text-text-muted`.

## Caso 3 — Añadir una tecnología a Skills

1. Logo PNG en `src/assets/tech/`, nombre en minúsculas con guiones (`n8n.png`).
2. Import + entrada en el array `items` de la sección correspondiente de `Skills.astro`
   (`cyber` · `systems` · `forensics` · `devops` · `web`).
3. **Los nombres de tecnología no se traducen.** Solo el título y la descripción de la
   sección viven en el diccionario, resueltos por `key`.
4. Si la tecnología no encaja en ninguna sección, no fuerces: propón una sección nueva y
   espera el OK (implica tipo `SkillSectionKey` + textos EN/ES + grid).

## Caso 4 — Añadir un proyecto

1. Captura de portada en `src/assets/git_projects_front_page/`.
2. Nuevo `id` en el union type `ProjectItem["id"]` de `translations.ts`.
3. Entrada en el `imageMap` de `Projects.astro` con ese `id`.
4. Entrada en `projects.items` en EN y ES: título, descripción, stack, enlace a repo y, si
   existe, demo en vivo.
5. Comprueba que el repo es **público** antes de enlazarlo.

## Caso 5 — Formación, idiomas o contacto

- Formación → `education.studies` (EN + ES). Los nombres oficiales de titulación no se
  traducen; en EN se admite glosa entre paréntesis.
- Idiomas → tarjeta de idiomas en `Skills.astro`. Valenciano en ES, *Valencian (Catalan)* en EN.
- Contacto → `Contact.astro` tiene los datos **hardcodeados** además del diccionario:
  si cambia el email o el teléfono, revisa componente **y** traducciones **y** `Footer.astro`.

---

## Cierre

Termina siempre indicando qué queda por hacer para que el cambio sea visible:
`./deploy.sh` + commit + push. Un dato nuevo en `src/` que no se ha construido no existe
para quien visita la web.
