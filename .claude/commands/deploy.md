---
description: Construye el sitio, verifica el build y prepara el commit de despliegue
allowed-tools: Bash(./deploy.sh), Bash(npm run build), Bash(git status:*), Bash(git add:*), Bash(git commit:*)
---

Publica los cambios pendientes:

1. Comprueba `git status` y resume en una línea qué hay sin commitear en `src/`.
2. Ejecuta `./deploy.sh` (o `npm run build` si el script falla) y confirma que termina sin errores.
3. Verifica que existe `docs/.nojekyll`.
4. Prepara **dos** commits si procede: uno de código (`src/`, `public/`, config) y otro de build (`docs/`).
   Mensajes convencionales en inglés.
5. **No hagas push.** Termina indicando el comando exacto que debe ejecutar Alex.

Argumentos opcionales — mensaje de commit para el cambio de código: $ARGUMENTS
