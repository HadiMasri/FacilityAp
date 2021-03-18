import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, public router: Router) {}
  canActivate(): boolean {
    /**
     * dit checkt als de user admin role heeft, redirect hem naar de admin page, anders wordt redirect naar home pagina
     */
    if (this.authService.isAdmin) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
