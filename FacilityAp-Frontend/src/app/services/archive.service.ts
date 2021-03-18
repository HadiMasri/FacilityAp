import { Order } from './../models/Order';
import { Report } from './../models/Report';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ArchiveService {
  userid = localStorage.getItem('UserID');
  URL = environment.BaseURL;
  idToken: string;
  requestOptions;
  headerDict;
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
   * deze function voegt een Report to the archiveReports collection in de database
   * @param report report properties
   */
  moveReportToArchive(report) {
    return this.http.post<Report>(
      this.URL + '/report_archive',
      report,
      this.requestOptions
    );
  }
  /**
   * deze function voegt een Order to the archiveOrders collection in de database
   * @param report Order properties
   */
  moveOrderToArchive(order) {
    return this.http.post<Report>(
      this.URL + '/orderToArchive',
      order,
      this.requestOptions
    );
  }

  /**
   * get Alle gearchiveerde defecten
   */
  getAllArchivedReports() {
    return this.http.get<Report[]>(
      this.URL + '/report_archive',
      this.requestOptions
    );
  }

  /**
   * get Alle gearchiveerde Orders
   */
  getAllArchivedOrders() {
    return this.http.get<Order[]>(
      this.URL + '/ordersFromArchive',
      this.requestOptions
    );
  }
  /**
   * Deze functie gaat alle defecten ophalen waar de user op geabonneerd was
   */
  getSubscribedReports() {
    return this.http.get<Report[]>(
      this.URL + `/report_archive/${this.userid}`,
      this.requestOptions
    );
  }
  removeUserVote(report: Report, userId: string) {
    const userid = localStorage.getItem('UserID');
    const body = { report, userId };

    return this.http.put<Report>(
      this.URL + '/report_archive',
      body,
      this.requestOptions
    );
  }
}
