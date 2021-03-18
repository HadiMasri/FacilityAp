import { Order, Campus, Status } from 'src/app/models/Order';
import { TestBed } from '@angular/core/testing';
import { OrderService } from '././order.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService],
    });
    service = TestBed.get(OrderService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  /**
   * test Get All report using HttpClientTestingModule
   */
  it('should retrieve orders from Api via GET', () => {
    const dummyData: any = [
      {
        assignTo: { id: '9876543', name: 'mark' },
        campus: 'ELL',
        category: 'Drank',
        categoryDepartment: 'Logistieke diensten',
        createdOn: '2020-06-10',
        description: 'We hebben 20 cola drankjes nodig',
        id: '5eac1b79223f8546ac60a9fc',
        location: '03.12',
        requesterId: 'ccef3838-504e-4ed3-9235-3a17a039d7d1',
        requesterName: 'test user',
        status: 'Wachten op ontvangst door logistic employee',
        title: 'Drankjes',
      },
      {
        assignTo: { id: '9876543', name: 'mark' },
        campus: 'NOO',
        category: 'Lokaalinrichting',
        categoryDepartment: 'Logistieke diensten',
        createdOn: '2020-05-10',
        description: '10 grote tafels voor ons planning poker game',
        id: '5eac1b79223f8546ac60a4fd',
        location: '03.12',
        requesterId: 'ccef3838-504e-4ed3-9235-3a17a039d7d1',
        requesterName: 'test user',
        status: 'Wachten op ontvangst door logistic employee',
        title: 'Tafels',
      },
    ];
    service.getOrders().subscribe((res) => {
      // expect(res.length).toBe(2);
      expect(res).toEqual(dummyData);
    });

    const request = httpMock.expectOne(`${service.URL}/orders`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyData);
  });
  /**
   * Get One Order By Id
   */
  it('should retrieve orders By id from Api via GET', () => {
    const dummyData2: any = [
      {
        assignTo: { id: '9876543', name: 'mark' },
        campus: 'ELL',
        category: 'Drank',
        categoryDepartment: 'Logistieke diensten',
        createdOn: '2020-06-10',
        description: 'We hebben 20 cola drankjes nodig',
        id: '5eac1b79223f8546ac60a9fc',
        location: '03.12',
        requesterId: 'ccef3838-504e-4ed3-9235-3a17a039d6c1',
        requesterName: 'test user',
        status: 'Wachten op ontvangst door logistic employee',
        title: 'Drankjes',
      },
      {
        assignTo: { id: '9876543', name: 'mark' },
        campus: 'NOO',
        category: 'Lokaalinrichting',
        categoryDepartment: 'Logistieke diensten',
        createdOn: '2020-05-10',
        description: '10 grote tafels voor ons planning poker game',
        id: '5eac1b79223f8546ac60a4fd',
        location: '03.12',
        requesterId: 'ccef3838-504e-4ed3-9235-3a17a039d7d1',
        requesterName: 'test user',
        status: 'Wachten op ontvangst door logistic employee',
        title: 'Tafels',
      },
    ];
    const Id = dummyData2[1].id;
    service.getOrder(Id).subscribe((res) => {
      expect(res).toEqual(dummyData2[1]);
    });

    const request = httpMock.expectOne(`${service.URL}/order/${Id}`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyData2[1]);
  });

  /**
   * Get One Order By requesterId
   */
  it('should retrieve orders By requesterId from Api via GET', () => {
    const dummyData2: any = [
      {
        assignTo: { id: '9876543', name: 'mark' },
        campus: 'ELL',
        category: 'Drank',
        categoryDepartment: 'Logistieke diensten',
        createdOn: '2020-06-10',
        description: 'We hebben 20 cola drankjes nodig',
        id: '5eac1b79223f8546ac60a9fc',
        location: '03.12',
        requesterId: 'ccef3838-504e-4ed3-9235-3a17a039d7d1',
        requesterName: 'test user',
        status: 'Wachten op ontvangst door logistic employee',
        title: 'Drankjes',
      },
      {
        assignTo: { id: '9876543', name: 'mark' },
        campus: 'NOO',
        category: 'Lokaalinrichting',
        categoryDepartment: 'Logistieke diensten',
        createdOn: '2020-05-10',
        description: '10 grote tafels voor ons planning poker game',
        id: '5eac1b79223f8546ac60a4fd',
        location: '03.12',
        requesterId: 'ccef3838-504e-4ed3-9235-3a17a039d7d1',
        requesterName: 'test user',
        status: 'Wachten op ontvangst door logistic employee',
        title: 'Tafels',
      },
    ];
    const requesterId = dummyData2[1].requesterId;
    service.getMyOrders(requesterId).subscribe((res) => {
      expect(res).toEqual(dummyData2[1]);
    });

    const request = httpMock.expectOne(
      `${service.URL}/byRequesterId/${requesterId}`
    );

    expect(request.request.method).toBe('GET');

    request.flush(dummyData2[1]);
  });

  /**
   * Get One Report By  assign to me
   */
  it('shoul retrieve orders assign to me By userid from Api via GET', () => {
    const dummyData2: any = [
      {
        assignTo: { id: '9876543', name: 'mark' },
        campus: 'ELL',
        category: 'Drank',
        categoryDepartment: 'Logistieke diensten',
        createdOn: '2020-06-10',
        description: 'We hebben 20 cola drankjes nodig',
        id: '5eac1b79223f8546ac60a9fc',
        location: '03.12',
        requesterId: 'ccef3838-504e-4ed3-9235-3a17a039d7d1',
        requesterName: 'test user',
        status: 'Wachten op ontvangst door logistic employee',
        title: 'Drankjes',
      },
      {
        assignTo: { id: '9876543', name: 'mark' },
        campus: 'NOO',
        category: 'Lokaalinrichting',
        categoryDepartment: 'Logistieke diensten',
        createdOn: '2020-05-10',
        description: '10 grote tafels voor ons planning poker game',
        id: '5eac1b79223f8546ac60a4fd',
        location: '03.12',
        requesterId: 'ccef3838-504e-4ed3-9235-3a17a039d7d1',
        requesterName: 'test user',
        status: 'Wachten op ontvangst door logistic employee',
        title: 'Tafels',
      },
    ];

    service.getOrdersAssignToMe().subscribe((res) => {
      expect(res).toEqual(dummyData2[1]);
    });
    const userid = service.userid;
    const request = httpMock.expectOne(
      `${service.URL}/orders/assignToId/${userid}`
    );

    expect(request.request.method).toBe('GET');

    request.flush(dummyData2[1]);
  });
});
