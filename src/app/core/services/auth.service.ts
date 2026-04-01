import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/models';
import { StorageService } from './storage.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly storage = inject(StorageService);

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/auth/login`, payload)
      .pipe(tap((response) => this.storage.setAuth(response, payload.email, payload.motDePasse)));
  }

  logout(): void {
    this.storage.clear();
  }

  currentUser(): LoginResponse | null {
    return this.storage.getAuth();
  }

  isBibliothecaire(): boolean {
    return this.currentUser()?.role === 'BIBLIOTHECAIRE';
  }

  isLoggedIn(): boolean {
    return this.storage.isLoggedIn();
  }
}
