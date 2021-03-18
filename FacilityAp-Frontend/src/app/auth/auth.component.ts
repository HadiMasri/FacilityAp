import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isIframe = false;
  loggedIn = false;
  returnValue: boolean;
  GroupNames: any;
  newInnerHeight;
  newInnerWidth;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.newInnerHeight = event.target.innerHeight;
    this.newInnerWidth = event.target.innerWidth;
  }
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
       this.isLoggedIn();
     /**
      * als de user ingelogd is en navigate naar de login page, wordt redirect naar home page
      */
        if(this.isLoggedIn() && !this.checkExternalFirm()){

          this.router.navigate(['/login']);
        }

  }
  /**
   * het checkt als de gebruiker ingelogd is of niet
   * @returns true als de gebruiker ingelogd is en false als niet
   *
   */
  isLoggedIn() {
    return this.authService.Authenticated();
  }

  checkExternalFirm() {
    return this.authService.checkIfExternalFirm();
  }

}
