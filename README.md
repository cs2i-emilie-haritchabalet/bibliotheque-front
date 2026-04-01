# Bibliothèque universitaire - Front Angular

Frontend Angular généré pour le backend Spring Boot fourni précédemment.

## Fonctionnalités couvertes

- écran de connexion
- recherche simple et avancée de ressources
- détail d'une ressource
- page "Mes emprunts" avec retour
- création d'un utilisateur (bibliothécaire)
- ajout d'une ressource (bibliothécaire)
- suivi des retards et envoi des relances (bibliothécaire)
- protection des routes selon authentification et rôle

## Choix techniques

- Angular 21
- composants standalone
- Router Angular
- HttpClient + interceptor pour l'authentification HTTP Basic
- formulaires réactifs

## Démarrage

### 1. Lancer le backend

Le backend Spring Boot doit tourner sur `http://localhost:8080`.

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer Angular

```bash
npm start
```

L'application sera disponible sur `http://localhost:4200`.

Le fichier `proxy.conf.json` redirige `/api` vers `http://localhost:8080`, ce qui évite un problème CORS en développement.

## Comptes de démo

- Bibliothécaire : `admin@biblio.fr` / `admin123`
- Utilisateur : `alice@etu.fr` / `alice123`

## Correspondance avec le rapport

Le frontend couvre les écrans listés dans la section IHM du rapport : connexion, recherche, détail ressource, mes emprunts, inscription utilisateur, ajout de ressource, suivi des retards et relances.

## Ajustements utiles du rapport

- préciser que l'authentification côté front repose sur HTTP Basic, cohérente avec l'implémentation backend actuelle
- remplacer la mention générique des maquettes Angular par la structure réelle des pages et composants
- ajouter la notion de garde de routes et d'interceptor HTTP dans la partie architecture frontend

## Remarques

- Ce frontend est volontairement simple et pédagogique.
- Il est prévu pour fonctionner avec le backend déjà généré, sans JWT.
- Pour une version plus aboutie, on pourrait ajouter pagination, tri, filtres dynamiques, notifications visuelles et tests Angular.
