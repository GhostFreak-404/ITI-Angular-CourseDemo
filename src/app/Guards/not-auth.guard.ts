import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthUserService } from '../Services/auth-user.service';

export const notAuthGuard: CanActivateFn = (route, state) => {
  let AuthUser = inject(AuthUserService);
  let router = inject(Router);

  if (AuthUser.loggedStatus) {
    router.navigate(['/Home']);
    return false;
  } else {
    return true;
  }
};
