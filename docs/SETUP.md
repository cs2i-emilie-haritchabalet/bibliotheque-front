# Guide Installation Complet

Guide détaillé pour installer et configurer l'application Bibliothèque.

---

## Démarrage rapide (Recommandé)

Si c'est votre première fois, **une seule commande**:

```bash
npm run setup
```

Le script va:
1. Vérifier que `.env` existe (et le créer si besoin)
2. Installer les dépendances npm
3. Lancer les conteneurs Docker

Puis:
```bash
# Accédez à l'application
http://localhost:4200
```

**Durée**: 2-5 minutes selon votre connexion réseau.

---

## Prérequis

Avant de commencer, vérifiez que vous avez:

### Node.js et npm

```bash
node --version   # Doit être v20 ou plus
npm --version    # Doit être v10 ou plus
```

**Installation**: https://nodejs.org/

### Docker et Docker Compose

```bash
docker --version           # Doit être installé
docker-compose --version   # Doit être v20+
```

**Installation**: https://www.docker.com/products/docker-desktop

### Backend Java

Le backend Spring Boot doit être cloné sur votre machine.

```bash
# Vérifier que le backend existe
ls ../bibliotheque-back-java/   # Ou votre chemin vers le backend
```

---

## Configuration (Fichier `.env`)

### Qu'est-ce que `.env`?

Le fichier `.env` contient le **chemin vers le backend Java**. 

**Structure attendue:**
```ini
BACKEND_PATH=C:/Users/Emili/Downloads/bibliotheque-back-java
```

### Créer ou mettre à jour `.env`

**Option 1: Laisser le script `setup.js` le faire**

```bash
npm run setup
```

Vous serez invité à donner le chemin du backend.

**Option 2: Créer manuellement**

```bash
# Copier le template
cp .env.example .env
```

Puis éditer `.env` et adapter le chemin:

```ini
BACKEND_PATH=C:/chemin/vers/bibliotheque-back-java
```

### Comment trouver le bon chemin?

#### Cas 1: Backend au même niveau que le frontend

**Votre structure:**
```
Downloads/
├── bibliotheque-front-angular/     ← Vous êtes ici
│   ├── package.json
│   └── docker-compose.yml
└── bibliotheque-back-java/         ← Backend
    ├── pom.xml
    └── Dockerfile
```

**Chemin à utiliser:**
```ini
BACKEND_PATH=../bibliotheque-back-java
```

#### Cas 2: Backend à un autre endroit

Trouvez le chemin absolu:

**Windows (PowerShell):**
```powershell
cd C:\Users\Emili\Downloads\bibliotheque-back-java
pwd  # Affiche le chemin absolu
# C:\Users\Emili\Downloads\bibliotheque-back-java

# Remplacer les backslashes par des slashes:
# C:/Users/Emili/Downloads/bibliotheque-back-java
```

**Mac/Linux:**
```bash
cd /Users/emili/Downloads/bibliotheque-back-java
pwd  # Affiche le chemin
```

**Mettre à jour `.env`:**
```ini
BACKEND_PATH=C:/Users/Emili/Downloads/bibliotheque-back-java
```

---

## Étapes détaillées

### Étape 1: Cloner le repo (si ce n'est pas fait)

```bash
git clone https://github.com/your-org/bibliotheque-front-angular.git
cd bibliotheque-front-angular
```

### Étape 2: Configurer le backend

```bash
npm run setup:backend
```

Vous serez demandé d'entrer le chemin vers le backend Java.

**Exemple:**
```
Entrez le chemin vers le backend (format avec slashes):
C:/Users/Emili/Downloads/bibliotheque-back-java
```

Le fichier `.env` sera créé automatiquement.

### Étape 3: Installer les dépendances

```bash
npm install
```

### Étape 4: Lancer les conteneurs

```bash
npm run docker:up
```

Cela va démarrer:
- **Frontend** (Angular): http://localhost:4200
- **Backend** (Spring Boot): http://localhost:8080
- **PostgreSQL**: localhost:5432
- **Mailpit** (emails): http://localhost:8025

### Étape 5: Lancer le serveur de développement

```bash
npm start
```

Ouvrez: **http://localhost:4200**

---

## Commandes utiles

### Docker

```bash
npm run docker:up          # Lancer les conteneurs
npm run docker:down        # Arrêter les conteneurs
npm run docker:logs        # Voir les logs
npm run docker:ps          # État des services
npm run docker:restart     # Redémarrer
npm run docker:clean       # Nettoyer complètement
npm run docker:rebuild     # Rebuild les images
```

### Frontend

```bash
npm start           # Lancer le serveur de dev
npm test            # Tests unitaires (une fois)
npm run test:watch  # Tests unitaires (watch)
npm run e2e         # Tests E2E
npm run e2e:ui      # Tests E2E avec interface
npm run build       # Build production
npm run clean       # Nettoyer dist/
```

---

## Troubleshooting

### "Port 4200 already in use"

```bash
# Lancer sur un autre port
npm start -- --port 4201
```

### "Connection refused" pour le backend

**Vérifications:**

1. Docker tourne?
```bash
docker ps  # Doit afficher les conteneurs
```

2. Le `.env` est correct?
```bash
cat .env   # Affiche le contenu
```

3. Reconstruire les images:
```bash
npm run docker:rebuild
```

### "Cannot connect to PostgreSQL"

```bash
# Voir les logs
npm run docker:logs

# Redémarrer proprement
npm run docker:clean
npm run docker:up
```

### Tests échouent

**Tests unitaires:**
```bash
npm test              # Une fois
npm run test:watch    # Watch mode
```

**Tests E2E:**
```bash
npm run e2e           # Headless
npm run e2e:ui        # Avec interface (plus facile pour déboguer)
```

Voir [E2E_TESTING.md](E2E_TESTING.md) pour plus de détails.

### Le backend Spring Boot ne démarre pas

1. Vérifier que Maven compile le backend:
```bash
cd ../bibliotheque-back-java
./mvnw clean install  # Ou: mvn clean install
```

2. Vérifier les logs Docker:
```bash
docker logs bibliotheque-back-java
```

### npm run setup échoue

**Essayer manuellement:**

```bash
# 1. Créer .env
node scripts/setup-backend.js

# 2. Installer les dépendances
npm install

# 3. Lancer Docker
npm run docker:up
```

---

## Structure du projet

```
.
├── src/
│   ├── app/
│   │   ├── core/         # Services, guards, interceptors
│   │   ├── features/     # Composants des features
│   │   ├── layout/       # Layout components
│   │   └── shared/       # Composants partagés
│   ├── environments/     # Configurations par environnement
│   ├── styles.css        # Styles globaux
│   └── main.ts
├── e2e/                  # Tests E2E Playwright
├── scripts/
│   ├── setup.js          # Script de setup principal
│   └── setup-backend.js  # Configuration du backend
├── docker-compose.yml    # Orchestration (prod/dev)
├── Dockerfile           # Image Docker frontend
├── karma.conf.js        # Config tests unitaires
├── playwright.config.ts # Config tests E2E
├── package.json         # Dépendances et scripts
├── .env.example         # Template .env
└── angular.json         # Config Angular
```

---

## Mode développement vs production

### Mode développement (recommandé)

```bash
npm run dev
```

Cela lance:
- Angular dev server avec hot reload
- Services support (PostgreSQL, Mailpit)

### Mode production

```bash
npm run build           # Build l'application
docker build -t my-app .  # Créer l'image
docker run -p 4200:4200 my-app  # Lancer
```

---

## Besoin d'aide?

- **Backend ne démarre pas?** → Voir [BACKEND_CONFIG_SUMMARY.md](BACKEND_CONFIG_SUMMARY.md)
- **Tests échouent?** → Voir [E2E_TESTING.md](E2E_TESTING.md) et [UNIT_TESTING.md](UNIT_TESTING.md)
- **Docker ne fonctionne pas?** → Voir [DOCKER_GUIDE.md](DOCKER_GUIDE.md)
- **Contribution au projet?** → Voir [CONTRIBUTING.md](CONTRIBUTING.md)
