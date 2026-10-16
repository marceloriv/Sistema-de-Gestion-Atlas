// scripts/validate-agents.js
const fs = require('fs');
const path = require('path');

const candidates = [
  path.join(__dirname, '..', 'AGENTS.md'),
  path.join(__dirname, '..', 'AGENTS.MD')
];

let agentsPath = null;
for (const p of candidates) {
  if (fs.existsSync(p)) {
    agentsPath = p;
    break;
  }
}

if (!agentsPath) {
  console.error("FAIL: No se encontró AGENTS.md ni AGENTS.MD en la raíz del repositorio.");
  process.exit(1);
}

const content = fs.readFileSync(agentsPath, 'utf8');
const errors = [];

// 1. Verificar tamaño mínimo razonable (> 5000 bytes)
if (content.length < 5000) {
  errors.push(`AGENTS.md está incompleto o vacío (${content.length} bytes; mínimo esperado 5000 bytes).`);
}

// 2. Verificar secciones principales y subsecciones obligatorias
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

// 3. Prohibición de residuos o plantillas ajenas
const forbiddenTerms = [
  'Espiralia',
  'pnpm exec vitest',
  'pnpm install',
  'pnpm build',
  'HashRouter'
];

forbiddenTerms.forEach(term => {
  if (content.includes(term)) {
    errors.push(`Término prohibido o residual encontrado: "${term}"`);
  }
});

// Comprobar que no haya trailers reales de autoría al final o inicio de líneas
if (/^\s*Co-Authored-By:/m.test(content)) {
  errors.push('Firma real de Co-Authored-By detectada en el documento.');
}

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

// 5. Verificación de completitud exhaustiva de ISO 25010 (9 características 2023)
const requiredIso25010 = [
  'Aptitud funcional',
  'Eficiencia de desempeño',
  'Compatibilidad',
  'Capacidad de interacción',
  'Fiabilidad',
  'Seguridad',
  'Mantenibilidad',
  'Flexibilidad',
  'Safety'
];
requiredIso25010.forEach(c => {
  if (!content.includes(c)) {
    errors.push(`Característica de ISO 25010 ausente: "${c}"`);
  }
});

// 6. Verificación de completitud exhaustiva de OWASP Top 10:2025
const requiredOwasp = [
  'A01 Control de acceso roto',
  'A02 Configuración insegura',
  'A03 Fallos de cadena de suministro',
  'A04 Fallos criptográficos',
  'A05 Inyección',
  'A06 Diseño inseguro',
  'A07 Fallos de autenticación',
  'A08 Fallos de integridad de software',
  'A09 Fallos de logging y alertado',
  'A10 Manejo indebido de condiciones excepcionales'
];
requiredOwasp.forEach(o => {
  if (!content.includes(o)) {
    errors.push(`Punto de OWASP Top 10 ausente: "${o}"`);
  }
});

// 7. Verificación de Controles ISO 27001 Anexo A
const requiredIso27001 = [
  'A.8.2 / A.8.3',
  'A.8.4',
  'A.8.5',
  'A.8.8',
  'A.8.9',
  'A.8.10 / A.8.11',
  'A.8.12',
  'A.8.13',
  'A.8.15 / A.8.16',
  'A.8.24',
  'A.8.25'
];
requiredIso27001.forEach(ctrl => {
  if (!content.includes(ctrl)) {
    errors.push(`Control del Anexo A de ISO 27001 ausente: "${ctrl}"`);
  }
});

// 8. Verificación de inclusión del alcance "agents" en la sección 11.1
if (!content.includes('`agents`')) {
  errors.push('El alcance `agents` no está listado en las reglas de Conventional Commits de la sección 11.1');
}

if (errors.length > 0) {
  console.error("FAIL: Se encontraron los siguientes errores en AGENTS.md:\n");
  errors.forEach(err => console.error(` - ${err}`));
  process.exit(1);
}

console.log("PASS: AGENTS.md cumple con todos los criterios de validación.");
process.exit(0);
