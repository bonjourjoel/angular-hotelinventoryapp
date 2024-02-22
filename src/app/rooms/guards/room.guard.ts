import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { LoginService } from '../../login.service';

export const roomGuardCanActivateChild: CanActivateChildFn = (
  childRoute,
  state
) => {
  const loginService = inject(LoginService);
  return loginService.isLoggedIn && loginService.isAdmin;
};
