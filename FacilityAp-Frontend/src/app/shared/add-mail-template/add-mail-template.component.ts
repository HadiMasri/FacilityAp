import { Component, Inject } from '@angular/core';
import { MailTemplate } from '../../models/MailTemplate';
import { MailtemplateService } from '../../services/mail-template/mailtemplate.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-mail-template',
  templateUrl: './add-mail-template.component.html',
  styleUrls: ['./add-mail-template.component.css'],
})
export class AddMailTemplateComponent {
  public template: MailTemplate = new MailTemplate();
  isLoaded: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddMailTemplateComponent>,
    private mailTemplateService: MailtemplateService,
    private toastr: ToastrService
  ) {}


  /**
   * Methode om een nieuwe mail template te maken
   */
  addTemplate() {
    this.mailTemplateService.createTemplate(this.template).subscribe((res) => {
      this.toastr.success('Bedankt !', 'Template wordt toegevoegd.');
      location.reload();
    });
  }

  /**
   * Deze functie sluit de Matdialog af
   */
  closeDialog() {
    this.dialogRef.close(false);
  }
}
