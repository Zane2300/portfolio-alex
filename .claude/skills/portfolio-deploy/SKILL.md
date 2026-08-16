---
name: portfolio-deploy
description: Construye y publica el portfolio en GitHub Pages — ejecutar deploy.sh, regenerar la carpeta docs/, verificar .nojekyll, preparar commits y diagnosticar por qué un cambio no se ve en producción. Úsala SIEMPRE que aparezcan "publicar", "subir", "desplegar", "hacer build", "no se ve mi cambio en la web", "se ha roto el CSS en GitHub Pages" o cualquier duda sobre el estado de lo publicado frente a lo que hay en src/.
---

# Build y despliegue

Lee `.claude/rules/05-despliegue.md` para el contexto completo. Aquí, el procedimiento y el
diagnóstico.

## Publicar

```bash
./deploy.sh          # npm install + npm run build + touch docs/.nojekyll
git add .
git commit -m "chore(deploy): rebuild docs"
git push
```

En Windows sin Git Bash:

```powershell
npm install; npm run build; if (-not (Test-Path docs/.nojekyll)) { New-Item -ItemType File docs/.nojekyll }
```

**Nunca hagas `git push` por iniciativa propia.** Construye, prepara el commit, y deja la
publicación en manos de Alex salvo que la pida explícitamente.

## Checklist previo al build

- ¿Los textos nuevos están en EN **y** ES?
- ¿La sección nueva está montada en **las dos** páginas?
- ¿Las rutas de documentos van sin la base en el diccionario?
- ¿Nada editado a mano dentro de `docs/`?

## Diagnóstico: "no se ve mi cambio"

Recorre esto en orden, es casi siempre uno de los cuatro:

1. **No se ha reconstruido.** El cambio está en `src/` pero `docs/` es viejo. → `./deploy.sh`.
2. **No se ha hecho push**, o se hizo push del `src/` pero no del `docs/`. → `git status`.
3. **Caché del navegador.** Los assets llevan hash, pero el HTML no: recarga forzada.
4. **GitHub Pages tarda** un par de minutos en propagar. Comprueba la pestaña Actions/Pages
   del repo antes de tocar nada más.

## Diagnóstico: "se ha roto el CSS / la web sale sin estilos"

Casi seguro falta **`docs/.nojekyll`**. Sin ese fichero, Pages procesa la carpeta con Jekyll
e ignora todo lo que empieza por guion bajo — es decir, `_astro/` entero: CSS, JS e imágenes.
`deploy.sh` lo crea; si alguien limpió `docs/` a mano, se pierde.

Segunda causa posible: rutas absolutas sin la base. Cualquier recurso escrito como `/foo.png`
en vez de `import.meta.env.BASE_URL + "foo.png"` da 404 en producción aunque funcione en dev.

## Sobre los diffs

Cada build renombra los assets con hash nuevo: los commits de despliegue son enormes y
ruidosos. **Es normal.** No intentes reducirlos, no propongas `.gitignore` para `docs/` (ahí
es donde vive el sitio publicado) y no lo comentes en cada commit. Cuando puedas, separa el
commit de código del commit de build para que el historial siga siendo legible.
