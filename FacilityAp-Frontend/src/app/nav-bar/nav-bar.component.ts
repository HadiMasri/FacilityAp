import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth-service/auth.service';
import { ReportService } from '../services/report.service';
import { Status } from '../models/Report';
import { ArchiveService } from '../services/archive.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  public title = 'Overzicht';
  isIframe = false;
  userID: string;
  userName: string;
  userEmail: string;
  GroupNames: string;
  notifList = [];
  accessToken: any;
  isSubLoaded: boolean;
  notification: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  constructor(
    private breakpointObserver: BreakpointObserver,
    private titleService: Title,
    private router: Router,
    public authService: AuthService,
    public archiveService: ArchiveService,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.getSubscribedReports();

    if (this.isLoggedIn()) {
      /**
       * we krijgen hier json informatie van getuserunfor function, en we storen de display name en email in variablen
       *  zodat we het kunne gebruiken binnen onze html pagina
       */

      this.authService.currentUserInfo().subscribe((resInfo) => {
        this.userName = resInfo.name;
        this.userEmail = resInfo.email;
        this.userID = resInfo.id;
        localStorage.setItem('UserID', this.userID);
        localStorage.setItem('UserName', this.userName);
      });
      this.authService.getRoles();
      this.authService.checkIfExternalFirm();


    /**
     * get Navside title from localstorage
     */
      const titleFromLocalstorage = sessionStorage.getItem('title');
      if (titleFromLocalstorage === null) {
      this.title = 'Overzicht';
      this.titleService.setTitle( 'Overzicht' );
    } else {
      this.title = titleFromLocalstorage;
      this.titleService.setTitle( titleFromLocalstorage );
    }
      this.authService.currentUserInfo().subscribe((resInfo) => {
      this.notification = resInfo.notification;
      if (this.notification) {
        this.getAllSubscribedReports();
      } else {
        this.getSubscribedReports();
      }
    });
  }
}
  public setTitle(newTitle: string) {
    sessionStorage.setItem('title', newTitle);
    this.title = newTitle;
    this.titleService.setTitle(newTitle);
  }
  /**
   * het log de user uit als hij ingelogd is
   */
  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }
  /**
   * het checkt als de gebruiker ingelogd is of niet
   * @returns true als de gebruiker ingelogd is en false als niet
   *
   */
  isLoggedIn() {
    return this.authService.Authenticated();
  }

  getSubscribedReports() {
    this.archiveService.getSubscribedReports().subscribe((res: any) => {
      if (res !== null && res.length > 0) {
        res.forEach((element) => {
          if (
            element.status === Status.FINISHED ||
            element.status === Status.DISCARDED
          ) {
            this.notifList.push(element);
          }
        });
        this.isSubLoaded = true;
      } else {
        this.isSubLoaded = false;
      }
    });
  }

  getAllSubscribedReports() {
    this.reportService.getSubscribedReports().subscribe((res: any) => {
      if (res !== null && res.length > 0) {
        res.forEach((element) => {
          if (!(element.status === Status.OPEN)) {
            this.notifList.push(element);
          }
        });
        this.isSubLoaded = true;
      } else {
        this.isSubLoaded = false;
      }
    });
    this.getSubscribedReports();
  }
}
