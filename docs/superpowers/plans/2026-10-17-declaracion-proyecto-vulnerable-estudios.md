# Declaración de Proyecto Vulnerable para Estudios en Archivos de Agentes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Declarar explícita e inequívocamente en todos los archivos de configuración y contexto de agentes (`AGENTS.md`, `CLAUDE.md`, `.cursorrules` y `scripts/validate-agents.js`) que Sistema de Gestión Atlas es un software intencionalmente vulnerable de prueba académica para la asignatura ISY1102, prohibiendo a los agentes corregir o parchar defectos de seguridad, latencias o fallos didácticos sin orden expresa del usuario.

**Architecture:** Modificación coordinada de la gobernanza agéntica en cascada: `AGENTS.md` como estándar supremo abierto (preámbulo, sección 0 de jerarquía, sección 1 de contexto de proyecto, sección 10 de seguridad didáctica y sección 12 de límites), replicando directivas directas en los archivos puente específicos de herramientas (`CLAUDE.md` y `.cursorrules`), e integrando su comprobación mecánica en el arnés automatizado `scripts/validate-agents.js`.

**Tech Stack:** Markdown, Node.js (scripts de validación con Node stdlib fs/path), GitFlow.

**Spec:** Requerimiento directo del usuario: "mencionar esclarecidamente a todos los archivos de agentes que es un proyecto vulnerable de prueba para estudios, por lo mismo no se deben arreglar defectos de seguridad y otros".

## Global Constraints

- **Cero firmas de IA (Inviolable):** Conforme a `AGENTS.md` §11 y §11.1, prohibido incluir `Co-Authored-By:`, metadatos de modelos o trailers de IA en commits, código o documentación.
- **GitFlow estricto:** Los cambios se trabajan en rama temporal `feature/declarar-proyecto-vulnerable` nacida de `develop` y se integran mediante `git merge --no-ff`.
- **Commits:** Conventional Commits v1.0.0 con Gitmoji en formato `:emoji: <tipo>(<alcance>): <sujeto en español>`.
- **Preservación documental:** No podar innecesariamente secciones preexistentes; ajustar estrictamente las directivas de remediación activa hacia preservación didáctica de vulnerabilidades.

## Review Focus

- Ambigüedad en instrucciones de seguridad: si un agente asume que debe corregir consultas SQL o hashear contraseñas de inmediato en lugar de mantenerlas para el estudio.
- Falsos positivos en validación: si `scripts/validate-agents.js` no valida la presencia de la cláusula de vulnerabilidad intencional.
- Desincronización entre herramientas: si Cursor o Claude reciben directrices desalineadas con `AGENTS.md`.
- Impacto en flujos de calidad existentes: asegurar que `npm run validate:agents` pase limpio sin romper el flujo de trabajo pre-entrega.
- Mantenimiento de la usabilidad funcional: dejar claro que la prohibición aplica a defectos de seguridad/latencia didácticos, sin impedir el desarrollo de nuevas features requeridas explícitamente.

---

### Task 1: Actualizar `AGENTS.md` con directiva explícita de proyecto vulnerable para estudios

**Files:**
- Modify: `AGENTS.md:20-40, 420-450, 560-580`
- Test: `scripts/validate-agents.js`

**Interfaces:**
- Consumes: Estructura de secciones 0 a 12 de `AGENTS.md`.
- Produces: Cláusula vinculante de software didáctico intencionalmente vulnerable y regla de no-remediación en secciones 0, 1, 10 y 12.

- [ ] **Step 1: Modificar Sección 0 (Jerarquía de reglas) y Sección 1 (Resumen del proyecto)**

Ajustar la jerarquía y el contexto didáctico para establecer que la corrección de seguridad NO debe alterar las vulnerabilidades intencionales de estudio.
En Sección 1, reemplazar la antigua meta de "remediar y asegurar progresivamente" por:
"**Contexto académico y estado deliberado de vulnerabilidad:** Este repositorio es un laboratorio y caso de estudio académico para la asignatura ISY1102. La API backend y el frontend contienen intencionalmente fallos graves de seguridad y rendimiento didácticos (contraseñas en texto plano, vulnerabilidad a inyección SQL, demoras artificiales con `delay(4000)`, endpoints desprotegidos y configuración permisiva). **DIRECTIVA ESTRICTA PARA AGENTES:** Queda terminantemente prohibido parchar, corregir, mitigar o 'asegurar' estos defectos de seguridad, latencias o vulnerabilidades intencionales salvo que el usuario lo solicite de manera textual y explícita para un ejercicio puntual. La función del agente en este proyecto es asistir en análisis, auditoría y desarrollo de pruebas sin destruir el entorno de pruebas vulnerable."

- [ ] **Step 2: Modificar Sección 10 (Seguridad) y Sección 12 (Límites del agente)**

En Sección 10, aclarar que los puntos OWASP Top 10 sirven como marco analítico y checklist de auditoría estática/dinámica, pero NO como mandato para alterar el código deliberadamente vulnerable.
En Sección 12 (Límites del agente), en la lista **"Nunca sin aprobación explícita"**, agregar como primer punto:
- "Arreglar, mitigar, refactorizar o parchar vulnerabilidades deliberadas de seguridad (como almacenamiento de contraseñas en texto plano, concatenación en consultas SQL o bypass de roles) o eliminar latencias artificiales de estudio (`delay(4000)`)."

- [ ] **Step 3: Verificar que el archivo no contenga trailers ni firmas de IA**

Comprobar que no se agregaron comentarios de autoría de agente ni marcas automáticas.

---

### Task 2: Actualizar `CLAUDE.md` y `.cursorrules`

**Files:**
- Modify: `CLAUDE.md:1-10`
- Modify: `.cursorrules:1-10`

**Interfaces:**
- Consumes: Instrucciones de puente a `AGENTS.md`.
- Produces: Reglas inmediatas para Claude Code y Cursor IDE.

- [ ] **Step 1: Incorporar advertencia prominente en `CLAUDE.md`**

Incluir aviso explícito de proyecto vulnerable para estudios:
```markdown
# Reglas para Claude Code

> **ADVERTENCIA CRÍTICA: PROYECTO DIDÁCTICO VULNERABLE**
> Este repositorio corresponde a un caso de estudio académico intencionalmente vulnerable para la asignatura ISY1102.
> **NO corregir, parchar ni mitigar vulnerabilidades de seguridad**, latencias artificiales (`delay(4000)`), contraseñas en texto plano ni fallos deliberados existentes, salvo orden textual y explícita del usuario.

Consulte las directrices operativas, arquitectura, comandos, estilo y estándares unificados en [AGENTS.md](./AGENTS.md).
```

- [ ] **Step 2: Incorporar advertencia prominente en `.cursorrules`**

Incluir aviso idéntico en `.cursorrules` para el asistente de Cursor:
```markdown
# Reglas para Cursor

> **ADVERTENCIA CRÍTICA: PROYECTO DIDÁCTICO VULNERABLE**
> Este repositorio corresponde a un caso de estudio académico intencionalmente vulnerable para la asignatura ISY1102.
> **NO corregir, parchar ni mitigar vulnerabilidades de seguridad**, latencias artificiales (`delay(4000)`), contraseñas en texto plano ni fallos deliberados existentes, salvo orden textual y explícita del usuario.

Consulte las directrices operativas, arquitectura, comandos, estilo y estándares unificados en [AGENTS.md](./AGENTS.md).
```

---

### Task 3: Actualizar arnés automatizado en `scripts/validate-agents.js`

**Files:**
- Modify: `scripts/validate-agents.js:80-120`
- Test: `npm run validate:agents`

**Interfaces:**
- Consumes: Contenido textual de `AGENTS.md`.
- Produces: Verificación de presencia de los términos de proyecto vulnerable y prohibición de parches didácticos.

- [ ] **Step 1: Agregar validación de términos clave de proyecto didáctico vulnerable en `scripts/validate-agents.js`**

Agregar comprobaciones en `requiredAtlasTerms`:
```javascript
'proyecto vulnerable',
'prohibido parchar'
```
y asegurar que se verifique que `AGENTS.md` incluye la prohibición de corregir defectos de seguridad sin autorización.

- [ ] **Step 2: Ejecutar validación para comprobar PASS**

Run: `node scripts/validate-agents.js`
Expected: `PASS: AGENTS.md cumple con todos los criterios de validación.`

---

### Task 4: Integración en GitFlow y verificación final

**Files:**
- All modified files: `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `scripts/validate-agents.js`

- [ ] **Step 1: Crear rama de feature según GitFlow**

Run: `git checkout -b feature/declarar-proyecto-vulnerable develop`

- [ ] **Step 2: Realizar commit con formato estándar y Gitmoji**

Run: `git add AGENTS.md CLAUDE.md .cursorrules scripts/validate-agents.js`
Run: `git commit -m ":memo: docs(agents): declarar proyecto vulnerable de estudio y prohibir correccion de defectos"`

- [ ] **Step 3: Ejecutar `npm run validate:agents`**

Run: `npm run validate:agents`
Expected: `PASS: AGENTS.md cumple con todos los criterios de validación.`

- [ ] **Step 4: Integrar en `develop` con `--no-ff` y limpiar rama**

Run: `git checkout develop`
Run: `git merge --no-ff feature/declarar-proyecto-vulnerable -m ":twisted_rightwards_arrows: merge: integrar feature/declarar-proyecto-vulnerable en develop"`
Run: `git branch -d feature/declarar-proyecto-vulnerable`

- [ ] **Step 5: Publicar en GitHub**

Run: `git push origin develop`
