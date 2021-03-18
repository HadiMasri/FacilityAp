import { ArchiveService } from './../services/archive.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Report } from '../models/Report';
import { Order } from '../models/Order';
import { MatTableFilter } from 'mat-table-filter';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AuthService } from '../auth-service/auth.service';
import { ExportService } from '../services/export.service';
@Component({
  selector: 'app-archief',
  templateUrl: './archief.component.html',
  styleUrls: ['./archief.component.css'],
})
export class ArchiefComponent implements OnInit {
  // Auth variables
  GroupNames: any;
  isIframe = false;
  returnValue: boolean;
  filterEntity: Report;
  taskFilterEntity: Order;
  filterType: MatTableFilter;
  columnsToSort = [
    { value: 'title', viewValue: 'Titel' },
    { value: 'category', viewValue: 'Categorie' },
    { value: 'campus', viewValue: 'Campus' },
    { value: 'location', viewValue: 'Locatie' },
    { value: 'status', viewValue: 'Status' },
    { value: 'upVote', viewValue: 'Stemmen' },
  ];
  TaskscolumnsToSort = [
    { value: 'title', viewValue: 'Titel' },
    { value: 'date', viewValue: 'Datum' },
    { value: 'campus', viewValue: 'Campus' },
    { value: 'location', viewValue: 'Location' },
    { value: 'status', viewValue: 'Status' },
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
  ];
  displayedTaskColumns: string[] = [
    'title',
    'category',
    'campus',
    'location',
    'date',
    'time',
    'status',
  ];
  dataSource = new MatTableDataSource<any>([]);
  taskDataSource;
  newInnerHeight;
  newInnerWidth;
  reports = [];
  orders = [];
  ordersAssign = [];
  searchText;
  isReportLoaded: boolean;
  isOrdersLoaded: boolean;
  disableTextbox = false;
  public direction = 'desc'; // asc desc
  public sortBy = 'title';
  public TasksortBy = 'title';
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  @ViewChild('taskPaginator', { static: false }) taskPaginator: MatPaginator;
  @ViewChild('TABLE', { static: true }) table: ElementRef;
  @ViewChild('tabGroup', { static: true }) tabGroup;
  @ViewChild('tabGroup2', { static: true }) tabGroup2;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.newInnerHeight = event.target.innerHeight;
    this.newInnerWidth = event.target.innerWidth;
  }

  /**
   *
   * @param event zoek waarde
   * @returns lijst van defecten of orders volgens de zoek waarde
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    public authService: AuthService,
    private exportService: ExportService,
    private archiveService: ArchiveService
  ) {}
  toggleDisable() {
    this.disableTextbox = !this.disableTextbox;
  }
  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
    this.isLoggedIn();
    this.newInnerWidth = window.innerWidth;

    /**
     * We gebruiken deze attributen om onze filter entity en type te definiëren deze hebben we nodig om te kunnen zoeken
     * op elke attribuut binnen ons Report model
     */
    this.filterEntity = new Report();
    this.taskFilterEntity = new Order();
    this.filterType = MatTableFilter.ANYWHERE;
    this.getAllArchivedReports();
    this.getAllArchivedOrders();
    const index = localStorage.getItem('userTabLocation') || 0; // get stored number or zero if there is nothing stored
    const indexNr = +index;
    this.tabGroup.selectedIndex = indexNr; // with tabGroup being the MatTabGroup accessed through ViewChild
    this.tabGroup2.selectedIndex = indexNr;
  }
  /**
   *
   * @param priority Returneert de gepaste kleur voor de Priority Button gebaseerd op de prioriteitswaarde.
   */
  setPriorityColor(priority): string {
    switch (priority) {
      case 'HIGH':
        return '#af0412'; // Red
      case 'NORMAL':
        return '#ffa500'; // Orange
      case 'LOW':
        return '#28a745'; // Green
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
   * Dit gaat via de backend de data ophalen van ArchiveReports Collection en plaatsen in onze DataSource
   */
  getAllArchivedReports() {
    this.archiveService.getAllArchivedReports().subscribe(
      (data: any) => {
        if (data !== null && data.length > 0) {
          this.dataSource = new MatTableDataSource<Report>(data);
          this.dataSource.paginator = this.paginator;
          this.reports = data;
          this.isReportLoaded = true;
        } else {
          this.isReportLoaded = false;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  /**
   * Dit gaat via de backend de data ophalen van ArchiveOrders Collection en plaatsen in onze DataSource
   */
  getAllArchivedOrders() {
    this.archiveService.getAllArchivedOrders().subscribe((res: any) => {
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
  /**
   *
   * @param event tab value
   * @returns set the selected tab in de local storage
   */
  handleMatTabChange(event: MatTabChangeEvent) {
    localStorage.setItem('userTabLocation', event.index.toString());
  }

  /**
   * filter data op mobile divice
   */
  onFilter() {
    this.dataSource.data.sort((a, b) => (a.title > b.title ? 1 : -1));
  }
  /**
   * sort data asc and desc volegens de selected richting alleen voor mobile
   */
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
  /**
   * via deze functie worden alle defecten geexporteerd naar een excel
   * Index 0 is voor defecten en 1 voor taken
   */
  exportData() {
    if (this.tabGroup.selectedIndex === 0) {
      this.exportService.ExportData(
        this.dataSource,
        'Defecten List',
        'Defecten'
      );
    } else {
      this.exportService.ExportData(this.taskDataSource, 'Taken list', 'Taken');
    }
  }
}
