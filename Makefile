.PHONY: help install start stop restart logs build test test-watch e2e e2e-ui clean docker-build docker-up docker-down docker-logs

# Couleurs pour l'output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

# Variables
DOCKER_COMPOSE_FILE := docker-compose.yml
DOCKER_COMPOSE_DEV_FILE := docker-compose.dev.yml
DOCKER_COMPOSE_CMD := docker-compose --env-file .env
NODE_VERSION := $(shell node --version 2>/dev/null || echo "NOT INSTALLED")
NPM_VERSION := $(shell npm --version 2>/dev/null || echo "NOT INSTALLED")

# ──────────────────────────────────────────────
# DEFAULT TARGET
# ──────────────────────────────────────────────

help:
	@echo "$(BLUE)╔════════════════════════════════════════════════════╗$(NC)"
	@echo "$(BLUE)║           📚 Bibliothèque Frontend - CLI            ║$(NC)"
	@echo "$(BLUE)╚════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(GREEN)⚙️  CONFIGURATION INITIALE$(NC)"
	@echo "  make setup-backend   Configurer le chemin du backend"
	@echo ""
	@echo "$(GREEN)🚀 DÉMARRAGE$(NC)"
	@echo "  make setup          Installer + Docker + Frontend"
	@echo "  make start          Démarrer l'application (Docker + Frontend)"
	@echo "  make dev            Mode dev (Frontend local + Backend Docker)"
	@echo ""
	@echo "$(GREEN)🛑 ARRÊT$(NC)"
	@echo "  make stop           Arrêter Docker Compose"
	@echo "  make restart        Redémarrer Docker Compose"
	@echo "  make clean          Nettoyer (node_modules, dist, etc.)"
	@echo ""
	@echo "$(GREEN)🧪 TESTS$(NC)"
	@echo "  make test           Exécuter les tests unitaires"
	@echo "  make test-watch     Tests en mode watch"
	@echo "  make e2e            Exécuter les tests E2E"
	@echo "  make e2e-ui         Tests E2E avec interface"
	@echo "  make e2e-debug      Tests E2E en mode debug"
	@echo ""
	@echo "$(GREEN)🏗️  BUILD$(NC)"
	@echo "  make build          Build production"
	@echo "  make build-docker   Build l'image Docker"
	@echo ""
	@echo "$(GREEN)🐳 DOCKER$(NC)"
	@echo "  make docker-up      Démarrer Docker Compose"
	@echo "  make docker-down    Arrêter Docker Compose"
	@echo "  make docker-logs    Voir les logs Docker"
	@echo "  make docker-ps      Statut des services"
	@echo "  make docker-shell   Accès au shell backend"
	@echo ""
	@echo "$(GREEN)📊 INFO$(NC)"
	@echo "  make info           Infos sur l'environnement"
	@echo "  make coverage       Voir le rapport de couverture"
	@echo ""

.DEFAULT_GOAL := help

# ──────────────────────────────────────────────
# SETUP & START
# ──────────────────────────────────────────────

setup-backend:
	@echo "$(BLUE)🔧 Configuration du chemin du backend...$(NC)"
	@if command -v pwsh &> /dev/null; then \
		pwsh -NoProfile -ExecutionPolicy Bypass -File setup-backend.ps1; \
	elif command -v powershell &> /dev/null; then \
		powershell -NoProfile -ExecutionPolicy Bypass -File setup-backend.ps1; \
	else \
		chmod +x setup-backend.sh; \
		./setup-backend.sh; \
	fi

setup: check-node setup-backend
	@echo "$(BLUE)🔧 Installation complète...$(NC)"
	@npm install
	@echo "$(GREEN)✅ Dépendances installées$(NC)"
	@make docker-up
	@echo "$(GREEN)✅ Docker Compose lancé$(NC)"
	@echo ""
	@echo "$(BLUE)📚 Bienvenue dans Bibliothèque!$(NC)"
	@echo "Frontend: $(YELLOW)http://localhost:4200$(NC)"
	@echo "Backend:  $(YELLOW)http://localhost:8080$(NC)"
	@echo "Mailpit:  $(YELLOW)http://localhost:8025$(NC)"

start: check-node
	@echo "$(BLUE)🚀 Démarrage de l'application...$(NC)"
	@echo ""
	@echo "$(YELLOW)1/2 - Démarrage de Docker Compose$(NC)"
	@$(DOCKER_COMPOSE_CMD) -f $(DOCKER_COMPOSE_FILE) up -d
	@echo "$(GREEN)✅ Services Docker lancés$(NC)"
	@echo ""
	@echo "$(YELLOW)2/2 - Démarrage du Frontend$(NC)"
	@npm start

dev: check-node
	@echo "$(BLUE)💻 Mode développement$(NC)"
	@echo ""
	@echo "$(YELLOW)1/2 - Démarrage des services de support...$(NC)"
	@$(DOCKER_COMPOSE_CMD) -f $(DOCKER_COMPOSE_DEV_FILE) up -d
	@echo "$(GREEN)✅ Services lancés (Backend + PostgreSQL + Mailpit)$(NC)"
	@echo ""
	@echo "$(YELLOW)2/2 - Démarrage du Frontend local$(NC)"
	@npm start

# ──────────────────────────────────────────────
# STOP & RESTART
# ──────────────────────────────────────────────

stop:
	@echo "$(BLUE)🛑 Arrêt de Docker Compose...$(NC)"
	@$(DOCKER_COMPOSE_CMD) -f $(DOCKER_COMPOSE_FILE) down
	@echo "$(GREEN)✅ Docker Compose arrêté$(NC)"

restart:
	@echo "$(BLUE)🔄 Redémarrage de Docker Compose...$(NC)"
	@$(DOCKER_COMPOSE_CMD) -f $(DOCKER_COMPOSE_FILE) down
	@$(DOCKER_COMPOSE_CMD) -f $(DOCKER_COMPOSE_FILE) up -d
	@echo "$(GREEN)✅ Docker Compose redémarré$(NC)"

# ──────────────────────────────────────────────
# TESTS
# ──────────────────────────────────────────────

test: check-node
	@echo "$(BLUE)🧪 Exécution des tests unitaires...$(NC)"
	@npm test

test-watch: check-node
	@echo "$(BLUE)👀 Tests en mode watch...$(NC)"
	@npm run test:watch

e2e: check-node
	@echo "$(BLUE)🎭 Exécution des tests E2E...$(NC)"
	@npm run e2e

e2e-ui: check-node
	@echo "$(BLUE)🖥️  Tests E2E avec interface...$(NC)"
	@npm run e2e:ui

e2e-debug: check-node
	@echo "$(BLUE)🐛 Tests E2E en mode debug...$(NC)"
	@npm run e2e:debug

# ──────────────────────────────────────────────
# BUILD
# ──────────────────────────────────────────────

build: check-node
	@echo "$(BLUE)🏗️  Build production...$(NC)"
	@npm run build
	@echo "$(GREEN)✅ Build terminé$(NC)"

build-docker:
	@echo "$(BLUE)🐳 Build de l'image Docker...$(NC)"
	@docker build -t bibliotheque-front:latest .
	@echo "$(GREEN)✅ Image créée: bibliotheque-front:latest$(NC)"

# ──────────────────────────────────────────────
# DOCKER
# ──────────────────────────────────────────────

docker-up:
	@echo "$(BLUE)🐳 Démarrage de Docker Compose...$(NC)"
	@$(DOCKER_COMPOSE_CMD) -f $(DOCKER_COMPOSE_FILE) up -d
	@echo "$(GREEN)✅ Services lancés$(NC)"
	@sleep 2
	@make docker-ps

docker-down:
	@echo "$(BLUE)🛑 Arrêt de Docker Compose...$(NC)"
	@$(DOCKER_COMPOSE_CMD) -f $(DOCKER_COMPOSE_FILE) down
	@echo "$(GREEN)✅ Services arrêtés$(NC)"

docker-logs:
	@$(DOCKER_COMPOSE_CMD) -f $(DOCKER_COMPOSE_FILE) logs -f

docker-ps:
	@echo "$(BLUE)📊 Statut des services:$(NC)"
	@$(DOCKER_COMPOSE_CMD) -f $(DOCKER_COMPOSE_FILE) ps

docker-shell:
	@echo "$(BLUE)🔧 Accès au shell backend...$(NC)"
	@$(DOCKER_COMPOSE_CMD) -f $(DOCKER_COMPOSE_FILE) exec backend bash

docker-db:
	@echo "$(BLUE)🗄️  Accès à la base de données...$(NC)"
	@$(DOCKER_COMPOSE_CMD) -f $(DOCKER_COMPOSE_FILE) exec postgres psql -U postgres -d bibliotheque

# ──────────────────────────────────────────────
# CLEAN
# ──────────────────────────────────────────────

clean:
	@echo "$(BLUE)🧹 Nettoyage...$(NC)"
	@rm -rf node_modules
	@rm -rf dist
	@rm -rf coverage
	@rm -rf .angular
	@rm -rf playwright-report
	@rm -rf test-results
	@echo "$(GREEN)✅ Nettoyage terminé$(NC)"

# ──────────────────────────────────────────────
# INFO & UTILITIES
# ──────────────────────────────────────────────

info:
	@echo "$(BLUE)ℹ️  Informations environnement$(NC)"
	@echo "Node.js:  $(NODE_VERSION)"
	@echo "npm:      $(NPM_VERSION)"
	@echo ""
	@echo "$(BLUE)📂 Structure:$(NC)"
	@echo "Frontend: $(shell pwd)"
	@echo "Backend:  ../bibliotheque-back-java"
	@echo ""
	@echo "$(BLUE)🔗 URLs:$(NC)"
	@echo "Frontend: http://localhost:4200"
	@echo "Backend:  http://localhost:8080"
	@echo "Mailpit:  http://localhost:8025"
	@echo "PostgreSQL: localhost:5432"

coverage: check-node
	@echo "$(BLUE)📊 Ouverture du rapport de couverture...$(NC)"
	@if [ -f coverage/index.html ]; then \
		echo "$(GREEN)✅ Rapport trouvé$(NC)"; \
		open coverage/index.html 2>/dev/null || xdg-open coverage/index.html 2>/dev/null || start coverage/index.html 2>/dev/null || echo "Ouvrez: coverage/index.html"; \
	else \
		echo "$(RED)❌ Rapport non trouvé. Exécutez: make test$(NC)"; \
	fi

# ──────────────────────────────────────────────
# UTILITIES
# ──────────────────────────────────────────────

check-node:
	@if ! command -v node &> /dev/null; then \
		echo "$(RED)❌ Node.js n'est pas installé$(NC)"; \
		exit 1; \
	fi
	@if ! command -v npm &> /dev/null; then \
		echo "$(RED)❌ npm n'est pas installé$(NC)"; \
		exit 1; \
	fi

check-docker:
	@if ! command -v docker &> /dev/null; then \
		echo "$(RED)❌ Docker n'est pas installé$(NC)"; \
		exit 1; \
	fi

# ──────────────────────────────────────────────
# DEVELOPMENT TASKS
# ──────────────────────────────────────────────

lint: check-node
	@echo "$(BLUE)🔍 Linting du code...$(NC)"
	@npm run lint 2>/dev/null || echo "$(YELLOW)ℹ️  Linter non configuré$(NC)"

format: check-node
	@echo "$(BLUE)✨ Formatage du code...$(NC)"
	@npm run format 2>/dev/null || echo "$(YELLOW)ℹ️  Prettier non configuré$(NC)"

install: check-node
	@echo "$(BLUE)📦 Installation des dépendances...$(NC)"
	@npm install
	@echo "$(GREEN)✅ Dépendances installées$(NC)"

update: check-node
	@echo "$(BLUE)🔄 Mise à jour des dépendances...$(NC)"
	@npm update
	@echo "$(GREEN)✅ Dépendances mises à jour$(NC)"

# ──────────────────────────────────────────────
# ONE-LINER COMMANDS
# ──────────────────────────────────────────────

all: clean install test build docker-build
	@echo "$(GREEN)✅ Tout terminé!$(NC)"

prod: build docker-build docker-up
	@echo "$(GREEN)✅ Mode production lancé$(NC)"
