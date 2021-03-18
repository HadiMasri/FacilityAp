import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class ExternalFirmGuard implements CanActivate {
  routeId;
  constructor(private authService: AuthService, public router: Router) {}
  canActivate(): boolean {
    this.isLoggedIn();
    this.routeId = location.pathname;
    /**
     * dit checkt als de user niet ingelogd is, dan navidate hij altijd naar login pagina
     */

    if (!this.isLoggedIn() && !this.isExternalFirm()) {
      this.router.navigate(['/login'])
      return false;
    }else if(this.isExternalFirm() && !this.isLoggedIn()){
      return true
    }
    return true;
  }

  isLoggedIn() {
    return this.authService.Authenticated();
  }
isExternalFirm() {
  return this.authService.checkIfExternalFirm();
}

}
