# Documentation

Index de toute la documentation du projet.

## Pour commencer

| Document | Durée | Contenu |
|----------|-------|---------|
| **[../README.md](../README.md)** | 2 min | Vue d'ensemble, démarrage rapide, comptes démo |
| **[SETUP.md](SETUP.md)** | 10 min | Installation complète, dépannage, toutes les commandes |

**Commencez par:** `npm run setup` → consultez [../README.md](../README.md)

---

## Développement

| Document | Pour qui | Contenu |
|----------|----------|---------|
| [UNIT_TESTING.md](UNIT_TESTING.md) | Testeurs | Tests unitaires, Jasmine/Karma, coverage |
| [E2E_TESTING.md](E2E_TESTING.md) | Testeurs | Tests E2E, Playwright, CI/CD |
| [DOCKER_GUIDE.md](DOCKER_GUIDE.md) | DevOps | Docker, Docker Compose, images |

---

## Déploiement et CI/CD

| Document | Pour qui | Contenu |
|----------|----------|---------|
| [CI-CD_SETUP.md](CI-CD_SETUP.md) | DevOps/Lead | GitHub Actions, GitLab CI/CD, secrets |

---

## Configuration Backend

| Document | Pour qui | Contenu |
|----------|----------|---------|
| [BACKEND_CONFIG_SUMMARY.md](BACKEND_CONFIG_SUMMARY.md) | Devs backend | Chemin backend, variables d'env, endpoints |

---

## Documentation - Principes d'organisation

```
Frontend (racine)
├── README.md                    ← point d'entrée
│   └── npm run setup            
│
└── docs/                        ← Toute la documentation
    ├── README.md                ← Vous êtes ici
    ├── SETUP.md                 ← Guide complet + troubleshooting
    ├── index.md             ← Navigation 
    ├── HELP.md                  ← Aide rapide
    ├── UNIT_TESTING.md          ← Tests unitaires
    ├── E2E_TESTING.md           ← Tests Playwright
    ├── DOCKER_GUIDE.md          ← Docker Compose
    ├── CI-CD_SETUP.md           ← GitHub Actions, GitLab CI
    │
    └── BACKEND_CONFIG_SUMMARY.md ← Endpoints, env vars
    
```

---

## Cas d'usage courants

### Je viens de cloner le repo

→ **Lisez**: [../README.md](../README.md)  
→ **Exécutez**: `npm run setup`

### J'ai une erreur au démarrage

→ **Consultez**: [SETUP.md](SETUP.md#-troubleshooting)

### Je veux écrire des tests

→ **Consultez**: [UNIT_TESTING.md](UNIT_TESTING.md) et [E2E_TESTING.md](E2E_TESTING.md)

### Je dois configurer Docker

→ **Consultez**: [DOCKER_GUIDE.md](DOCKER_GUIDE.md)

### Je dois configurer CI/CD

→ **Consultez**: [CI-CD_SETUP.md](CI-CD_SETUP.md)

### Le backend ne démarre pas

→ **Consultez**: [BACKEND_CONFIG_SUMMARY.md](BACKEND_CONFIG_SUMMARY.md)

### Besoin d'aide rapide?

→ **Consultez**: [HELP.md](HELP.md)

---

## Maintenir la documentation

- **Un fichier, une responsabilité** (pas de redondance)
- **README.md** (racine) = point d'entrée unique
- **docs/** = documentation spécialisée
