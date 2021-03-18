import { OrderCommentData } from './../models/Order';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { OderComment } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderCommentService {
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
    comment: OderComment,
    orderId,
    orderCommentData: OrderCommentData
  ) {
    comment.orderId = orderId;
    comment.orderCommentData.push(orderCommentData);

    return this.http.post(
      this.URL + '/orderComment/' + orderId,
      comment,
      this.requestOptions
    );
  }

  getComment(orderId) {
    return this.http.get<OderComment>(
      this.URL + '/orderComment/' + orderId,
      this.requestOptions
    );
  }

  updateComment(orderId, index, text) {
    return this.http.patch(
      this.URL + '/orderComment/' + orderId + '/' + index + '?text=' + text,
      null,
      this.requestOptions
    );
  }
  deleteComment(orderId, index) {
    return this.http.delete(
      this.URL + '/orderComment/' + orderId + '/' + index,
      this.requestOptions
    );
  }
}
