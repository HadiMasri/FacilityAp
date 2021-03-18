import { ReportCommentData } from './../models/Report';
import { TestBed } from '@angular/core/testing';

import { CommentService } from './comment.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

describe('CommentService', () => {
  let service: CommentService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentService],
    });
    service = TestBed.get(CommentService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('should add comment to report via POST', () => {
    const dummyData: any = {
      reportId: '5ec15918855b7259c79fc4ac',
      reportCommentData: [],
    };

    const commentData: ReportCommentData = {
      createdByName: 'Admin',
      createdById: '43dc3b12-c805-4160-ba2b-9c407fd7a150',
      text: 'test comment',
    };
    service
      .addComment(dummyData, '5ec15918855b7259c79fc4ac', commentData)
      .subscribe((res) => {
        expect(res).toEqual(dummyData);
      });
    const request = httpMock.expectOne(`${service.URL}/comment`, 'post to api');
    expect(request.request.method).toBe('POST');

    request.flush(dummyData);
  });
});
