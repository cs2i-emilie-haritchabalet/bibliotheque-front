export interface LoginRequest {
  email: string;
  motDePasse: string;
}

export interface LoginResponse {
  id: number;
  nomComplet: string;
  email: string;
  role: 'BIBLIOTHECAIRE' | 'UTILISATEUR';
  type: string;
}

export interface Exemplaire {
  id: number;
  codeBarres: string;
  statut: string;
}

export interface Ressource {
  id: number;
  type: 'LIVRE' | 'REVUE';
  titre: string;
  auteur: string;
  anneePublication: number;
  theme: string;
  cautionExigee: number;
  emplacement: string;
  referenceSpecifique?: string;
  exemplaires: Exemplaire[];
}

export interface Emprunt {
  id: number;
  utilisateurId: number;
  utilisateur: string;
  ressourceId: number;
  ressource: string;
  codeBarres: string;
  dateEmprunt: string;
  dateRetourPrevue: string;
  dateRetour?: string;
  statut: 'EN_COURS' | 'EN_RETARD' | 'RETOURNE';
}

export interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: 'BIBLIOTHECAIRE' | 'UTILISATEUR';
  type: 'ETUDIANT' | 'ENSEIGNANT' | 'PARTICULIER' | 'BIBLIOTHECAIRE';
  cautionDisponible: number;
  actif: boolean;
}

export interface UtilisateurCreateRequest {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  type: 'ETUDIANT' | 'ENSEIGNANT' | 'PARTICULIER';
  cautionDisponible: number;
}

export interface RessourceCreateRequest {
  type: 'LIVRE' | 'REVUE';
  titre: string;
  auteur: string;
  anneePublication: number;
  theme: string;
  cautionExigee: number;
  emplacementCode: string;
  emplacementLibelle: string;
  nombreExemplaires: number;
  isbn?: string;
  numero?: number;
}

export interface RelanceResponse {
  message: string;
}
