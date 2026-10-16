# Especificación: Adaptación de AGENTS.md para el Sistema de Gestión Atlas

## 1. Contexto y Objetivos

`AGENTS.md` es el estándar abierto de documentación y reglas operativas para agentes de inteligencia artificial en repositorios de código. Este documento establece la especificación detallada para adaptar la plantilla base de `AGENTS.md` al repositorio real **Sistema de Gestión Atlas** (Caso A de la asignatura ISY1102 - Calidad y seguridad en el desarrollo de software).

### 1.1 Naturaleza del Proyecto
- **Nombre:** Sistema de Gestión Atlas
- **Propósito:** Plataforma web empresarial para la gestión integral de clientes, contratos con almacenamiento y descarga de documentos asociados (PDFs), administración de usuarios y roles internos (administrador, editor), auditoría de acciones críticas y panel de métricas/dashboard, con control de acceso multi-tenant segregado por empresa (`empresa_id`).
- **Público Objetivo y Usabilidad:** Usuarios corporativos y clientes empresariales, con requerimiento explícito de diseño accesible y ergonómico enfocado en adultos mayores (WCAG 2.2 AA, tipografía legible, controles táctiles ampliados, alto contraste).
- **Contexto Académico / Seguridad:** Proyecto con vulnerabilidades deliberadas iniciales en el backend (contraseñas en texto plano sin hash, consultas susceptibles a inyección, latencias artificiales de 4 segundos, secretos predeterminados, falta de rate limiting) diseñado para el aprendizaje, auditoría estática/dinámica y remediación progresiva conforme a estándares OWASP, ISO/IEC 25010 e ISO/IEC 27001.

### 1.2 Reglas Fundamentales de Adaptación (Anti-Poda y Fidelidad)
1. **Resolución de Placeholders:** Todo placeholder `[texto]` se resuelve con el dato real del proyecto. Si no aplica, se documenta explícitamente `(no aplica: <razón>)`; nunca se elimina una línea sin dejar rastro de consideración.
2. **Secciones Opcionales:** Se omiten únicamente si no aplican en absoluto, dejando una nota concisa explicativa de por qué.
3. **Preservación Íntegra de Contenido Detallado:** Tablas, subsecciones, reglas de Conventional Commits v1.0.0, checklist OWASP Top 10:2025, tablas CVSS v4.0, diagramas de ramas y mapeos normativos se conservan íntegros. No se permite podar ni resumir por iniciativa propia.
4. **Tratamiento de Comentarios Guía vs. Explicativos:** Las instrucciones de llenado se resuelven y remueven; las explicaciones del porqué de las reglas se preservan como contenido técnico.
5. **Cero Emojis Excepto Gitmoji Obligatorio:** Sin emojis en código, PR, docs generadas ni output. En commits, se utiliza obligatoriamente el estándar Gitmoji definido en la sección 11.2.
6. **Sin Soluciones Genéricas:** Cada sección responde estrictamente a la arquitectura real multi-módulo (Node.js/Express + React 19/MUI + PostgreSQL + Docker Compose + SonarQube).
7. **Prohibición de Atribución de IA:** Cero firmas tipo `Co-Authored-By`, `Generated with`, headers de autoría de agentes o watermarks.

---

## 2. Inventario Técnico del Repositorio Atlas

### 2.1 Módulos y Arquitectura
- **Tipo de Repositorio:** Monorepo / Multi-módulo coordinado desde la raíz.
- **BACKEND:**
  - Runtime: Node.js 18+ (CommonJS).
  - Framework: Express 4.19.2.
  - Base de Datos: PostgreSQL 15 (cliente `pg` 8.12.0) con pool en `BACKEND/src/db.js`.
  - Rutas Principales: `/autenticacion`, `/usuarios`, `/clientes`, `/contratos`, `/auditoria`, `/empresas`, `/roles`, `/empresa-usuarios`, `/metricas`.
  - Documentación de API: Swagger UI en `/docs` y OpenAPI 3.0 en `BACKEND/src/openapi.json`.
  - Almacenamiento: PDFs en tabla `documentos_contrato` (bytea) y carpeta `uploads/contracts/`.
- **FRONTEND:**
  - Framework: React 19.1.1 con Vite 7.1.7 (`@vitejs/plugin-react` 5.0.4).
  - UI / Estilos: Material UI v7.3.4 (`@mui/material`, `@mui/icons-material`, `@mui/x-charts`), Emotion (`@emotion/react`, `@emotion/styled`), Tailwind CSS 3.4.14, Material React Table 3.2.1.
  - Formularios y Alertas: React Hook Form 7.65.0, Sonner 1.7.1.
  - Enrutamiento y Conectividad: React Router 7.9.5 (`react-router-dom`), Axios 1.13.1 con interceptores para token Bearer y manejo de errores `{ error, glosa }`, `jwt-decode` 4.0.0.
  - Linter: ESLint 9.36.0 (flat config `eslint.config.js`).
- **Infraestructura y Herramientas (Docker Compose):**
  - `atlas-postgres`: PostgreSQL 15 alpine en puerto expuesto 15432 (interno 5432).
  - `atlas-backend`: Express API en puerto expuesto 4450 (interno 4000).
  - `atlas-frontend`: Nginx / build estático en puerto expuesto 3350 (interno 80).
  - `sonarqube-db`: PostgreSQL 15 para SonarQube.
  - `sonarqube`: SonarQube Community Edition en puerto 9000 (perfil `tools`).
  - `sonar-scanner`: SonarSource CLI configurado para análisis multi-módulo (`atlas`, `atlas_backend`, `atlas_frontend`).

---

## 3. Requisitos por Sección de AGENTS.md

- **Sección 0 (Jerarquía de reglas):** Mantener orden 1. Seguridad y corrección, 2. Convenciones del proyecto, 3. Minimalismo (Ponytail).
- **Sección 1 (Resumen del proyecto):** Definición precisa del Sistema de Gestión Atlas, caso de uso ISY1102, gestión multi-tenant por empresa, accesibilidad para adultos mayores, y contexto de remediación de vulnerabilidades académicas.
- **Sección 2 (Stack técnico):** Reflejo fidedigno de versiones exactas identificadas en `package.json` de raíz, BACKEND y FRONTEND.
- **Sección 3 (Estructura del proyecto):** Árbol exhaustivo de carpetas de raíz, BACKEND y FRONTEND, delimitando dónde residen controladores, vistas, scripts SQL y suites de prueba.
- **Sección 4 (Comandos):** Comandos funcionales y verificados para instalación (`npm run install`), ejecución Docker (`docker compose up -d`), backend dev (`cd BACKEND && npm run dev`), frontend dev (`cd FRONTEND && npm run dev`), compilación (`cd FRONTEND && npm run build`), y escaneo SonarQube (`npm run sonar:up`, `npm run sonar:scan`, `npm run sonar:down`, y equivalentes `.ps1`).
- **Sección 5 (Estilo de código):** Guías prácticas y ejemplos concretos tanto para Frontend (React 19 + MUI Theme + Tailwind + Sonner) como para Backend (Express Router + JWT + PostgreSQL parametrizado + Auditoría).
- **Sección 6 (Disciplina Ponytail):** Conservación íntegra de la escalera de decisión y reglas YAGNI.
- **Sección 7 (Pruebas):** Estrategia de testing definiendo pirámide de pruebas, cobertura mínima objetivo (80% en lógica crítica y aislamiento por empresa), prevención de tests flaky y diseño de casos según ISO/IEC/IEEE 29119-4.
- **Sección 8 (Métricas de claridad):** Integración activa con SonarQube local (`http://localhost:9000`), umbrales de complejidad ciclomática ($\le 10$), cognitiva ($\le 15$), longitud de funciones ($\le 40$ líneas) y anidamiento ($\le 3$).
- **Sección 9 (Procedimientos QA):** Quality gates pre-entrega adaptados a la arquitectura cliente-servidor con PostgreSQL, tabla de severidad y escala CVSS v4.0.
- **Sección 10 (Seguridad):** Adaptación del OWASP Top 10:2025 al caso Atlas: aislamiento multi-tenant estricto (`empresaId`), prevención de SQL Injection mediante consultas parametrizadas `$1, $2`, migración obligatoria de contraseñas de texto plano a bcrypt/argon2id, sanitización de subida de PDFs, control de errores `{ error, glosa }` y protección de variables en `.env`.
- **Sección 11 (Commits y PR):** Conventional Commits v1.0.0 íntegro, catálogo Gitmoji obligatorio, ramas Git Flow (`main`, `develop`, `feature/*`, `release/*`, `hotfix/*`), lista de alcances del proyecto y prohibición de firmas de IA.
- **Sección 12 (Límites del agente):** Autorizaciones directas, acciones que requieren confirmación (ej. `docker compose down -v` o borrado de volúmenes de datos), y prohibiciones absolutas.
- **Sección 13 (Deploy):** Despliegue con Docker Compose, verificación de salud de servicios y procedimientos de rollback.
- **Sección 14 (Monorepo):** Aplicación explícita para coordinar BACKEND y FRONTEND con `package.json` raíz y escaneo multi-módulo en SonarQube.
- **Sección 15 (Enforcement):** Matriz de refuerzo entre hooks locales, linter, análisis de SonarQube y revisiones.
- **Sección 16 (Mantenimiento):** Ciclos de actualización y unificación de reglas propietarias (`.cursorrules`, `CLAUDE.md`) vía symlinks o referencias.
- **Sección 17 (Normativa y cumplimiento):**
  - **17.1 ISO/IEC 25010:2023:** Tabla de 9 características con umbrales medibles, destacando Capacidad de interacción con foco en adultos mayores (WCAG 2.2 AA).
  - **17.2 ISO/IEC 27001:2022:** Propiedades CIA y mapeo de 11 controles técnicos del Anexo A aplicados a la base de datos y API de Atlas.
  - **17.3 ISO 9001:2015 / IEEE 730 / ISO/IEC/IEEE 29119:** Mapeo de cláusulas 4 a 10 de ISO 9001 y diseño de casos con técnica declarada.
  - **17.4 Cruce con normativa chilena:** Ley 21.719 (Protección de Datos Personales, RAT de clientes/usuarios/contratos, derechos ARCO, notificación de brechas), Ley 21.459 (Delitos informáticos y trazabilidad en tabla `auditoria`), y notas de no aplicación fundamentadas para Ley 21.180, NCG 519 CMF y Ley 21.643.
