# 📚 Bibliothèque - Application Full Stack

Guide complet pour mettre en place et exécuter l'application Bibliothèque avec le frontend Angular et le backend Spring Boot.

## 📋 Prérequis

- Docker & Docker Compose (v20+)
- Node.js 20+ (pour le développement local)
- Maven 3.9+ (pour le développement backend)
- Git

## 🚀 Démarrage Rapide avec Docker Compose

### 1. Cloner les deux repositories

```bash
# Frontend
git clone https://github.com/your-org/bibliotheque-front-angular.git
cd bibliotheque-front-angular

# Backend (dans le même parent directory)
cd ..
git clone https://github.com/your-org/bibliotheque-back-java.git
```

### 2. Lancer l'application complète

```bash
# Depuis le répertoire frontend
docker-compose up -d
```

Cela va démarrer :
- 🖥️ **Frontend**: http://localhost:4200
- 🔧 **Backend API**: http://localhost:8080
- 🗄️ **PostgreSQL**: localhost:5432
- 📧 **Mailpit**: http://localhost:8025

### 3. Vérifier l'état des services

```bash
docker-compose ps
```

### 4. Arrêter l'application

```bash
docker-compose down
```

Pour supprimer aussi les volumes (données) :
```bash
docker-compose down -v
```

## 💻 Développement Local

### Frontend

#### Installation des dépendances
```bash
npm install
```

#### Lancer le serveur de développement
```bash
npm start
# ou
ng serve
```

L'application sera disponible à : http://localhost:4200

#### Tests Unitaires
```bash
# Exécuter une fois
npm test

# En mode watch
npm run test:watch
```

#### Tests E2E
```bash
# Exécuter les tests E2E
npm run e2e

# Avec l'interface Playwright
npm run e2e:ui

# En mode debug
npm run e2e:debug
```

#### Build Production
```bash
npm run build
```

## 🔄 CI/CD

### GitHub Actions

Les workflows sont définis dans `.github/workflows/ci-cd.yml`

**Stages:**
1. ✅ Build & Unit Tests
2. 🧪 E2E Tests
3. 🔒 Security Scans
4. 🐳 Docker Build & Push
5. 📊 Container Scanning

**Configuration requise:**
- `SNYK_TOKEN`: Token Snyk pour les scans de sécurité

### GitLab CI/CD

Le pipeline est défini dans `.gitlab-ci.yml`

**Stages:**
1. 📦 Build
2. 🧪 Tests (Unitaires + E2E)
3. 🔒 Security (npm audit + Semgrep)
4. 🐳 Docker Image
5. 🚀 Deploy (Staging/Production)

## 📝 Configuration des Services

### Variables d'Environnement

#### Frontend (.env)
```
API_URL=http://localhost:8080
```

#### Backend (docker-compose.yml)
```
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/bibliotheque
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
SPRING_MAIL_HOST=mailpit
SPRING_MAIL_PORT=1025
```

## 🐳 Commandes Docker Utiles

```bash
# Voir les logs
docker-compose logs -f frontend
docker-compose logs -f backend

# Accéder au shell d'un service
docker-compose exec backend bash
docker-compose exec postgres psql -U postgres -d bibliotheque

# Reconstruire une image
docker-compose build --no-cache frontend

# Nettoyer
docker-compose down -v
docker system prune -a
```

## 🧪 Architecture des Tests

### Tests Unitaires (Karma + Jasmine)
- **Location**: `src/app/**/*.spec.ts`
- **Couverture**: Rapports en `coverage/`
- **CI**: Toutes les branches

### Tests E2E (Playwright)
- **Location**: `e2e/**/*.spec.ts`
- **Reports**: 
  - HTML: `playwright-report/`
  - JUnit: `test-results/junit.xml`
  - JSON: `test-results/results.json`
- **Browsers**: Chromium, Firefox, WebKit
- **CI**: Toutes les branches

## 🔒 Sécurité

### Scans Intégrés

1. **npm audit** - Vérification des dépendances
2. **Snyk** - Scans de vulnérabilités (GitHub)
3. **Semgrep** - SAST (GitLab)
4. **Trivy** - Scanning d'images Docker

### Rapports

- Coverage: `coverage/`
- Security: Console CI/CD ou artifacts

## 📊 Métriques de Couverture

- **Target**: > 80% de couverture de code
- **Reports**: 
  - HTML: `coverage/index.html`
  - LCOV: `coverage/lcov.info`
  - JSON: `coverage/coverage-final.json`

## 🛠️ Troubleshooting

### Port déjà en utilisation
```bash
# Trouver le processus
lsof -i :4200

# Libérer le port
kill -9 <PID>
```

### Docker compose ne démarre pas
```bash
# Vérifier les logs
docker-compose logs

# Reconstruire les images
docker-compose build --no-cache
```

### Tests E2E échouent
```bash
# Vérifier que l'app est démarrée
curl http://localhost:4200

# Exécuter en mode debug
npm run e2e:debug
```

## 📚 Ressources

- [Angular Documentation](https://angular.io)
- [Playwright Documentation](https://playwright.dev)
- [Docker Documentation](https://docs.docker.com)
- [GitLab CI Documentation](https://docs.gitlab.com/ee/ci/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 📞 Support

Pour toute question ou issue, veuillez ouvrir une issue sur le repository.

---

**Version**: 1.0  
**Dernière mise à jour**: 2025-01-15
