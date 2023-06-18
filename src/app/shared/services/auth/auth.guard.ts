import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  // si ça renvoie true, alors, on peut activer la route
  return authService.isAdmin()
  .then(authentifie => {
    if(authentifie) {
      return true;
    } else {
      return false;
    }
  })
};

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  // si ça renvoie true, alors, on peut activer la route
  return authService.isConnected()
  .then(authentifie => {
    if(authentifie) {
      return true;
    } else {
      return false;
    }
  })
};

export const connectGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  // si ça renvoie true, alors, on peut activer la route
  return authService.isNotConnected()
  .then(authentifie => {
    if(authentifie) {
      return true;
    } else {
      return false;
    }
  })
};