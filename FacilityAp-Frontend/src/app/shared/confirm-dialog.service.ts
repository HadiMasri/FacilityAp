import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}
  openConfirmDialog(msg) {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '500px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message: msg,
      },
    });
  }
}
// Weet u zeker dat u dit defect wilt annuleren? Deze actie kan niet ongedaan worden gemaakt
