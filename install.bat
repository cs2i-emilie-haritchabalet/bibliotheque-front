@echo off
REM Installation script for Bibliotheque Frontend (Windows)

setlocal enabledelayedexpansion

echo.
echo 🚀 Installation de Bibliothèque Frontend
echo ========================================
echo.

REM Vérifier les prérequis
echo 📋 Vérification des prérequis...

where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js n'est pas installé
    exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
    echo ❌ npm n'est pas installé
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js version: %NODE_VERSION%
echo ✅ npm version: %NPM_VERSION%

REM Installer les dépendances
echo.
echo 📦 Installation des dépendances...
call npm install

REM Installer les navigateurs Playwright
echo.
echo 🎭 Installation des navigateurs Playwright...
call npx playwright install

REM Construire l'application
echo.
echo 🔨 Construction de l'application...
call npm run build

REM Exécuter les tests
echo.
echo 🧪 Exécution des tests unitaires...
call npm test -- --watch=false --code-coverage

echo.
echo ✅ Installation terminée avec succès!
echo.
echo 📝 Prochaines étapes:
echo    1. Démarrer le serveur de développement: npm start
echo    2. Exécuter les tests E2E: npm run e2e
echo    3. Consulter la documentation: cat README-SETUP.md
echo.
