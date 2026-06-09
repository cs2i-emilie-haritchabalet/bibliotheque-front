# Contributing Guide

## 📋 Avant de commencer

1. Lire le [README-SETUP.md](README-SETUP.md)
2. Installer les dépendances: `npm install`
3. Consulter le [UNIT_TESTING.md](UNIT_TESTING.md) et [E2E_TESTING.md](E2E_TESTING.md)

## 🔄 Workflow de développement

### 1. Créer une branche
```bash
git checkout -b feature/my-feature
# ou
git checkout -b bugfix/my-bugfix
```

### 2. Développer avec tests
```bash
# Lancer le serveur de dev
npm start

# Dans un autre terminal, tests unitaires en watch
npm run test:watch

# Tests E2E
npm run e2e:ui
```

### 3. Avant de commit

```bash
# Vérifier que les tests passent
npm test -- --watch=false

# Vérifier la couverture
cat coverage/index.html

# Build en production
npm run build

# Vérifier qu'il n'y a pas d'erreurs
npm audit
```

### 4. Commit et Push

```bash
git add .
git commit -m "feat: description de la fonctionnalité"
git push origin feature/my-feature
```

### 5. Créer une Pull Request

- Décrire les changements
- Référencer les issues: `Fixes #123`
- Attendre le passage des tests CI/CD
- Demander une review

## 📝 Convention de commits

Utiliser [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage
- `refactor:` Refactorisation
- `test:` Ajout de tests
- `chore:` Maintenance

Exemples:
```
feat(auth): add login functionality
fix(search): resolve filter bug
test(resources): add unit tests for service
```

## 🧪 Standards de test

### Tests unitaires
- Couverture minimale: **80%**
- Location: `src/app/**/*.spec.ts`
- Format: `*.spec.ts`

### Tests E2E
- Location: `e2e/**/*.spec.ts`
- Couvrir les flux utilisateur critiques
- Utiliser des `data-testid` dans les templates

### Exécution
```bash
# Unitaires
npm test -- --watch=false --code-coverage

# E2E
npm run e2e

# Tous
npm test && npm run e2e
```

## 🔍 Code Review Checklist

Avant de demander une review, vérifier:

- [ ] Tests unitaires passent
- [ ] Tests E2E passent
- [ ] Couverture > 80%
- [ ] Pas d'erreurs TypeScript
- [ ] Code formaté (ESLint)
- [ ] Documentation mise à jour
- [ ] Commits bien structurés
- [ ] PR description claire

## 🚀 Déploiement

### Staging (développement)
```bash
# Push sur develop déclenche le déploiement automatique
git push origin develop
```

### Production (release)
```bash
# Créer une release
git tag v1.0.0
git push origin main --tags

# Deployment manuel via CI/CD
```

## 📞 Communication

- **Issues**: Pour les bugs et features
- **Discussions**: Pour les questions
- **Pull Requests**: Pour les contributions
- **Slack**: Pour les discussions rapides

## 🛠️ Outils utiles

### Locale
```bash
npm start          # Dev server
npm test           # Unit tests
npm run e2e        # E2E tests
npm run build      # Production build
npm run test:watch # Watch mode
npm run e2e:ui     # E2E UI mode
```

### Docker
```bash
docker-compose up -d           # Lancer tous les services
docker-compose down            # Arrêter les services
docker-compose logs -f backend # Voir les logs
docker-compose ps              # Statut des services
```

## 📚 Documentation

- [Angular Docs](https://angular.io)
- [TypeScript Docs](https://www.typescriptlang.org)
- [Playwright Docs](https://playwright.dev)
- [Docker Docs](https://docs.docker.com)

## ❓ FAQ

**Q: Comment ajouter une nouvelle dépendance?**
```bash
npm install package-name
npm install --save-dev @types/package-name  # Si types manquent
```

**Q: Comment exécuter un seul test?**
```bash
npm test -- --include="**/my.component.spec.ts"
```

**Q: Comment debugger les tests E2E?**
```bash
npm run e2e:debug
```

**Q: Les tests échouent localement mais pas en CI?**
```bash
CI=true npm test
CI=true npm run e2e
```

---

Merci de contribuer! 🎉
