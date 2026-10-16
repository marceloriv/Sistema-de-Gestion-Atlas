<#
.SYNOPSIS
    Levanta SonarQube y su base de datos PostgreSQL para el proyecto Atlas.
.DESCRIPTION
    Utiliza el perfil `tools` de docker-compose.yml.
    Espera a que SonarQube complete su inicialización y healthcheck.
#>
$ErrorActionPreference = "Stop"

if (-not (Test-Path (Join-Path $PSScriptRoot ".env"))) {
    Write-Host "==> Falta .env en la raíz. Crearlo con: Copy-Item .env.example .env" -ForegroundColor Red
    exit 1
}

Write-Host "==> Levantando SonarQube (perfil tools)..." -ForegroundColor Cyan
docker compose --project-directory $PSScriptRoot --profile tools up -d --wait sonarqube

if ($LASTEXITCODE -ne 0) {
    Write-Host "==> Falló el arranque de SonarQube. Revisar logs con: docker compose logs sonarqube" -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "==> SonarQube levantado y saludable en http://localhost:9000" -ForegroundColor Green
Write-Host "==> Para ejecutar el análisis estático, corre: .\run-sonar-scanner.ps1 o npm run sonar:scan" -ForegroundColor Yellow
