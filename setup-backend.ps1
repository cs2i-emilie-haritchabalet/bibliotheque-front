param(
    [string]$BackendPath = ""
)

# Script pour configurer automatiquement le chemin du backend (Windows)

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════╗"
Write-Host "║      Configuration du chemin du Backend            ║"
Write-Host "╚════════════════════════════════════════════════════╝"
Write-Host ""

$envFile = ".env"

# Vérifier si .env existe déjà
if (Test-Path $envFile) {
    Write-Host "✅ Le fichier .env existe déjà."
    Write-Host ""
    Write-Host "Affichage du chemin backend configuré:"
    (Get-Content $envFile | Select-String "BACKEND_PATH=").ToString().Split("=")[1]
    Write-Host ""
    $response = Read-Host "Voulez-vous modifier le chemin? (y/n)"
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Host "Configuration inchangée."
        exit 0
    }
}

if ([string]::IsNullOrEmpty($BackendPath)) {
    Write-Host ""
    Write-Host "Entrez le chemin ABSOLU du backend (format Windows avec slashes):"
    Write-Host "Exemple: C:/Users/Emili/OneDrive/Bureau/CDA/JAVA/TP/bibliotheque"
    Write-Host ""
    $BackendPath = Read-Host "Chemin du backend"
}

# Vérifier que le chemin existe et contient Dockerfile
$dockerfilePath = Join-Path $BackendPath "Dockerfile"
if (-not (Test-Path $dockerfilePath)) {
    Write-Host ""
    Write-Host "⚠️  ATTENTION: Le fichier Dockerfile n'a pas été trouvé à:"
    Write-Host "    $dockerfilePath"
    Write-Host ""
    Write-Host "Vérifiez le chemin et réessayez."
    exit 1
}

# Créer ou mettre à jour le fichier .env
$envContent = @"
# Configuration de l'application Bibliothèque
# Auto-généré par setup-backend.ps1

# Chemin du backend
BACKEND_PATH=$BackendPath

# Ports (modifier si vous avez des conflits)
FRONTEND_PORT=4200
BACKEND_PORT=8080
POSTGRES_PORT=5432
MAILPIT_PORT=8025

# Configuration PostgreSQL
POSTGRES_DB=bibliotheque
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# Profil Spring
SPRING_PROFILES_ACTIVE=docker
"@

Set-Content -Path $envFile -Value $envContent

Write-Host ""
Write-Host "✅ Configuration réussie!"
Write-Host ""
Write-Host "Chemin backend configuré:"
Write-Host "   $BackendPath"
Write-Host ""
Write-Host "Fichier .env créé avec succès."
Write-Host ""
Write-Host "Vous pouvez maintenant lancer:"
Write-Host "   make setup"
Write-Host ""
