# 🔨 Makefile - Guide d'utilisation

## 📝 Qu'est-ce qu'un Makefile?

Un **Makefile** est un fichier de configuration qui permet de créer des **raccourcis de commandes**. Au lieu de taper des commandes longues, vous tapez simplement `make <target>`.

**Avantages:**
- 🎯 Commandes simples et mémorables
- 📚 Documentation intégrée (`make help`)
- 🔄 Automatisation des tâches répétitives
- 🐍 Indépendant du système (Windows, Mac, Linux)

## 🚀 Installation

### Sur Linux/Mac
Makefile est généralement pré-installé.

```bash
make --version
```

### Sur Windows
Vous avez plusieurs options:

#### Option 1: Using GNU Make (Recommandé)
```bash
# Via Chocolatey
choco install make

# Ou via scoop
scoop install make
```

#### Option 2: Git Bash (Facile si vous avez Git)
Git Bash inclut `make`. Il suffit d'utiliser Git Bash au lieu de cmd.

#### Option 3: WSL (Windows Subsystem for Linux)
```bash
wsl apt-get install make
```

**Vérifier l'installation:**
```bash
make --version
```

## 📋 Commandes disponibles

### 🚀 Démarrage

```bash
# Installation complète + Docker (idéal pour première fois)
make setup

# Juste démarrer l'application (Docker + Frontend)
make start

# Mode développement (Frontend local + Backend Docker)
make dev
```

### 🛑 Contrôle

```bash
# Arrêter les services
make stop

# Redémarrer les services
make restart

# Nettoyer (node_modules, dist, coverage...)
make clean
```

### 🧪 Tests

```bash
# Tests unitaires une seule fois
make test

# Tests en mode watch (reload automatique)
make test-watch

# Tests E2E (headless)
make e2e

# Tests E2E avec interface Playwright
make e2e-ui

# Tests E2E en mode debug
make e2e-debug
```

### 🏗️ Build

```bash
# Build production de l'Angular
make build

# Build l'image Docker
make build-docker
```

### 🐳 Docker

```bash
# Démarrer Docker Compose
make docker-up

# Arrêter Docker Compose
make docker-down

# Voir les logs en temps réel
make docker-logs

# Voir le statut des services
make docker-ps

# Accès au shell du backend
make docker-shell

# Accès à la base de données PostgreSQL
make docker-db
```

### 📊 Info & Utilitaires

```bash
# Voir le rapport de couverture (dans le navigateur)
make coverage

# Infos sur l'environnement
make info

# Voir toutes les commandes
make help
```

## 🎯 Scénarios d'utilisation

### Scénario 1: Première utilisation

```bash
# Une seule commande!
make setup

# Puis ouvrez: http://localhost:4200
```

### Scénario 2: Développement quotidien

```bash
# Terminal 1 - Mode développement
make dev

# Terminal 2 - Tests en watch
make test-watch

# Terminal 3 - Tests E2E
make e2e-ui
```

### Scénario 3: Avant de commit

```bash
# Tester tout
make test
make e2e
make build

# Tout est bon? Go!
git commit -m "feat: nouvelle feature"
```

### Scénario 4: Production

```bash
# Build et déployer
make prod
```

### Scénario 5: Nettoyage complet

```bash
# Tout nettoyer et réinstaller
make clean
make setup
```

## 🔧 Personnalisation

Vous pouvez modifier le `Makefile` pour adapter à vos besoins:

### Ajouter une commande

```makefile
my-custom-command:
	@echo "Mon commande personnalisée"
	@npm run my-script
```

### Modifier les chemins

```makefile
# Changer le chemin du backend
BACKEND_PATH := ../my-custom-backend-path
```

### Ajouter des variables

```makefile
API_PORT := 8080
FRONTEND_PORT := 4200
```

## ⚙️ Configuration avancée

### Dépendances entre targets

```makefile
# target2 dépend de target1
target2: target1
	@echo "target2 s'exécute après target1"
```

### Conditions

```makefile
check:
	@if [ -f file.txt ]; then \
		echo "File exists"; \
	fi
```

### Boucles

```makefile
loop:
	@for i in 1 2 3; do \
		echo "Itération $$i"; \
	done
```

## 🐛 Troubleshooting

### Erreur: "make: command not found"

**Solution:** Installer make (voir section Installation)

### Erreur: "Makefile:X: missing separator"

**Solution:** Les indentations doivent être des **TAB**, pas des espaces. Vérifier dans votre éditeur.

### Les targets ne s'exécutent pas

**Solution:** Vérifier que c'est bien un fichier `Makefile` (pas `makefile.txt` ou `Makefile.txt`)

### Accès au shell backend échoue

```bash
# Vérifier que Docker est démarré
make docker-ps

# Si ça ne marche pas
docker-compose exec backend bash
```

## 📚 Documentation

- [GNU Make Manual](https://www.gnu.org/software/make/manual/)
- [Make Tutorial](https://www.gnu.org/software/make/manual/html_node/Introduction.html)

## 💡 Tips & Tricks

### Combiner les commandes

```bash
# Aller à la ligne suivante avec \
make target1 && \
make target2

# Ou via le Makefile
all: clean test build
	@echo "Tous les tests et build terminés!"
```

### Exécuter silencieusement

```makefile
# @ au début = pas d'affichage de la commande
@echo "Message"
```

### Afficher les variables

```bash
make --print-data-base
```

## 🎯 Bonnes pratiques

✅ **À faire:**
- Utiliser des noms explicites: `make test` pas `make t`
- Documenter avec `help`: `make help`
- Grouper les targets par catégorie
- Utiliser `@` pour masquer la commande

❌ **À éviter:**
- Makefile trop complexe
- Mélanger tabs et espaces
- Commandes hardcodées (utiliser des variables)
- Oublier de mettre `.PHONY`

---

**Enjoy! 🚀**

Vous pouvez maintenant lancer `make help` pour voir toutes les commandes disponibles.
