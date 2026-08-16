---
name: portfolio-audit
description: Audita el portfolio en SEO, metadatos, accesibilidad, rendimiento y coherencia de contenido, y devuelve un informe priorizado con arreglos concretos. Úsala cuando Alex pida "revisa el portfolio", "mejóralo", "qué le falta", "prepáralo para buscar trabajo", "que salga bien en Google", "que se vea bien al compartirlo en LinkedIn" o cualquier petición de mejora genérica sin tarea concreta detrás.
---

# Auditoría del portfolio

Cuando Alex pide "mejorar el portfolio" sin concretar, no empieces a tocar código: audita,
prioriza y propón. Un informe de 15 líneas con lo que de verdad mueve la aguja vale más que
tres commits estéticos.

## Cómo auditar sin quemar contexto

No leas todo el repo. Comprueba puntos concretos con `grep`:

```bash
grep -rn "meta name=\"description\"\|og:\|twitter:\|canonical" src/layouts src/pages
grep -rn "alt=" src/components | head -30
grep -rn "hidden sm:\|md:\|lg:" src/components/NavBar.astro
grep -c "" src/pages/projects.astro src/pages/certifications.astro   # ¿siguen vacías?
```

Y contrasta el contenido publicado contra `.claude/rules/04-datos-canonicos.md`: lo más
valioso de este portfolio no es el CSS, es que el CV esté al día.

## Ejes de la auditoría

**1. Contenido (máxima prioridad).** ¿Está el puesto actual? ¿Las certificaciones recientes?
¿Los proyectos enlazados siguen siendo los mejores que tiene? Un portfolio bonito con el CV
de hace un año es un portfolio roto.

**2. SEO y metadatos.** `<title>` y `<meta description>` distintos por idioma;
`<link rel="canonical">`; `hreflang` cruzado entre `/` y `/es/`; Open Graph + Twitter Card
con imagen (lo que se ve al pegar el enlace en LinkedIn, que es exactamente donde va a
acabar); `sitemap.xml` (`@astrojs/sitemap`) y `robots.txt`; JSON-LD tipo `Person` con nombre,
puesto, ubicación y perfiles sociales.

**3. Accesibilidad.** Jerarquía de encabezados, contraste en **los dos temas**, foco visible,
`aria-label` en los toggles e iconos, `alt` en todas las imágenes, `lang` correcto en `<html>`
de cada página.

**4. Rendimiento.** Es un sitio estático con dos islas: si algo va lento, mira el peso de las
imágenes (¿todas por `astro:assets`?), las fuentes (`preconnect` a Google Fonts, o
autohospedar Onest y quitar la petición externa) y las directivas de hidratación.

**5. Coherencia.** Rutas vacías (`projects.astro`, `certifications.astro`) que generan páginas
en blanco indexables; `README.md` describiendo una versión del proyecto que ya no existe;
`package.json` con `name` vacío; imports muertos (`kali-linux.png`).

## Formato del informe

Agrupa por impacto, no por fichero, y sé concreto:

```
## Alto impacto
1. Falta el puesto actual (Ciberia Tech, ene 2026) — translations.ts, EN+ES. ~10 min.
2. Sin Open Graph: al compartir en LinkedIn sale sin imagen ni descripción — PortfolioLayout.astro. ~20 min.

## Medio
3. /projects/ y /certifications/ generan páginas en blanco indexables. Opciones: llenarlas o borrar los ficheros.

## Bajo
4. README desactualizado.
```

Máximo 3-4 puntos por bloque. Termina preguntando **por cuál empezamos**, y no empieces a
implementar hasta tener respuesta: la auditoría es una fase, no un preámbulo.
