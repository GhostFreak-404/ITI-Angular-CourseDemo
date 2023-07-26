import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthUserService } from '../Services/auth-user.service';

export const authGuard: CanActivateFn = (route, state) => {
  let AuthUser = inject(AuthUserService);
  let router = inject(Router);

  if (AuthUser.loggedStatus) {
    return true;
  } else {
    router.navigate(['/Login']);
    return false;
  }
};
