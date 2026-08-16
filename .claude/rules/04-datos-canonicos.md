# Regla 04 — Datos canónicos (CV + LinkedIn)

**Fuente de verdad del contenido del portfolio.** Si un dato no está aquí, no te lo
inventes: pregúntale a Alex. Nada de "certificaciones plausibles", empresas redondeadas ni
fechas aproximadas — es un CV real y una mentira aquí le cuesta una entrevista.

Última sincronización con CV (rev. dic 2025) + LinkedIn: **agosto 2026**.
Discrepancias de fechas y stack cerradas por Alex en esa misma fecha; el sitio ya está al día.

---

## Identidad y contacto

| Campo | Valor |
|---|---|
| Nombre | Alex Rosell Angullo |
| Titular | Técnico informático especializado en ciberseguridad |
| Ubicación | Burriana (Castellón), Comunitat Valenciana, España |
| Email | `alexrosell2003@gmail.com` |
| Teléfono | `+34 694 41 48 36` |
| GitHub | `https://github.com/Zane2300` |
| LinkedIn | `https://www.linkedin.com/in/alex-rosell-angullo/` |
| Web | `https://zane2300.github.io/portfolio-alex/` |

Estos datos ya son públicos y deliberados: están en el código fuente del sitio.

**Perfil profesional (base del About/Hero):** técnico informático especializado en
ciberseguridad, con experiencia en Active Directory, administración de sistemas y redes,
desarrollo web full stack y soporte técnico. Capacidad de adaptación, iniciativa, trabajo
en equipo y orientación a resultados.

**Texto canónico "Acerca de" (ago. 2026):** copia literal del "Acerca de" de LinkedIn —
portfolio y LinkedIn cuentan la misma historia. Vive en `about.paragraphs` (EN+ES) de
`translations.ts`, 6 párrafos:

1. Tagline: "Aseguro, administro y automatizo infraestructura."
2. Rol actual en tres verbos: proteger/auditar, administrar, automatizar.
3. Ayuntamiento de Burriana: firewalls Fortinet, switches, AD, CPD — la seguridad como
   decisión de diseño, no como capa final.
4. Ciberia Tech: Zero-Touch/Zero-Trust, automatización con IA.
5. Procedencia (soporte/administración, no teoría): incidencias, tutoría, producción.
6. Objetivo: Bàtxelor en Informática (oct. 2026) + consolidarse como Security Engineer.

Si Alex actualiza su "Acerca de" de LinkedIn, este texto se resincroniza aquí y en
`translations.ts` (EN+ES) en el mismo turno — no se edita solo uno de los dos.

**Hero (ago. 2026):** titular *"Construyo infraestructura segura, gestionada y
automatizada."* / *"I build secure, well-managed, automated infrastructure."* — alinea con
los tres verbos del badge (asegurar·administrar·automatizar). Entradilla menciona los 3
años de experiencia, Burriana (España) y la aspiración a Security Engineer **sin afirmar
que ya lo es** (el puesto actual es Técnico L1 CAU). No usar "hacking ético" ni nada que
suene a red team: el posicionamiento es blue team (ver sección Skills más abajo).

---

## Experiencia laboral

### 1. Ciberia Tech — Técnico L1 CAU · EN: *L1 Service Desk Technician* ✅ publicado
- **ene. 2026 – actualidad** · Barcelona (Cataluña) · jornada completa · **remoto**
- Integración y mejora continua de sistemas bajo políticas **Zero-Touch** y **Zero-Trust**.
- Creación de flujos de automatismos con **IA integrada** para facilitar el trabajo tanto a
  usuarios como a técnicos del CAU.
- Herramientas confirmadas por Alex (ago. 2026), citables por nombre en la ficha del puesto:
  **Anthropic Claude**, **n8n**, **Atlassian Suite**, **Google Workspace**.
  Atlassian y Google Workspace van **solo aquí**, nunca en la sección Skills.

### 2. Ayuntamiento de Burriana — Administrador de Sistemas y Redes
- **ago. 2023 – ago. 2024** (1 año 1 mes) · Burriana · presencial
- Configuración y administración de firewalls **Fortinet**, switches gestionables y **Active Directory**.
- Administración y ampliación del **CPD**.
- Soporte técnico a funcionarios y gestión de incidencias.
- Coordinación y tutoría de **dos alumnos en prácticas**.
- Aptitudes LinkedIn: VMware, Fortinet (+5 más).

### 3. Develovements — Desarrollador Full Stack
- **mar. 2023 – ago. 2023** (6 meses) · Castellón de la Plana · presencial
- Desarrollo completo de una aplicación web **de forma individual**: frontend en **Next.js**
  y backend en **NestJS** (stack confirmado por Alex, ago. 2026).
- Implementación de mejoras y parches en proyectos existentes con **Python**.
- Aptitudes LinkedIn: Odoo, NestJS (+5 más).

### 4. Grupo STN (STN Cerámica) — Técnico de sistemas y redes / Atención al usuario
- **mar. 2021 – jul. 2021** (5 meses) · Nules · presencial ✅ fecha cerrada
- Soporte técnico a usuarios (**CAU**) durante prácticas.
- Configuración de switches **Aruba**.
- Apoyo en tareas de programación en el equipo de desarrollo de software.

> ✅ **Discrepancias CV vs LinkedIn — resueltas (ago. 2026).** Alex confirmó que manda
> LinkedIn: Develovements cierra en **ago. 2023** y Grupo STN en **jul. 2021**. El sitio ya
> lo refleja. No las reabras.

**Antigüedad total declarada en el Hero: "3 años de experiencia" / "3 years of experience".**

---

## Formación

| Centro | Titulación | Fechas |
|---|---|---|
| Universitat Carlemany (Andorra) | **Bàtxelor en Informática** (EN: *Bachelor's Degree in Computer Science*) — online, 180 ECTS, 3 años, nivel 6 EQF, primer ciclo EEES, acreditado por AQUA | oct. 2026 – 2029 (previsto) |
| IES Caminàs | **Máster en Ciberseguridad** (Computer & Information Systems Security / Information Assurance) | oct. 2024 – jun. 2025 |
| Ágil Centros | **CFGS Desarrollo de Aplicaciones Multiplataforma (DAM)** | sept. 2021 – jul. 2023 |
| IES Jaume I | **CFGM Sistemas Microinformáticos y Redes (SMR)** | sept. 2019 – jun. 2021 |

> ⚠️ El Bàtxelor **no es "Ingeniería Informática"** ni "Ingeniero": el título oficial andorrano
> no lleva esa denominación. No lo llames así en ningún idioma. Empieza oct. 2026, aún no
> cursado: en `translations.ts` va como primera entrada de `studies[]` con `upcoming: true`,
> que en `Education.astro` pinta una píldora "Próximamente" / "Starting Oct 2026" junto al
> título (mismo estilo de badge que las píldoras de `Skills.astro`).

---

## Certificaciones

| Certificación | Emisor | Fecha | ID credencial | ¿ID visible en el sitio? | Fichero en `public/documents/` |
|---|---|---|---|---|---|
| Chrome Enterprise Premium Proficiency Badge | Google | abr. 2026 | `180671415` | ⛔ no | `google-chrome-enterprise-premium-proficiency-badge.pdf` |
| Introducción a Linux | Hack4u | dic. 2025 | `1184-5652-1771-1047` | ✅ sí | `hack4u-linux-introduction-certificate.pdf` |
| Personalización de entorno en Linux | Hack4u | oct. 2025 | `7022-4692-3666-6154` | ✅ sí | `hack4u-linux-customization-certificate.pdf` |

Las tres están ✅ publicadas (ago. 2026).

**IDs verificados contra los PDF (ago. 2026):** el de "Introducción a Linux" era `6109-…`
en el CV y estaba caducado → el vigente es `1184-5652-1771-1047` (PDF fechado 30/12/2025).
El de "Personalización de entorno en Linux" coincide con el PDF (fechado 30/10/2025).
⚠️ Hack4u **regenera el identificador en cada descarga del PDF e invalida el anterior**: si
Alex vuelve a descargar un certificado, hay que releer el ID del PDF nuevo y actualizarlo
aquí, en `translations.ts` y en LinkedIn.

Enlaces de verificación:

- Google (resuelve solo, sin código):
  `https://chromeenterprisecertified.accredible.com/65b7b710-3199-430e-85ec-f1b530b74d1a#acc.PZGj9Hyg`
- Hack4u (**fijo**, es un formulario donde se teclea el código a mano):
  `https://hack4u.io/check-certificate/`

Reglas fijas de esta sección, decididas por Alex (ago. 2026):

- **El ID solo se publica cuando el verificador lo pide a mano** (las dos de Hack4u). Si el
  enlace resuelve solo, como el de Google, el ID **no se muestra**.
- **Nunca se muestra la duración** del curso. Solo emisor + fecha (`place` + `date`).
- El PDF del badge de Google es solo la imagen de la insignia, no un certificado, pero se
  enlaza igual: las tres entradas llevan **"Ver certificado" (PDF) y "Verificar"**.
- La imagen del badge de Google (400×400, extraída de su PDF) vive en
  `src/assets/certifications/chrome-enterprise-premium-badge.jpg` y se cruza por
  `CertificationItem.id`. Los dos de Hack4u usan el avatar del emisor.
- Forma de `CertificationItem`: `title` · `place` · `date` · `description` · `document`
  (ruta sin base, o `null`) · `verifyUrl` (o `null`) · `credentialId` (o `null`).
  Orden en el array: **más reciente primero**.

---

## Habilidades técnicas

**Posicionamiento objetivo (decidido por Alex, ago. 2026):** técnico de sistemas e
infraestructura con orientación a seguridad (**blue team**). Todo el contenido del sitio se
subordina a eso: nada de "Red Team" en titulares, nada de perfil full-stack.

Publicadas en `Skills.astro` — **3 categorías de 5**, no se amplían sin decisión expresa:

- **security** — Kali Linux · Nmap · Burp Suite · Metasploit · Wireshark
- **systems** — Active Directory · Fortinet · Linux · Switches Aruba · VMware
- **automation** — Docker · Ansible · Python · Bash/Shell · n8n

Fuera del sitio a propósito (por poda, ago. 2026): Nessus, OpenVAS, OWASP, Autopsy,
Volatility, FTK Imager, Magnet Forensics, ExifTool, Proxy Squid, Jenkins, Prometheus,
Grafana, Kubernetes, HTML, CSS, JavaScript, Astro, Svelte. Siguen siendo experiencia real
de Alex; simplemente no ocupan hueco en el escaparate. **No las repongas sin preguntar.**

- La categoría **Web & Scripting** se eliminó entera: el sitio ya es la demostración y los
  proyectos web siguen visibles en Projects. En su lugar, línea discreta en el footer
  (`footer.builtWith`).
- **VLANs** sigue en el CV pero sin logo ni hueco en el grid; queda como candidata.
- **Next.js / NestJS**, **Atlassian Suite** y **Google Workspace** NO van en Skills: solo en
  la ficha de su puesto correspondiente.

**Blandas:** liderazgo y tutoría, comunicación asertiva, resolución de problemas, trabajo en
equipo, capacidad autodidacta.

---

## Idiomas

| Idioma | Nivel |
|---|---|
| Español | Nativo / bilingüe |
| Valenciano (catalán) | Nativo / bilingüe |
| Inglés | B1 · competencia básica profesional |

> Nota: el CV pone "Valenciano", LinkedIn "Catalán". En el sitio, usa **Valenciano** en ES y
> *Valencian (Catalan)* en EN.

---

## Proyectos enlazados actualmente

`DevOps_Projects` (id `devops`) · `Apache_Hardening` (id `apache`) · `DVWA` (id `dvwa`) ·
`web-browser-dashboard` (id `dashboard`, con demo en vivo).
