# 🚀 Configuration Rapide - Chemin Backend

## ⚡ Démarrage Express (2 minutes)

### Étape 1: Exécuter le script de configuration

**Sur Windows (PowerShell):**
```powershell
.\setup-backend.ps1
```

**Sur Mac/Linux (Bash):**
```bash
chmod +x setup-backend.sh
./setup-backend.sh
```

Le script va vous demander le chemin du backend et créer automatiquement le fichier `.env`.

### Étape 2: Lancer l'application

```bash
make setup
```

C'est tout! 🎉

---

## 🔧 Configuration Manuelle (si le script ne fonctionne pas)

### 1. Copier le template `.env.example`

```bash
cp .env.example .env
```

### 2. Éditer le fichier `.env`

Ouvrez `.env` et adapter:

```ini
# ⚠️ ADAPTER CE CHEMIN
BACKEND_PATH=C:/Users/Emili/OneDrive/Bureau/CDA/JAVA/TP/bibliotheque

# Les autres valeurs peuvent rester par défaut
FRONTEND_PORT=4200
BACKEND_PORT=8080
POSTGRES_PORT=5432
MAILPIT_PORT=8025
```

### 3. Vérifier le fichier

```bash
# Sur Windows (PowerShell)
Get-Content .env | Select-String "BACKEND_PATH"

# Sur Mac/Linux
cat .env | grep BACKEND_PATH
```

Vous devriez voir:
```
BACKEND_PATH=C:/Users/Emili/OneDrive/Bureau/CDA/JAVA/TP/bibliotheque
```

### 4. Lancer l'application

```bash
make setup
```

---

## 📋 Checklist avant `make setup`

- [ ] Fichier `.env` créé ou modifié
- [ ] `BACKEND_PATH` pointe vers le bon dossier
- [ ] Le fichier `Dockerfile` existe dans ce dossier
- [ ] Docker est installé et en cours d'exécution
- [ ] Ports 4200, 8080, 5432 ne sont pas occupés (optionnel: les changer dans `.env`)

---

## ✅ Vérifier la configuration

```bash
# Vérifier que le chemin pointe vers le bon dossier
cat .env | grep BACKEND_PATH

# Tester la configuration Docker
docker-compose --env-file .env config

# Voir les services
docker-compose --env-file .env ps
```

---

## 🎯 Commandes principales

```bash
# Démarrer tout
make setup

# Redémarrer
make restart

# Voir les logs
make docker-logs

# Arrêter
make stop

# Plus d'options
make help
```

---

## 🐛 Si ça ne marche pas

### Erreur: "build context ... not found"

Le chemin `BACKEND_PATH` est incorrect.

```bash
# Vérifier le chemin
ls "C:/Users/Emili/OneDrive/Bureau/CDA/JAVA/TP/bibliotheque/Dockerfile"

# Adapter dans .env si nécessaire
```

### Erreur: "Dockerfile not found"

```bash
# Vérifier que Dockerfile existe
ls <VOTRE_CHEMIN>/Dockerfile

# Si le Dockerfile est ailleurs, adapter BACKEND_PATH
```

### Port déjà occupé

Adapter les ports dans `.env`:

```ini
FRONTEND_PORT=3000   # Au lieu de 4200
BACKEND_PORT=9000    # Au lieu de 8080
```

### Docker ne démarre pas

```bash
# Tester Docker
docker --version

# Relancer Docker Desktop (Windows/Mac)
# ou le service Docker (Linux)
```

---

## 📚 Fichiers importants

- **`.env`** - Configuration locale (⚠️ NE PAS committer)
- **`.env.example`** - Template d'exemple (à committer)
- **`setup-backend.ps1`** - Script PowerShell Windows
- **`setup-backend.sh`** - Script Bash Mac/Linux
- **`docker-compose.yml`** - Orchestration (utilise `.env`)
- **`Makefile`** - Raccourcis de commandes

---

## 💡 Tips

### Garder la configuration à jour

Chaque fois que quelqu'un ajoute une nouvelle variable dans `.env.example`, n'oubliez pas de l'ajouter aussi dans votre `.env` personnel.

### Partager la configuration

Faites un `.env` de base et partagez-le en privé (Slack, Email), **PAS via Git**.

### Scripts d'automatisation

Les scripts `setup-backend.*` sont prêts à l'emploi:

```bash
# Windows
PowerShell -ExecutionPolicy Bypass -File setup-backend.ps1

# Mac/Linux
bash setup-backend.sh
```

---

**Besoin d'aide? Voir [BACKEND_PATH_GUIDE.md](BACKEND_PATH_GUIDE.md) pour plus de détails.**
