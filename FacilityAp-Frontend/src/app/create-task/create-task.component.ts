import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/create-task-service/order.service';
import { Order, Campus, Status } from '../models/Order';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Location } from '@angular/common';
import {
  ELLfloor,
  NOOfloor,
  ELLLocationfloorMin_1,
  ELLLocationfloor_0,
  ELLLocationfloor_1,
  ELLLocationfloor_2,
  ELLLocationfloor_3,
  ELLLocationfloor_4,
  NOOLocationfloorMin_1,
  NOOLocationfloor_0,
  NOOLocationfloor_1,
  NOOLocationfloor_2,
  NOOLocationfloor_3,
  NOOLocationfloor_4,
  NOOLocationfloor_5,
} from '../models/groundplans';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  departments = ['Logistieke diensten'];
  selected = 'option2';
  campusen = Campus;
  selectedCampus: string;
  public campusenOption = [];
  public order: Order = new Order();
  categories: string[] = [];
  public userId = localStorage.getItem('UserID');
  public userName = localStorage.getItem('UserName');
  public floors: string[];
  public locaties: string[];

  constructor(
    private os: OrderService,
    private toastr: ToastrService,
    private router: Router,
    private categoryService: CategoryService,
    private location: Location
  ) {}

  ngOnInit() {
    this.campusenOption = Object.keys(this.campusen);
  }

  onChange(campus) {
    this.selectedCampus = campus;
  }

  /**
   *  Deze functie voegt een nieuwe task toe door de functie "createOrder()"
   *  binnen de "OrderService" aan te roepen
   */
  createOrder() {
    this.order.status = Status.OPEN;
    const title = this.order.title.replace(/ {2,}/g, ' ').trim();
    const describtion = this.order.description.replace(/ {2,}/g, ' ').trim();
    this.order.title = title;
    this.order.description = describtion;
    this.os.createOrder(this.order, this.userName, this.userId).subscribe(
      (res) => {
        this.toastr.success('Bedankt !', 'Taak wordt toegevoegd');
        this.router.navigate(['/']);
      },
      (error) => {
        this.toastr.error('Er is een Error');
      }
    );
  }

  /**
   * deze function call backend function om Alle  Categorie vanuit database te halen
   *
   */
  onDepartmentChange(e) {
    const department = e.target.value;
    this.categoryService.getCategoriesBydepartment(department).subscribe(
      (res) => {
        this.categories = res[0].categories;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  goBack() {
    this.location.back();
  }

  onCampusChange(event) {
    if (event.target.value === 'ELL') {
      this.floors = ELLfloor;
      this.selectedCampus = 'ELL';
    } else {
      this.floors = NOOfloor;
      this.selectedCampus = 'NOO';
    }
  }

  onEtageChange(event) {
    if (this.selectedCampus === 'ELL') {
      if (event.target.value === '-1') {
        this.locaties = ELLLocationfloorMin_1;
      } else if (event.target.value === '0') {
        this.locaties = ELLLocationfloor_0;
      } else if (event.target.value === '1') {
        this.locaties = ELLLocationfloor_1;
      } else if (event.target.value === '2') {
        this.locaties = ELLLocationfloor_2;
      } else if (event.target.value === '3') {
        this.locaties = ELLLocationfloor_3;
      } else if (event.target.value === '4') {
        this.locaties = ELLLocationfloor_4;
      }
    } else {
      if (event.target.value === '-1') {
        this.locaties = NOOLocationfloorMin_1;
      } else if (event.target.value === '0') {
        this.locaties = NOOLocationfloor_0;
      } else if (event.target.value === '1') {
        this.locaties = NOOLocationfloor_1;
      } else if (event.target.value === '2') {
        this.locaties = NOOLocationfloor_2;
      } else if (event.target.value === '3') {
        this.locaties = NOOLocationfloor_3;
      } else if (event.target.value === '4') {
        this.locaties = NOOLocationfloor_4;
      } else if (event.target.value === '5') {
        this.locaties = NOOLocationfloor_5;
      }
    }
  }
}
