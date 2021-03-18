import { Observable } from 'rxjs';
import { ReportComment, ReportCommentData } from './../models/Report';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  URL = environment.BaseURL;
  contentHeaders: HttpHeaders;
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

  addComment(
    comment: ReportComment,
    reportId,
    reportCommentData: ReportCommentData
  ) {
    comment.reportId = reportId;
    comment.reportCommentData.push(reportCommentData);

    return this.http.post(
      this.URL + '/comment/' + reportId,
      comment,
      this.requestOptions
    );
  }

  getComment(reportId) {
    return this.http.get<ReportComment>(
      this.URL + '/comment/' + reportId,
      this.requestOptions
    );
  }

  updateComment(reportId, index, text) {
    return this.http.patch(
      this.URL + '/comment/' + reportId + '/' + index + '?text=' + text,
      null,
      this.requestOptions
    );
  }
  deleteComment(reportId, index) {
    return this.http.delete(
      this.URL + '/comment/' + reportId + '/' + index,
      this.requestOptions
    );
  }
}
