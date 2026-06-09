# 🎯 First Time Setup - Démarrage complet

Vous venez de cloner le repo? Suivez ce guide (5 minutes).

## ⚡ Quick Start (Recommandé)

### 1️⃣ Une seule commande

```bash
make setup
```

**C'est tout!** Le script va:
- ✅ Vérifier prérequis (Node.js, npm)
- ✅ Demander le chemin du backend (setup-backend)
- ✅ Installer les dépendances npm
- ✅ Lancer Docker Compose
- ✅ Démarrer le frontend

### 2️⃣ Accédez à l'application

```
Frontend: http://localhost:4200
Backend:  http://localhost:8080
Mailpit:  http://localhost:8025
```

---

## 📋 Étapes détaillées (Si la commande échoue)

### Étape 1: Vérifier les prérequis

```bash
node --version     # Doit être v20+
npm --version      # Doit être v10+
docker --version   # Doit être installé
make --version     # Doit être installé
```

**Installer si manquant:**
- Node.js: https://nodejs.org
- Docker: https://www.docker.com/products/docker-desktop
- Make: `choco install make` (Windows) ou `brew install make` (Mac)

### Étape 2: Configurer le backend

Le script va vous demander où se trouve votre backend Java.

```bash
make setup-backend
```

Vous verrez:
```
Entrez le chemin ABSOLU du backend (format Windows avec slashes):
Exemple: C:/Users/Emili/OneDrive/Bureau/CDA/JAVA/TP/bibliotheque
```

Tapez le chemin exact de votre backend.

✅ Le fichier `.env` sera créé automatiquement!

### Étape 3: Lancer l'application

```bash
make setup
```

Ou séparément:
```bash
npm install           # Installer les dépendances
make docker-up        # Lancer Docker
npm start             # Lancer le frontend
```

### Étape 4: Vérifier ✅

Ouvrez: http://localhost:4200

Vous devriez voir l'application!

---

## 🔧 Configuration manuelle (si `make setup` échoue)

### 1. Créer le fichier `.env`

```bash
# Copier le template
cp .env.example .env
```

### 2. Éditer `.env`

Ouvrez `.env` et adapter le chemin:

```ini
BACKEND_PATH=C:/Users/Emili/OneDrive/Bureau/CDA/JAVA/TP/bibliotheque
```

**Important:**
- ✅ Utiliser `/` (slashes)
- ❌ Pas `\` (backslashes)
- ✅ Chemin absolu
- ✅ Doit contenir `Dockerfile`

### 3. Installer npm

```bash
npm install
```

### 4. Lancer Docker

```bash
make docker-up
```

Ou directement:
```bash
docker-compose --env-file .env up -d
```

### 5. Lancer le frontend

```bash
npm start
```

---

## 📊 Vérifier la configuration

```bash
# Voir le contenu du .env
cat .env

# Tester la configuration Docker
docker-compose --env-file .env config

# Voir les services
docker-compose --env-file .env ps

# Voir les logs
docker-compose --env-file .env logs -f
```

---

## 🎯 Commandes quotidiennes

```bash
make start        # Démarrer tout
make stop         # Arrêter tout
make restart      # Redémarrer
make test         # Tests unitaires
make e2e          # Tests E2E
make logs         # Voir les logs
make help         # Voir toutes les commandes
```

---

## 🐛 Problèmes courants

### Erreur: "make: command not found"

Installer make:
```bash
# Windows
choco install make

# Mac
brew install make

# Linux
sudo apt-get install make
```

### Erreur: "build context ... not found"

Le chemin du backend est incorrect.

```bash
# Vérifier le chemin
cat .env | grep BACKEND_PATH

# Tester
ls "C:/Users/Emili/OneDrive/Bureau/CDA/JAVA/TP/bibliotheque/Dockerfile"

# Si erreur, adapter le chemin dans .env
```

### Erreur: "Port 4200 already in use"

```bash
# Éditer .env et changer le port
FRONTEND_PORT=3000
BACKEND_PORT=9000

# Relancer
make restart
```

### Erreur: "Docker is not running"

Lancer Docker Desktop (Windows/Mac) ou le service Docker (Linux).

### Application démarre mais rien ne s'affiche

```bash
# Vérifier les logs
make docker-logs

# Ou
docker-compose --env-file .env logs -f

# Attendre 30 secondes et rafraîchir
# (les services mettent du temps à démarrer)
```

---

## ✅ Checklist avant de développer

- [ ] `make setup` a fonctionné
- [ ] http://localhost:4200 affiche l'app
- [ ] `make test` passe
- [ ] `make e2e` passe (optionnel)
- [ ] `.env` a été créé avec le bon chemin backend

---

## 📚 Prochaines étapes

### Développement

```bash
# Terminal 1 - Frontend
npm start

# Terminal 2 - Tests
npm run test:watch

# Terminal 3 - E2E
npm run e2e:ui
```

### Avant de commit

```bash
npm test          # Tests unitaires
npm run e2e       # Tests E2E
npm run build     # Build production
git add/commit    # Commit les changements
```

### Plus d'infos

- [README-SETUP.md](README-SETUP.md) - Installation détaillée
- [UNIT_TESTING.md](UNIT_TESTING.md) - Tests unitaires
- [E2E_TESTING.md](E2E_TESTING.md) - Tests E2E
- [DOCKER_GUIDE.md](DOCKER_GUIDE.md) - Docker
- [MAKEFILE_GUIDE.md](MAKEFILE_GUIDE.md) - Makefile
- [CONTRIBUTING.md](CONTRIBUTING.md) - Comment contribuer

---

## 💡 Important

### Le fichier `.env`

- ✅ À créer localement
- ❌ NE PAS committer sur Git (c'est personnel)
- ✅ Garder `.env.example` à jour
- ✅ Faire `/` pas `\` sur Windows

### Structure

```
.
├── .env                ← Personnel (Git ignored)
├── .env.example        ← Template (À committer)
├── docker-compose.yml  ← Utilise .env
└── Makefile           ← Simplifie les commandes
```

---

## 🎉 Vous êtes prêt!

```bash
make setup
```

Et profitez du développement! 🚀

---

Questions? Voir [CONTRIBUTING.md](CONTRIBUTING.md) ou ouvrir une issue.
