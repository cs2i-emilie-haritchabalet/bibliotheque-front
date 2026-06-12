   # Résumé de la Configuration - Chemin Backend

   ## Configuration du Backend

   Le backend est fourni sous forme d'image Docker :

   bibliotheque-backend:latest

   ---

   ## Utilisation

   ### Option 1: Démarrage standard (recommandé)
   ```bash
   docker-compose up -d
   ``` 

   ### Option 2: Rebuild complet (si besoin)

   ```bash
   docker-compose build --no-cache
   docker-compose up -d
   ```

   ### Option 3: Mode développement

   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

   ---

   ## Flux de fonctionnement

   ```
   1. Utilisateur exécute: npm run setup
      ↓
   2. npm install installe les dépendances frontend
      ↓
   3. docker-compose up démarre les services
      ↓  
   4. Docker pull l’image backend (GHCR ou local)
      ↓
   5. PostgreSQL + Mailpit démarrent
      ↓
   6. Backend Spring Boot démarre automatiquement
      ↓
   7. Frontend Angular se connecte au backend
      ↓
   8. Application prête
   ```

   ---

   ## Checklist pour les contributeurs

   ### Pour la première fois

   - [ ] `git clone` le repo
   - [ ] `cd bibliotheque-front-angular/bibliotheque-front-angular`
   - [ ] `npm run setup`
   - [ ] Attendrele démarrage Docker
   - [ ] Accéder à http://localhost:4200

   ### Important à savoir

   - **Committer**: `.env.example`, `docker-compose.yml`, `package.json`, `scripts/setup.js`
   - **NE PAS committer**: `.env` (personnel à chaque machine)

   ### Si quelqu'un ajoute une variable

   ```bash
   # Ajouter la nouvelle variable dans .env.example
   vim .env.example

   # Git add/commit
   git add .env.example
   git commit -m "docs: add new env variable"

   # Les autres devront l'ajouter dans leur .env
   ```

   ---

   ## Comment ça marche?

   ### Variables d'environnement

   **`.env` (local)**
   ```ini
   FRONTEND_PORT=4200
   BACKEND_PORT=8080
   ```

   **`docker-compose.yml` (utilise les variables)**
   ```yaml
   frontend:
      ports:
         - "4200:80"

   backend:
      ports:
         - "8080:8080"

   postgres:
      ports:
         - "5432:5432"
   ```

   ---

   ## Cas d'usage avancés

   ### Changer les ports
 
   ```bash
   docker-compose up -d
   ```
   (et modifier docker-compose si besoin)

   ### Utiliser une autre version du backend

   Dans docker-compose.yml : 
   ```YAML
   backend:
      image: ghcr.io/<user>/bibliotheque-backend:1.0.0
   ```

   ### Reset complet
   ```bash
   docker-compose down -v
   docker-compose up -d
   ```

   ---

   ## Troubleshooting

   ### Backend ne démarre pas

   ```bash
   docker-compose logs backend
   ```

   ### Images obsolètes

   ```bash
   docker-compose pull
   docker-compose up -d
   ```

   ### Ports déjà utilisés

   ```bash
   lsof -i :8080
   ```

   ---

   ## Documentation associée

   - [SETUP.md](SETUP.md) - Guide installation complète
   - [HELP.md](HELP.md) - Aide rapide
   - [../README.md](../README.md) - Vue d'ensemble et démarrage

   ---

   ## Résumé une ligne

   **Exécutez `npm run setup` et tout fonctionne automatiquement**

   ---

   Version: 1.0  
   Date: 2026
   Status: Configuration dynamique complète
