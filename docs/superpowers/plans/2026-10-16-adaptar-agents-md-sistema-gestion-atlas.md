# Adaptación de AGENTS.md para Sistema de Gestión Atlas - Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adaptar integralmente la plantilla abierta de `AGENTS.md` a la realidad técnica, arquitectónica y normativa del repositorio Sistema de Gestión Atlas, estableciendo una fuente única de verdad para agentes y desarrolladores con verificación automatizada de cumplimiento.

**Architecture:** Se creará un script de validación determinista (`scripts/validate-agents.js`) para auditar la estructura, completitud, ausencia de placeholders y reglas anti-poda de `AGENTS.md`. Sobre esa base se redactará y adaptará `AGENTS.md` de forma incremental por bloques modulares (0-6 Fundamentos y Estilo, 7-10 Calidad y Seguridad, 11-16 Gobernanza y Monorepo, 17 Normativa e ISOs), finalizando con la normalización del archivo y enlaces para herramientas propietarias.

**Tech Stack:** Node.js (CommonJS / ES Modules), Express 4.19, PostgreSQL 15 (`pg`), React 19.1, Material UI v7, Tailwind CSS, Vite 7.1, Docker Compose v2, SonarQube Community Edition, ISO/IEC 25010:2023, ISO/IEC 27001:2022, Ley 21.719 chilena.

**Spec:** [`docs/superpowers/specs/2026-10-16-adaptacion-agents-md-spec.md`](file:///C:/Users/VI-Alumno/Desktop/Sistema%20de%20Gesti%C3%B3n%20Atlas/docs/superpowers/specs/2026-10-16-adaptacion-agents-md-spec.md)

## Global Constraints

- **Regla anti-poda:** Conservar íntegramente tablas, subsecciones, reglas MUST de Conventional Commits, checklist OWASP Top 10, tablas CVSS v4.0 y mapeos normativos ISO sin resumir ni podar.
- **Resolución de placeholders:** Cero placeholders tipo `[texto]`. Los elementos no aplicables deben llevar una nota explícita `(no aplica: <razón>)`.
- **Cero referencias a proyectos externos:** Cero menciones residuales de "Espiralia", "pnpm", "HashRouter", o configuraciones ajenas a Atlas.
- **Sin emojis excepto Gitmoji:** Ningún emoji decorativo en documentación, PRs o código; Gitmoji obligatorio en mensajes de commit (sección 11.2).
- **Sin firmas de autoría de agente:** Prohibido incluir `Co-Authored-By`, `Generated with`, o headers de atribución a IA.
- **Comandos ejecutables:** Todo comando documentado debe existir y ser ejecutable en el entorno del proyecto (`npm`, `docker compose`, `start-sonar.ps1`).
- **Contexto pedagógico y accesibilidad:** Documentar explícitamente la condición de vulnerabilidades pedagógicas de la API (ISY1102) y los requisitos de usabilidad para adultos mayores (WCAG 2.2 AA).

## Review Focus

1. **Residuos de plantilla o placeholders no resueltos:** Que no subsista ningún `[placeholder]` ni referencias a `pnpm` o `Espiralia`. Testeado en `scripts/validate-agents.js` (regla `no-placeholders-or-espiralia`).
2. **Poda involuntaria de tablas y normativas complejas:** Que las 9 características de ISO/IEC 25010:2023 y los 11 controles del Anexo A de ISO/IEC 27001:2022 se mantengan con sus nombres y columnas oficiales. Testeado en `scripts/validate-agents.js` (regla `iso-tables-completeness`).
3. **Inconsistencias en comandos multi-módulo:** Que los comandos de ejecución y SonarQube coincidan exactamente con `package.json` raíz y scripts `.ps1`. Testeado en `scripts/validate-agents.js` (regla `commands-match-package-json`).
4. **Ovisión de accesibilidad para adultos mayores:** Que la sección 1, sección 5 y subcaracterística de interacción de 17.1 incluyan las pautas ergonómicas y WCAG 2.2 AA requeridas por el caso de negocio Atlas. Testeado en `scripts/validate-agents.js` (regla `senior-accessibility-documented`).
5. **Ovisión del estado de seguridad deliberadamente vulnerable:** Que se documente con exactitud la brecha de partida (contraseñas en texto plano, falta de sanitización) vs. los controles exigidos para la remediación. Testeado en `scripts/validate-agents.js` (regla `security-context-articulated`).

---

### Task 1: Arnés Automatizado de Validación para AGENTS.md

**Files:**
- Create: `scripts/validate-agents.js`
- Modify: `package.json:6-16`
- Test: `scripts/validate-agents.js`

**Interfaces:**
- Consumes: Contenido textual de `AGENTS.md` (o `AGENTS.MD`).
- Produces: Proceso CLI que retorna código de salida `0` si el documento cumple todas las reglas, o `1` con detalle de fallos detectados.

- [ ] **Step 1: Crear el script de validación inicial con assertions estrictas**

Crear `scripts/validate-agents.js` verificando:
1. Existencia del archivo `AGENTS.md`.
2. Presencia de las 18 secciones obligatorias (0 a 17, incluyendo subsecciones 11.0, 11.1, 11.2, 11.3, 17.1, 17.2, 17.3, 17.4).
3. Ausencia total de corchetes de placeholder sin resolver (`\[.*\]` no autorizados).
4. Ausencia total de cadenas huérfanas de plantillas previas (`Espiralia`, `pnpm exec vitest`, `HashRouter`).
5. Presencia de palabras clave críticas de Atlas (`Sistema de Gestión Atlas`, `PostgreSQL`, `ISY1102`, `adultos mayores`, `sonar-scanner`, `JWT_SECRET`, `Ley 21.719`).
6. Ausencia de firmas de IA (`Co-Authored-By:`, `Generated with`).

```javascript
// scripts/validate-agents.js
const fs = require('fs');
const path = require('path');

const agentsPath = fs.existsSync(path.join(__dirname, '..', 'AGENTS.md'))
  ? path.join(__dirname, '..', 'AGENTS.md')
  : path.join(__dirname, '..', 'AGENTS.MD');

if (!fs.existsSync(agentsPath)) {
  console.error("ERROR: No se encontró AGENTS.md ni AGENTS.MD");
  process.exit(1);
}

const content = fs.readFileSync(agentsPath, 'utf8');
const errors = [];

// 1. Verificar tamaño mínimo razonable (> 10 KB)
if (content.length < 5000) {
  errors.push(`AGENTS.md está incompleto o vacío (${content.length} bytes)`);
}

// 2. Verificar secciones principales
const requiredHeaders = [
  '## 0. Jerarquía de reglas',
  '## 1. Resumen del proyecto',
  '## 2. Stack técnico',
  '## 3. Estructura del proyecto',
  '## 4. Comandos',
  '## 5. Estilo de código',
  '## 6. Disciplina anti-sobreingeniería',
  '## 7. Pruebas',
  '## 8. Métricas de claridad',
  '## 9. Procedimientos QA',
  '## 10. Seguridad',
  '## 11. Commits y PR',
  '### 11.0 Reglas de la spec',
  '### 11.1 Reglas del proyecto',
  '### 11.2 Gitmoji',
  '### 11.3 Ramas',
  '## 12. Límites del agente',
  '## 13. Deploy',
  '## 14. Monorepo',
  '## 15. Enforcement',
  '## 16. Mantenimiento',
  '## 17. Normativa y cumplimiento',
  '### 17.1 ISO/IEC 25010',
  '### 17.2 ISO/IEC 27001',
  '### 17.3 ISO 9001',
  '### 17.4 Cruce con normativa chilena'
];

requiredHeaders.forEach(header => {
  if (!content.includes(header)) {
    errors.push(`Falta sección o encabezado obligatorio: "${header}"`);
  }
});

// 3. Prohibición de residuos
const forbiddenTerms = [
  'Espiralia',
  'pnpm exec vitest',
  'pnpm install',
  'pnpm build',
  'HashRouter',
  'Co-Authored-By',
  'Generated with'
];

forbiddenTerms.forEach(term => {
  if (content.includes(term)) {
    errors.push(`Término prohibido o residual encontrado: "${term}"`);
  }
});

// 4. Palabras clave obligatorias de Atlas
const requiredAtlasTerms = [
  'Sistema de Gestión Atlas',
  'ISY1102',
  'adultos mayores',
  'PostgreSQL',
  'express',
  'Material UI',
  'sonar-project.properties',
  'docker compose',
  'Ley 21.719',
  'Ley 21.459'
];

requiredAtlasTerms.forEach(term => {
  if (!content.toLowerCase().includes(term.toLowerCase())) {
    errors.push(`Término requerido del proyecto no encontrado: "${term}"`);
  }
});

if (errors.length > 0) {
  console.error("FAIL: Se encontraron los siguientes errores en AGENTS.md:\n");
  errors.forEach(err => console.error(` - ${err}`));
  process.exit(1);
}

console.log("PASS: AGENTS.md cumple con todos los criterios de validación.");
process.exit(0);
```

- [ ] **Step 2: Ejecutar el script y comprobar que falla sobre el estado actual vacío**

Run: `node scripts/validate-agents.js`
Expected: FAIL con múltiples errores de secciones faltantes y tamaño mínimo.

- [ ] **Step 3: Agregar comando `validate:agents` al `package.json` raíz**

Editar `package.json` raíz agregando en `"scripts"`:
```json
"validate:agents": "node scripts/validate-agents.js"
```

- [ ] **Step 4: Ejecutar `npm run validate:agents` y confirmar falla esperada**

Run: `npm run validate:agents`
Expected: FAIL con código 1.

- [ ] **Step 5: Commit del arnés de validación**

```bash
git add scripts/validate-agents.js package.json
git commit -m ":wrench: chore(agents): agregar arnés de validación automatizada para AGENTS.md"
```

---

### Task 2: Adaptar Secciones 0 a 6 (Fundamentos, Stack, Estructura, Comandos, Estilo y Ponytail)

**Files:**
- Create/Modify: `AGENTS.md` (secciones 0 a 6)
- Test: `node scripts/validate-agents.js`

**Interfaces:**
- Consumes: Especificación [`docs/superpowers/specs/2026-10-16-adaptacion-agents-md-spec.md`](file:///C:/Users/VI-Alumno/Desktop/Sistema%20de%20Gesti%C3%B3n%20Atlas/docs/superpowers/specs/2026-10-16-adaptacion-agents-md-spec.md), `BACKEND/package.json`, `FRONTEND/package.json`, `README.md`.
- Produces: Bloque de cabecera y secciones 0 a 6 adaptadas con exactitud al proyecto Atlas.

- [ ] **Step 1: Escribir test/verificación específica para Secciones 0 a 6**

Comprobar que `scripts/validate-agents.js` valide la presencia de la estructura de carpetas real (`BACKEND/src/routes`, `FRONTEND/src/pages`, `uploads/contracts`, `theme.js`) y ejemplos de código reales (React 19 con MUI y Express con `pool.query`).

- [ ] **Step 2: Ejecutar validación para confirmar que la sección 0-6 aún no está completa**

Run: `node scripts/validate-agents.js`
Expected: FAIL

- [ ] **Step 3: Redactar e implementar el preámbulo y las secciones 0 a 6 en `AGENTS.md`**

Implementar en `AGENTS.md`:
- **Preámbulo y reglas anti-poda:** Texto oficial del estándar AGENTS.md, reglas de adaptación, prohibición de emojis excepto Gitmoji en commits, rechazo de soluciones genéricas.
- **Sección 0 (Jerarquía de reglas):** 1. Seguridad y corrección, 2. Convenciones del proyecto, 3. Minimalismo (Ponytail).
- **Sección 1 (Resumen del proyecto):** Sistema de Gestión Atlas (Caso A - ISY1102), gestión de clientes, contratos y documentos PDF, roles (admin/editor), auditoría, foco prioritario en accesibilidad para adultos mayores (WCAG 2.2 AA), y advertencia explícita sobre las vulnerabilidades pedagógicas de partida de la API.
- **Sección 2 (Stack técnico):** Node.js 18+, Express 4.19, PostgreSQL 15 (`pg` 8.12), React 19.1, Vite 7.1, Material UI v7.3, Emotion, Tailwind CSS 3.4, React Hook Form 7.65, React Router 7.9, Axios 1.13, Sonner 1.7, Docker Compose v2, SonarQube Community Edition.
- **Sección 3 (Estructura del proyecto):** Mapeo detallado del monorepo (`BACKEND/src/routes/`, `FRONTEND/src/pages/`, `sql/init.sql`, `sonar-project.properties`, scripts `.ps1`). Definición de ubicación de pruebas en `BACKEND/tests/` y `FRONTEND/src/tests/`.
- **Sección 4 (Comandos):** Comandos funcionales: `npm run install`, `docker compose up -d`, `cd BACKEND && npm run dev`, `cd FRONTEND && npm run dev`, `cd FRONTEND && npm run build`, `npm run sonar:up`, `npm run sonar:scan`, `npm run sonar:down`, y comandos PowerShell asociados.
- **Sección 5 (Estilo de código):**
  - Frontend: Componentes funcionales React 19 (JSX) con Hooks, integración con `src/theme.js` (paleta `#1B7576` y tipografía Poppins accesible), consumo de API con `src/lib/api.jsx` y feedback vía Sonner. Ejemplo real de componente funcional.
  - Backend: Routers modulares Express en `src/routes/`, extracción segura de token JWT Bearer, consultas SQL parametrizadas (`$1, $2`), registro en tabla `auditoria` y manejo de error con contrato `{ error, glosa }`. Ejemplo real de endpoint en Express.
- **Sección 6 (Disciplina anti-sobreingeniería Ponytail):** Escalera de decisión íntegra y niveles (lite, full, ultra).

- [ ] **Step 4: Verificar avance de contenido**

Run: `node -e "const fs = require('fs'); const c = fs.readFileSync('AGENTS.md', 'utf8'); console.log('Bytes escritos:', c.length);"`
Expected: Salida indicando > 5000 bytes.

- [ ] **Step 5: Commit de las Secciones 0 a 6**

```bash
git add AGENTS.md
git commit -m ":memo: docs(agents): redactar preámbulo y secciones 0 a 6 para Atlas"
```

---

### Task 3: Adaptar Secciones 7 a 10 (Pruebas, Métricas de Calidad, Procedimientos QA y Seguridad)

**Files:**
- Modify: `AGENTS.md` (secciones 7 a 10)
- Test: `node scripts/validate-agents.js`

**Interfaces:**
- Consumes: Arquitectura multi-módulo, configuración de SonarQube en `sonar-project.properties`, esquema PostgreSQL `init.sql`, endpoints vulnerables de `BACKEND/src/routes/`.
- Produces: Secciones 7 a 10 redactadas con rigor técnico, sin podar tablas de severidad, métricas ni el checklist OWASP Top 10:2025.

- [ ] **Step 1: Escribir verificación de presencia de tablas de Calidad y OWASP**

Asegurar que `scripts/validate-agents.js` exija la presencia de la tabla de tipos de cobertura (Línea, Rama, Mutación), umbrales de complejidad ciclomática/cognitiva con SonarQube, tabla CVSS v4.0 y los 10 puntos del OWASP Top 10:2025 adaptados.

- [ ] **Step 2: Ejecutar validación para registrar qué secciones faltan**

Run: `node scripts/validate-agents.js`
Expected: FAIL (faltan secciones 7, 8, 9, 10).

- [ ] **Step 3: Redactar e implementar Secciones 7 a 10 en `AGENTS.md`**

Implementar en `AGENTS.md`:
- **Sección 7 (Pruebas):** Cobertura mínima 80% en lógica de negocio crítica (control multi-tenant por `empresa_id`, permisos `RequireAuth`/`RequireAdmin`, métricas de contratos). Tabla de tipos de cobertura conservada íntegra. Pirámide de pruebas: Unitarias (validadores de RUT, fechas y tokens), Integración (endpoints Express + PostgreSQL en Docker), E2E mínimas. Política estricta de tests flaky. Técnicas ISO/IEC/IEEE 29119-4 declaradas por caso no trivial. Ejemplo de test con Vitest / React Testing Library adaptado al login o contratos de Atlas.
- **Sección 8 (Métricas de claridad):** Integración operativa con SonarQube Community en `http://localhost:9000` (escaneo multi-módulo `atlas`, `atlas_backend`, `atlas_frontend`). Tabla de umbrales: Complejidad ciclomática ($\le 10$, máx 15), Complejidad cognitiva ($\le 15$), Longitud de función ($\le 40$ líneas), Nesting ($\le 3$). Explicación de ciclomática vs. cognitiva preservada íntegra.
- **Sección 9 (Procedimientos QA):** Checklist pre-entrega adaptado a Atlas: tests en verde, `npm run lint` sin advertencias, análisis SonarQube sin vulnerabilidades críticas ni de alta severidad, variables en `.env` sin filtrar secretos, endpoints SQL parametrizados, OpenAPI sincronizado en `BACKEND/src/openapi.json`. Tabla de severidad con equivalencia CVSS v4.0 íntegra y plazos de remediación.
- **Sección 10 (Seguridad):**
  - Ubicación de secretos reales: `.env` en la raíz (ignorado en git), sin credenciales hardcodeadas en código commiteado.
  - Contexto de remediación de vulnerabilidades académicas de ISY1102.
  - **OWASP Top 10:2025 adaptado a Atlas:**
    - A01 Control de acceso roto: Validación estricta de `empresaId` y roles en JWT para evitar IDOR entre empresas en clientes, contratos, usuarios y auditoría.
    - A02 Configuración insegura: Dockerfiles con usuario non-root; remover header `X-Powered-By` en Express; variables de entorno para JWT y DB en lugar de valores por defecto inseguros.
    - A03 Fallos de cadena de suministro: Auditoría de dependencias con `npm audit` en BACKEND y FRONTEND; `package-lock.json` commiteado.
    - A04 Fallos criptográficos: Remediación obligatoria de contraseñas en texto plano por hash seguro (`bcrypt` con salt $\ge 10$ o `argon2id`); generación de `JWT_SECRET` robusto; nunca retornar hash ni contraseña en respuestas JSON.
    - A05 Inyección: **Aplica plenamente**: Consultas PostgreSQL siempre parametrizadas (`$1, $2`), erradicar concatenación en queries SQL; sanitizar parámetros en `/clientes/search`.
    - A06 Diseño inseguro: Validación rigurosa de PDFs subidos (tipo MIME real, tamaño máx 5MB, almacenamiento seguro en DB o `uploads/contracts/`).
    - A07 Fallos de autenticación: Rate limiting contra fuerza bruta en `/autenticacion/login`; expiración e invalidación de JWT.
    - A08 Fallos de integridad de software/datos: Validación de payloads entrantes; transacciones atómicas PostgreSQL (`BEGIN`/`COMMIT`/`ROLLBACK`) al crear empresas con usuarios vinculados.
    - A09 Fallos de logging y alertado: Registro forense en tabla `auditoria` sin registrar contraseñas ni datos personales en el campo `accion`.
    - A10 Manejo indebido de condiciones excepcionales: Bloques `try/catch` que respondan formato `{ error, glosa }` sin exponer stack traces ni detalles internos de la base de datos PostgreSQL.
  - Advertencia de prompt injection e integridad de `AGENTS.md`.

- [ ] **Step 4: Comprobar redacción de Secciones 7 a 10**

Run: `node -e "const fs = require('fs'); const c = fs.readFileSync('AGENTS.md', 'utf8'); console.log('Contiene OWASP A05 Inyección:', c.includes('A05 Inyección')); console.log('Contiene CVSS v4.0:', c.includes('CVSS v4.0'));"`
Expected: Ambos devuelven `true`.

- [ ] **Step 5: Commit de las Secciones 7 a 10**

```bash
git add AGENTS.md
git commit -m ":memo: docs(agents): incorporar secciones 7 a 10 sobre calidad, métricas y seguridad OWASP"
```

---

### Task 4: Adaptar Secciones 11 a 16 (Gobernanza, Git Flow, Límites del Agente, Deploy y Monorepo)

**Files:**
- Modify: `AGENTS.md` (secciones 11 a 16)
- Test: `node scripts/validate-agents.js`

**Interfaces:**
- Consumes: Especificación de Conventional Commits v1.0.0, catálogo Gitmoji, modelo de ramas Git Flow, orquestación Docker Compose y estructura monorepo.
- Produces: Secciones 11 a 16 adaptadas sin recortar especificaciones normativas de commits ni límites operativos.

- [ ] **Step 1: Escribir verificación de reglas de Commits, Git Flow y Deploy Docker**

Asegurar que `scripts/validate-agents.js` valide que la sección 11 contenga las reglas MUST de Conventional Commits v1.0.0, la tabla completa de Gitmoji, el diagrama y flujo de Git Flow con `release/*` y `hotfix/*`, la sección 12 con las 3 categorías de límites del agente, y la sección 14 declarando monorepo multi-módulo activo.

- [ ] **Step 2: Ejecutar validación para registrar pendientes de Secciones 11 a 16**

Run: `node scripts/validate-agents.js`
Expected: FAIL (faltan secciones 11 a 16).

- [ ] **Step 3: Redactar e implementar Secciones 11 a 16 en `AGENTS.md`**

Implementar en `AGENTS.md`:
- **Sección 11 (Commits y PR):**
  - Formato Conventional Commits v1.0.0 estricto.
  - **11.0 Reglas de la spec (MUST, no negociables):** Header, tipos `feat`/`fix`, cuerpos, footers con git trailers, formato `BREAKING CHANGE:`, `revert`. Conservada íntegra.
  - **11.1 Reglas del proyecto:** Idioma español para sujeto, cuerpo y footer; tipo en inglés; alcances adaptados a Atlas: `backend`, `frontend`, `db`, `auth`, `clientes`, `contratos`, `empresas`, `usuarios`, `auditoria`, `docker`, `sonar`, `deps`, `docs`, `test`. Prohibición absoluta de firmas de agentes (`Co-Authored-By`, `Generated with`).
  - **11.2 Gitmoji (obligatorio en este proyecto):** Catálogo de Gitmoji completo con emojis semánticos (`:sparkles:`, `:bug:`, `:art:`, `:recycle:`, `:white_check_mark:`, `:wrench:`, `:memo:`, `:zap:`, `:fire:`, `:tada:`).
  - **11.3 Ramas (Git Flow - modelo adoptado para Atlas):** Diagrama ASCII de Git Flow, tabla de ramas (`main`, `develop`, `feature/*`, `release/*`, `hotfix/*`), comandos paso a paso para ciclo de release y reglas "nunca" (nunca commit directo a `main` sin tests en verde, nunca force-push).
- **Sección 12 (Límites del agente):**
  - **Siempre:** Editar código, tests, docs en el repo; crear commits locales.
  - **Preguntar primero:** `docker compose down -v` (destrucción de datos persistidos en volumen `postgres_data`), `git reset --hard`, agregar o actualizar dependencias npm, cambios en `.env`.
  - **Nunca sin aprobación explícita:** Migraciones SQL destructivas (`DROP`, `TRUNCATE`), commits directos con secretos reales, deshabilitar SonarQube o quality gates de seguridad, reescritura de historial remoto (`push --force`). Criterio de fondo documentado.
- **Sección 13 (Deploy):** Despliegue contenerizado mediante Docker Compose (`docker compose up -d --build`). Verificación de salud con `docker compose ps` y curl a endpoints de salud (`/` en backend, Nginx en frontend). Procedimiento de rollback documentado.
- **Sección 14 (Monorepo):** **Aplica plenamente**: Monorepo multi-módulo coordinado desde la raíz que integra `BACKEND` (Express + Postgres) y `FRONTEND` (React 19 + Vite), orquestado por `package.json` raíz y configuración centralizada de SonarQube (`sonar.modules=backend,frontend`).
- **Sección 15 (Enforcement):** Matriz de reforzamiento que distribuye la verificación entre pre-commit hooks locales, linter ESLint, SonarQube Quality Gate en Docker, y revisiones de PR.
- **Sección 16 (Mantenimiento):** Tratar AGENTS.md como código vivo, cadencia de revisión por sprint/hito académico, y symlinks para `.cursorrules` y `CLAUDE.md`.

- [ ] **Step 4: Verificar integración de Secciones 11 a 16**

Run: `node -e "const fs = require('fs'); const c = fs.readFileSync('AGENTS.md', 'utf8'); console.log('Contiene Git Flow:', c.includes('Git Flow')); console.log('Contiene Monorepo aplica:', c.includes('sonar.modules=backend,frontend'));"`
Expected: Ambos devuelven `true`.

- [ ] **Step 5: Commit de las Secciones 11 a 16**

```bash
git add AGENTS.md
git commit -m ":memo: docs(agents): incorporar secciones 11 a 16 sobre gobernanza, git flow, deploy y monorepo"
```

---

### Task 5: Adaptar Sección 17 (Normativa y Cumplimiento: ISO 25010:2023, ISO 27001:2022, ISO 9001, Leyes Chilenas)

**Files:**
- Modify: `AGENTS.md` (sección 17 completa)
- Test: `node scripts/validate-agents.js`

**Interfaces:**
- Consumes: Especificación [`docs/superpowers/specs/2026-10-16-adaptacion-agents-md-spec.md`](file:///C:/Users/VI-Alumno/Desktop/Sistema%20de%20Gesti%C3%B3n%20Atlas/docs/superpowers/specs/2026-10-16-adaptacion-agents-md-spec.md), normas ISO/IEC vigentes, marco legal chileno (Ley 21.719, Ley 21.459).
- Produces: Sección 17 exhaustiva con todas las tablas normativas completas y fundamentadas para Atlas.

- [ ] **Step 1: Escribir verificación de integridad normativa en el arnés**

Verificar en `scripts/validate-agents.js` que se comprueben:
1. Las 9 características de ISO/IEC 25010:2023 (Aptitud funcional, Eficiencia de desempeño, Compatibilidad, Capacidad de interacción, Fiabilidad, Seguridad, Mantenibilidad, Flexibilidad, Safety).
2. Los 11 controles del Anexo A de ISO/IEC 27001:2022 (A.8.2 a A.8.29).
3. El mapeo de cláusulas 4 a 10 de ISO 9001:2015 contra Atlas.
4. El cruce con la legislación chilena (Ley 21.719 de Protección de Datos Personales, Ley 21.459 de Delitos Informáticos, y notas de no aplicación para Ley 21.180, Ley 21.643 y NCG 519 CMF).
5. Énfasis obligatorio en accesibilidad para adultos mayores (WCAG 2.2 AA).

- [ ] **Step 2: Ejecutar validación para registrar faltantes de la Sección 17**

Run: `node scripts/validate-agents.js`
Expected: FAIL (falta sección 17 y sus subsecciones).

- [ ] **Step 3: Redactar e implementar Sección 17 en `AGENTS.md`**

Implementar en `AGENTS.md`:
- **Preámbulo Sección 17:** Declaración del marco regulatorio del proyecto.
- **17.1 ISO/IEC 25010 - Atributos de calidad del producto (Edición 2023):**
  - Tabla completa con las 9 características y sus subcaracterísticas 2023.
  - Umbrales concretos para Atlas:
    - *Aptitud funcional:* Trazabilidad de endpoints y contratos en base de datos.
    - *Eficiencia de desempeño:* Tiempo de respuesta de API < 200ms en condiciones normales (eliminando el retardo pedagógico de 4s para pruebas de carga); bundle de Vite optimizado.
    - *Compatibilidad:* Contratos estables REST y esquema OpenAPI 3.0.
    - *Capacidad de interacción (foco prioritario en adultos mayores):* WCAG 2.2 AA, tap targets $\ge 44\text{ px}$, contraste $\ge 4.5:1$, tipografía Poppins legible $\ge 14\text{ px}$, botones descriptivos, mensajes amigables sin jerga técnica con Sonner.
    - *Fiabilidad:* Tolerancia a caídas de PostgreSQL mediante reconexión del pool, healthchecks en Docker Compose.
    - *Seguridad:* Autenticación JWT, RBAC (admin/editor), aislamiento multi-tenant por `empresa_id` y 0 vulnerabilidades críticas de SonarQube.
    - *Mantenibilidad:* Complejidad ciclomática $\le 10$, cognitiva $\le 15$ en SonarQube, funciones $\le 40$ líneas.
    - *Flexibilidad:* Despliegue contenerizado multiplataforma en Docker y diseño web responsive.
    - *Safety:* `(no aplica: software de gestión empresarial sin control de hardware físico)`.
  - Cuadro explicativo de cambios 2011 vs. 2023 íntegro.
- **17.2 ISO/IEC 27001 - SGSI (Confidencialidad, Integridad, Disponibilidad):**
  - Tabla CIA aplicada a la base de datos PostgreSQL, documentos de contratos y API de Atlas.
  - Tabla íntegra de Controles tecnológicos del Anexo A (ISO/IEC 27001:2022): A.8.2/A.8.3, A.8.4, A.8.5, A.8.8, A.8.9, A.8.10/A.8.11, A.8.12, A.8.13, A.8.15/A.8.16, A.8.24, A.8.25-A.8.29 adaptada con precisión a Atlas.
  - Explicación de edición vigente 2022 vs. 2013 íntegra.
- **17.3 ISO 9001 / IEEE 730 / ISO/IEC/IEEE 29119 - Proceso y pruebas:**
  - Contexto de la asignatura ISY1102 y marco de calidad.
  - IEEE 730-2026 y 29119 (partes 1 a 5).
  - Tabla de mapeo de cláusulas ISO 9001:2015 (4 a 10) contra la evidencia tangible del repositorio Atlas.
- **17.4 Cruce con normativa chilena:**
  - Tabla de cruce norma ISO vs. Ley chilena:
    - Ley 21.719 (Protección de Datos Personales, RAT en `clientes`, `usuarios`, `contratos`, derechos ARCO + portabilidad, notificación de brechas).
    - Ley 21.459 (Delitos Informáticos, prevención de accesos ilícitos y trazabilidad en tabla `auditoria`).
    - Ley 21.180: `(no aplica: sistema privado y académico orientado a empresas clientes, no tramitación estatal)`.
    - NCG 519 CMF: `(no aplica: entidad independiente no regulada por la CMF)`.
    - Ley 21.643 (Ley Karin): `(no aplica: sistema de gestión de clientes y contratos sin canal de denuncias internas)`.
    - Ley 21.663 (Ciberseguridad): lineamientos de seguridad por diseño y por defecto.
  - Tabla de obligaciones técnicas bajo la Ley 21.719 (RAT, Base de licitud, Derechos ARCO, Notificación de brechas) con mapeo directo a endpoints y tablas de Atlas.

- [ ] **Step 4: Ejecutar el arnés de validación automatizada**

Run: `node scripts/validate-agents.js`
Expected: PASS: AGENTS.md cumple con todos los criterios de validación.

- [ ] **Step 5: Commit de la Sección 17**

```bash
git add AGENTS.md
git commit -m ":memo: docs(agents): integrar sección 17 de normativa ISO 25010, ISO 27001 y legislación chilena"
```

---

### Task 6: Normalización, Enlaces Propietarios y Verificación Final de Extremo a Extremo

**Files:**
- Modify: `AGENTS.md` (normalización de nombre de archivo y verificación de formato)
- Create: `.cursorrules`, `CLAUDE.md` (symlinks o archivos de referencia según soporte del sistema de archivos)
- Test: `npm run validate:agents`

**Interfaces:**
- Consumes: `AGENTS.md` completamente adaptado.
- Produces: Archivo `AGENTS.md` estándar en raíz, enlaces para herramientas propietarias Cursor/Claude, validación en verde en `npm run validate:agents`.

- [ ] **Step 1: Normalizar casing del archivo a `AGENTS.md` estándar**

Verificar en git y en el sistema de archivos que el archivo esté nombrado exactamente como `AGENTS.md` (no `AGENTS.MD`).
Run: `Get-Item AGENTS*`
Si es necesario: `git mv AGENTS.MD AGENTS.md` o normalizar en el sistema de archivos.

- [ ] **Step 2: Crear archivos de enlace/referencia para herramientas propietarias**

Crear `CLAUDE.md` y `.cursorrules` referenciando `AGENTS.md` como fuente única de verdad según estipula la sección 16:
Contenido de `CLAUDE.md`:
```markdown
# Claude Code Rules
Consulte las reglas operativas, arquitectura, comandos y convenciones en [AGENTS.md](./AGENTS.md).
```
Contenido de `.cursorrules`:
```markdown
# Cursor Rules
Consulte las reglas operativas, arquitectura, comandos y convenciones en [AGENTS.md](./AGENTS.md).
```

- [ ] **Step 3: Ejecutar la suite completa de validación automatizada**

Run: `npm run validate:agents`
Expected: PASS sin ningún error ni advertencia.

- [ ] **Step 4: Comprobar estado de Git del repositorio**

Run: `git status`
Expected: Todos los cambios preparados o commiteados limpiamente en la rama actual.

- [ ] **Step 5: Commit final de normalización y enlaces de herramientas**

```bash
git add AGENTS.md CLAUDE.md .cursorrules
git commit -m ":wrench: chore(agents): normalizar nombre AGENTS.md y enlazar reglas para Claude y Cursor"
```

---
