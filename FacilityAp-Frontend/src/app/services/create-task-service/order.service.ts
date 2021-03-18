import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order, Status, Category } from '../../models/Order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  URL = environment.BaseURL;
  userid = localStorage.getItem('UserID');
  userName = localStorage.getItem('UserName');
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

  public createOrder(order, userName, userId) {
    order.requesterId = userId;
    order.requesterName = userName;
    order.Status = Status.OPEN;

    const fb = new FormData();
    fb.append('order', JSON.stringify(order));
    return this.http.post<Order>(this.URL + '/order', fb, this.requestOptions);
  }

  getOrders() {
    return this.http.get<Order[]>(`${this.URL}/orders`, this.requestOptions);
  }

  /**
   * Ontvang een report op basis van id
   * @ param orderId
   */
  getOrder(orderId: string) {
    return this.http.get<Order>(
      `${this.URL}/order/${orderId}`,
      this.requestOptions
    );
  }

  assignOrderToEmployee(assignedUser, requesterId, orderId) {
    const body = {
      assignTo: assignedUser,
      requesterId,
      orderId,
    };
    return this.http.post(
      this.URL + '/order/assignEmployee',
      body,
      this.requestOptions
    );
  }


  assignOrderToFirm(assignedFirm, requesterId, orderId) {
    const body = {
      assignToFirm: assignedFirm,
      requesterId,
      orderId
    };
    return this.http.post(this.URL + '/order/assignFirm', body, this.requestOptions);
  }



  /**
   * Update een report op basis van id
   * @ param order
   */
  updateOrder(order: Order) {
    const fb = new FormData();
    fb.append('order', JSON.stringify(order));
    return this.http.put<Order>(
      this.URL + `/order/${order.id}`,
      fb,
      this.requestOptions
    );
  }

  getAllCategorie() {
    return this.http.get<Category[]>(
      this.URL + '/getAllCategory',
      this.requestOptions
    );
  }

  getMyOrders(userId: string) {
    return this.http.get<Order[]>(
      this.URL + `/byRequesterId/${userId}`,
      this.requestOptions
    );
  }

  getOrdersAssignToMe() {
    return this.http.get<Order[]>(
      this.URL + `/orders/assignToId/${this.userid}`,
      this.requestOptions
    );
  }

  /**
   * Delete order from Orders Collections in de database
   * @param id order id
   */
  deleteOrder(id) {
    return this.http.delete<Order>(
      this.URL + '/order/delete/' + id,
      this.requestOptions
    );
  }
}
