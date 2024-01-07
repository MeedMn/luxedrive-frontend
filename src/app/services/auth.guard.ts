import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRoles = (route.data as { roles: string[] }).roles
  if (authService.isAuthenticated() && requiredRoles) {
    const userRole = authService.getRole();
    if (userRole && requiredRoles.includes(userRole)) {
      return true;
    }
    return router.parseUrl('/admin/unauthorized');
  } else {
    return router.parseUrl('/admin/login');
  }
};
