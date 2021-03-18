import { TestBed } from '@angular/core/testing';

import { ExternalfirmsService } from './externalfirms.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

describe('ExternalfirmsService', () => {
  let service: ExternalfirmsService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExternalfirmsService],
    });
    service = TestBed.get(ExternalfirmsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should post the external firm to backend via POST', () => {
    const dummyData: any = [
      {
        displayName: 'adada',
        email: 'dsdadd@sda',
        id: undefined,
        telefonNr: '1231',
      },
    ];
    service.addFirm(dummyData).subscribe((res) => {
      expect(res).toEqual(dummyData);
    });
    const request = httpMock.expectOne(
      `${service.URL}/externalFirms`,
      'post to api'
    );
    expect(request.request.method).toBe('POST');

    request.flush(dummyData);
  });

  it('should retrieve all External Firms from Api via GET', () => {
    const dummyData: any = [
      {
        displayName: 'test@firm.be',
        email: '5eb91af9bb6bd96e9eda3641',
        id: undefined,
        telefonNr: '123456',
      },
    ];

    service.getAllFirms().subscribe((res) => {
      expect(res).toEqual(dummyData);
    });

    const request = httpMock.expectOne(`${service.URL}/externalFirms`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyData);
  });

  it('should retrieve external firm with the specified id from Api via GET', () => {
    const dummyId = '5eb91af9bb6bd96e9eda3641';
    const dummyData: any = [
      {
        displayName: 'test@firm.be',
        email: '5eb91af9bb6bd96e9eda3641',
        id: undefined,
        telefonNr: '123456',
      },
    ];

    service.getFirmById(dummyId).subscribe((res) => {
      expect(res).toEqual(dummyData);
    });

    const request = httpMock.expectOne(
      `${service.URL}/externalFirms/${dummyId}`
    );

    expect(request.request.method).toBe('GET');

    request.flush(dummyData);
  });

  it('should delete external firm with the specified id from Api via DELETE', () => {
    const dummyId = '5eb91af9bb6bd96e9eda3641';
    service.deleteFirm(dummyId).subscribe((res) => {
      // tslint:disable-next-line:no-unused-expression
      expect(res).toBeNull;
    });

    const request = httpMock.expectOne(
      `${service.URL}/externalFirms/${dummyId}`
    );

    expect(request.request.method).toBe('DELETE');
  });

  it('should Update external firm with the specified id from Api via Put', () => {
    const dummyId = '5eb91af9bb6bd96e9eda3641';
    const dummyData: any = [
      {
        displayName: 'test@firm.be',
        email: '5eb91af9bb6bd96e9eda3641',
        id: undefined,
        telefonNr: '123456',
      },
    ];

    service.updateFirm(dummyData, dummyId).subscribe((res) => {
      // tslint:disable-next-line:no-unused-expression
      expect(res).toBeNull;
    });

    const request = httpMock.expectOne(
      `${service.URL}/externalFirms/${dummyId}`,
      `${dummyData}`
    );

    expect(request.request.method).toBe('PUT');

    request.flush(dummyData);
  });
});
