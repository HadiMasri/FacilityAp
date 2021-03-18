import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MailtemplateService } from '../services/mail-template/mailtemplate.service';
import { ToastrService } from 'ngx-toastr';
import { MailTemplate } from '../models/MailTemplate';

@Component({
  selector: 'app-update-mailtemplate',
  templateUrl: './update-mailtemplate.component.html',
  styleUrls: ['./update-mailtemplate.component.css'],
})
export class UpdateMailtemplateComponent implements OnInit {
  template: MailTemplate;
  isLoaded: boolean;
  newText;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // tslint:disable-next-line: max-line-length
    public dialogRef: MatDialogRef<UpdateMailtemplateComponent>,
    private mailTemplateService: MailtemplateService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getTemplate();
  }

  getTemplate() {
    this.mailTemplateService
      .getTemplate(this.data.id)
      .subscribe((data: any) => {
        if (data !== null) {
          this.template = data;
          this.isLoaded = true;
        } else {
          this.isLoaded = false;
        }
      });
  }

  backgroundPasser() {
    if (document.getElementById('body').innerHTML.startsWith('[')) {
      document.getElementById('body').style.background = 'gray';
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  updateTemplate() {
    this.mailTemplateService.updateTemplate(this.template).subscribe(
      (res) => {
        this.toastr.success('Mail sjabloon werd gewijzigd.', 'Succes!');
        location.reload();
      },
      (error) => {
        this.toastr.error('Er is een fout opgetreden.', 'Error!');
      }
    );
  }


}
