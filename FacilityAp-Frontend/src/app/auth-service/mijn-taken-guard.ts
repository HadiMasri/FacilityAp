import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { MsalService } from '@azure/msal-angular';
@Injectable()
export class MijnTakenGuard implements CanActivate {
  constructor(private authService: AuthService, public router: Router) {
  }
  canActivate(): boolean {

    /**
     * dit controleert wie heeft toegang naar mijn meldingen pagina
     */
    if ( this.authService.isFacilitaireCoordinator &&  this.authService.isFacilitaireMedewerker) {


      // bij mijn taken pagina kan hij alleen toegewijzen aan mij zien.
      this.router.navigate(['/']);
      return false;
    } else{
      return true;
    }

  }




}
