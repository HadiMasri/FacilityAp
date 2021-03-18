import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Emergency } from '../../models/Emergency';

@Injectable({
  providedIn: 'root',
})
export class EmergencyService {
  URL = environment.BaseURL;
  idToken: string;
  requestOptions;
  headerDict;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
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

  /**
   * Deze functie creëert een nieuwe contact
   * @param contact
   */
  public createContact(contact) {
    const fb = new FormData();
    fb.append('contact', JSON.stringify(contact));
    return this.http.post<Emergency>(
      this.URL + '/contacts',
      fb,
      this.requestOptions
    );
  }

  /**
   * Deze functie haalt alle contacts vanuit de database
   */
  getAllContacts() {
    return this.http.get<Emergency[]>(
      `${this.URL}/contacts`,
      this.requestOptions
    );
  }

  /**
   * Deze functie haalt een contact vanuit de database op basis van een id
   * @param contactId
   */
  getContact(contactId: string) {
    return this.http.get<Emergency>(
      `${this.URL}/contacts/${contactId}`,
      this.requestOptions
    );
  }

  /**
   * Deze functie haalt contacten vanuit de database op basis van een department
   * @param department
   */
  getContactByDepartment(department) {
    return this.http.get<Emergency>(
      `${this.URL}/contacts/department/${department}`,
      this.requestOptions
    );
  }

  /**
   * Deze functie zorgt voor het updaten van een contact
   * @param contact
   */
  updateContact(contact: Emergency) {
    return this.http.put<Emergency>(
      this.URL + `/contacts/${contact.id}`,
      contact,
      this.requestOptions
    );
  }

  /**
   * Deze functie zorgt voor het verwijderen van een contact
   * @ param contactId
   */
  deleteContact(contactId: string) {
    return this.http.delete<Emergency>(
      `${this.URL}/contacts/${contactId}`,
      this.requestOptions
    );
  }
}
