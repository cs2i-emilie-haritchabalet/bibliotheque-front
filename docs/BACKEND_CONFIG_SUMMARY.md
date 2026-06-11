# Résumé de la Configuration - Chemin Backend

## Configuration du Backend

### Chemin configuré

**Fichier: `.env`**
```ini
BACKEND_PATH=C:/Users/Emili/OneDrive/Bureau/CDA/JAVA/TP/bibliotheque
```

**Format**: Windows avec slashes `/` (pas de backslashes `\`)

---

## Utilisation

### Option 1: Script automatisé (Recommandé)

```bash
# Windows (PowerShell)
.\setup-backend.ps1

# Mac/Linux
./setup-backend.sh
```

Le script demande le chemin et crée automatiquement `.env`.

### Option 2: Via npm (Alternative)

```bash
npm run setup:backend
```

Lance le script setup-backend.js (qui s'adapte à votre système).

### Option 3: Manuel

```bash
# 1. Copier le template
cp .env.example .env

# 2. Éditer .env et adapter BACKEND_PATH
notepad .env

# 3. Vérifier
cat .env | grep BACKEND_PATH
```

---

## Flux de fonctionnement

```
1. Utilisateur exécute: npm run setup
   ↓
2. setup.js vérifie si .env existe
   ↓
3. Si absent → propose: npm run setup:backend
   ↓
4. Script crée .env avec BACKEND_PATH
   ↓
5. npm install installe les dépendances
   ↓
6. npm run docker:up lance docker-compose
   ↓
7. docker-compose lit les variables de .env
   ↓
8. Backend build depuis C:/Users/Emili/OneDrive/Bureau/CDA/JAVA/TP/bibliotheque
   ↓
9. Application démarre!
```

---

## Checklist pour les contributeurs

### Pour la première fois

- [ ] `git clone` le repo
- [ ] `cd bibliotheque-front-angular/bibliotheque-front-angular`
- [ ] `npm run setup` (exécute setup:backend si besoin + npm install + docker:up)
- [ ] Attendre 2-5 minutes
- [ ] Accéder à http://localhost:4200

### Important à savoir

- **Committer**: `.env.example`, `docker-compose.yml`, `package.json`, `scripts/setup.js`, `setup-backend.*`
- **NE PAS committer**: `.env` (personnel à chaque machine)

### Si quelqu'un ajoute une variable

```bash
# Ajouter la nouvelle variable dans .env.example
vim .env.example

# Git add/commit
git add .env.example
git commit -m "docs: add new env variable"

# Les autres devront l'ajouter dans leur .env
```

---

## Comment ça marche?

### Variables d'environnement

**`.env` (local)**
```ini
BACKEND_PATH=C:/Users/Emili/OneDrive/Bureau/CDA/JAVA/TP/bibliotheque
FRONTEND_PORT=4200
BACKEND_PORT=8080
```

**`docker-compose.yml` (utilise les variables)**
```yaml
backend:
  build:
    context: ${BACKEND_PATH:-./../bibliotheque-back-java}  # Lit depuis .env
  ports:
    - "${BACKEND_PORT:-8080}:8080"  # Utilise la variable

frontend:
  ports:
    - "${FRONTEND_PORT:-4200}:4200"  # Valeur par défaut: 4200
```

**Résultat:** Chaque machine peut avoir sa propre configuration sans modifier les fichiers Git!

---

## Cas d'usage avancés

### Changer les ports

Éditer `.env`:
```ini
FRONTEND_PORT=3000
BACKEND_PORT=9000
POSTGRES_PORT=6432
```

```bash
npm run docker:restart
```

### Utiliser un backend ailleurs

Éditer `.env`:
```ini
BACKEND_PATH=/path/to/different/backend
```

```bash
npm run docker:restart
```

### Multiple instances

Créer plusieurs `.env.*`:
```bash
.env.dev      # Pour développement
.env.test     # Pour tests
.env.prod     # Pour production
```

Lancer avec le bon:
```bash
docker-compose --env-file .env.dev up -d
```

---

## Troubleshooting

### "BACKEND_PATH not found"

```bash
# Vérifier le chemin
cat .env | grep BACKEND_PATH

# Tester le chemin
ls "C:/Users/Emili/OneDrive/Bureau/CDA/JAVA/TP/bibliotheque/Dockerfile"

# Si absent, adapter dans .env
```

### "build context ... not found"

Docker n'a pas pu trouver le chemin. Format problème?

```bash
# MAUVAIS - Backslashes
BACKEND_PATH=C:\Users\Emili\OneDrive\...

# BON - Slashes
BACKEND_PATH=C:/Users/Emili/OneDrive/...
```

---

## Documentation associée

- [SETUP.md](SETUP.md) - Guide installation complète
- [HELP.md](HELP.md) - Aide rapide
- [../README.md](../README.md) - Vue d'ensemble et démarrage

---

## Résumé une ligne

**Exécutez `npm run setup` et tout fonctionne automatiquement!**

---

Version: 1.0  
Date: 2025-01-15  
Status: Configuration dynamique complète
