import { TestBed } from '@angular/core/testing';

import { EmergencyService } from './emergency.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { Emergency } from 'src/app/models/Emergency';

describe('EmergencyService', () => {
  let service: EmergencyService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmergencyService],
    });
    service = TestBed.get(EmergencyService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  /**
   * test Get All contacts using HttpClientTestingModule
   */
  it('should retrieve all emergency contacts from Api via GET', () => {
    const dummyData: any = [
      {
        department: 'Facilitaire diensten',
        name: 'Mark Boamah',
        description: 'Diensthoofd facilitaire dienst',
        email: 'test@ap.be',
        telephone: '032123456',
        mobile: '046123456',
      },
      {
        department: 'ICT diensten',
        name: 'Kotiba Saket',
        description: 'Helpdesk medewerker',
        email: 'test1@ap.be',
        telephone: '032654321',
        mobile: '046654321',
      },
    ];
    service.getAllContacts().subscribe((res) => {
      //expect(res.length).toBe(2);
      expect(res).toEqual(dummyData);
    });

    const request = httpMock.expectOne(`${service.URL}/contacts`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyData);
  });

  /**
   * Get one contact By Id
   */
  it('should retrieve contact By id from Api via GET', () => {
    const dummyData2: any = [
      {
        id: '5eb3dfcd18e6b540ccff7431',
        department: 'Facilitaire diensten',
        name: 'Mark Boamah',
        description: 'Diensthoofd facilitaire dienst',
        email: 'test@ap.be',
        telephone: '032123456',
        mobile: '046123456',
      },
      {
        id: '5eb3dfcd18e6b540ccff7451',
        department: 'ICT diensten',
        name: 'Kotiba Saket',
        description: 'Helpdesk medewerker',
        email: 'test1@ap.be',
        telephone: '032654321',
        mobile: '046654321',
      },
    ];
    const Id = dummyData2[1].id;
    service.getContact(Id).subscribe(res => {

      expect(res).toEqual(dummyData2[1]);
    });

    const request = httpMock.expectOne(`${service.URL}/contacts/${Id}`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyData2[1]);
  });


  /**
   * Get contacts By department
   */
  it('should retrieve contact By department from Api via GET', () => {
    const dummyData3: any = [
      {
        id: '5eb3dfcd18e6b540ccff7431',
        department: 'Facilitaire diensten',
        name: 'Mark Boamah',
        description: 'Diensthoofd facilitaire dienst',
        email: 'test@ap.be',
        telephone: '032123456',
        mobile: '046123456',
      },
      {
        id: '5eb3dfcd18e6b540ccff7451',
        department: 'ICT diensten',
        name: 'Kotiba Saket',
        description: 'Helpdesk medewerker',
        email: 'test1@ap.be',
        telephone: '032654321',
        mobile: '046654321',
      },
    ];
    const department = dummyData3[1].department;
    service.getContactByDepartment(department).subscribe(res => {

      expect(res).toEqual(dummyData3[1]);
    });

    const request = httpMock.expectOne(`${service.URL}/contacts/department/${department}`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyData3[1]);
  });
});
