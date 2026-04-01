import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ressource, RessourceCreateRequest } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ResourceService {
  private readonly http = inject(HttpClient);

  search(criteria: {
    titre?: string | null;
    auteur?: string | null;
    anneePublication?: number | string | null;
    theme?: string | null;
  }): Observable<Ressource[]> {
    const year =
      criteria.anneePublication === null ||
      criteria.anneePublication === undefined ||
      criteria.anneePublication === ''
        ? null
        : Number(criteria.anneePublication);

    return this.http.post<Ressource[]>(
      `${environment.apiBaseUrl}/ressources/advanced-search`,
      {
        titre: criteria.titre?.trim() || null,
        auteur: criteria.auteur?.trim() || null,
        anneePublication: Number.isNaN(year) ? null : year,
        theme: criteria.theme?.trim() || null
      }
    );
  }

  getById(id: number): Observable<Ressource> {
    return this.http.get<Ressource>(`${environment.apiBaseUrl}/ressources/${id}`);
  }

  create(payload: RessourceCreateRequest): Observable<Ressource> {
    return this.http.post<Ressource>(`${environment.apiBaseUrl}/ressources`, payload);
  }
}