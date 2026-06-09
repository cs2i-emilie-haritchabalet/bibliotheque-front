#!/bin/bash

# Installation script for Bibliotheque Frontend

set -e

echo "🚀 Installation de Bibliothèque Frontend"
echo "========================================"

# Vérifier les prérequis
echo ""
echo "📋 Vérification des prérequis..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Installer les dépendances
echo ""
echo "📦 Installation des dépendances..."
npm install

# Installer les navigateurs Playwright
echo ""
echo "🎭 Installation des navigateurs Playwright..."
npx playwright install

# Construire l'application
echo ""
echo "🔨 Construction de l'application..."
npm run build

# Exécuter les tests
echo ""
echo "🧪 Exécution des tests unitaires..."
npm test -- --watch=false --code-coverage

echo ""
echo "✅ Installation terminée avec succès!"
echo ""
echo "📝 Prochaines étapes:"
echo "   1. Démarrer le serveur de développement: npm start"
echo "   2. Exécuter les tests E2E: npm run e2e"
echo "   3. Consulter la documentation: cat README-SETUP.md"
