# Bienvenido/a

Este proyecto fue desarrollado para la asignatura ISY1102 - Calidad y seguridad en el desarrollo de software. En este repositorio se incluye un Frontend y Backend asociados al Caso A de la asignatura llamado "Sistema de Gestión Atlas".

Este software permitirá a usuarios registrados (por empresas) gestionar clientes, contratos y documentos asociados, administrar usuarios y roles internos de la empresa, auditar acciones, y garantizar cumplimiento de normativa de protección de datos y estándares de seguridad. Debe ser accesible desde desktop, tablets y móviles, con especial atención a la usabilidad para adultos mayores.

Este proyecto está pensando para ser utilizado de las siguientes maneras:
- Podrás inicializar el backend y frontend por separado y según tu lo requieras
- Podrás efectuar análisis de código estático para frontend y backend.
- Podrás efectuar análisis de código dinámico al levantar ambos servicios.
- Utilizar docker en lugar de levantar manualmente cada servicio ya que se incluye una imagen para el proyecto completo que inicializa y configura cada elemento del software construido.

## Estructura

Abre el proyecto mediante terminal o editor de código de preferencia (Visual Studio Code). El software tiene la siguiente estructura de carpetas y archivos:

```text
root
	|/BACKEND
	|/FRONTEND
	|/scripts
	|AGENTS.md
	|.env
	|.env.example
	|.gitignore
	|docker-compose.yml
	|package.json
	|sonar-project.properties
	|start-sonar.ps1
	|run-sonar-scanner.ps1
	|stop-sonar.ps1
	|README.md
```

En el archivo `.env` se definen las variables de entorno que utilizará docker al momento de crear las imágenes, por lo que puedes modificarlas en el caso de tener otros servicios corriendo en tu equipo que utilicen los mismos puertos.

1. `JWT_SECRET`: `0d1d8132f0fde5beabb417b434ff10f1cae8635a461686b0f46ac9c2bbfbd0e8` Llave utilizada para cifrar y generar los tokens de sesión.
2. `PORT_POSTGRES`: `15432` Puerto expuesto que utilizará tu equipo para acceder a la base de datos PostgreSQL.
3. `PORT_BACKEND`: `4450` Puerto expuesto que utilizará tu equipo para acceder a la API REST.
4. `PORT_FRONTEND`: `3350` Puerto expuesto que utilizará tu equipo para acceder al cliente web (SPA).
5. `COMPOSE_PROJECT_NAME`: `atlas` Nombre del proyecto en Docker Compose.
6. Variables de SonarQube: `SONAR_DB_USER`, `SONAR_DB_PASSWORD`, `SONAR_DB_NAME`, `SONAR_TOKEN`.

---

## Despliegue y Ejecución

Dispones de dos caminos para levantar la aplicación y ejecutar el análisis estático de código con SonarQube:

1. **Camino 1: Docker Compose directo (Multiplataforma - Linux, macOS, Windows)**
2. **Camino 2: Scripts PowerShell (Windows)**

---

### Camino 1: Docker Compose directo

Este flujo utiliza directamente la CLI estándar de Docker Compose y el perfil `tools` configurado en `docker-compose.yml`.

#### 1. Preparar variables de entorno
Asegúrate de contar con el archivo `.env` en la raíz del repositorio (puedes crearlo a partir de `.env.example`):
```bash
cp .env.example .env
```

#### 2. Levantar la aplicación completa
Inicia los servicios base del sistema (PostgreSQL, Backend Express y Frontend React/Nginx):
```bash
docker compose up -d
```

**Servicios y accesos disponibles:**
- **Frontend SPA:** `http://localhost:3350` (o el puerto configurado en `PORT_FRONTEND`)
- **Backend API REST:** `http://localhost:4450` (o el puerto configurado en `PORT_BACKEND`)
- **Documentación OpenAPI / Swagger:** `http://localhost:4450/docs`
- **Base de datos PostgreSQL:** `localhost:15432` (Base de datos: `atlas`, Usuario: `postgres`, Contraseña: `postgres`)

#### 3. Iniciar SonarQube
Inicia SonarQube y su base de datos desacoplada utilizando el perfil `tools`. La opción `--wait` garantiza que la terminal espere a que el servicio complete su arranque y esté listo para recibir peticiones:
```bash
docker compose --profile tools up -d --wait sonarqube
```
El panel de SonarQube estará disponible en: **`http://localhost:9000`** (toma aproximadamente 1 a 2 minutos en inicializar).

#### 4. Generar y configurar el Token de SonarQube
1. Ingresa a `http://localhost:9000` con las credenciales por defecto:
   - **Usuario:** `admin`
   - **Contraseña:** `admin`
2. Cambia la contraseña cuando el sistema lo solicite.
3. Ve a tu perfil (**My Account** en la esquina superior derecha) -> pestaña **Security** -> sección **Generate Tokens**.
4. Asigna un nombre al token (ej: `atlas-token`), selecciónalo como tipo `User Token` y presiona **Generate**.
5. Copia el token generado y pégalo en el archivo `.env` en la raíz del proyecto:
   ```properties
   SONAR_TOKEN=squ_tu_token_aqui
   ```

#### 5. Ejecutar el análisis estático de código
Una vez configurado el `SONAR_TOKEN`, ejecuta el análisis multi-módulo (analiza tanto `BACKEND` como `FRONTEND` de acuerdo con `sonar-project.properties`). El parámetro `-u 0:0` ejecuta el contenedor como superusuario para evitar problemas de permisos en la creación de directorios de caché (`.scannerwork`):
```bash
docker compose --profile tools run --rm -u 0:0 sonar-scanner
```

#### 6. Consultar los resultados
Vuelve a `http://localhost:9000` para revisar:
- El proyecto global **Sistema de Gestión Atlas** (`atlas`).
- Los submódulos analizados: **Atlas - Backend** (`atlas_backend`) y **Atlas - Frontend** (`atlas_frontend`).
- Métricas de calidad, code smells, deuda técnica, cobertura y cumplimiento de seguridad (OWASP Top 10).

#### 7. Detener los servicios
- **Detener solo SonarQube (conservando el historial y datos en volúmenes):**
  ```bash
  docker compose --profile tools stop sonarqube sonarqube-db
  ```
- **Detener la aplicación completa:**
  ```bash
  docker compose down
  ```

---

### Camino 2: Scripts PowerShell (`.ps1`)

Para entornos Windows, se incluyen scripts automatizados que simplifican el flujo de comandos:

#### 1. Preparar variables de entorno
Crea el archivo `.env` a partir de `.env.example`:
```powershell
Copy-Item .env.example .env
```

#### 2. Levantar la aplicación completa
Inicia los servicios base de PostgreSQL, Backend y Frontend:
```powershell
docker compose up -d
```

#### 3. Iniciar SonarQube
Ejecuta el script de arranque, el cual valida la existencia de `.env`, inicia el contenedor con `--wait` y notifica cuando el servicio está saludable:
```powershell
.\start-sonar.ps1
```
Una vez terminado el script, accede a `http://localhost:9000`.

#### 4. Generar y configurar el Token de SonarQube
1. Inicia sesión en `http://localhost:9000` con `admin` / `admin`.
2. Actualiza tu contraseña.
3. Ve a **My Account** -> **Security** -> **Generate Tokens**.
4. Copia el token generado y agrégalo en tu archivo `.env`:
   ```properties
   SONAR_TOKEN=squ_tu_token_aqui
   ```

#### 5. Ejecutar el análisis estático
Ejecuta el script de escaneo multi-módulo:
```powershell
.\run-sonar-scanner.ps1
```
El reporte se compilará y transmitirá automáticamente a SonarQube.

#### 6. Consultar resultados
Ingresa a `http://localhost:9000` para revisar métricas, vulnerabilidades y estado del Quality Gate.

#### 7. Detener SonarQube
Para detener los contenedores de SonarQube preservando los datos:
```powershell
.\stop-sonar.ps1
```
Para detener todos los servicios de la aplicación:
```powershell
docker compose down
```