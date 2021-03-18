import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Status } from '../models/Report';
import { ArchiveService } from '../services/archive.service';
import { ReportService } from '../services/report.service';
import { AuthService } from '../auth-service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notificaties',
  templateUrl: './notificaties.component.html',
  styleUrls: ['./notificaties.component.css'],
})
export class NotificatiesComponent implements OnInit {
  constructor(
    private archiveService: ArchiveService,
    private toastr: ToastrService,
    private authService: AuthService,
    private reportService: ReportService
  ) {}
  newInnerHeight;
  newInnerWidth;
  @ViewChild('tabGroup', { static: true }) tabGroup;
  @ViewChild('tabGroup2', { static: true }) tabGroup2;
  isSubLoaded: boolean;
  notifList = [];
  notifList2 = [];
  UserID = localStorage.getItem('UserID');
  notification: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.newInnerHeight = event.target.innerHeight;
    this.newInnerWidth = event.target.innerWidth;
  }

  ngOnInit() {
    this.newInnerWidth = window.innerWidth;
    this.authService.currentUserInfo().subscribe((resInfo) => {
      this.notification = resInfo.notification;
      if (this.notification) {
        this.getAllSubscribedReports();
      } else {
        this.getSubscribedReports();
      }
    });
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

  removeNotification(report) {
    this.notifList = this.notifList.filter((item) => item !== report);
    this.archiveService
      .removeUserVote(report, this.UserID)
      .subscribe((result) => {
        this.toastr.success('Gelukt!', 'Notificatie verwijderd.');
      });
  }

  getAllSubscribedReports() {
    this.reportService.getSubscribedReports().subscribe((res: any) => {
      if (res !== null && res.length > 0) {
        res.forEach((element) => {
          if (!(element.status === Status.OPEN)) {
            this.notifList2.push(element);
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
