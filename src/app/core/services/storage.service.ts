import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/models';

const AUTH_KEY = 'biblio-auth';
const BASIC_KEY = 'biblio-basic';

@Injectable({ providedIn: 'root' })
export class StorageService {
  setAuth(auth: LoginResponse, email: string, password: string): void {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
    localStorage.setItem(BASIC_KEY, btoa(`${email}:${password}`));
  }

  getAuth(): LoginResponse | null {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) as LoginResponse : null;
  }

  getBasicToken(): string | null {
    return localStorage.getItem(BASIC_KEY);
  }

  clear(): void {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(BASIC_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getAuth() && !!this.getBasicToken();
  }
}
