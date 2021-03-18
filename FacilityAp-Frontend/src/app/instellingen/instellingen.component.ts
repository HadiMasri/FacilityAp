import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { AzureGroups, Category, Status } from '../models/Report';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../services/category.service';
import { MatDialog } from '@angular/material';
import { CategoryComponent } from '../category/category.component';
import { CreateExternalFirmDialogComponent } from '../create-external-firm-dialog/create-external-firm-dialog.component';
import { ExternalfirmsService } from '../services/externalfirms/externalfirms.service';
import { EmergencyService } from '../services/emergency/emergency.service';
import { MatContactsDiaglogComponent } from '../shared/mat-contacts-diaglog/mat-contacts-diaglog.component';
import { ExternalFirm } from '../models/ExternalFirm';
import { UsersDialogComponent } from '../shared/users-dialog/users-dialog.component';
import { UpdateContactDialogComponent } from '../shared/update-contact-dialog/update-contact-dialog.component';
import { CategoryModalComponent } from '../shared/category-modal/category-modal.component';
import { Emergency } from '../models/Emergency';
import { MailtemplateService } from '../services/mail-template/mailtemplate.service';
import { MailTemplate } from '../models/MailTemplate';
import { UpdateMailtemplateComponent } from '../update-mailtemplate/update-mailtemplate.component';
import { AddMailTemplateComponent } from '../shared/add-mail-template/add-mail-template.component';
import { User } from '../models/User';
import { ConstantPool } from '@angular/compiler';
import { not } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-instellingen',
  templateUrl: './instellingen.component.html',
  styleUrls: ['./instellingen.component.css'],
})
export class InstellingenComponent implements OnInit {
  /**
   * Variables
   */
  defaultSelected;
  selection: number;
  notificationChoice = ['Notificatie voor finale statussen', 'Notificatie voor alle statussen'];
  GroupNames: any;
  returnValue: boolean;
  externalFirmsList = [];
  Categories: Category[];
  status = Status;
  statusList = [];
  selectedStatuses: string[];
  externalFirms: ExternalFirm;
  GroupsInformation: AzureGroups;
  GroupsList: AzureGroups[] = [];
  UsersList: User[] = [];
  UsersListInformation: User;
  facilitaireContacts;
  ictContacts;
  logistiekContacts;
  didactischContacts;
  newInnerHeight;
  newInnerWidth ;
  notification: boolean;
  contact: Emergency;
  public logistiekeContact = [];
  public ICTContact = [];
  id: string;
  userId = localStorage.getItem('UserID');
  template: MailTemplate;
  templates = [];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.newInnerHeight = event.target.innerHeight;
    this.newInnerWidth = event.target.innerWidth;
  }
  constructor(
    public authService: AuthService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private externalFirmsService: ExternalfirmsService,
    private toastr: ToastrService,
    private emergencyService: EmergencyService,
    private mailTemplateService: MailtemplateService
  ) {}

  ngOnInit() {
    this.getAllCategories();
    this.showAllFirms();
    this.getFacilityContacts();
    this.getLogisticContacts();
    this.getIctContacts();
    this.getDidactischContacts();
    this.statusList = Object.values(this.status);
    this.newInnerWidth = window.innerWidth;
    this.getAllTemplates();
    this.authService.currentUserInfo().subscribe(resInfo => {
      this.notification = resInfo.notification;
      if (this.notification) {this.defaultSelected = 1; } else {this.defaultSelected = 0; }
    });


  }
  /**
   * get alle categorieën
   */
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((data: any) => {
      this.Categories = data;
    });
  }
  /**
   * boeg een role toe aan een bepaalde user
   * @param role gekozen role
   */
  addRole(role): void {
    this.dialog.open(UsersDialogComponent, {
      width: '500px',
      autoFocus: false,
      maxHeight: '70vh',
      data: { role },
    });
  }
  /**
   * Add categorie aan de geselecteerde afdeling
   * @param category nieuwe categorie
   */
  addCategory(category: Category): void {
    const dialogRef = this.dialog
      .open(CategoryComponent, {
        width: '500px',
        autoFocus: false,
        maxHeight: '70vh',
        data: { category },
      })
      .afterClosed()
      .subscribe((res) => {});
  }
  /**
   * open categorie dialog
   */
  newCategory(): void {
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      width: '500px',
      autoFocus: false,
    });
  }

  /**
   * toon een lijst van alle bestaande firms
   */
  showAllFirms() {
    this.externalFirmsService.getAllFirms().subscribe(
      (res: any) => {
        this.externalFirmsList = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * met dit functie wordt de dialog van create external firm geopened
   */
  openCreateExternalFirmDialog() {
    this.dialog.open(CreateExternalFirmDialogComponent, {
      width: '550px',
      height: '430px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
    });
  }

  /**
   * met dit functie wordt de dialog van edit external firm geopened
   */
  openEditExternalFirmDialog(id) {
    this.dialog.open(CreateExternalFirmDialogComponent, {
      width: '550px',
      height: '430px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        FirmId: id,
      },
    });
  }

  /**
   * met dit functie wordt de dialog van alle users van groep geopened
   */
  openGroupUsersDialog(id, groupName) {
    this.dialog.open(UsersDialogComponent, {
      width: '550px',
      height: '430px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        groupId: id,
        groupName,
      },
    });
  }

  /**
   * wordt external firm verwijdert.
   * @param id het id van external firm die we willen verwijderen.
   */
  removeExternalFirm(id) {
    this.externalFirmsService.deleteFirm(id).subscribe((res) => {});
    location.reload();
    this.toastr.success('External firm has been removed.');
  }

  /**
   * Deze fuctie roept de "MatContactsDialogComponent" aan om een nieuwe contact te aanmaken
   */
  openAddContactDialog() {
    this.dialog.open(MatContactsDiaglogComponent, {
      width: '620px',
      height: '620px',
    });
  }

  /**
   * Deze functie roept de "UpdateContactDialogComponent" aan om een contact te updaten
   */
  openUpdateContactDialog(id) {
    this.dialog.open(UpdateContactDialogComponent, {
      width: '620px',

      height: '620px',
      data: {
        id,
      },
    });
  }

  /**
   * Deze functie zorg voor het verwijderen van een contact
   */
  deleteContact(id) {
    this.emergencyService.deleteContact(id).subscribe((res) => {
      if (res) {
        location.reload();
        this.toastr.success('Contact is verwijdered.');
      }
    });
  }

  /**
   * Deze functie haalt een emergency contact op van de database op basis van de id van de contact
   * @ param id van de geselecteerde contact
   */
  getContactById(id) {
    this.openUpdateContactDialog(id);
  }

  /**
   *  Deze functie haalt alle contacten onder facilitaire diensten op
   */
  getFacilityContacts() {
    const department = 'Facilitaire diensten';
    this.emergencyService
      .getContactByDepartment(department)
      .subscribe((res) => {
        this.facilitaireContacts = res;
      });
  }

  /**
   * Deze functie haalt alle contacten onder logistieke diensten op
   */
  getLogisticContacts() {
    const department = 'Logistieke diensten';
    this.emergencyService
      .getContactByDepartment(department)
      .subscribe((res) => {
        this.logistiekContacts = res;
      });
  }

  /**
   * Deze functie haalt alle contacten onder ICT diensten op
   */
  getIctContacts() {
    const department = 'ICT diensten';
    this.emergencyService
      .getContactByDepartment(department)
      .subscribe((res) => {
        this.ictContacts = res;
      });
  }

  /**
   * Deze functie haalt alle contacten onder Herstelling(Didactisch) diensten op
   */
  getDidactischContacts() {
    const department = 'Didactisch diensten';
    this.emergencyService
      .getContactByDepartment(department)
      .subscribe((res) => {
        this.didactischContacts = res;
      });
  }
  /**
   * open Add mail dialog
   */
  openAddMailTemplate() {
    this.dialog.open(AddMailTemplateComponent, {
      width: '950px',
      height: '420px',
    });
  }
  /**
   * open update mail dialog
   */
  openUpdateMailTemplateDialog(id) {
    this.dialog.open(UpdateMailtemplateComponent, {
      width: '950px',

      height: '420px',
      data: {
        id,
      },
    });
  }
  /**
   * get template vanuit DB bij id
   * @param id van de geselecteerde template
   */
  getTemplateById(id) {
    this.openUpdateMailTemplateDialog(id);
  }

  getTemplate() {
    this.mailTemplateService.getTemplate(this.id).subscribe((res: any) => {
      this.template = res;
    });
  }


changeNotif(selection) {
  switch (selection) {
    case 0:
      this.authService.updateNotificationSetting(this.userId, false).subscribe(res => {
        this.notification = false;
        this.toastr.success(`U zal nu notificaties krijgen voor finale statussen.`);
      }, error => {
        this.toastr.error(`U ontvangt al notificaties voor finale statussen.`);
      });
      break;
    case 1:
      this.authService.updateNotificationSetting(this.userId, true).subscribe(res => {
        this.notification = true;
        this.toastr.success(`U zal nu notificaties krijgen voor alle statussen.`);
      }, error => {
        this.toastr.error(`U ontvangt al notificaties voor alle statussen.`);
      });
      break;
  }
}
  getAllTemplates() {
    this.mailTemplateService.getAllTemplates().subscribe((res: any) => {
      this.templates = res;
    });
  }
  /**
   * update template
   */
  updateTemplate() {
    this.mailTemplateService.updateTemplate(this.template).subscribe((res) => {
      location.reload();
    });
  }
  /**
   * get external firm bij id
   * @param id van de geselecteerde firm
   */
  getFirmById(id) {
    this.openEditExternalFirmDialog(id);
  }
  /**
   *  open user dialog
   * @param groupId groep id
   * @param groupName groep naam
   */
  openUsersDialog(groupId, groupName) {
    this.openGroupUsersDialog(groupId, groupName);
  }
}
