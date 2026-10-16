# Bienvenido/a

Este proyecto fue desarrollado para la asignatura ISY1102 - Calidad y seguridad en el desarrollo de software. En este repositorio se incluye un Frontend y Backend asociados al Caso A de la asignatura llamado "Sistema de Gestión Atlas".

Este software permitirá a usuarios registrados (por empresas) gestionar clientes, contratos y documentos asociados, administrar usuarios y roles internos de la empresa, auditar acciones, y garantizar cumplimiento de normativa de protección de datos y estándares de seguridad. Debe ser accesible desde desktop, tablets y móviles, con especial atención a la usabilidad para adultos mayores.

Este proyecto está pensando para ser utilizado de las siguientes maneras:
 - Podrás inicializar el backend y frontend por separado y según tu lo requieras
 - Podrás efectuar análisis de código estático para frontend y backend.
 - Podrás efectuar análisis de código dinámico al levantar ambos servicios.
 - Utilizar docker en lugar de levantar manualmente cada servicio ya que se incluye una imagen para el proyecto completo que inicializa y configura cada elemento del software construido.
 

## Estructura

Abre el proyecto mediante terminal o editor de código de preferencia Visual Studio Code. El software tiene la siguiente estructura de carpetas y archivos
 
```
root
	|/BACKEND
	|/FRONTEND
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

1. JWT_SECRET: `0d1d8132f0fde5beabb417b434ff10f1cae8635a461686b0f46ac9c2bbfbd0e8` Llave utilizada para cifrar y generar los tokens de sesión
2. PORT_POSTGRES: `15432` Puerto expuesto que utilizará tu equipo para permitir acceder a la conexión a la base de datos
3. PORT_BACKEND: `4450` Puerto expuesto que utilizará tu equipo para acceder a la API
4. PORT_FRONTEND: `3350` Puerto expuesto que utilizará tu equipo para acceder al cliente - frontend
5. COMPOSE_PROJECT_NAME: `atlas` Nombre del proyecto en Docker Compose
6. Variables de SonarQube: `SONAR_DB_USER`, `SONAR_DB_PASSWORD`, `SONAR_DB_NAME`, `SONAR_TOKEN`

## Inicialización con Docker
Abre la terminal y situate en la raíz del proyecto y ejecuta el comando:

1. Ejecuta `docker compose up -d` para levantar todos los servicios de la aplicación
2. El frontend estará disponible en `http://localhost:3350` (o el puerto configurado en .env)
3. El backend estará disponible en `http://localhost:4450` (o el puerto configurado en .env)
4. La base de datos estará disponible para conectarse mediante:
	4.1 Host: `localhost`
	4.2 Port: `15432 `(o el configurado en .env)
	4.3 Database: `atlas`
	4.4 Nombre de usuario: `postgres`
	4.5 Contraseña: `postgres`

## Análisis Estático de Código con SonarQube

SonarQube está integrado usando el perfil Docker Compose `tools`, desacoplado del flujo regular de desarrollo para no consumir recursos innecesarios.

### 1. Iniciar SonarQube
Puedes iniciarlo con cualquiera de estas opciones:
- **PowerShell:** `.\start-sonar.ps1`
- **npm:** `npm run sonar:up`
- **Docker Compose directo:** `docker compose --profile tools up -d --wait sonarqube`

El panel de SonarQube estará disponible en: **http://localhost:9000** (demora ~1-2 minutos en iniciar completamente).

### 2. Generar Token de Autenticación
1. Ingresa a `http://localhost:9000` con credenciales por defecto:
   - Usuario: `admin`
   - Contraseña: `admin`
2. Cambia la contraseña cuando el sistema lo solicite.
3. Ve a tu perfil (**My Account** en la esquina superior derecha) -> **Security** -> **Generate Token**.
4. Copia el token generado y pégalo en el archivo `.env` en la variable:
   ```properties
   SONAR_TOKEN=squ_tu_token_aqui
   ```

### 3. Ejecutar el Análisis Estático
Una vez configurado el token, ejecuta el escaneo multi-módulo (analiza tanto `BACKEND` como `FRONTEND`):
- **PowerShell:** `.\run-sonar-scanner.ps1`
- **npm:** `npm run sonar:scan`
- **Docker Compose directo:** `docker compose --profile tools run --rm sonar-scanner`

### 4. Consultar Resultados
Vuelve a `http://localhost:9000` para revisar:
- El proyecto global **Sistema de Gestión Atlas** (`atlas`)
- Los submódulos analizados: **Atlas - Backend** (`atlas_backend`) y **Atlas - Frontend** (`atlas_frontend`)
- Métricas de calidad, code smells, vulnerabilidades de seguridad y complejidad cognitiva/ciclomática.

### 5. Detener SonarQube
Para detener los contenedores conservando el historial y la base de datos en los volúmenes de Docker:
- **PowerShell:** `.\stop-sonar.ps1`
- **npm:** `npm run sonar:down`
- **Docker Compose directo:** `docker compose --profile tools stop sonarqube sonarqube-db`