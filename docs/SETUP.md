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

Le backend est fourni directement sous forme d’image Docker :

```bash
# Vérifier que le backend existe
image: bibliotheque-backend:latest
```

---

## Étapes détaillées

### Étape 1: Cloner le repo (si ce n'est pas fait)

```bash
git clone https://github.com/your-org/bibliotheque-front-angular.git
cd bibliotheque-front-angular
```

### Étape 2: 

```bash
npm run setup
```

Cela va démarrer:
- **Frontend** (Angular): http://localhost:4200
- **Backend** (Spring Boot): http://localhost:8080
- **PostgreSQL**: localhost:5432
- **Mailpit** (emails): http://localhost:8025

### Étape 3: 

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

2. Reconstruire les images:
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

```bash
# Vérifier les conteneurs
docker ps

# Voir les logs backend
docker logs bibliotheque-backend
```

### npm run setup échoue

**Essayer manuellement:**

```bash
# Rebuild images si nécessaire
docker-compose build --no-cache
docker-compose up -d
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
│   └── setup.js          # Script de setup principal
├── docker-compose.yml    # Orchestration (prod/dev)
├── Dockerfile           # Image Docker frontend
├── karma.conf.js        # Config tests unitaires
├── playwright.config.ts # Config tests E2E
├── package.json         # Dépendances et scripts
├── .env.example         # Template .env
└── angular.json         # Config Angular
```

---

## Besoin d'aide?

- **Backend ne démarre pas?** → Voir [BACKEND_CONFIG_SUMMARY.md](BACKEND_CONFIG_SUMMARY.md)
- **Tests échouent?** → Voir [E2E_TESTING.md](E2E_TESTING.md) et [UNIT_TESTING.md](UNIT_TESTING.md)
- **Docker ne fonctionne pas?** → Voir [DOCKER_GUIDE.md](DOCKER_GUIDE.md)
- **Contribution au projet?** → Voir [CONTRIBUTING.md](CONTRIBUTING.md)
