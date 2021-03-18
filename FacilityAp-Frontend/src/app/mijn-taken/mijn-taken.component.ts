import { AuthService } from 'src/app/auth-service/auth.service';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Order } from '../models/Order';
import { MatTableFilter } from 'mat-table-filter';
import {
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatTabChangeEvent,
} from '@angular/material';
import { OrderService } from '../services/create-task-service/order.service';

@Component({
  selector: 'app-mijn-taken',
  templateUrl: './mijn-taken.component.html',
  styleUrls: ['./mijn-taken.component.css'],
})
export class MijnTakenComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    public authService: AuthService
  ) {}
  displayedColumns: string[] = [
    'title',
    'category',
    'campus',
    'location',
    'date',
    'time',
    'status',
    'detail',
  ];
  TaskscolumnsToSort = [
    { value: 'title', viewValue: 'Taak' },
    { value: 'category', viewValue: 'Categorie' },
    { value: 'date', viewValue: 'Datum' },
    { value: 'campus', viewValue: 'Campus' },
    { value: 'location', viewValue: 'Lokaal' },
    { value: 'status', viewValue: 'Status' },
  ];

  GroupNames: any;
  returnValue: boolean;
  dataSource = new MatTableDataSource<any>([]);
  dataSource2 = new MatTableDataSource<any>([]);
  newInnerHeight;
  newInnerWidth;
  orders: any;
  filteredArray = [];
  searchText;
  filterEntity: Order;
  filterType: MatTableFilter;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('paginator2', { static: false }) paginator2: MatPaginator;
  @ViewChild('tabGroup', { static: true }) tabGroup;
  @ViewChild('tabGroup2', { static: true }) tabGroup2;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  retrieveResonse: any;
  base64Data: any;
  isOrderLoaded: boolean;
  isMyTakenLoaded: boolean;
  ordersAssign = [];

  public TasksortBy = 'title';
  public direction = 'desc';
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.newInnerHeight = event.target.innerHeight;
    this.newInnerWidth = event.target.innerWidth;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.newInnerWidth = window.innerWidth;

    this.getMyOrders();
    this.filterEntity = new Order();
    this.filterType = MatTableFilter.ANYWHERE;
    this.dataSource.sort = this.sort;
    this.getAssignToMeOrders();
    const index = localStorage.getItem('userTabLocation') || 0; // get stored number or zero if there is nothing stored
    const indexNr = +index;
    this.tabGroup.selectedIndex = indexNr; // with tabGroup being the MatTabGroup accessed through ViewChild
    this.tabGroup2.selectedIndex = indexNr;
  }

  getMyOrders() {
    const userId = localStorage.getItem('UserID');
    this.orderService.getMyOrders(userId).subscribe((res: any) => {
      if (res !== null && res.length > 0) {
        this.dataSource = new MatTableDataSource<Order>(res);
        this.dataSource.paginator = this.paginator;
        this.orders = res;
        this.isOrderLoaded = true;
      } else {
        this.isOrderLoaded = false;
      }
    });
  }

  getAssignToMeOrders() {
    this.orderService.getOrdersAssignToMe().subscribe((res: any) => {
      if (res !== null && res.length > 0) {
        this.dataSource2 = new MatTableDataSource<Order>(res);
        this.dataSource2.paginator = this.paginator2;
        this.ordersAssign = res;
        this.isMyTakenLoaded = true;
      } else {
        this.isMyTakenLoaded = false;
      }
    });
  }

  handleMatTabChange(event: MatTabChangeEvent) {
    localStorage.setItem('userTabLocation', event.index.toString());
  }

  SortBy() {
    // asc desc
    switch (this.direction) {
      case 'asc':
        return (this.direction = 'desc');
      case 'desc':
        return (this.direction = 'asc');
      default:
        return (this.direction = 'desc');
    }
  }

  isMemberOfGroup(group: string) {
    this.GroupNames = localStorage.getItem('GroupNames');
    if (this.GroupNames !== null) {
      const a = this.GroupNames.toString().indexOf(group);

      if (a !== -1) {
        this.returnValue = true;
      }
    }
    return this.returnValue;
  }
}
