# Aide Rapide - Démarrage

---

## Démarrage Rapide

```bash
npm run setup
```

Puis ouvrez: http://localhost:4200

---

## J'ai une erreur

### "Port 4200 already in use"

```bash
npm start -- --port 4201
```

### "Connection refused" (backend)

```bash
npm run docker:logs    # Voir ce qui s'est passé
npm run docker:rebuild # Reconstruire les images
```

### ".env not found"

```bash
npm run setup:backend  # Créer le fichier .env
```

### "npm: command not found" ou "node: command not found"

→ Installer Node.js: https://nodejs.org/

### "docker: command not found"

→ Installer Docker: https://www.docker.com/products/docker-desktop

### Autres erreurs?

→ Voir [SETUP.md](SETUP.md#-troubleshooting)

---

## Documentation

| Besoin | Lire |
|--------|------|
| Comprendre l'appli | [../README.md](../README.md) |
| Installation détaillée | [SETUP.md](SETUP.md) |
| Trouver une doc | [index.md](index.md) |
| Tester l'appli | [E2E_TESTING.md](E2E_TESTING.md) |
| Utiliser Docker | [DOCKER_GUIDE.md](DOCKER_GUIDE.md) |

---

## Commandes essentielles

```bash
npm run setup          # Installation complète (une fois)
npm start              # Lancer le serveur de dev
npm test               # Tests unitaires
npm run e2e            # Tests E2E
npm run docker:down    # Arrêter les services
npm run docker:clean   # Tout nettoyer
```

---

## Astuces

### Lancer sur un port différent?
```bash
npm start -- --port 3000
```

### Voir les logs du backend?
```bash
npm run docker:logs
```

### Réinstaller les dépendances?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Nettoyer complètement?
```bash
npm run docker:clean
rm -rf .angular dist coverage
npm install
npm start
```

---

## Besoin de plus d'aide?

Consultez [index.md](index.md) pour naviguer toute la documentation.
