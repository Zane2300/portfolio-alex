---
description: Verifica que las ramas en/es de translations.ts están simétricas y completas
allowed-tools: Bash(grep:*), Bash(npm run build), Read
---

Audita `src/i18n/translations.ts` sin leerlo entero:

1. Localiza con `grep -n` el inicio de cada sección y de las ramas `en:` / `es:`.
2. Compara los nombres de clave de ambas ramas y lista las que falten en una u otra.
3. Busca textos sospechosos de estar sin traducir (mismo string idéntico en `en` y `es`
   cuando debería diferir; castellano dentro de la rama `en`).
4. Comprueba que ninguna ruta de documento incluye la base `/portfolio-alex`.
5. Ejecuta `npm run build` para confirmar que el tipado pasa.

Salida: lista de problemas con línea y arreglo propuesto. Si está todo bien, dilo en una línea.
