import { TestBed } from '@angular/core/testing';

import { UpVoteService } from './up-vote.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

describe('UpVoteService', () => {
  let service: UpVoteService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UpVoteService],
    });
    service = TestBed.get(UpVoteService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should update the upvote via PUT', () => {
    const dummyData: any = [
      {
        assignTo: { id: '1234568', name: 'Hamza' },
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
        upVote: 1,
      },
    ];
    const request = httpMock.expectOne(
      `${service.URL}/subscribe`,
      'put to api'
    );
    expect(request.request.method).toBe('PUT');

    request.flush(dummyData);
  });
});
