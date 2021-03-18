import { Category } from './../models/Report';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status, Report, Priority } from '../models/Report';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  contentHeaders: HttpHeaders;
  URL = environment.BaseURL;
  userid = localStorage.getItem('UserID');
  userName = localStorage.getItem('UserName');
  idToken: string;
  requestOptions;
  headerDict;
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
   * @returns Ontvang alle meldingen vanuit de server
   */
  getReports() {
    return this.http.get<Report[]>(`${this.URL}/report`, this.requestOptions);
  }

  /**
   * Ontvang een report op basis van id
   * @param reportId report is
   */
  getReport(reportId: string) {
    return this.http.get<Report>(
      `${this.URL}/report/${reportId}`,
      this.requestOptions
    );
  }

  public createReport(report, selectedFile, username, userId) {
    report.reporterId = userId;
    report.reporterName = username;
    report.status = Status.OPEN;
    report.priority = Priority.LOW;
    const fb = new FormData();
    fb.append('report', JSON.stringify(report));
    fb.append('image', selectedFile[0]);
    return this.http.post<Report>(
      this.URL + '/report',
      fb,
      this.requestOptions
    );
  }

  /**
   * Update een report op basis van id
   * @param report report
   * @param selectedFile selected image
   */
  updateReport(report: Report, selectedFile) {
    const fb = new FormData();

    fb.append('report', JSON.stringify(report));
    fb.append('image', selectedFile[0]);

    return this.http.put<Report>(
      this.URL + `/report/${report.id}`,
      fb,
      this.requestOptions
    );
  }

  assignReportToEmplyee(assignedUser, reporterId, reportId) {
    const body = {
      assignTo: assignedUser,
      reporterId,
      reportId,
    };
    return this.http.post(
      this.URL + '/assign-report',
      body,
      this.requestOptions
    );
  }

  assignReportToFirm(assignedFirm, reporterId, reportId) {
    const body = {
      assignToFirm: assignedFirm,
      reporterId,
      reportId,
    };
    return this.http.post(
      this.URL + '/assignFirm-report',
      body,
      this.requestOptions
    );
  }

  getMyReports(userId: string) {
    return this.http.get<Report[]>(
      this.URL + '/report-reportedBy/' + userId,
      this.requestOptions
    );
  }

  getAssignToMeReports() {
    return this.http.get<Report[]>(
      this.URL + '/my-report/' + this.userid,
      this.requestOptions
    );
  }
  getSubscribedReports() {
    return this.http.get<Report[]>(
      this.URL + `/report-bySubscriberId/${this.userid}`,
      this.requestOptions
    );
  }

  /**
   * Delete Report from reports Collections
   */
  deleteReport(id) {
    return this.http.delete<Report>(
      this.URL + '/report/' + id,
      this.requestOptions
    );
  }
}
