import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatConfirmDialogComponent } from '../shared/mat-confirm-dialog/mat-confirm-dialog.component';
import { ExternalFirm } from '../models/ExternalFirm';
import { ExternalfirmsService } from '../services/externalfirms/externalfirms.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-external-firm-dialog',
  templateUrl: './create-external-firm-dialog.component.html',
  styleUrls: ['./create-external-firm-dialog.component.css'],
})
export class CreateExternalFirmDialogComponent implements OnInit {
  /**
   * Variables
   */
  editFirm = false;
  public newExternalFirm: ExternalFirm = new ExternalFirm();
  public externalFirm: ExternalFirm;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<MatConfirmDialogComponent>,
    private externalfirmsService: ExternalfirmsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (this.data.FirmId) {
      this.editFirm = true;
      this.externalfirmsService
        .getFirmById(this.data.FirmId)
        .subscribe((res: any) => {
          this.externalFirm = res;
        });
    }
  }

  /**
   * het dialog sluit wanneer er op de cancel knop wordt geklikt
   */
  closeDialog() {
    this.dialogRef.close(false);
  }

  /**
   * we sturen hier een object van informatie over new firm als parameter naar
   * de functie in het service om een nieuwe externe firma firm te creëeren
   */
  addFirm() {
    this.externalfirmsService.addFirm(this.newExternalFirm).subscribe((res) => {
      this.toastr.success('Externe firma is toegevoegd.');
    });
    location.reload();
  }

  /**
   * deze methode wordt gebruikt om een externe firma te wijzigen
   * @param firmId dit is de id parameter, deze wordt doorgestuurd naar de functie in de service om het gevraagde externe firma te vinden.
   */
  updateFirm(firmId) {
    this.externalfirmsService
      .updateFirm(this.externalFirm, firmId)
      .subscribe((res) => {});
    location.reload();
  }
}
