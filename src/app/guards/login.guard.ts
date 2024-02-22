import { inject } from '@angular/core';
import { CanActivateFn, CanLoadFn, Router } from '@angular/router';
import { LoginService } from '../login.service';

export const loginGuardCanActivate: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  return loginService.isLoggedIn ? true : router.navigate(['login']);
};

export const loginGuardCanLoad: CanLoadFn = (route, state) => {
  // lazy loaded module is not even loaded if not can load
  const loginService = inject(LoginService);
  const router = inject(Router);
  return loginService.isLoggedIn ? true : router.navigate(['login']);
};
