# Docker & Docker Compose Guide

## Structure Docker

### Production (docker-compose.yml)
- Frontend Angular (servi via Nginx)
- Backend Spring Boot
- PostgreSQL
- Mailpit

### Développement (docker-compose.dev.yml)
- Backend Spring Boot (image Docker)
- PostgreSQL
- Mailpit

## Dockerfile Frontend

```dockerfile
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/bibliotheque-front/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Stages:**
1. **Build**: Compile Angular
2. **Runtime**: Serve les fichiers Angular via Nginx

## Démarrage rapide

### Production - Tout en un
```bash
# Depuis le répertoire frontend
docker-compose up -d
```

URLs:
- Frontend: http://localhost:4200 (Nginx en conteneur sur port 80)
- Backend: http://localhost:8080
- Mailpit: http://localhost:8025
- PostgreSQL: localhost:5432

### Développement
```bash
docker-compose -f docker-compose.dev.yml up -d
npm start
```

## Commandes utiles

### Gestion des services
```bash
# Démarrer
docker-compose up -d

# Arrêter
docker-compose down

# Arrêter et nettoyer les volumes
docker-compose down -v

# Reconstruire les images
docker-compose build --no-cache

# Reconstruire un service
docker-compose build --no-cache frontend
```

### Logs
```bash
# Tous les services
docker-compose logs -f

# Service spécifique
docker-compose logs -f backend
docker-compose logs -f postgres

# Nombre de lignes
docker-compose logs --tail=50 frontend
```

### Inspection
```bash
# Statut
docker-compose ps

# Accès au shell d'un service
docker-compose exec backend bash
docker-compose exec postgres psql -U postgres

# Vérifier les ports
docker-compose ps
```

### Variables d'environnement
```bash
# Frontend
API_URL=http://localhost:8080

# Backend
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/bibliotheque
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
SPRING_MAIL_HOST=mailpit
SPRING_MAIL_PORT=1025
```

## 🔧 Configuration personnalisée

### Ports
Modifier dans `docker-compose.yml`:
```yaml
services:
  frontend:
    ports:
      - "4200:80"
```

### Base de données

```yaml
postgres:
  environment:
    POSTGRES_DB: bibliotheque
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: postgres
```

### Backend image

```YAMl
backend:
  image: ghcr.io/<user>/bibliotheque-backend:latest
```

## Troubleshooting

### Port déjà en utilisation
```bash
# Trouver le processus
lsof -i :4200

# Libérer le port
kill -9 <PID>

# Ou utiliser un port différent
docker-compose up -d --publish 3000:4200/tcp
```

### Service ne démarre pas
```bash
# Voir les logs
docker-compose logs backend

# Reconstruire
docker-compose build --no-cache backend
docker-compose up backend
```

### Connexion BD refusée
```bash
# Vérifier que PostgreSQL est prêt
docker-compose exec postgres psql -U postgres -c '\l'

# Attendre quelques secondes et réessayer
```

### Espace disque insuffisant
```bash
# Nettoyer les images inutilisées
docker image prune -a

# Nettoyer les volumes inutilisés
docker volume prune

# Nettoyer tout (⚠️ attention!)
docker system prune -a --volumes
```

## Monitoring

### Ressources
```bash
# Consommation CPU/Mémoire
docker stats

# Détails d'un container
docker inspect bibliotheque-backend
```

### Health checks
```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

## Sécurité

### User non-root
```dockerfile
RUN addgroup -g 1001 -S nodejs
RUN adduser -S appuser -u 1001
USER appuser
```

### Secrets
Ne JAMAIS commiter les secrets. Utiliser:
- Variables d'environnement
- .env files (dans .gitignore)
- Docker secrets
- Container registry secrets

### Image scanning
```bash
# Trivy
trivy image bibliotheque-front:latest

# Snyk
snyk test --docker bibliotheque-front:latest
```

## Performance

### Build optimisé
```dockerfile
# Cache layers
RUN npm ci

# Multi-stage
FROM node AS build
RUN npm run build

FROM node
COPY --from=build /app/dist ./
```

### Taille minimale
```bash
# Vérifier la taille
docker images bibliotheque-front

# Alpine
FROM node:20-alpine  # ~170MB vs ~1GB
```

### Network
```yaml
networks:
  bibliotheque-network:
    driver: bridge
```

## Ressources

- [Docker Docs](https://docs.docker.com)
- [Docker Compose Docs](https://docs.docker.com/compose)
- [Best Practices](https://docs.docker.com/develop/dev-best-practices/)
