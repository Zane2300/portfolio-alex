# Regla 05 — Build, git y despliegue

## Modelo

GitHub Pages sirve la carpeta **`/docs` de la rama `main`**. El artefacto de build **se
commitea**. No hay GitHub Actions ni CI: si no se reconstruye y se hace push, el cambio en
`src/` **no está publicado**.

```bash
./deploy.sh                 # npm install + npm run build + touch docs/.nojekyll
git add .
git commit -m "..."
git push
```

`deploy.sh` usa `set -e`, se auto-aplica `dos2unix` (por si se editó en Windows y quedó con
CRLF) y crea `docs/.nojekyll` — sin ese fichero, GitHub Pages ignora `_astro/` por empezar
con guion bajo y el sitio sale sin estilos.

Equivalente en PowerShell si Alex no tiene Git Bash a mano:

```powershell
npm install; npm run build; if (-not (Test-Path docs/.nojekyll)) { New-Item -ItemType File docs/.nojekyll }
```

## Reglas duras

1. **Nunca edites `docs/` a mano.** Se regenera entera.
2. **Nunca leas `docs/`** para entender el proyecto: es HTML minificado con hashes, quema
   contexto y no es fuente de verdad. La fuente es `src/`.
3. **No hagas `git push` sin pedirlo explícitamente.** Construir y commitear en local, vale;
   publicar es decisión de Alex.
4. Los diffs de despliegue son **ruidosos** (los assets con hash cambian de nombre en cada
   build). Es esperado, no lo "arregles" ni lo comentes en cada commit.

## Mensajes de commit

Convencionales, en inglés, imperativo, sin firmas ni coautorías:

```
feat(experience): add Ciberia Tech L1 CAU position
fix(theme): prevent dark flash on light-mode load
chore(deploy): rebuild docs
docs(readme): rewrite for Astro stack
```

Separa siempre el commit de **código** (`src/`) del commit de **build** (`docs/`) cuando sea
posible: hace el historial legible pese al ruido de los hashes.

## Antes de dar una tarea por terminada

- `npm run build` sin errores (Astro es estricto: un tipo mal en `translations.ts` lo revienta).
- Revisión visual de **las dos rutas**: `/portfolio-alex/` y `/portfolio-alex/es/`.
- Revisión en **tema claro y oscuro**.
- Enlaces a PDFs y assets resueltos con la base correcta (nada de 404 por doble prefijo).

Recuerda avisar al final si queda pendiente reconstruir `docs/` y publicar. Un cambio en
`src/` sin build es trabajo invisible.
