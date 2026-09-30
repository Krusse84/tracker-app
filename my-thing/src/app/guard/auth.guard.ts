import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    map((user) => {
      if (user) {
        return true;
      } else {
        router.navigate(['sign-in']);
        return false;
      }
    })
  );
};