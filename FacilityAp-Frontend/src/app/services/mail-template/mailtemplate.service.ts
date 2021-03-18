import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MailTemplate } from 'src/app/models/MailTemplate';

@Injectable({
  providedIn: 'root'
})
export class MailtemplateService {
  URL = environment.BaseURL;
  idToken: string;
  requestOptions;
  headerDict;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    this.idToken = localStorage.getItem('idToken');
    this.headerDict = {
     Authorization: 'Bearer ' + this.idToken,
   };
    this.requestOptions = {
     headers: new HttpHeaders(this.headerDict),
   };
  }

  public createTemplate(template) {
    template.firmName =  'Beste firm';
    template.signature = 'Met vriendelijke groeten';
    template.hyperlink = 'Hyperlink: [Hyperlink]';
    return this.http.post<MailTemplate>(this.URL + '/mailtemplate', template, this.requestOptions);
  }


  getAllTemplates() {
    return this.http.get<MailTemplate[]>(`${this.URL}/mailtemplate`, this.requestOptions);
  }


  getTemplate(templateId: string) {
    return this.http.get<MailTemplate>(`${this.URL}/mailtemplate/${templateId}`, this.requestOptions);
  }


  updateTemplate(template: MailTemplate) {

    return this.http.put<MailTemplate>(this.URL + `/mailtemplate/${template.id}`, template, this.requestOptions);
  }


}
