import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth-service/auth.service';
import { HttpParams } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'FacilityToolFrontend';
  isIdToken = false;
  GroupNames: any;

  loggedIn = false;
  userID: string;
  userName: string;
  userEmail: string;
  token: string;
  decoded;
  constructor(public authService: AuthService) {}
  ngOnInit() {
    const url = location.href;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      this.token = httpParams.get('token');
      localStorage.setItem('idToken', this.token);
      this.decoded = jwt_decode(this.token);
      if(this.decoded.role == "externalFirm"){
        localStorage.setItem('UserName', this.decoded.FirmName)
        localStorage.setItem('UserId', this.decoded.FirmId)
      }
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
}
