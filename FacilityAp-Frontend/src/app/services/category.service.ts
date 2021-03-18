import { Category } from './../models/Report';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
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

  /**
   * get lijst van categories volgens de geselecteerde afdeling
   * @param department depatment naam
   */
  getCategoriesBydepartment(department) {
    return this.http.get<Category>(
      this.URL + '/category/' + department,
      this.requestOptions
    );
  }

  /**
   *  Returneert alle departementen met hun categorieën
   */
  getAllCategories() {
    return this.http.get<Category[]>(
      `${this.URL}/category`,
      this.requestOptions
    );
  }

  addCategory(departmentId: string, category: string) {
    return this.http.post(
      `${this.URL}/category/${departmentId}`,
      { category },
      this.requestOptions
    );
  }

  deleteCategory(departmentId: string, category: string) {
    this.requestOptions = {
      headers: new HttpHeaders(this.headerDict),
      body: { category },
    };

    return this.http.delete(
      `${this.URL}/category/${departmentId}`,
      this.requestOptions
    );
  }

  newDepartment(department: string) {
    return this.http.request(
      'post',
      `${this.URL}/department/${department}`,
      this.requestOptions
    );
  }

  deleteDepartment(departmentId: string) {
    return this.http.delete(
      `${this.URL}/department/${departmentId}`,
      this.requestOptions
    );
  }
}
