import { CanActivateFn, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    // Avoid false redirect during SSR or non-browser environments
    return router.parseUrl('/loginLanding');
  }

  const patientToken = localStorage.getItem('Patienttoken');
  const generalToken = localStorage.getItem('token');
  const isAuthenticated = !!patientToken || !!generalToken;

  return isAuthenticated ? true : router.parseUrl('/loginLanding');
};
