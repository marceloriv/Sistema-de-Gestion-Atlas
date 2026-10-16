# AGENTS.md

`AGENTS.md` es un formato abierto: un Markdown en la raíz del repositorio que los agentes de código leen antes de actuar. Se formalizó como especificación abierta en agosto de 2025 (impulsada por OpenAI con Google, Cursor y Factory) y hoy la mantiene la Agentic AI Foundation, bajo la Linux Foundation. Lo leen de forma nativa Codex, Cursor, Copilot, Gemini CLI, Aider, Windsurf, Zed y otras herramientas — por eso conviene mantener **un** archivo y symlinkear los formatos propietarios hacia él (16), en vez de sostener copias que divergen.

La especificación no impone secciones: define el lugar y la regla de precedencia (14). Todo lo que sigue es la convención de este equipo, no el estándar.

**Para el agente que trabaje con esta plantilla:**

Plantilla adaptable. Al adaptarla a un proyecto real, sigue estas reglas — no borres por iniciativa propia solo porque algo "no se usa todavía":

- Placeholders `[texto]`: resolver con el dato real. Si de verdad no aplica, reemplazar por una nota corta `(no aplica: <razón>)` — nunca borrar la línea sin dejar rastro de que se consideró.
- Secciones marcadas **(opcional)**: omitir completas solo si no aplican en absoluto al proyecto — dejando esa misma nota corta de por qué, no un vacío total.
- Detalle DENTRO de una sección que sí aplica (subsecciones, tablas, listas de reglas como las de la 11, checklist OWASP completo, diagrama de ramas): conservar íntegro por defecto, aunque el proyecto hoy no use toda su extensión. No resumir ni podar por iniciativa propia — este contenido ya pasó por research (specs y fuentes citadas) y condensarlo sin pedido explícito pierde ese trabajo sin dejar registro. Recortar solo si el usuario lo pide para ese proyecto puntual.
- Comentarios entre paréntesis que son guía-de-relleno (dicen qué hacer con la sección, ej. "fijar versiones exactas") se resuelven y desaparecen al aplicar la decisión. Comentarios que explican el PORQUÉ de una regla (ej. por qué existe `support/*`, por qué `--no-ff`) no son ruido a limpiar — son contenido, se conservan igual que el resto del detalle.
- Ante la duda entre conservar o borrar: conservar, y marcar `(sin uso actual en este proyecto)` en vez de eliminar. El minimalismo de la sección 6 (Ponytail) rige código nuevo a escribir, no autoriza podar documentación de referencia ya redactada.
- Sin emojis en código, PR, docs generadas ni output — usar solo como último recurso si no existe alternativa real, nunca como decoración por defecto. En commits rige lo que diga la sección 11: si el proyecto no define un esquema de emoji, mismo default (sin emoji); si define Gitmoji (sección 11.2), ahí el emoji es obligatorio por convención, no "último recurso".
- Nada de solución genérica de tutorial. Cada decisión de diseño/implementación responde al proyecto real (sección 1-2) y a lo que pidió el usuario — no copiar el boilerplate default de un framework ni reciclar un patrón sin pensar el caso de uso concreto.

## 0. Jerarquía de reglas

Cuando dos reglas de este archivo entran en conflicto, se resuelven en este orden:

1. Seguridad y corrección — nunca se sacrifican por ninguna otra regla.
2. Convenciones del proyecto (stack, estilo, arquitectura) — se siguen salvo instrucción explícita en contrario.
3. Minimalismo (sección 6, disciplina Ponytail) — se aplica solo después de satisfacer 1 y 2.

## 1. Resumen del proyecto

Sistema de Gestión Atlas es una plataforma web empresarial desarrollada para la asignatura ISY1102 - Calidad y seguridad en el desarrollo de software (Caso A). Centraliza la gestión de clientes (personas naturales y empresas), contratos con almacenamiento y descarga de documentos asociados (archivos PDF), administración de usuarios y roles internos (administrador, editor), registro inmutable de auditoría para operaciones críticas y un dashboard de métricas empresariales.

El software cuenta con soporte multi-tenant donde la información de clientes, usuarios y contratos está estrictamente particionada por empresa (`empresa_id`). La interfaz está diseñada para ser completamente accesible y operable desde desktop, tablets y dispositivos móviles, con **especial atención y prioridad a la usabilidad para adultos mayores** (cumplimiento de estándares de accesibilidad WCAG 2.2 AA, tipografías legibles con tamaño mínimo adecuado, áreas táctiles amplias y retroalimentación visual clara).

**Contexto académico y estado de seguridad inicial:** La API backend fue construida originalmente con vulnerabilidades deliberadas con fines didácticos (contraseñas en texto plano sin hash en base de datos, consultas susceptibles a inyección, latencias artificiales de 4 segundos con `delay(4000)`, endpoints expuestos y secretos predeterminados). La misión operativa de este repositorio y de los agentes que intervengan en él es auditar, remediar y asegurar el software de manera progresiva mediante análisis estático (SonarQube) y dinámico, aplicando estrictamente las directrices OWASP Top 10 y normativas ISO/IEC 25010 e ISO/IEC 27001.

## 2. Stack técnico

- **Arquitectura:** Monorepo multi-módulo cliente-servidor con backend RESTful, frontend SPA, base de datos relacional y servicios de análisis de código contenerizados.
- **Backend:**
  - Runtime: Node.js 18+ (CommonJS)
  - Framework web: Express 4.19.2
  - Base de datos: PostgreSQL 15 (cliente `pg` 8.12.0)
  - Autenticación: Tokens JWT (`jsonwebtoken` 9.0.2)
  - Carga de archivos: Multer 1.4.5-lts.1 (gestión de contratos en tabla `documentos_contrato` y carpeta `uploads/contracts`)
  - Documentación interactiva de API: Swagger UI Express 5.0.1 con OpenAPI 3.0 (`BACKEND/src/openapi.json` servido en `/docs`)
  - Utilidades y desarrollo: CORS 2.8.5, Morgan 1.10.0, Dotenv 16.4.5, Nodemon 3.1.0
- **Frontend:**
  - Framework: React 19.1.1 (ES Modules, JSX)
  - Empaquetador / Servidor de desarrollo: Vite 7.1.7 (`@vitejs/plugin-react` 5.0.4)
  - Biblioteca de componentes UI: Material UI v7.3.4 (`@mui/material`, `@mui/icons-material`, `@mui/x-charts`)
  - Motor de estilos y utilidades: Emotion (`@emotion/react` 11.14, `@emotion/styled` 11.14) + Tailwind CSS 3.4.14 con PostCSS 8.4
  - Tablas avanzadas: Material React Table 3.2.1
  - Gestión de formularios: React Hook Form 7.65.0
  - Enrutamiento: React Router 7.9.5 (`react-router-dom`)
  - Cliente HTTP: Axios 1.13.1 con interceptores para token Bearer y manejo unificado de errores
  - Notificaciones / Toasts: Sonner 1.7.1
  - Linter: ESLint 9.36.0 (configuración plana `eslint.config.js`)
- **Infraestructura y Contenedores:**
  - Orquestación: Docker Compose v2 (`docker-compose.yml`) en red interna aislada `atlas-network`
  - Contenedor Base de Datos: `atlas-postgres` (PostgreSQL 15-alpine en puerto expuesto 15432, interno 5432)
  - Contenedor Backend: `atlas-backend` (Node.js API en puerto expuesto 4450, interno 4000)
  - Contenedor Frontend: `atlas-frontend` (Nginx reverse proxy y bundle compilado en puerto expuesto 3350, interno 80)
  - Contenedores SonarQube (perfil `tools`): `atlas-sonarqube-db` (Postgres 15-alpine), `atlas-sonarqube` (SonarQube Community Edition en puerto 9000), `atlas-scanner` (SonarSource CLI)
- **Gestor de paquetes:** npm (coordinado en raíz y submódulos independientes `BACKEND` y `FRONTEND`)

## 3. Estructura del proyecto

```text
.
├── BACKEND/                      # Submódulo de API REST en Node.js / Express
│   ├── sql/                      # Scripts DDL de base de datos
│   │   ├── init.sql              # Definición de tablas relacionales y roles base
│   │   ├── dump-atlas.sql        # Volcado de datos para inicialización
│   │   └── init-db.sh            # Script de inicialización automatizada en Docker
│   ├── src/
│   │   ├── routes/               # Enrutadores modulares Express por entidad
│   │   │   ├── auth.js           # Login y generación de token JWT
│   │   │   ├── users.js          # CRUD de usuarios y contraseñas
│   │   │   ├── clients.js        # CRUD y búsqueda de clientes por empresa
│   │   │   ├── contracts.js      # Subida de PDFs, estados y métricas de contratos
│   │   │   ├── audit.js          # Registro y consulta de auditoría
│   │   │   ├── empresas.js       # Registro de empresa y usuario administrador
│   │   │   ├── roles.js          # Gestión de roles del sistema
│   │   │   ├── empresa_usuarios.js # Asociación usuario-empresa-rol
│   │   │   └── metricas.js       # Métricas consolidadas
│   │   ├── app.js                # Entrada y configuración de Express y Swagger
│   │   ├── db.js                 # Pool de conexiones PostgreSQL (pg.Pool)
│   │   └── openapi.json          # Especificación OpenAPI 3.0 para Swagger UI
│   ├── tests/                    # Pruebas de integración de endpoints (crear aquí)
│   ├── uploads/contracts/        # Almacenamiento local de archivos PDF
│   ├── Dockerfile                # Imagen Docker de Backend Node.js
│   ├── package.json              # Dependencias y scripts de backend
│   └── sonar-project.properties  # Configuración SonarQube submódulo backend
├── FRONTEND/                     # Submódulo cliente SPA en React 19 + Vite
│   ├── public/                   # Activos estáticos públicos
│   ├── src/
│   │   ├── assets/               # Imágenes y logotipos SVG
│   │   ├── components/           # Componentes UI reutilizables (Layout, RoleGuard)
│   │   ├── context/              # Contexto de autenticación (AuthContext.jsx)
│   │   ├── hooks/                # Custom hooks (useAuth.js)
│   │   ├── lib/                  # Cliente Axios centralizado (api.jsx) con toasts
│   │   ├── pages/                # Vistas y formularios del sistema
│   │   │   ├── auth/             # Login y Register
│   │   │   ├── usuarios/         # Lista y formulario de usuarios
│   │   │   ├── clientes/         # Listado, pestañas y creación de clientes
│   │   │   ├── contratos/        # Listado, pestañas y subida de contratos
│   │   │   ├── empresas/         # Formulario de configuración de empresa
│   │   │   ├── auditoria/        # Visualización de bitácora de auditoría
│   │   │   └── Home.jsx          # Dashboard principal con métricas y accesos
│   │   ├── tests/                # Pruebas unitarias de componentes (crear aquí)
│   │   ├── App.jsx               # Definición de rutas públicas y protegidas
│   │   ├── theme.js              # Tema Material UI (paleta #1B7576, tipografía Poppins)
│   │   ├── index.css             # Directivas de Tailwind CSS y tipografía base
│   │   └── main.jsx              # Punto de entrada de React DOM
│   ├── Dockerfile                # Build multi-stage con Nginx
│   ├── nginx.conf                # Configuración de Nginx para producción
│   ├── package.json              # Dependencias y scripts de frontend
│   ├── tailwind.config.js        # Configuración de Tailwind CSS
│   ├── vite.config.js            # Configuración del bundler Vite
│   └── sonar-project.properties  # Configuración SonarQube submódulo frontend
├── docker-compose.yml            # Orquestación de contenedores (app + db + sonarqube)
├── package.json                  # Scripts orquestadores del monorepo
├── sonar-project.properties      # Configuración raíz multi-módulo para SonarQube
├── start-sonar.ps1               # Script PowerShell para iniciar SonarQube
├── run-sonar-scanner.ps1         # Script PowerShell para ejecutar análisis
├── stop-sonar.ps1                # Script PowerShell para detener SonarQube
├── .env.example                  # Plantilla de variables de entorno (puertos, JWT, sonar)
├── scripts/                      # Scripts de utilidad y validación del repositorio
│   └── validate-agents.js        # Validador automatizado de AGENTS.md
└── AGENTS.md                     # Fuente de verdad de reglas operativas para agentes
```

Las pruebas de integración y API van estrictamente en `BACKEND/tests/`. Las pruebas unitarias de componentes y hooks van estrictamente en `FRONTEND/src/tests/`. Nunca crear carpetas de test dispersas fuera de estas ubicaciones.

## 4. Comandos

```bash
# Instalar dependencias en todo el proyecto (raíz, backend y frontend)
npm run install

# Levantar entorno completo de aplicación en Docker (PostgreSQL, Backend y Frontend)
docker compose up -d

# Detener entorno completo de aplicación en Docker
docker compose down

# Ejecutar Backend en modo desarrollo local (puerto 4000 o el definido en .env)
cd BACKEND && npm run dev

# Ejecutar Frontend en modo desarrollo local (Vite en puerto 5173 o 3350)
cd FRONTEND && npm run dev

# Compilar bundle de producción del Frontend
cd FRONTEND && npm run build

# Validar linter en el Frontend
cd FRONTEND && npm run lint

# Iniciar SonarQube local (disponible en http://localhost:9000 tras 1-2 minutos)
npm run sonar:up
# Alternativa PowerShell: .\start-sonar.ps1

# Ejecutar análisis estático multi-módulo en SonarQube (requiere SONAR_TOKEN en .env)
npm run sonar:scan
# Alternativa PowerShell: .\run-sonar-scanner.ps1

# Detener SonarQube conservando volúmenes de base de datos
npm run sonar:down
# Alternativa PowerShell: .\stop-sonar.ps1

# Validar cumplimiento del estándar AGENTS.md
npm run validate:agents
```

Todo comando debe ser copiable y ejecutable tal cual — nada de instrucciones vagas.

## 5. Estilo de código

### 5.1 Frontend (React 19, Material UI v7, Tailwind CSS)
Regla: Componentes funcionales en React 19 (JSX) con Hooks. Estructura visual basada en Material UI v7 consumiendo el tema corporativo definido en `FRONTEND/src/theme.js` (color primario `#1B7576`, secundario `#4BBC7F`, tipografía `Poppins`). Utilidades de espaciado y layout con Tailwind CSS. Formularios gestionados mediante React Hook Form (`useForm`). Peticiones HTTP centralizadas mediante la instancia `api` de `FRONTEND/src/lib/api.jsx` con interceptor para tokens Bearer y retroalimentación al usuario mediante Sonner (`toast.error`, `toast.success`).

**Especial atención a usabilidad para adultos mayores:** Botones y elementos cliqueables con área táctil mínima de 44x44 px, textos en tamaño legible ($\ge 14\text{ px}$ / 1rem), alto contraste cromático ($\ge 4.5:1$) y textos descriptivos en botones y mensajes de error comprensibles sin tecnicismos.

```jsx
import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography, Card, CardContent } from "@mui/material";
import { toast } from "sonner";
import { api } from "../../lib/api";

export const ClienteRapidoForm = ({ onClienteCreado }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/clientes", data);
      toast.success("Cliente registrado exitosamente");
      reset();
      if (onClienteCreado) onClienteCreado(response.data);
    } catch (err) {
      // El interceptor de api.jsx ya muestra toast de error con { error, glosa }
      console.error("Fallo al guardar cliente", err);
    }
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 1 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" component="h2" gutterBottom color="primary">
          Nuevo Cliente
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Nombre o Razón Social"
            variant="outlined"
            margin="normal"
            {...register("nombre", { required: "El nombre es obligatorio" })}
            error={Boolean(errors.nombre)}
            helperText={errors.nombre?.message}
            inputProps={{ style: { fontSize: 15 } }}
          />
          <TextField
            fullWidth
            label="Correo Electrónico"
            type="email"
            variant="outlined"
            margin="normal"
            {...register("correo", { required: "El correo es obligatorio" })}
            error={Boolean(errors.correo)}
            helperText={errors.correo?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            sx={{ mt: 3, py: 1.5, px: 3, fontSize: "1rem", minHeight: "44px" }}
          >
            {isSubmitting ? "Guardando..." : "Guardar Cliente"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
```

### 5.2 Backend (Node.js, Express, PostgreSQL)
Regla: Controladores modulares por router en `BACKEND/src/routes/`. Extracción obligatoria de usuario autenticado y `empresaId` desde la cabecera `Authorization: Bearer <token>` mediante `jwt.verify`. Toda consulta a PostgreSQL (`pool.query`) debe ser estrictamente parametrizada con marcadores `$1, $2, ...` para erradicar cualquier vector de SQL Injection. Registro de acciones sensibles en la tabla `auditoria`. Formato de error estandarizado obligatorio: `{ error: "mensaje resumen", glosa: "detalle comprensible" }`.

```javascript
const express = require("express");
const jwt = require("jsonwebtoken");
const { pool } = require("../db");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "desarrollo_inseguro";

function getUserFromAuthHeader(req) {
  const auth = req.headers.authorization || "";
  if (!auth.startsWith("Bearer ")) return null;
  try {
    return jwt.verify(auth.substring(7), JWT_SECRET);
  } catch {
    return null;
  }
}

// Ejemplo: Consulta segura parametrizada con aislamiento multi-tenant por empresaId
router.get("/:id", async (req, res) => {
  try {
    const authUser = getUserFromAuthHeader(req);
    if (!authUser || !authUser.empresaId) {
      return res.status(401).json({
        error: "No autorizado",
        glosa: "Debe iniciar sesión para acceder a este recurso"
      });
    }

    const { rows } = await pool.query(
      "SELECT id, nombre, correo, telefono, rut FROM clientes WHERE id = $1 AND empresa_id = $2",
      [req.params.id, authUser.empresaId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Cliente no encontrado",
        glosa: "El cliente solicitado no existe o pertenece a otra empresa"
      });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error en consulta de cliente:", err);
    res.status(500).json({
      error: "Error interno del servidor",
      glosa: err.message || "No se pudo recuperar la información del cliente"
    });
  }
});

module.exports = router;
```

## 6. Disciplina anti-sobreingeniería (Ponytail)

(Si el agente ya trae esta disciplina por configuración global del usuario, esta sección es redundante — eliminarla evita que las dos copias diverjan con el tiempo.)

Escalera de decisión antes de escribir código nuevo:

1. ¿Es necesario construir esto? (YAGNI)
2. ¿La librería estándar ya lo resuelve? Úsala.
3. ¿Una función nativa de la plataforma lo cubre? Úsala.
4. ¿Una dependencia ya instalada lo resuelve? Úsala.
5. ¿Se puede resolver en una línea? Hazlo en una línea.
6. Solo entonces: escribe el mínimo código funcional.

No aplicar pereza en: comprensión completa del problema, validación de inputs en fronteras de confianza, manejo de errores que previene pérdida de datos, seguridad (remediación de contraseñas y consultas SQL), accesibilidad para adultos mayores, y cualquier cosa explícitamente solicitada.

Toda lógica no trivial deja una verificación ejecutable mínima (assert o test pequeño) — salvo que la sección 7 exija más: ese umbral es convención de proyecto (jerarquía 0, nivel 2) y prevalece sobre este mínimo.

Niveles: lite / full (defecto) / ultra.
