import { Component, OnInit, Inject } from '@angular/core';
import { MailTemplate } from '../models/MailTemplate';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MailtemplateService } from '../services/mail-template/mailtemplate.service';
import { ToastrService } from 'ngx-toastr';
import { ExternalfirmsService } from '../services/externalfirms/externalfirms.service';
import { ExternalFirm } from '../models/ExternalFirm';
import { ReportService } from '../services/report.service';
import { MailService } from '../services/mail-service/mail-service.service';
import { Mail } from '../models/Mail';
import { CategoryService } from '../services/category.service';
import { Report } from '../models/Report';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Order } from '../models/Order';

@Component({
  selector: 'app-send-mailtemplate',
  templateUrl: './send-mailtemplate.component.html',
  styleUrls: ['./send-mailtemplate.component.css'],
})
export class SendMailtemplateComponent implements OnInit {
  template: MailTemplate;
  isLoaded: boolean;
  firmList: ExternalFirm[] = [];
  assignToFirmInformation: ExternalFirm;
  templates = [];
  reporterId: string;
  requesterId: string;
  id: string;
  public orderEmail: Mail = new Mail();
  public reportEmail: Mail = new Mail();
  public selectedFirm;
  public firm;
  report: Report;
  reportId: string;
  order: Order;
  orderId: string;
  Categories: string[] = [];
  public isGeaboneerd;
  UserID = localStorage.getItem('UserID');
  public floors: string[];
  public locaties: string[];
  meldingUrl: string;
  taakUrl: string;
  externalFirmId: string;
  idToken: string;
  isReport = false;
  isOrder: boolean;
  public isFirmSelected = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line: max-line-length
              public dialogRef: MatDialogRef<SendMailtemplateComponent>, private mailTemplateService: MailtemplateService,
              private externalFirmService: ExternalfirmsService, private mailService: MailService, private toastr: ToastrService
               ) { }

  ngOnInit() {
    this.getTemplate();
    this.getAllFirms();
    this.meldingUrl = this.data.meldingUrl;
    this.taakUrl = this.data.taakUrl;
    this.externalFirmId = this.data.externalFirmId;
    this.getTokenForSelectedFirm();

    if (this.data.id) {
      if(this.data.taakUrl === undefined) {
        this.isReport = true;
        this.mailTemplateService.getTemplate(this.data.id).subscribe((res: any) => {
          this.template = res;
        });
      }
    } else {
      this.isReport = false;
      this.mailTemplateService.getTemplate(this.data.id).subscribe((res: any) => {
        this.template = res;
      });
    }


    // if (this.data.orderId) {
    //   this.isOrder = true;
    //   this.mailTemplateService.getTemplate(this.data.requesterId).subscribe((res: any) => {
    //     this.template = res;
    //   });
    // }
  }

  getAllFirms() {
    this.externalFirmService.getAllFirms().subscribe((res: any) => {
      res.forEach((element) => {
        this.assignToFirmInformation = {
          id: element.id,
          email: element.email,
          displayName: element.displayName,
          telefonNr: element.telefonNr,
        };
        this.firmList.push(this.assignToFirmInformation);
      });
    });
  }
  getTokenForSelectedFirm() {
    this.externalFirmService.getFirmIdToken(this.externalFirmId).subscribe((res: any) => {
      this.idToken = res;
    });
  }
  getTemplate() {
    this.mailTemplateService.getTemplate(this.data.id).subscribe((data: any) => {
      if (data !== null) {
        this.template = data;
        console.log(this.template);
        this.isLoaded = true;
      } else {
        this.isLoaded = false;
      }
    });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }



  onFirmChange() {
    // console.log(this.selectedFirm);
    this.assignToFirmInformation = {
      id: this.selectedFirm.id,
      email: this.selectedFirm.email,
      displayName: this.selectedFirm.displayName,
      telefonNr: this.selectedFirm.telefonNr
    };
    this.template.firmName = 'Beste ' + this.assignToFirmInformation.displayName;
    this.isFirmSelected = true;
  }

  /**
   * Functie om een mailtje te sturen naar de toegewezen firma
   */

  reportSendMail() {
      // this.email.sender.name = localStorage.getItem('userName');
      this.reportEmail.receiver = this.assignToFirmInformation.email;
      this.template.hyperlink = this.meldingUrl + '?token=' + this.idToken;
      this.reportEmail.content = this.template.firmName + '\n' + this.template.body + '\n'
      + this.template.hyperlink + '\n' + this.template.signature;

      this.mailService.sendMail(this.reportEmail).subscribe(res => {
        this.toastr.success('E-mail wordt verzenden');
      });

      console.log(this.reportEmail);
  }


  orderSendMail() {
    // this.email.sender.name = localStorage.getItem('userName');
    this.orderEmail.receiver = this.assignToFirmInformation.email;
    this.template.hyperlink = this.taakUrl + '?token=' + this.idToken;
    this.orderEmail.content = this.template.firmName + '\n' + this.template.body + '\n'
    + this.template.hyperlink + '\n' + this.template.signature;

    this.mailService.sendMail(this.orderEmail).subscribe(res => {
      this.toastr.success('E-mail wordt verzenden');
    });

    console.log(this.orderEmail);
}
}
