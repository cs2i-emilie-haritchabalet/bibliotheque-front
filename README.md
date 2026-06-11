# Bibliothèque Universitaire - Frontend Angular

Application frontend Angular pour gérer une bibliothèque universitaire : recherche de ressources, emprunts, gestion des utilisateurs.

## Démarrage rapide (2 minutes)

### Prérequis
- **Node.js** 20+ et **npm** 10+
- **Docker** et **Docker Compose** v20+

### Lancer l'application

```bash
npm run setup
```

C'est tout! Le script va:
- Demander le chemin de votre backend Java (une seule fois)
- Installer les dépendances npm
- Lancer les conteneurs Docker (PostgreSQL, Backend, Frontend)

### Accédez à l'application

```
Frontend:    http://localhost:4200
Backend:     http://localhost:8080
PostgreSQL:  localhost:5432
Mailpit:     http://localhost:8025 (emails)
```

### Comptes de démo

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Bibliothécaire | `admin@biblio.fr` | `admin123` |
| Utilisateur | `alice@etu.fr` | `alice123` |

---

## Fonctionnalités

- Authentification avec HTTP Basic
- Recherche simple et avancée de ressources
- Détail des ressources
- Gestion des emprunts ("Mes emprunts")
- Inscription d'utilisateurs (rôle bibliothécaire)
- Création de ressources (rôle bibliothécaire)  
- Suivi des retards et relances (rôle bibliothécaire)
- Protection des routes par rôle

---

## Stack technique

- **Angular 21** (composants standalone)
- **Router Angular** pour la navigation
- **HttpClient + interceptor** pour l'authentification
- **Formulaires réactifs** (Reactive Forms)
- **Playwright** pour les tests E2E
- **Docker Compose** pour l'orchestration

---

## Documentation

| Document | Pour qui | Contenu |
|----------|----------|---------|
| [docs/SETUP.md](docs/SETUP.md) | Développeurs | Setup complet, configuration manuelle, dépannage |
| [docs/CI-CD_SETUP.md](docs/CI-CD_SETUP.md) | DevOps | GitHub Actions, GitLab CI/CD, déploiement |
| [docs/UNIT_TESTING.md](docs/UNIT_TESTING.md) | Testeurs | Tests unitaires et configuration |
| [docs/E2E_TESTING.md](docs/E2E_TESTING.md) | Testeurs | Tests E2E avec Playwright |
| [docs/DOCKER_GUIDE.md](docs/DOCKER_GUIDE.md) | DevOps | Docker, Docker Compose, commandes utiles |

---

## Cas courants

### `npm run setup` a échoué?
→ Voir [docs/SETUP.md](docs/SETUP.md#troubleshooting)

### Le backend ne se lance pas?
→ Vérifier le `.env` avec `BACKEND_PATH` correct
```bash
cat .env  # Affiche la configuration
```

### Port 4200 déjà utilisé?
```bash
# Lancer sur un autre port
npm start -- --port 4201
```

### Tester l'application?
```bash
npm test              # Tests unitaires
npm run e2e          # Tests E2E
npm run e2e:ui       # Avec interface
```

### Arrêter l'application?
```bash
npm run docker:down
```

### Redémarrer proprement?
```bash
npm run docker:clean
```

---

## Notes

- Ce frontend est volontairement **simple et pédagogique**
- Il fonctionne avec le backend Spring Boot fourni
- L'authentification utilise **HTTP Basic** (sans JWT)
- Les tests sont présents : unitaires (Jasmine/Karma) et E2E (Playwright)
