import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  let userSrv = inject(UserService);
  let router = inject(Router);
  let loggedIn = userSrv.isLoggedIn();
  // if (!loggedIn) return false;
  if (!loggedIn)
  {
   //  return router.parseUrl("/login?msg=IQWIYE");
  }
  return true;
};
