import { MatConfirmDialogComponent } from './../components/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }
  openConfirDialog(mes) {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '390px',
      position: { 'top' : '10px'},
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message: mes
      }
    });
  }
}
