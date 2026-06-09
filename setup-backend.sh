#!/bin/bash

# Script pour configurer automatiquement le chemin du backend

echo ""
echo "╔════════════════════════════════════════════════════╗"
echo "║      Configuration du chemin du Backend            ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

# Vérifier si .env existe déjà
if [ -f .env ]; then
    echo "✅ Le fichier .env existe déjà."
    echo ""
    echo "Affichage du chemin backend configuré:"
    grep "BACKEND_PATH=" .env | cut -d'=' -f2
    echo ""
    echo "Voulez-vous modifier le chemin? (y/n)"
    read -r response
    if [ "$response" != "y" ] && [ "$response" != "Y" ]; then
        echo "Configuration inchangée."
        exit 0
    fi
fi

echo ""
echo "Entrez le chemin ABSOLU du backend (format Windows avec slashes):"
echo "Exemple: C:/Users/Emili/OneDrive/Bureau/CDA/JAVA/TP/bibliotheque"
echo ""
read -r backend_path

# Vérifier que le chemin existe
# Convertir / en \ pour vérifier sous Windows
backend_path_check=${backend_path//\//\\}
if [ ! -f "$backend_path/Dockerfile" ]; then
    echo ""
    echo "⚠️  ATTENTION: Le fichier Dockerfile n'a pas été trouvé à:"
    echo "    $backend_path/Dockerfile"
    echo ""
    echo "Vérifiez le chemin et réessayez."
    exit 1
fi

# Créer ou mettre à jour le fichier .env
cat > .env << EOF
# Configuration de l'application Bibliothèque
# Auto-généré par setup-backend.sh

# Chemin du backend
BACKEND_PATH=$backend_path

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
EOF

echo ""
echo "✅ Configuration réussie!"
echo ""
echo "Chemin backend configuré:"
echo "   $backend_path"
echo ""
echo "Fichier .env créé avec succès."
echo ""
echo "Vous pouvez maintenant lancer:"
echo "   make setup"
echo ""
