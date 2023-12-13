import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MangoDialogComponent } from '@mango/ui-shared/lib-ui-shared';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MangoDialogService {
  response: boolean;

  constructor( private dialog: MatDialog ) {}

  alert(title: string, message: string, primaryBtnText: string): Observable<boolean> {
    return this.openDialog(title, message, primaryBtnText);
  }

  confirm(title: string, message: string, primaryBtnText: string, secondaryBtnText: string): Observable<boolean> {
    return this.openDialog(title, message, primaryBtnText, secondaryBtnText);
  }

  openDialog(title: string, message: string, primaryBtnText: string, secondaryBtnText?: string) {
    let dialogRef = this.dialog.open(MangoDialogComponent, {
      disableClose: true,
      height: '240px',
      width: '600px',
      panelClass: 'dialogServiceComponent',
      data: {
        title: title,
        message: message,
        primaryBtnText: primaryBtnText,
        secondaryBtnText: secondaryBtnText? secondaryBtnText: ''
      }
    });
    return dialogRef.afterClosed();

  }


}

