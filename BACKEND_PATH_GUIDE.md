# 📁 Guide: Déterminer le chemin du Backend

## 🎯 Le Problème

Dans `docker-compose.yml`, vous avez:

```yaml
backend:
  build:
    context: ../bibliotheque-back-java  # ← Quel est le bon chemin?
```

Le chemin **dépend de la structure de vos dossiers**.

## 🔍 Comment trouver le bon chemin?

### Étape 1: Comprendre la structure actuelle

**Votre frontend est ici:**
```
C:\Users\Emili\Downloads\bibliotheque-front-angular\bibliotheque-front-angular
```

### Étape 2: Vérifier où se trouve le backend

Vous avez **deux options**:

#### Option A: Backend au même niveau que le frontend

**Structure:**
```
C:\Users\Emili\Downloads\
├── bibliotheque-front-angular/
│   └── bibliotheque-front-angular/
│       ├── package.json
│       ├── docker-compose.yml ← Vous êtes ici
│       └── ...
└── bibliotheque-back-java/          ← Backend au même niveau
    ├── pom.xml
    ├── Dockerfile
    └── ...
```

**Chemin à utiliser:**
```yaml
context: ../bibliotheque-back-java
```

#### Option B: Backend dans un sous-dossier du frontend

**Structure:**
```
C:\Users\Emili\Downloads\bibliotheque-front-angular\
├── bibliotheque-front-angular/
│   ├── package.json
│   ├── docker-compose.yml ← Vous êtes ici
│   └── ...
└── backend/
    └── bibliotheque-back-java/
        ├── pom.xml
        ├── Dockerfile
        └── ...
```

**Chemin à utiliser:**
```yaml
context: ./backend/bibliotheque-back-java
```

#### Option C: Backend complètement ailleurs

**Structure:**
```
C:\
├── Users\Emili\Downloads\bibliotheque-front-angular\...
└── D:\Projects\bibliotheque-back-java\
    ├── pom.xml
    ├── Dockerfile
    └── ...
```

**Chemin à utiliser (chemin absolu):**
```yaml
context: D:/Projects/bibliotheque-back-java
```

## 🧪 Comment vérifier le bon chemin?

### Méthode 1: Tester avec docker-compose (recommandé)

Avant de lancer, vérifiez le chemin:

```bash
# Depuis le répertoire du frontend
cd bibliotheque-front-angular

# Essayer le chemin
docker-compose config

# Vous verrez les erreurs si le chemin est mauvais
# Ex: "build context ../bibliotheque-back-java not found"
```

### Méthode 2: Vérifier manuellement

```bash
# Depuis votre frontend
cd bibliotheque-front-angular

# Essayer d'accéder au dossier spécifié
ls ../bibliotheque-back-java

# Si c'est trouvé, le chemin est bon!
# Si erreur "directory not found", le chemin est mauvais
```

### Méthode 3: Visualiser l'arborescence

```bash
# Depuis C:\Users\Emili\Downloads\

# Sur Windows (PowerShell)
tree /F

# Sur Mac/Linux
tree -L 3
```

## 📝 Exemple concret

Supposons votre structure est:

```
C:\Users\Emili\Downloads\
├── bibliotheque-front-angular\
│   └── bibliotheque-front-angular\
│       ├── Dockerfile
│       ├── docker-compose.yml ← Vous modifier ce fichier
│       ├── Makefile
│       └── package.json
│
└── bibliotheque-back-java\
    ├── Dockerfile
    ├── pom.xml
    └── src\
```

**Depuis `docker-compose.yml`, le chemin est:**

```
../bibliotheque-back-java
     ↑
  Remonte 1 niveau (de bibliotheque-front-angular)
```

**Pourquoi?**
```
bibliotheque-front-angular/
└── docker-compose.yml ← Point de départ
   
../ ← Remonte au parent (C:\Users\Emili\Downloads\)
   
../bibliotheque-back-java ← Accède au dossier backend
```

## ✅ Vérification rapide

Ouvrez un terminal et exécutez:

```bash
# Allez au répertoire du frontend
cd C:\Users\Emili\Downloads\bibliotheque-front-angular\bibliotheque-front-angular

# Testez le chemin
dir ..\bibliotheque-back-java

# Sur Windows, vous devriez voir:
# - Dockerfile
# - pom.xml
# - src
# - etc.
```

## 🔧 Adapter docker-compose.yml

Une fois le chemin trouvé, modifiez:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ../bibliotheque-back-java  # ← REMPLACER CE CHEMIN
      dockerfile: Dockerfile
    container_name: bibliotheque-backend
    # ... reste du fichier
```

## 🚀 Lancer après vérification

```bash
# Tester la configuration
docker-compose config

# Lancer
docker-compose up -d

# Vérifier les services
docker-compose ps
```

## 🐛 Troubleshooting

### Erreur: "build context ... not found"

```bash
# Le chemin est incorrect. Vérifier:
ls <votre_chemin>

# Exemple:
ls ../bibliotheque-back-java
```

### Erreur: "Dockerfile not found"

```bash
# Le Dockerfile n'existe pas au chemin spécifié
# Vérifier que le fichier existe:
ls ../bibliotheque-back-java/Dockerfile

# Si vous le trouvez ailleurs, adapter le chemin du dockerfile:
build:
  context: ../bibliotheque-back-java
  dockerfile: ./docker/Dockerfile  # Si dans un sous-dossier
```

### Build échoue mais chemin est bon

```bash
# Voir les logs de build
docker-compose logs backend

# Ou build directement pour plus de détails
docker build -t test ../bibliotheque-back-java
```

## 💡 Tips

### Utiliser des chemins relatifs (recommandé)

```yaml
# ✅ BON - Fonctionnera partout
context: ../bibliotheque-back-java

# ❌ MAUVAIS - Spécifique à votre machine
context: C:\Users\Emili\Downloads\bibliotheque-back-java

# ❌ MAUVAIS - Impossible si le backend n'existe pas
context: /home/user/backend
```

### .env pour chemins dynamiques

Vous pouvez aussi utiliser des variables:

```yaml
# docker-compose.yml
backend:
  build:
    context: ${BACKEND_PATH:-../bibliotheque-back-java}
```

```bash
# .env
BACKEND_PATH=../bibliotheque-back-java
```

Puis lancer:
```bash
docker-compose --env-file .env up -d
```

## 🎯 Résumé

| Situation | Chemin |
|-----------|--------|
| Backend au même niveau | `../bibliotheque-back-java` |
| Backend dans backend/ | `./backend/bibliotheque-back-java` |
| Backend ailleurs | Chemin absolu ou variable |
| Doute? | Tester: `ls ../bibliotheque-back-java` |

---

**Une fois le chemin configuré, exécutez:**
```bash
make setup
```

Et tout devrait fonctionner! 🚀
