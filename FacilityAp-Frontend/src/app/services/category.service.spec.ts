import { CategoryService } from './category.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Category } from '../models/Order';
describe('CategoryService', () => {

  let service: CategoryService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });
    service  = TestBed.get(CategoryService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  /**
   * test Get All report using HttpClientTestingModule
   */
  it('should retrieve Categories by departmant Name from Api via GET', () => {
    const dummyData: any = [
    {
      department:'Facilitaire diensten',
	    categories:  ['Sanitair','Verwarming','Verlichting','Elektriciteit','Deur','Muur','Vloer','Lokaaluitrusting',
	    'Ventilatie','Ventilatie','Lift','Signalisatie','Zonnewering','Dak','Tuin','Camera', 'Alarm','Diensten' ]
    },
    {
      department:"ICT diensten",
      categories:  ["Computer","Netwerk","ICT klasuitrusting","Diensten"]
    }
  ];
    let department = "ICT diensten"
    service.getCategoriesBydepartment(department).subscribe(res => {
    //expect(res.categories.length).toBe(4);
    expect(res).toEqual(dummyData[1]);
  });

    const request = httpMock.expectOne(`${service.URL}/category/${department}`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyData[1]);
  });

  /**
   * Add a new department
   */
  // it('Should add a new department', () => {
  //   const data:Category = {
  //     'id': '',
  //     'department': 'Test',
  //     'categories': ['Netwerk', 'Drank', 'Voeding']
  //   }

  //   service.newDepartment('Test').subscribe(res => {
  //     expect(res).toEqual(data);
  //   });

  //   const request = httpMock.expectOne(`${service.URL}/department/Test`, 'Post department to api');
  //   expect(request.request.method).toBe('POST');

  //   request.flush(data);
  // });

  /**
   * Delete a department
   */
  // it('Should delete an existing department', () => {
  //   const data:Category = {
  //     'id': 'categorie',
  //     'department': 'Test',
  //     'categories': ['Netwerk', 'Drank', 'Voeding']
  //   }

  //   service.deleteDepartment(data.id).subscribe(res => {
  //     console.log(res);
  //     expect(res).toEqual(data);
  //   });

  //   const request = httpMock.expectOne(`${service.URL}/department/${data.id}`, 'Delete department from api');
  //   expect(request.request.method).toBe('DELETE');

  //   request.flush(data);
  // });

  /**
   * Add a new category to an existing department
   */
  // it('Should add a new category to an existing department', () => {
  //   const newCategories = ['Netwerk', 'Drank', 'Voeding', 'Ok']
  //   const data:Category = {
  //     'id': 'cat',
  //     'department': 'Test',
  //     'categories': ['Netwerk', 'Drank', 'Voeding']
  //   }

  //   service.addCategory(data.id, 'Ok').subscribe(res => {
  //     expect(res).toEqual(['Netwerk', 'Drank', 'Voeding', 'Ok']);
  //     console.log(res);
  //   });

  //   const request = httpMock.expectOne(`${service.URL}/category/${data.id}`, 'Post category to api');
  //   expect(request.request.method).toBe('POST');

  //   request.flush(newCategories);
  // });

  /**
   * Delete an existing category from an existing department
   */
  // it('Should delete a category from an existing department', () => {
  //   const newCategories = ['Netwerk', 'Drank', 'Voeding']
  //   const data:Category = {
  //     'id': 'cat',
  //     'department': 'Test',
  //     'categories': ['Netwerk', 'Drank', 'Voeding', 'Ok']
  //   }

  //   service.deleteCategory(data.id, 'Ok').subscribe(res => {
  //     expect(res).toEqual(['Netwerk', 'Drank', 'Voeding']);
  //   });

  //   const request = httpMock.expectOne(`${service.URL}/category/${data.id}`, 'Delete category from api');
  //   expect(request.request.method).toBe('DELETE');

  //   request.flush(newCategories);
  // });
});
