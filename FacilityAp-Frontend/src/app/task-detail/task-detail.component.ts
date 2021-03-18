import { OrderCommentService } from './../services/order-comment.service';
import { OderComment, OrderCommentData } from './../models/Order';
import { Component, OnInit, HostListener } from '@angular/core';
import { OrderService } from '../services/create-task-service/order.service';
import { Order, Campus, Status } from '../models/Order';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatTabChangeEvent, MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { ConfirmDialogService } from '../shared/confirm-dialog.service';
import { ArchiveService } from '../services/archive.service';
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
import { User } from '../models/User';
import { ExternalfirmsService } from '../services/externalfirms/externalfirms.service';
import { ExternalFirm } from '../models/ExternalFirm';
import { MailtemplateService } from '../services/mail-template/mailtemplate.service';
import { SendMailtemplateComponent } from '../send-mailtemplate/send-mailtemplate.component';
import { MailTemplate } from '../models/MailTemplate';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent implements OnInit {
  departments = ['Logistieke diensten'];
  groupMemberObject: User;
  employeesList: User[] = [];
  assignToUserInformation: User;
  id: string;
  order: Order;
  Categories: string[] = [];
  requesterId: string;
  orderId: string;
  campusen = Campus;
  selectedCampus: string;
  public campusenOption = [];
  statusen = Status;
  selectedStatus: string;
  public statusenOption = [];
  isLoaded: boolean;
  form: string;
  newInnerWidth;
  GroupNames: any;
  returnValue: boolean;
  public LogedInUser: any;
  public selectedIndex;
  public floors: string[];
  public locaties: string[];
  public comment: OderComment;
  comments: OrderCommentData[] = [];
  CommentText = '';
  public isDisable = false;
  CommentIndex;
  public isEditMode = false;
  newText;
  taakUrl: any;
  firmList: ExternalFirm[] = [];
  assignToFirmInformation: ExternalFirm;
  public firm;
  public selectedFirm;
  template: MailTemplate;
  templates = [];
  UserID = localStorage.getItem('UserID');
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    public authService: AuthService,
    private location: Location,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private dialogService: ConfirmDialogService,
    private archiveService: ArchiveService,
    private router: Router,
    private orderCommentService: OrderCommentService,
    private externalFirmService: ExternalfirmsService,
    private mailTemplateService: MailtemplateService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.taakUrl= location.href;
    this.requesterId = localStorage.getItem('UserID');
    this.id = this.route.snapshot.paramMap.get('id');
    this.LogedInUser = localStorage.getItem('UserID');
    this.getOrder();
    this.campusenOption = Object.keys(this.campusen);
    this.statusenOption = Object.values(this.statusen);
    this.newInnerWidth = window.innerWidth;
    this.getLogistiekeMedewerkerGroup();
    this.getLogistiekeCoordinatorGroup();
    const index = localStorage.getItem('userTabLocationTaskDetails') || 0; // get stored number or zero if there is nothing stored
    const indexNr = +index;
    this.getComment();
    this.selectedIndex = indexNr; // with tabGroup being the MatTabGroup accessed through ViewChild
    this.selectedIndex = indexNr;
    this.getAllFirms();
    this.getAllTemplates();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.newInnerWidth = event.target.innerWidth;
    this.statusenOption = Object.values(this.statusen);
  }

  /**
   * krijg je hier alle leden van logistiekecoordinator groep en we lopen de response,
   * dan we voegen alle members id's en displayname in employeesList array
   */
  getLogistiekeCoordinatorGroup() {
    this.authService.getUsersListRoles().subscribe((res) => {
      res.forEach((element) => {
        if (element.role === 'LogistiekeCoordinator') {
          this.assignToUserInformation = {
            id: element.id,
            email: element.email,
            name: element.name,
          };
          this.employeesList.push(this.assignToUserInformation);
        }
      });
    });
  }

  /**
   * krijg je hier alle leden van logistiekemedewerker groep en we lopen de response,
   * dan we voegen alle members id's en displayname in employeesList array
   */
  getLogistiekeMedewerkerGroup() {
    this.authService.getUsersListRoles().subscribe((res) => {
      res.forEach((element) => {
        if (element.role === 'LogistiekeMedewerker') {
          this.assignToUserInformation = {
            id: element.id,
            email: element.email,
            name: element.name,
          };
          this.employeesList.push(this.assignToUserInformation);
        }
      });
    });
  }

  onChange(e) {
    this.assignToUserInformation = {
      id: e.target.value,
      name: e.target.options[e.target.options.selectedIndex].text,
    };
  }

  onStatusChange(status) {
    this.selectedStatus = status;
  }

  getSelectedAssignedUserInformation() {
    this.orderService
      .assignOrderToEmployee(
        this.assignToUserInformation,
        this.requesterId,
        this.id
      )
      .subscribe(
        (result) => {
          this.toastr.success(
            `Taak is succesfully toegevoegd aan ${this.assignToUserInformation.name}`
          );
          this.getOrder();
          // document.getElementById('externe').style.visibility = 'hidden';
        },
        (error) => {
          this.toastr.error('Er is een fout opgetreden.');
        }
      );
  }

  getOrder() {
    this.orderService.getOrder(this.id).subscribe((data: any) => {
      if (data !== null) {
        this.order = data;
        this.getCategoryByDepartment();
        this.getEtageByCampus();
        this.getLocationByCampusAndFloor();
        this.isLoaded = true;
      } else {
        this.isLoaded = false;
      }
    });
  }

  // Wijzigt de knop in de detailview op basis van de tab waarin de gebruiker zich bevindt.
  tabChange(e: MatTabChangeEvent) {
    const label = document.getElementById('interactLabel');

    switch (e.tab.textLabel) {
      case 'Algemeen':
        label.innerText = 'ABBONEREN';
        return;
      case 'Reacties':
        label.innerText = 'PLAATSEN';
        return;
      case 'Wijzigen':
        label.innerText = 'UPDATEN';
        return;
      case 'Toewijzen':
        label.innerText = 'TOEWIJZEN';
        return;
      case 'Status wijzigen':
        label.innerText = 'UPDATEN';
        return;
    }
  }

  /**
   * deze function call backend function om Alle  Categorie vanuit database te halen
   *
   */
  getCategoryByDepartment() {
    this.categoryService
      .getCategoriesBydepartment(this.order.categoryDepartment)
      .subscribe(
        (res) => {
          this.Categories = res[0].categories;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  updateOrder() {
    if (
      this.order.status === 'Wordt niet uitgevoerd' ||
      this.order.status === 'Voltooid'
    ) {
      this.whenOrderNotDoneOrDone(this.order.status);
    } else {
      const title = this.order.title.replace(/ {2,}/g, ' ').trim();
      const describtion = this.order.description.replace(/ {2,}/g, ' ').trim();
      this.order.title = title;
      this.order.description = describtion;
      this.orderService.updateOrder(this.order).subscribe(
        (res) => {
          this.toastr.success('De melding werd gewijzigd.', 'Succes!');
          this.getOrder();
        },
        (error) => {
          this.toastr.error('Er is een fout opgetreden.', 'Error!');
        }
      );
    }
  }
  goBack() {
    this.location.back();
  }

  handleMatTabChange(event: MatTabChangeEvent) {
    localStorage.setItem('userTabLocationTaskDetails', event.index.toString());
  }
  /**
   * deze function annuleert het report en stuurt het naar de archief
   * als de gebruiker accepteert dat
   */
  onCancleOrder() {
    this.dialogService
      .openConfirmDialog(
        'Weet u zeker dat u deze taak wilt annuleren? Deze actie kan niet ongedaan worden gemaakt'
      )
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          // Update
          this.order.status = this.statusen.DISCARDED;
          // tslint:disable-next-line:no-shadowed-variable
          this.orderService.updateOrder(this.order).subscribe((res) => {
            this.toastr.success('De taak werd gewijzigd.', 'Succes!');
          });
          // annuleren
          this.moveOrderToArchive();
          this.deleteOrder();
          this.toastr.success('Het order word gearchiveerd.');
          this.router.navigate(['/']);
        }
      });
  }
  /**
   * defect archiveren wanneer de order status wordt voltooid of wordt niet uitgevoerd
   * @param status status van defect
   */

  whenOrderNotDoneOrDone(status: string) {
    this.dialogService
      .openConfirmDialog(
        'Weet u zeker dat u de status van dit order wilt wijzigen naar (' +
          status +
          ') ? Deze actie kan niet ongedaan worden gemaakt'
      )
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          // Update
          // tslint:disable-next-line:no-shadowed-variable
          this.orderService.updateOrder(this.order).subscribe((res) => {
            this.toastr.success('De taak werd gewijzigd.', 'Succes!');
            location.reload();
          });
          // annuleren
          this.moveOrderToArchive();
          this.deleteOrder();
          this.toastr.success('De taak wordt gearchiveerd.');
          this.router.navigate(['/']);
        }
      });
  }
  /**
   * functie om order te sturen naar archief
   */
  moveOrderToArchive() {
    this.archiveService.moveOrderToArchive(this.order).subscribe((res) => {});
  }
  /**
   * delete order van order Collectie
   */
  deleteOrder() {
    this.orderService.deleteOrder(this.order.id).subscribe((res) => {});
  }
  /**
   * functie controleert welke status is geselecteert
   * @param event de selecteerde status
   * @returns Lijst van Etages adhv de geselecteerde status
   */
  onCampusChange(event) {
    if (event.target.value === 'ELL') {
      this.floors = ELLfloor;
      this.selectedCampus = 'ELL';
    } else {
      this.floors = NOOfloor;
      this.selectedCampus = 'NOO';
    }
  }
  /**
   * @returns lijst van etages adhv  Campus value in de geslecteerde order voor update
   */
  getEtageByCampus() {
    if (this.order.campus.toString() === 'ELL') {
      this.floors = ELLfloor;
    } else {
      this.floors = NOOfloor;
    }
  }
  /**
   * @returns lijst van etages adhv  Etage value in de geslecteerde order voor update
   */
  getLocationByCampusAndFloor() {
    if (this.order.campus.toString() === 'ELL') {
      if (this.order.floor === '-1') {
        this.locaties = ELLLocationfloorMin_1;
      } else if (this.order.floor === '0') {
        this.locaties = ELLLocationfloor_0;
      } else if (this.order.floor === '1') {
        this.locaties = ELLLocationfloor_1;
      } else if (this.order.floor === '2') {
        this.locaties = ELLLocationfloor_2;
      } else if (this.order.floor === '3') {
        this.locaties = ELLLocationfloor_3;
      } else if (this.order.floor === '4') {
        this.locaties = ELLLocationfloor_4;
      }
    } else {
      if (this.order.floor === '-1') {
        this.locaties = NOOLocationfloorMin_1;
      } else if (this.order.floor === '0') {
        this.locaties = NOOLocationfloor_0;
      } else if (this.order.floor === '1') {
        this.locaties = NOOLocationfloor_1;
      } else if (this.order.floor === '2') {
        this.locaties = NOOLocationfloor_2;
      } else if (this.order.floor === '3') {
        this.locaties = NOOLocationfloor_3;
      } else if (this.order.floor === '4') {
        this.locaties = NOOLocationfloor_4;
      } else if (this.order.floor === '5') {
        this.locaties = NOOLocationfloor_5;
      }
    }
  }
  /**
   *
   * @param event geselecteerde Etage
   * @returns lijst van lokalen adhv de geselecteerde campus en Etage
   */
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

    this.order.location = this.locaties[0];
  }
  /**
   * Add Comment to bestaande order
   */
  addComment() {
    if (this.CommentText.trim() !== '') {
      if (this.CommentText !== null) {
        const comment = this.CommentText.replace(/ {2,}/g, ' ').trim();
        this.comment = new OderComment();
        const commentDate: OrderCommentData = {
          createdByName: localStorage.getItem('UserName'),
          createdById: localStorage.getItem('UserID'),
          text: comment,
        };
        this.orderCommentService
          .addComment(this.comment, this.order.id, commentDate)
          .subscribe((res) => {
            this.CommentText = null;
            this.getComment();
          });
      }
    } else {
      this.CommentText = null;
    }
  }
  /**
   * get Alle Comment voor een bepaalde order
   */
  getComment() {
    this.orderCommentService.getComment(this.id).subscribe((res: any) => {
      if (res !== null) {
        this.comments = res.orderCommentData;
      }
    });
  }
  /**
   * update comment vogend de geselecteerde order
   * @paramindex index van de geselecteerde order
   */
  edit(index) {
    // this.comments.splice(0,1);
    this.CommentIndex = index;
    this.isEditMode = true;
  }
  /**
   * update comment vogend de geselecteerde order
   * @param index index van de geselecteerde order
   */
  update(index) {
    if (this.newText !== undefined) {
      this.isEditMode = false;
      const comment = this.newText.replace(/ {2,}/g, ' ').trim();
      this.orderCommentService
        .updateComment(this.id, index, comment)
        .subscribe((res) => {
          this.getComment();
        });
    } else {
      this.isEditMode = false;
    }
  }
  /**
   *
   * @param content neiewe comment bericht
   */
  onChangeComment(content) {
    this.newText = content;
  }

  /**
   * delete Comment voor de geselecteerde defect
   * @param index index van de geselecteerde defect
   */

  delete(index) {
    this.orderCommentService.deleteComment(this.id, index).subscribe((res) => {
      this.getComment();
    });
  }



  // ------------------------------------------- SEND MAIL LOGIC -----------------------------------------------------------------
openSendMailTemplateDialog(id, taakUrl, externalFirmId) {
  this.dialog.open(SendMailtemplateComponent, {
    width: '1000px',
    height: '540px',
    data: {
      id,
      taakUrl,
      externalFirmId
    }
  });
}

getTemplateById(id) {
  this.openSendMailTemplateDialog(id, this.taakUrl, this.assignToFirmInformation.id);
}

getTemplate() {
  this.mailTemplateService.getTemplate(this.id).subscribe((res: any) => {
    this.template = res;
    console.log(this.template);
  });
}


getAllTemplates() {
  this.mailTemplateService.getAllTemplates().subscribe((res: any) => {
    this.templates = res;
    console.log(`This is from GetAllTemplates` + this.templates);
  });
}

getAllFirms() {
  this.externalFirmService.getAllFirms().subscribe((res: any) => {
    // tslint:disable-next-line:no-shadowed-variable
    res.forEach(element => {
        this.assignToFirmInformation = {
          id: element.id,
          email : element.email,
          displayName : element.displayName,
          telefonNr: element.telefonNr
        };
        this.firmList.push(this.assignToFirmInformation);
    });

  });
  console.log(this.assignToFirmInformation);
}

onFirmChange() {
  // console.log(this.selectedFirm);
  this.assignToFirmInformation = {
    id: this.selectedFirm.id,
    email: this.selectedFirm.email,
    displayName: this.selectedFirm.displayName,
    telefonNr: this.selectedFirm.telefonNr
  };
  console.log(this.assignToFirmInformation);

}


getSelectedAssignedFirmInformation() {
  this.orderService
    .assignOrderToFirm(
      this.assignToFirmInformation,
      this.requesterId,
      this.id
    )
    .subscribe(
      (result) => {
        this.toastr.success(
          `Taak is succefully toegewezen aan ${this.assignToFirmInformation.displayName}`

        );
        this.getOrder();
        // document.getElementById('medewerker').style.visibility = 'hidden';
      },
      (error) => {
        this.toastr.error('Er is een fout opgetreden.');
      }
    );
}




// ---------------------------------------- SEND MAIL LOGIC -----------------------------------------------------------------
}
