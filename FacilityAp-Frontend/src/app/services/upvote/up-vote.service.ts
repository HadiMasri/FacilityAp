import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Report } from 'src/app/models/Report';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UpVoteService {
  URL = environment.BaseURL;
  idToken: string;
  requestOptions;
  headerDict;
  public isGeaboneerd;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.idToken = localStorage.getItem('idToken');
    this.headerDict = {
      Authorization: 'Bearer ' + this.idToken,
    };
    this.requestOptions = {
      headers: new HttpHeaders(this.headerDict),
    };
  }

  /**
   * deze functie zal de data doorsturen naar de backend om deze aan te passen
   *
   */
  updateUserVote(report: Report, userId: string) {
    let subbed = false;

    const body = { report, userId };

    // tslint:disable-next-line:no-shadowed-variable
    report.subscribers.forEach((element) => {
      if (element === userId) {
        subbed = true;
      }
    });
    if (subbed) {
      this.http
        .put<Report>(this.URL + '/unsubscribe', body, this.requestOptions)
        .subscribe((result) => {
          this.toastr.warning('Gelukt!', 'U bent gedeabonneerd.');
        });
      report.upVote = +report.upVote - 1;
      report.subscribers.length = report.subscribers.length - 1;
      this.isGeaboneerd = false;
    } else {
      this.http
        .put<Report>(this.URL + '/subscribe', body, this.requestOptions)
        .subscribe((result) => {
          this.toastr.success('Bedankt !', 'U bent geabonneerd.');
        });
      report.upVote = +report.upVote + 1;
      report.subscribers.length = report.subscribers.length + 1;
      report.subscribers.push(userId);
      this.isGeaboneerd = true;
    }
  }
  removeUserVote(report: Report) {
    const userid = localStorage.getItem('UserID');
    const body = { report, userid };

    this.http
      .put<Report>(this.URL + '/unsubscribe', body, this.requestOptions)
      .subscribe((result) => {
        this.toastr.success('Gelukt!', 'Notificatie verwijderd.');
      });
  }
}
