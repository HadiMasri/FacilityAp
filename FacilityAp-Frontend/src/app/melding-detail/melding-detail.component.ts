import { CommentService } from './../services/comment.service';
import { ArchiveService } from './../services/archive.service';
import { ConfirmDialogService } from './../shared/confirm-dialog.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { ReportService } from '../services/report.service';
import { Report, Campus, Status, Category, ReportCommentData  } from '../models/Report';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { MatTabChangeEvent, MatDialog } from '@angular/material';
import { UpVoteService } from '../services/upvote/up-vote.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { CompressorService } from '../services/Compressor.service';
import { map, expand } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ReportComment } from './../models/Report';
import {ELLfloor, NOOfloor, ELLLocationfloorMin_1, ELLLocationfloor_0,
ELLLocationfloor_1, ELLLocationfloor_2, ELLLocationfloor_3, ELLLocationfloor_4,
NOOLocationfloorMin_1, NOOLocationfloor_0, NOOLocationfloor_1,
NOOLocationfloor_2, NOOLocationfloor_3, NOOLocationfloor_4, NOOLocationfloor_5
} from '../models/groundplans';
import { ExternalfirmsService } from '../services/externalfirms/externalfirms.service';
import { element } from 'protractor';
import { MailtemplateService } from '../services/mail-template/mailtemplate.service';
import { MailTemplate } from '../models/MailTemplate';
import { SendMailtemplateComponent } from '../send-mailtemplate/send-mailtemplate.component';
import { User } from '../models/User';
import { ExternalFirm } from '../models/ExternalFirm';
@Component({
  selector: 'app-melding-detail',
  templateUrl: './melding-detail.component.html',
  styleUrls: ['./melding-detail.component.css'],
})
export class MeldingDetailComponent implements OnInit {
  allCategories: Category[];
  departments: string[] = [];
  groupMemberObject: User;
  emplyeesList: User[] = [];
  assignToUserInformation: User;
  id: string;
  report: Report;
  reporterId: string;
  reportId: string;
  public LogedInUser: string;
  isLoaded: boolean;
  campus = Campus;
  campusesList = [];
  status = Status;
  statusList = [];
  Categories: string[] = [];
  selectedFile: File;
  fileName: string;
  newInnerWidth;
  adjustable = false;
  public isGeaboneerd;
  public selectedIndex;
  UserID = localStorage.getItem('UserID');
  public floors: string[];
  public locaties: string[];
  selectedCampus: string;
  template: MailTemplate;
  templates = [];
  public comment: ReportComment;
  comments: ReportCommentData[] = [];
  CommentText = '';
  public isDisable = false;
  CommentIndex;
  public isEditMode = false;
  newText;
  meldingUrl: any;
  firmList: ExternalFirm[] = [];
  assignToFirmInformation: ExternalFirm;
  public firm;
  public selectedFirm;
  public isFirm: boolean;
  public isMedewerker: boolean;
  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    public authService: AuthService,
    private toastr: ToastrService,
    private upVoteService: UpVoteService,
    private location: Location,
    private categoryService: CategoryService,
    private compressor: CompressorService,
    private dialogService: ConfirmDialogService,
    private archiveService: ArchiveService,
    private router: Router,
    private dialog: MatDialog,
    private mailTemplateService: MailtemplateService,
    private commentService: CommentService,
    private externalFirmService: ExternalfirmsService
  ) {}

  data: FileList;
  GroupNames: any;
  compressedImages = [];
  ngOnInit() {
    this.meldingUrl= location.href;
    this.reporterId = localStorage.getItem('UserID');
    this.id = this.route.snapshot.paramMap.get('id');
    this.LogedInUser = localStorage.getItem('UserID');
    this.getReport();
    this.getFacilityMedewerkerGroup();
    this.campusesList = Object.keys(this.campus);
    this.newInnerWidth = window.innerWidth;
    this.statusList = Object.values(this.status);
    const index = localStorage.getItem('userTabLocationDetails') || 0; // get stored number or zero if there is nothing stored
    const indexNr = +index;
    this.selectedIndex = indexNr; // with tabGroup being the MatTabGroup accessed through ViewChild
    this.selectedIndex  = indexNr;
    this.getFacilityCoordinatorGroup();
    this.getAllTemplates();
    this.getAllCategories();
    this.getComment();
    this.comment = new ReportComment();
    this.getAllFirms();
  }

  recursiveCompress = (image: File, index, array) => {
    return this.compressor.compress(image).pipe(
      map((response) => {
        // Code block after completing each compression
        console.log('compressed ' + index + image.name);
        this.compressedImages.push(response);
        return {
          data: response,
          index: index + 1,
          array,
        };
      })
    );
  }

  /**
   * Compress afbeelding
   */
  public process(event) {
    this.data = event.target.files;
    this.fileName = event.target.files[0].name;
    console.log('input: ' + this.data[0]);
    const compress = this.recursiveCompress(this.data[0], 0, this.data).pipe(
      expand((res) => {
        return res.index > res.array.length - 1
          ? EMPTY
          : this.recursiveCompress(this.data[res.index], res.index, this.data);
      })
    );
    compress.subscribe((res) => {
      if (res.index > res.array.length - 1) {
        // Code block after completing all compression
        console.log('Compression successful ' + this.compressedImages);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.newInnerWidth = event.target.innerWidth;
    this.statusList = Object.values(this.status);
  }


   /**
    * krijg je hier alle leden van FacilityMedewerker groep en we lopen de response,
    * dan we voegen alle members id's en displayname in employeesList array
    */
  getFacilityMedewerkerGroup() {
    this.authService.getUsersListRoles().subscribe((res: any) => {
      // tslint:disable-next-line:no-shadowed-variable
      res.forEach(element => {
        if (element.role === 'FacilitaireMedewerker') {
          this.assignToUserInformation = {
            id: element.id,
            email : element.email,
            name : element.name
          };
          this.emplyeesList.push(this.assignToUserInformation);
        }
      });
    });
  }

    /**
     * krijg je hier alle leden van FacilityCoordinator groep en we lopen de response,
     * dan we voegen alle members id's en displayname in employeesList array
     */
  getFacilityCoordinatorGroup() {

    this.authService.getUsersListRoles().subscribe((res: any ) => {
      // tslint:disable-next-line:no-shadowed-variable
      res.forEach((element) => {
        if (res.role === 'FacilitaireCoordinator') {
        this.assignToUserInformation = {
          id: element.id,
          email: element.email,
          name: element.name,
        };
        this.emplyeesList.push(this.assignToUserInformation);
      }
    });

  });
  }


  /**
   * als de user een employee geselecteerd heeft van de select opties, dan nemen we hier het id en naam van de geselecteerd employee
   * @param e heeft informatie over de geselecteerde optie
   */
  onChange(e) {
    this.assignToUserInformation = {
      id: e.target.value,
      name: e.target.options[e.target.options.selectedIndex].text,
    };
    this.isFirm = false;
  }




  /**
   * bij dit methode we call een methode van onze authservice en
   * we pass 3 parameters: de ingelodgd user id, de id van de employee die we willen
   * een report aan hem toewijzen, een de report id, en wordt de report toegewijzen aan de gespecifieerd employee.
   */
  getSelectedAssignedUserInformation() {
    this.reportService
      .assignReportToEmplyee(
        this.assignToUserInformation,
        this.reporterId,
        this.id
      )
      .subscribe(
        (result) => {
          this.toastr.success(
            `defect is succefully toegevoegd aan ${this.assignToUserInformation.name}`

          );
          this.getReport();
          document.getElementById('externe').style.display = 'none';
        },
        (error) => {
          this.toastr.error('Er is een fout opgetreden.');
        }
      );
  }

  getReport() {
    this.reportService.getReport(this.id).subscribe((data: any) => {
      if (data !== null) {
        this.report = data;

        this.getCategoryByDepartment();
        this.getEtageByCampus();
        this.getLocationByCampusAndFloor();
        this.isLoaded = true;
        // tslint:disable-next-line:no-shadowed-variable
        data.subscribers.forEach((element) => {
          if (element === this.UserID) {
            this.isGeaboneerd = true;
          }
      });
        // this.isGeaboneerd = !this.isGeaboneerd;
      } else {
        this.isLoaded = false;
      }
    });
  }

  updateReport() {
    if (this.report.status === 'Wordt niet uitgevoerd' || this.report.status === 'Voltooid') {
      this.whenReportNotDoneOrDone(this.report.status);
      console.log('test status');
    } else {
      this.reportService
      .updateReport(this.report, this.compressedImages)
      .subscribe(
        (res) => {
          this.toastr.success('De melding werd gewijzigd.', 'Succes!');
          this.getReport();
        },
        (error) => {
          this.toastr.error('Er is een fout opgetreden.', 'Error!');
        }
      );
    }
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
   * deze function call backend function om Alle  Categorie vanuit database te halen
   *
   */
  getCategoryByDepartment() {
    this.categoryService
      .getCategoriesBydepartment(this.report.categoryDepartment)
      .subscribe(
        (res) => {
          // console.log(res[0].categories);
          this.Categories = res[0].categories;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((data: any) => {
      this.allCategories = data;

      data.forEach(c => {
        if (c.department !== 'Logistieke diensten') {
          this.departments.push(c.department);
        }
      });
    });
  }

  onDepartmentChange(e) {
    console.log(e.target.value);
    const department = e.target.value;
    this.Categories = [];

    // Gooi de categories van de gekozen departement in Categorie
    this.allCategories.find(c => c.department === department)
    .categories.forEach(c => this.Categories.push(c));

    // Neem de eerste categorie uit de lijst aan
    this.report.category = this.Categories[0];
  }

  /**
   * functie zal de UpvoteService aanroepen en een het huidige report object meegeven
   *
   */
  subscription() {
    // tslint:disable-next-line:no-shadowed-variable
    this.report.subscribers.forEach((element) => {
        if (element === this.UserID) {
          this.isGeaboneerd = true;
        }
    });
    this.isGeaboneerd = !this.isGeaboneerd;

    this.upVoteService.updateUserVote(this.report, this.UserID);
    console.log('is Geaboneerd = ' + this.isGeaboneerd);
  }
  goBack() {
    this.location.back();
  }

  handleMatTabChange(event: MatTabChangeEvent) {
    localStorage.setItem('userTabLocationDetails', event.index.toString());
    console.log(event.index);
  }


  /**
   * deze function annuleert het report en stuurt het naar de archief
   * als de gebruiker accepteert dat
   */

  onCancelReport() {
    this.dialogService.openConfirmDialog('Weet u zeker dat u dit defect wilt annuleren? Deze actie kan niet ongedaan worden gemaakt')
    .afterClosed().subscribe(res => {
      // console.log(res)
      if (res) {
         // Update
         this.report.status = this.status.DISCARDED;
         this.reportService
         .updateReport(this.report, this.compressedImages)
         .subscribe(
           // tslint:disable-next-line:no-shadowed-variable
           (res) => {
             this.toastr.success('De melding werd gewijzigd.', 'Succes!');
             location.reload();
           }
         );
        // annuleren
         this.moveReportToArchive();
         this.deleteReport();
         this.toastr.success('Het defect wordt gearchiveerd.');
         this.router.navigate(['/']);

      }
    });
  }
    /**
     * defect archiveren wanneer de defect status wordt voltooid of wordt niet uitgevoerd
     * @param status status van defect
     */
  whenReportNotDoneOrDone(status: string) {
    // tslint:disable-next-line:max-line-length
    this.dialogService.openConfirmDialog('Weet u zeker dat u de status van dit defect wilt wijzigen naar (' + status + ') ? Deze actie kan niet ongedaan worden gemaakt')
    .afterClosed().subscribe(res => {
      // console.log(res)
      if (res) {
        // Update
        this.reportService
        .updateReport(this.report, this.compressedImages)
        .subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          (res) => {
            this.toastr.success('De melding werd gewijzigd.', 'Succes!');
            location.reload();
          }
        );
        // annuleren

        this.moveReportToArchive();
        this.deleteReport();
        this.toastr.success('Het defect wordt gearchiveerd');
        this.router.navigate(['/']);

      }
    });
  }
    /**
     * functie om roept te sturen naar archief
     */
  moveReportToArchive() {
    this.archiveService.moveReportToArchive(this.report).subscribe(res => {

    });
  }
    /**
     * delete report van order Collectie
     */
  deleteReport() {
    this.reportService.deleteReport(this.report.id).subscribe(res => {

    });
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
     * @returns lijst van etages adhv  Campus value in de geslecteerde defect voor update
     */
getEtageByCampus() {
  if (this.report.campus.toString() === 'ELL') {
    this.floors = ELLfloor;
  } else {
    this.floors = NOOfloor;
  }
}
    /**
     * @returns lijst van etages adhv  Etage value in de geslecteerde defect voor update
     */
getLocationByCampusAndFloor() {
  if (this.report.campus.toString()  === 'ELL') {
    if (this.report.floor === '-1') {
      this.locaties = ELLLocationfloorMin_1;
    } else if (this.report.floor === '0') {
      this.locaties = ELLLocationfloor_0;

    } else if (this.report.floor === '1') {
      this.locaties = ELLLocationfloor_1;

    } else if (this.report.floor === '2') {

      this.locaties = ELLLocationfloor_2;
    } else if (this.report.floor === '3') {
      this.locaties = ELLLocationfloor_3;

    } else if (this.report.floor === '4') {
      this.locaties = ELLLocationfloor_4;

    }
  } else {
        if (this.report.floor === '-1') {
      this.locaties = NOOLocationfloorMin_1;
    } else if (this.report.floor === '0') {
      this.locaties = NOOLocationfloor_0;

    } else if (this.report.floor === '1') {
      this.locaties = NOOLocationfloor_1;

    } else if (this.report.floor === '2') {

      this.locaties = NOOLocationfloor_2;
    } else if (this.report.floor === '3') {
      this.locaties = NOOLocationfloor_3;

    } else if (this.report.floor === '4') {
      this.locaties = NOOLocationfloor_4;

    } else if (this.report.floor === '5') {
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

  this.report.location = this.locaties[0];
}

// ------------------------------------------- SEND MAIL LOGIC -----------------------------------------------------------------
openSendMailTemplateDialog(id, meldingUrl, externalFirmId) {
  this.dialog.open(SendMailtemplateComponent, {
    width: '1000px',
    height: '540px',
    data: {
      id,
      meldingUrl,
      externalFirmId
    }
  });
}

getTemplateById(id) {
  this.openSendMailTemplateDialog(id, this.meldingUrl, this.assignToFirmInformation.id);
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
  this.reportService
    .assignReportToFirm(
      this.assignToFirmInformation,
      this.reporterId,
      this.id
    )
    .subscribe(
      (result) => {
        this.toastr.success(
          `Defect is succefully toegewezen aan ${this.assignToFirmInformation.displayName}`

        );
        this.getReport();
        document.getElementById('medewerker').style.display = 'none';
      },
      (error) => {
        this.toastr.error('Er is een fout opgetreden.');
      }
    );
}


// ---------------------------------------- SEND MAIL LOGIC -----------------------------------------------------------------
AddComment() {
  console.log(this.CommentText);
  if (this.CommentText !== '') {
    if ( this.CommentText !== null) {
      this.comment = new ReportComment();
      const commentDate: ReportCommentData = {
        createdByName: localStorage.getItem('UserName'),
        createdById: localStorage.getItem('UserID'),
        text: this.CommentText
      };
      this.commentService.addComment(this.comment, this.report.id, commentDate).subscribe(res => {
        console.log(res);
        this.CommentText = null;
        this.getComment();
      });
    }

  }

}

getComment() {
  this.commentService.getComment(this.id).subscribe((res: any) => {
    if (res !== null) {
      this.comments = res.reportCommentData;
    }

  });
}

edit(index) {
  // this.comments.splice(0,1);
  this.CommentIndex = index;
  this.isEditMode = true;
}
update(index) {
   if (this.newText !== undefined) {
    this.isEditMode = false;
    this.commentService.updateComment(this.id, index, this.newText).subscribe(res => {
      console.log(res);
      this.getComment();
    });
   } else {
    this.isEditMode = false;
   }

}
onChangeComment(content) {
  this.newText = content;
}

delete(index) {
  this.commentService.deleteComment( this.id, index).subscribe(res => {
    console.log(res);
    this.getComment();
  });
}
}
