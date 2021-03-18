import { Component, OnInit } from '@angular/core';
import { MailtemplateService } from '../services/mail-template/mailtemplate.service';
import { MailTemplate } from '../models/MailTemplate';

@Component({
  selector: 'app-mail-template',
  templateUrl: './mail-template.component.html',
  styleUrls: ['./mail-template.component.css']
})
export class MailTemplateComponent implements OnInit {
  templates = [];
  isLoaded: boolean;
  template: MailTemplate;
  id: string;
  firmName: string;

  isEditable = true;
  constructor(private mailTemplateService: MailtemplateService) { }

  ngOnInit() {
    this.getAllTemplates();
  }

  getTemplate() {
    this.mailTemplateService.getTemplate(this.id).subscribe((res: any) => {
      if (res !== null) {
      this.template = res;
      this.isLoaded = true;
      } else {
        this.isLoaded = false;
      }
    });
  }

  getAllTemplates() {
    this.mailTemplateService.getAllTemplates().subscribe((res: any) => {
      this.templates = res;
      this.firmName = 'firm';
    });
  }

  updateTemplate() {
    this.mailTemplateService.updateTemplate(this.template).subscribe(res => {
      location.reload();
    });
  }
}
