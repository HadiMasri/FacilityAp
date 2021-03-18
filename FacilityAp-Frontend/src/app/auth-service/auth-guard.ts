import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  routeId;
  constructor(private authService: AuthService, public router: Router) {}
  canActivate(): boolean {
    this.isLoggedIn();
    this.routeId = location.pathname;
    /**
     * dit checkt als de user niet ingelogd is, dan navidate hij altijd naar login pagina
     */
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  

  isLoggedIn() {
    return this.authService.Authenticated();
  }
}
