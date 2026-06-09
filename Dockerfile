# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Construire l'application
RUN npm run build

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Installer un serveur HTTP simple
RUN npm install -g http-server

# Copier les fichiers construits depuis le stage de build
COPY --from=build /app/dist/bibliotheque-front ./dist

# Créer un utilisateur non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

USER nextjs

EXPOSE 4200

CMD ["http-server", "./dist", "-p", "4200", "--cors"]
