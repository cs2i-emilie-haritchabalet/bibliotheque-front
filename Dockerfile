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
FROM nginx:alpine

# Copier la config nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers construits depuis le stage de build
COPY --from=build /app/dist/bibliotheque-front /usr/share/nginx/html

EXPOSE 4200

USER nginx

CMD ["nginx", "-g", "daemon off;"]
