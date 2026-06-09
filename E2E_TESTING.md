# Playwright Configuration Guide

## Installation des dépendances

```bash
npm install --save-dev @playwright/test
npx playwright install
```

## Exécution des tests

### Mode standard (toutes les situations)
```bash
npm run e2e
```

### Mode UI (débogage)
```bash
npm run e2e:ui
```

### Mode debug (pas à pas)
```bash
npm run e2e:debug
```

### Cibler un navigateur spécifique
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Exécuter un fichier de test spécifique
```bash
npx playwright test e2e/auth.spec.ts
```

## Structure des fichiers de test

- `e2e/` - Tous les tests end-to-end
  - `auth.spec.ts` - Tests d'authentification
  - `search.spec.ts` - Tests de recherche
  - `resources.spec.ts` - Tests de gestion des ressources

## Bonnes pratiques

1. **Selectors**
   - Utiliser `data-testid` en priorité
   - Éviter les selectors trop spécifiques
   - Utiliser des sélecteurs Text quand pertinent

2. **Assertions**
   - Vérifier la visibilité des éléments
   - Valider les redirections
   - Tester les messages de feedback

3. **Attentes**
   - Utiliser `waitForSelector` avant d'agir
   - Utiliser `waitForNavigation` après une action
   - Définir des timeouts appropriés

## Reports

- **HTML Report**: `playwright-report/` (ouvrir `index.html`)
- **JUnit XML**: `test-results/junit.xml`
- **JSON**: `test-results/results.json`

## Intégration CI/CD

Les tests Playwright s'exécutent automatiquement dans :
- GitHub Actions (`.github/workflows/ci-cd.yml`)
- GitLab CI/CD (`.gitlab-ci.yml`)

### Variables d'environnement

```bash
CI=true          # Mode CI (pas de réutilisation de serveur)
HEADLESS=true    # Mode sans GUI (défaut en CI)
```

## Troubleshooting

### Tests échouent localement mais pas en CI
```bash
# Exécuter en mode CI
CI=true npm run e2e
```

### Éléments non trouvés
```bash
# Vérifier les selectors
npm run e2e:ui
```

### Timeouts
```bash
# Augmenter le timeout global dans playwright.config.ts
use: {
  navigationTimeout: 30000,
  actionTimeout: 10000,
}
```
