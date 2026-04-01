import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('biblio-basic');

  if (!token || req.url.includes('/api/auth/login')) {
    return next(req);
  }

  return next(req.clone({
    setHeaders: {
      Authorization: `Basic ${token}`
    }
  }));
};
