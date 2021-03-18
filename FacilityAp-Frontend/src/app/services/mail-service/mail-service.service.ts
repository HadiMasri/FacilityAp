import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Mail } from 'src/app/models/Mail';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  URL = environment.BaseURL;
  contentHeaders: HttpHeaders;
  idToken: string;
  requestOptions;
  headerDict;
  constructor(private http: HttpClient) {  this.idToken = localStorage.getItem('idToken');
                                           this.headerDict = {Authorization: 'Bearer ' + this.idToken, };
                                           this.requestOptions = {headers: new HttpHeaders(this.headerDict), };
}


  sendMail(mail: Mail) {
    return this.http.post<Mail>(this.URL + '/mail', mail, this.requestOptions );
  }
}
