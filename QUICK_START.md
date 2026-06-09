# 🎯 Quick Start Guide

## ⚡ Démarrage en 5 minutes

### Option 1: Avec Docker (Recommandé)

```bash
# 1. Cloner le repo
git clone https://github.com/your-org/bibliotheque-front-angular.git
cd bibliotheque-front-angular

# 2. Lancer docker-compose
docker-compose up -d

# 3. Accès
Frontend:  http://localhost:4200
Backend:   http://localhost:8080
Mailpit:   http://localhost:8025
```

✅ Tout fonctionne! Arrêter avec: `docker-compose down`

### Option 2: Développement local

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le frontend
npm start

# 3. Lancer les services de support (PostgreSQL, Mailpit)
docker-compose -f docker-compose.dev.yml up -d

# 4. Accès
Frontend: http://localhost:4200
```

## 🧪 Exécuter les tests

### Tests unitaires
```bash
npm test                    # Une seule fois
npm run test:watch         # Watch mode
```

### Tests E2E
```bash
npm run e2e                # Mode headless
npm run e2e:ui             # Avec interface
npm run e2e:debug          # Mode debug
```

## 📦 Build production

```bash
npm run build              # Compiler
docker build -t my-app .   # Créer l'image
docker run -p 4200:4200 my-app  # Lancer
```

## 📂 Structure du projet

```
.
├── src/
│   ├── app/
│   │   ├── core/          # Services, guards, interceptors
│   │   ├── features/      # Composants des features
│   │   └── layout/        # Layout components
│   └── environments/      # Config par environnement
├── e2e/                   # Tests end-to-end
├── .github/workflows/     # GitHub Actions CI/CD
├── Dockerfile             # Image Docker
├── docker-compose.yml     # Orchestration (prod)
├── docker-compose.dev.yml # Orchestration (dev)
├── karma.conf.js          # Config tests unitaires
├── playwright.config.ts   # Config tests E2E
└── .gitlab-ci.yml         # GitLab CI/CD
```

## 🔄 CI/CD Automatique

### GitHub Actions
- Déclenché sur push vers `main` ou `develop`
- Build → Tests → Security → Docker → Deploy

### GitLab CI/CD
- Similaire, avec rapports additionnels
- Stages: Build → Test → Security → Image → Deploy

Voir les workflows:
- `.github/workflows/ci-cd.yml`
- `.gitlab-ci.yml`

## 📚 Documentation

| Document | Contenu |
|----------|---------|
| [README-SETUP.md](README-SETUP.md) | Installation complète |
| [UNIT_TESTING.md](UNIT_TESTING.md) | Guide des tests unitaires |
| [E2E_TESTING.md](E2E_TESTING.md) | Guide des tests E2E |
| [DOCKER_GUIDE.md](DOCKER_GUIDE.md) | Docker et Docker Compose |
| [CI-CD_SETUP.md](CI-CD_SETUP.md) | GitHub Actions et GitLab CI/CD |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution au projet |

## 🆘 Problèmes courants

| Problème | Solution |
|----------|----------|
| Port 4200 occupé | `lsof -i :4200` puis `kill -9 <PID>` |
| PostgreSQL ne démarre pas | `docker-compose logs postgres` |
| Tests échouent en CI | `CI=true npm test` |
| Image Docker énorme | Multi-stage: vérifier `Dockerfile` |
| Services inaccessibles | `docker-compose ps` et `docker-compose logs` |

## 📞 Aide

- 📖 Lire les documentations ci-dessus
- 🐛 Ouvrir une issue sur GitHub
- 💬 Consulter CONTRIBUTING.md

## ✨ Prochaines étapes

1. **Configurer les secrets CI/CD** (SNYK_TOKEN)
2. **Mettre à jour les URLs** (remplacer localhost par domaines)
3. **Configurer les déploiements** (staging, production)
4. **Ajouter plus de tests** (augmenter couverture)
5. **Documenter l'API** (Swagger/OpenAPI)

---

🎉 Bon développement!
