# Changelog

Todas las modificaciones notables a este proyecto se documentan en este archivo según los principios de [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y siguen las directrices de [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/).

## [1.0.0] - 2026-10-17

### Agregado
- Inicialización del Sistema de Gestión Atlas (Frontend React 19, Backend Express, base de datos PostgreSQL y Docker Compose multi-módulo).
- Especificación completa de directrices agénticas en `AGENTS.md` para Codex, Cursor, Claude Code y Gemini CLI.
- Documentación detallada en `README.md` con dos flujos de ejecución: Docker Compose directo y scripts PowerShell `.ps1`.
- Configuración de análisis estático multi-módulo desacoplado en SonarQube con perfil `tools`.
- Arnés automatizado de validación (`scripts/validate-agents.js` y script `npm run validate:agents`).
- Reglas y gobernanza agéntica sincronizadas en `.cursorrules`, `CLAUDE.md` y `GEMINI.md`.

### Seguridad y Entorno Didáctico
- Declaración explícita del estado de software intencionalmente vulnerable de prueba académica para la asignatura ISY1102 (Caso A).
- Directiva vinculante de no-remediación para agentes de código: preservación de latencias didácticas y vulnerabilidades deliberadas para evaluación docente.
