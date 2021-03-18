import { TestBed } from '@angular/core/testing';

import { ArchiveService } from './archive.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

describe('ArchiveService', () => {
  let service: ArchiveService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArchiveService],
    });
    service = TestBed.get(ArchiveService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should post the report to backend via POST', () => {
    const dummyData: any = [
      {
        assignTo: { id: '1234568', name: 'kotiba' },
        bytes: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQ',
        campus: 'ELL',
        category: 'Netwerk',
        categoryDepartment: 'ICT diensten',
        createdOn: '2020-05-01',
        description: 'de verbinding valt weg',
        id: '5eac1b79223f8546ac60a9fa',
        location: '-1.02',
        closeTo: false,
        priority: 'LOW',
        reporterId: 'ccef3838-504e-4ed3-9235-3a17a039d6c1',
        reporterName: 'test user',
        status: 'Wachten op ontvangst door facilitaire diensten',
        subscribers: ['1234568'],
        title: 'Eri geen internet verbinding',
        upVote: 0,
      },
    ];
    service.moveReportToArchive(dummyData).subscribe((res) => {
      expect(res).toEqual(dummyData);
    });
    const request = httpMock.expectOne(`${service.URL}/archive`, 'post to api');
    expect(request.request.method).toBe('POST');

    request.flush(dummyData);
  });

  it('should post the order to backend via POST', () => {
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
        closeTo: false,
        requesterId: 'ccef3838-504e-4ed3-9235-3a17a039d7d1',
        requesterName: 'test user',
        status: 'Wachten op ontvangst door logistic employee',
        title: 'Drankjes',
      },
    ];
    service.moveOrderToArchive(dummyData).subscribe((res) => {
      expect(res).toEqual(dummyData);
    });
    const request = httpMock.expectOne(`${service.URL}/archive`, 'post to api');
    expect(request.request.method).toBe('POST');

    request.flush(dummyData);
  });

  it('shoul retrieve reports from Archive Api via GET', () => {
    const dummyData: any = [
      {
        assignTo: { id: '1234568', name: 'kotiba' },
        bytes: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQ',
        campus: 'ELL',
        category: 'Netwerk',
        categoryDepartment: 'ICT diensten',
        createdOn: '2020-05-01',
        description: 'de verbinding valt weg',
        id: '5eac1b79223f8546ac60a9fa',
        location: '-1.02',
        closeTo: false,
        priority: 'LOW',
        reporterId: 'ccef3838-504e-4ed3-9235-3a17a039d6c1',
        reporterName: 'test user',
        status: 'Wachten op ontvangst door facilitaire diensten',
        subscribers: ['1234568'],
        title: 'Eri geen internet verbinding',
        upVote: 0,
      },
      {
        assignTo: { id: '1234568', name: 'kotiba' },
        bytes: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQ',
        campus: 'ELL',
        category: 'Netwerk',
        categoryDepartment: 'ICT diensten',
        createdOn: '2020-05-01',
        description: 'de verbinding valt weg',
        id: '5f5s1d5f1f5sf1s51sd5f',
        location: '-1.02',
        closeTo: false,
        priority: 'LOW',
        reporterId: 'ccef3838-504e-4ed3-9235-3a17a039d6c1',
        reporterName: 'test user',
        status: 'Wachten op ontvangst door facilitaire diensten',
        subscribers: ['1234568'],
        title: 'Eri geen internet verbinding',
        upVote: 0,
      },
    ];
    service.getAllArchivedReports().subscribe((res) => {
      expect(res).toEqual(dummyData);
    });

    const request = httpMock.expectOne(`${service.URL}/archive`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyData);
  });
  it('shoul retrieve orders from Archive Api via GET', () => {
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
        closeTo: false,
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
        closeTo: false,
        requesterId: 'ccef3838-504e-4ed3-9235-3a17a039d7d1',
        requesterName: 'test user',
        status: 'Wachten op ontvangst door logistic employee',
        title: 'Tafels',
      },
    ];
    service.getAllArchivedOrders().subscribe((res) => {
      expect(res).toEqual(dummyData);
    });

    const request = httpMock.expectOne(`${service.URL}/archive`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyData);
  });
});
