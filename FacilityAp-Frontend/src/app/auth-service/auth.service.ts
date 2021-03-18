import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,

} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthService {
  URL = environment.BaseURL;
  idToken: string;
  GroupNames: any;
  decoded;
  groupName: any;
  token: string;
  isAdmin = false;
  isLogistiekeMedewerker = false;
  isMedewerker = false;
  isFacilitaireCoordinator = false;
  isLogistiekeCoordinator = false;
  isOpleidinghoofd = false;
  isFacilitaireMedewerker = false;
  isExternalFirm = false;
  requestOptions;
  headerDict;
  routeId;
  constructor(private http: HttpClient) {
    this.idToken = localStorage.getItem('idToken');
    this.headerDict = {
      Authorization: 'Bearer ' + this.idToken,
    };
    this.requestOptions = {
      headers: new HttpHeaders(this.headerDict),
    };
  }
  /**
   * het call graph API fetch informatie over groepen waartoe de user behoort
   * @returns json met groepen informatie zoals display name en Id
   */
  getRoles() {
    const admin = 'Admin';
    const logistiekeCoordinator = 'LogistiekeCoordinator';
    const logistiekeMedewerker = 'LogistiekeMedewerker';
    const facilitaireCoordinator = 'FacilitaireCoordinator';
    const Opleidinghoofd = 'Opleidinghoofd';
    const facilitaireMedewerker = 'FacilitaireMedewerker';
    const medewerker = 'Medewerker';
    this.idToken = localStorage.getItem('idToken');
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this.idToken,
    });
    return this.http
      .get(this.URL + '/user/me', { headers })
      .subscribe((resGroupNames: User) => {
        this.GroupNames = resGroupNames.role;
        this.groupName = localStorage.setItem('GroupNames', this.GroupNames);
        if (this.GroupNames === admin) {
          this.isAdmin = true;
        } else if (this.GroupNames === logistiekeCoordinator) {
          this.isLogistiekeCoordinator = true;
        } else if (this.GroupNames === logistiekeMedewerker) {
          this.isLogistiekeMedewerker = true;
        } else if (this.GroupNames === facilitaireCoordinator) {
          this.isFacilitaireCoordinator = true;
        } else if (this.GroupNames === Opleidinghoofd) {
          this.isOpleidinghoofd = true;
        } else if (this.GroupNames === facilitaireMedewerker) {
          this.isFacilitaireMedewerker = true;
        } else if (this.GroupNames === medewerker) {
          this.isMedewerker = true;
        }
      });
  }

  checkIfExternalFirm() {
    this.idToken = localStorage.getItem('idToken');
    if (this.idToken != null) {
    this.decoded = jwt_decode(this.idToken);
    if ( this.decoded != null && this.decoded.role != null && this.decoded.role === 'externalFirm'
     && this.decoded.exp > (new Date().getTime() + 1) / 1000) {
    this.isExternalFirm = true;
    return true;
    }
  }
  }


  /**
   * het check als de gebruiker ingelogd in of niet door te zoeken bij de local storage of de msal.idtoken daar bestaat
   * @returns het returneerd true als user ingelogd is en false als niet
   */
  Authenticated() {
     this.routeId = location.pathname;
     this.idToken = localStorage.getItem('idToken');
     if (this.idToken != null) {

    this.decoded = jwt_decode(this.idToken);
    if ( this.decoded != null && this.decoded.exp > (new Date().getTime() + 1) / 1000 && this.decoded.role == null) {
     return true;
    }
  }

  }


  /**
   * dit methode wordt gebruikt om binnen de backend http get request door te sturen zodat we
   * alle users van AP terug krijgen.
   */
  getAllUsers() {
    return this.http.get<any>(this.URL + '/user', this.requestOptions);
  }

  /**
   * dit methode returneert informatie van de ingelogd user zoals email , naam en id
   */
  currentUserInfo(): Observable<any>  {
    this.idToken = localStorage.getItem('idToken');
    this.headerDict = {
      Authorization: 'Bearer ' + this.idToken,
    };
    this.requestOptions = {
      headers: new HttpHeaders(this.headerDict),
    };
    return this.http.get<User>(this.URL + '/user/me', this.requestOptions);
  }


  getUsersListRoles(): Observable<any> {
    return this.http.get<any>(this.URL + '/users', this.requestOptions);
  }

  addMemberToRole(id, role, user: User) {
    const Body = {
      id: user.id,
      name: user.name,
      email: user.email,
      role,
    };
    return this.http.put<any>(
      this.URL + '/role/' + id,
      Body,
      this.requestOptions
    );
  }

  removeUsersFromRoles(id) {
    return this.http.put<any>(
      this.URL + '/role-delete/' + id,
      null,
      this.requestOptions
    );
  }

  updateNotificationSetting(id, notification) {
    const body = {
      Notification: notification
    };
    return this.http.put<any>(this.URL + '/userNotification/' + id, {notification}, this.requestOptions);
  }

}
