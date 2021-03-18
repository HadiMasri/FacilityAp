import { TestBed, async } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';



describe('AuthService', () => {

  let service: AuthService;
  let httpMock: HttpTestingController;
   beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service  = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);

  });
  afterEach(() => {
    httpMock.verify();
  });

  it('it should retrieve all users information from Api via GET', () =>{
    const dummyData: any =
      {
        id: '5eceda6303560f3270ed948f',
        name: 'Masri Abdulhadi',
        email: 'abdulhadi.masri@student.ap.be',
        role: 'Admin',
      };

    service.getUsersListRoles().subscribe(res => {
      console.log(res);
      expect(res).toEqual(dummyData[1]);
    })
    const request = httpMock.expectOne(`${service.URL}/users`);
    expect(request.request.method).toBe('GET');
  });

  it('it should retrieve information about ingelogd user from Api via GET', () =>{
    const dummyData: any =
      {
        id: '5eceda6303560f3270ed948f',
        name: 'Masri Abdulhadi',
        email: 'abdulhadi.masri@student.ap.be',
        role: 'Admin',
      };

    service.currentUserInfo().subscribe(res => {
      console.log(res);
      expect(res).toEqual(dummyData[1]);
    })
    const request = httpMock.expectOne(`${service.URL}/user/me`);
    expect(request.request.method).toBe('GET');
  });

  it('it should retrieve information about ingelogd user with updated role from Api via PUT', () =>{
    const dummyData: any =
      {
        id: '5eceda6303560f3270ed948f',
        name: 'Masri Abdulhadi',
        email: 'abdulhadi.masri@student.ap.be',
        role: 'Admin',
      };
      const id = dummyData.id;
      const role = dummyData.role;
    service.addMemberToRole(id, role, dummyData).subscribe(res => {
      expect(res).toEqual(dummyData);
    })
    const request = httpMock.expectOne(`${service.URL}/addRole/${id}`);
    expect(request.request.method).toBe('PUT');
  });

  it('it should retrieve information about ingelogd user with role of medewerker from Api via PUT', () =>{
    const dummyData: any =
      {
        id: '5eceda6303560f3270ed948f',
        name: 'Masri Abdulhadi',
        email: 'abdulhadi.masri@student.ap.be',
        role: 'Medewerker',
      };
      const id = dummyData.id;
      const role = dummyData.role;
    service.removeUsersFromRoles(id).subscribe(res => {
      expect(res).toEqual(dummyData);
    })
    const request = httpMock.expectOne(`${service.URL}/roleRemove/${id}`);
    expect(request.request.method).toBe('PUT');
  });

  it('it should be false if id token is expired', () =>{

    expect(service.Authenticated).toBeTruthy
  });
});
