#!/bin/bash

# Script to setup database for testing

set -e

echo "🗄️  Setting up test database..."

# Attendre que PostgreSQL soit prêt
echo "Waiting for PostgreSQL to be ready..."
until PGPASSWORD=$POSTGRES_PASSWORD psql -h postgres -U postgres -c '\l' > /dev/null 2>&1; do
  sleep 1
done

echo "PostgreSQL is ready"

# Créer la base de données de test si elle n'existe pas
PGPASSWORD=$POSTGRES_PASSWORD psql -h postgres -U postgres -c "CREATE DATABASE bibliotheque_test;" || echo "Database already exists"

# (Optionnel) Importer un schema SQL
# PGPASSWORD=$POSTGRES_PASSWORD psql -h postgres -U postgres -d bibliotheque_test < /scripts/schema.sql

echo "Test database setup complete"
