import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const bibliothecaireGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isBibliothecaire()) {
    return true;
  }

  return router.createUrlTree(['/recherche']);
};
