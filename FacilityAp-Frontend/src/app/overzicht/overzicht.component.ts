import { Component, OnInit, ViewChild, HostListener, OnDestroy  } from '@angular/core';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { AuthService } from '../auth-service/auth.service';
import { MatTableDataSource, MatPaginator, MatTabChangeEvent } from '@angular/material';
import { Report, Status } from '../models/Report';
import { OrderService } from '../services/create-task-service/order.service';
import { Order } from '../models/Order';
import { ReportService } from '../services/report.service';
import { ArchiveService } from '../services/archive.service';
import { MatTableFilter } from 'mat-table-filter';
import {ElementRef} from '@angular/core';
import { DialogModalComponent } from '../shared/dialog-modal/dialog-modal.component';
import {MatBottomSheet } from '@angular/material';
import { ExportService } from '../services/export.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-overzicht',
  templateUrl: './overzicht.component.html',
  styleUrls: ['./overzicht.component.css'],
})
export class OverzichtComponent implements OnInit, OnDestroy {
  // Auth variables
  GroupNames: any;
  isIframe = false;
  returnValue: boolean;
  filterEntity: Report;
  taskFilterEntity: Order;
  filterType: MatTableFilter;
  isSubLoaded: boolean;
   columnsToSort = [
    {value: 'title', viewValue: 'Defect'},
    {value: 'category', viewValue: 'Categorie'},
    {value: 'campus', viewValue: 'Campus'},
    {value: 'location', viewValue: 'Lokaal'},
    {value: 'status', viewValue: 'Status'},
    {value: 'upVote', viewValue: 'Stemmen'}
   ];
   TaskscolumnsToSort = [
    {value: 'title', viewValue: 'Taak'},
    {value: 'date', viewValue: 'Datum'},
    {value: 'campus', viewValue: 'Campus'},
    {value: 'location', viewValue: 'Lokaal'},
    {value: 'status', viewValue: 'Status'},
   ];
  // Report variables
  displayedColumns: string[] = [
    'title',
    'category',
    'campus',
    'location',
    'status',
    'priority',
    'upVote',
    'detail'
  ];
  displayedTaskColumns: string[] = ['title', 'category', 'campus', 'location', 'date', 'time', 'status', 'detail'];
  dataSource = new MatTableDataSource<any>([]);

  taskDataSource;
  newInnerHeight;
  newInnerWidth;
  reports: any;
  orders = [];

  ordersAssign = [];
  searchText;
  isReportLoaded: boolean;
  cookieContent: string;
  isOrdersLoaded: boolean;
  disableTextbox =  false;
  public direction = 'desc'; // asc desc
  public sortBy = 'title';
  public TasksortBy = 'title';


  @ViewChild('paginator', { static: false }) paginator: MatPaginator;

  @ViewChild('taskPaginator', {static: false}) taskPaginator: MatPaginator;
  @ViewChild('TABLE', { static: true }) table: ElementRef;
  @ViewChild('tabGroup', { static: true }) tabGroup;
  @ViewChild('tabGroup2', { static: true }) tabGroup2;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.newInnerHeight = event.target.innerHeight;
    this.newInnerWidth = event.target.innerWidth;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  constructor(
    public authService: AuthService,
    private reportService: ReportService,
    private orderService: OrderService,
    // tslint:disable-next-line: variable-name
    private _bottomSheet: MatBottomSheet,
    private exportService: ExportService,
    private toastr: ToastrService,
    private archiveService: ArchiveService
  ) {}



toggleDisable() {
    this.disableTextbox = !this.disableTextbox;
}

  ngOnInit() {
     this.isIframe = window !== window.parent && !window.opener;
     this.isLoggedIn();
     this.newInnerWidth = window.innerWidth;
     this.getSubscribedReports();

    /**
     * We gebruiken deze attributen om onze filter entity en type te definiëren deze hebben we nodig om te kunnen zoeken
     * op elke attribuut binnen ons Report model
     */
     this.filterEntity = new Report();
     this.taskFilterEntity = new Order();
     this.filterType = MatTableFilter.ANYWHERE;

     this.getAllOrders();
     this.getAllReports();




     const index = localStorage.getItem('userTabLocation') || 0; // get stored number or zero if there is nothing stored
     const indexNr = +index;
     this.tabGroup.selectedIndex = indexNr; // with tabGroup being the MatTabGroup accessed through ViewChild
     this.tabGroup2.selectedIndex = indexNr;
  }

  ngOnDestroy() {
      // localStorage.removeItem('userTabLocation');


}

  /**
   *
   * @param priority Returneert de gepaste kleur voor de Priority Button gebaseerd op het aantal stemmen.
   */
  setPriorityColor(priority): string {
    if (priority >= 0 && priority < 5) {
      return '#28a745'; // Green
    } else if (priority < 11) {
      return '#ffa500'; // Orange
    } else {
      return '#af0412'; // Red
    }
    }

  /**
   * het checkt als de gebruiker ingelogd is of niet
   * @returns true als de gebruiker ingelogd is en false als niet
   *
   */
  isLoggedIn() {
    return this.authService.Authenticated();
  }



  /**
   * Dit gaat via de backend de data ophalen en plaatsen in onze DataSource
   */
  getAllReports() {
    this.reportService.getReports().subscribe((data: any) => {
      if (data !== null && data.length > 0) {

        this.dataSource = new MatTableDataSource<Report>(data);
        this.dataSource.paginator = this.paginator;
        this.reports = data;
        this.isReportLoaded = true;
      } else {
        this.isReportLoaded = false;
      }

    }, err => {
        console.log(err);
    });
  }


  getAllOrders() {
    this.orderService.getOrders().subscribe((res: any) => {
      if (res !== null && res.length > 0) {
        this.taskDataSource = new MatTableDataSource<Order>(res);
        // this.orders = new MatTableDataSource<(Order)>(res);
        this.taskDataSource.paginator = this.taskPaginator;
        this.orders = res;
        this.isOrdersLoaded = true;
      } else {
        this.isOrdersLoaded = false;
      }
    });
  }


  openBottomSheet(): void {
    this._bottomSheet.open(DialogModalComponent);
  }

  handleMatTabChange(event: MatTabChangeEvent ) {
    localStorage.setItem('userTabLocation', event.index.toString());
  }

  onFilter() {
    this.dataSource.data.sort((a, b) => (a.title > b.title) ? 1 : -1);
  }

  SortBy() {
    // asc desc
    switch (this.direction) {
      case  'asc':
        return this.direction = 'desc';
      case 'desc':
        return this.direction = 'asc';
      default:
        return this.direction = 'desc';
    }
  }

/**
 * via deze functie worden alle defecten geexporteerd naar een excel
 * Index 0 is voor defecten en 1 voor taken
 */
exportData() {
  if (this.tabGroup.selectedIndex === 0) {
    this.exportService.ExportData(this.dataSource, 'Defecten List', 'Defecten');
  } else {
    this.exportService.ExportData(this.taskDataSource, 'Taken list', 'Taken');
  }
}

/**
 * via deze functie worden alle archiveerde defecten opgehaald waarvan de status op voltooid is gezet
 */
  getSubscribedReports() {
    this.archiveService.getSubscribedReports().subscribe((res: any) => {
      if (res !== null && res.length > 0) {
        res.forEach(element => {
          if (element.status === Status.FINISHED) {
            this.toastr.success('Het defect: ' + element.title + ' is voltooid.');
          }
        }
          );
        this.isSubLoaded = true;
      } else {
        this.isSubLoaded = false;
      }
    });
  }
}
