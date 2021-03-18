import { Report } from 'src/app/models/Report';
import { TestBed } from '@angular/core/testing';
import { ReportService } from './report.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

describe('ReportService', () => {
  let service: ReportService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReportService],
    });
    service = TestBed.get(ReportService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  /**
   * test Get All report using HttpClientTestingModule
   */
  it('shoul retrieve reports from Api via GET', () => {
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
        priority: 'LOW',
        reporterId: 'ccef3838-504e-4ed3-9235-3a17a039d6c1',
        reporterName: 'test user',
        status: 'Wachten op ontvangst door facilitaire diensten',
        subscribers: ['1234568'],
        title: 'Eri geen internet verbinding',
        upVote: 0,
      },
    ];
    service.getReports().subscribe((res) => {
      // expect(res.length).toBe(2);
      expect(res).toEqual(dummyData);
    });

    const request = httpMock.expectOne(`${service.URL}/report`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyData);
  });
  /**
   * Get One Report By Id
   */
  it('shoul retrieve reports By id from Api via GET', () => {
    const dummyData2: any = [
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
        priority: 'LOW',
        reporterId: 'ccef3838-504e-4ed3-9235-3a17a039d6c1',
        reporterName: 'test user',
        status: 'Wachten op ontvangst door facilitaire diensten',
        subscribers: ['1234568'],
        title: 'Eri geen internet verbinding',
        upVote: 0,
      },
      {
        assignTo: { id: '2121212', name: 'Hadi' },
        bytes: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQ',
        campus: 'ELL',
        category: 'Netwerk',
        categoryDepartment: 'ICT diensten',
        createdOn: '2020-05-01',
        description: 'de verbinding valt weg',
        id: '5f5s1d5f1f5sf1s51sd5f',
        location: '-1.02',
        priority: 'LOW',
        reporterId: 'svsdvsrfzaavfbdfsdfsv252525',
        reporterName: 'test user',
        status: 'Wachten op ontvangst door facilitaire diensten',
        subscribers: ['1234568'],
        title: 'Eri geen internet verbinding',
        upVote: 0,
      },
    ];
    const Id = dummyData2[1].id;
    service.getReport(Id).subscribe((res) => {
      expect(res).toEqual(dummyData2[1]);
    });

    const request = httpMock.expectOne(`${service.URL}/report/${Id}`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyData2[1]);
  });

  /**
   * Get One Report By reporterId
   */
  it('shoul retrieve reports By reporterId from Api via GET', () => {
    const dummyData2: any = [
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
        priority: 'LOW',
        reporterId: 'ccef3838-504e-4ed3-9235-3a17a039d6c1',
        reporterName: 'test user',
        status: 'Wachten op ontvangst door facilitaire diensten',
        subscribers: ['1234568'],
        title: 'Eri geen internet verbinding',
        upVote: 0,
      },
      {
        assignTo: { id: '2121212', name: 'Hadi' },
        bytes: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQ',
        campus: 'ELL',
        category: 'Netwerk',
        categoryDepartment: 'ICT diensten',
        createdOn: '2020-05-01',
        description: 'de verbinding valt weg',
        id: '5f5s1d5f1f5sf1s51sd5f',
        location: '-1.02',
        priority: 'LOW',
        reporterId: 'svsdvsrfzaavfbdfsdfsv252525',
        reporterName: 'test user',
        status: 'Wachten op ontvangst door facilitaire diensten',
        subscribers: ['1234568'],
        title: 'Eri geen internet verbinding',
        upVote: 0,
      },
    ];
    const reporterId = dummyData2[1].reporterId;
    service.getMyReports(reporterId).subscribe((res) => {
      expect(res).toEqual(dummyData2[1]);
    });

    const request = httpMock.expectOne(
      `${service.URL}/report-reportedBy/${reporterId}`
    );

    expect(request.request.method).toBe('GET');

    request.flush(dummyData2[1]);
  });

  /**
   * Get alle defecten die aan mij toegewezen worden
   */
  it('shoul retrieve reports assign to me By userid from Api via GET', () => {
    const dummyData2: any = [
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
        priority: 'LOW',
        reporterId: 'ccef3838-504e-4ed3-9235-3a17a039d6c1',
        reporterName: 'test user',
        status: 'Wachten op ontvangst door facilitaire diensten',
        subscribers: ['1234568'],
        title: 'Eri geen internet verbinding',
        upVote: 0,
      },
      {
        assignTo: { id: '2121212', name: 'Hadi' },
        bytes: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQ',
        campus: 'ELL',
        category: 'Netwerk',
        categoryDepartment: 'ICT diensten',
        createdOn: '2020-05-01',
        description: 'de verbinding valt weg',
        id: '5f5s1d5f1f5sf1s51sd5f',
        location: '-1.02',
        priority: 'LOW',
        reporterId: 'svsdvsrfzaavfbdfsdfsv252525',
        reporterName: 'test user',
        status: 'Wachten op ontvangst door facilitaire diensten',
        subscribers: ['1234568'],
        title: 'Eri geen internet verbinding',
        upVote: 0,
      },
    ];

    service.getAssignToMeReports().subscribe((res) => {
      expect(res).toEqual(dummyData2[1]);
    });
    const userid = service.userid;
    const request = httpMock.expectOne(`${service.URL}/my-report/${userid}`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyData2[1]);
  });
});
