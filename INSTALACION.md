# Instalación

Copia el contenido de este paquete en la **raíz** de `portfolio-alex`:

```
portfolio-alex/
├── CLAUDE.md          ← nuevo
├── .claude/
│   ├── settings.json
│   ├── rules/         6 ficheros
│   ├── skills/        5 skills
│   ├── commands/      5 slash commands
│   └── agents/        1 subagente revisor
├── src/  public/  docs/ ...
```

Desde la raíz del repo, con el zip descomprimido en `~/Descargas/portfolio-alex-claude/`:

```bash
cp -r ~/Descargas/portfolio-alex-claude/CLAUDE.md .
cp -r ~/Descargas/portfolio-alex-claude/.claude .
```

Después:

1. **Borra `context-portfolio.md`** o déjalo como documento histórico: su contenido ya está
   repartido entre `CLAUDE.md` y `.claude/rules/`. Mantener dos fuentes de verdad es peor que
   no tener ninguna.
2. Añade `.claude/settings.local.json` a `.gitignore` (ahí van los permisos personales que no
   se comparten).
3. Abre Claude Code en la raíz y prueba `/cv-sync` para ver el estado del contenido frente al CV.

## Qué hace cada pieza

| Pieza | Cuándo actúa |
|---|---|
| `CLAUDE.md` | Siempre. Índice, reglas de oro y protocolo. Mantenlo corto. |
| `.claude/rules/*` | Bajo demanda: Claude las lee solo cuando la tarea las toca. |
| `.claude/skills/*` | Se auto-invocan por su `description` cuando el encargo encaja. |
| `.claude/commands/*` | A mano, con `/deploy`, `/i18n-check`, `/cv-sync`, `/nueva-seccion`, `/auditoria`. |
| `.claude/agents/*` | Subagente de revisión, con `/agents` o pidiéndolo antes de publicar. |

## Mantenimiento

Cuando cambie la arquitectura o los datos del CV, actualiza la regla correspondiente **en el
mismo commit** que el cambio. Un `CLAUDE.md` desactualizado es peor que ninguno: hace que
Claude trabaje con confianza sobre información falsa.
