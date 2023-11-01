import { Component, OnInit, Input} from '@angular/core';
import { UserService } from '@mango/core-shared';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenerateApiKeyConfirmationComponent } from '../generate-apikey-confirmation/generate-apikey-confirmation.component';
import { CopyClipboardMessageComponent } from '../copy-clipboard-message/copy-clipboard-message.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mango-service-account-api-keys',
  templateUrl: './service-account-api-keys.component.html',
  styleUrls: ['./service-account-api-keys.component.scss'],
})
export class ServiceAccountApiKeysComponent implements OnInit {
  @Input() userEmail: string;
  public dateGenerated: Date;
  public expirationDate: Date;

  subs: Subscription[] = []

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
      this.getAPIKeyInfo();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }

  private getAPIKeyInfo() {
    this.subs.push(
      this.userService.getServiceAccountApiKeyInfo(this.userEmail)
      .subscribe(result => {        
        if(result){          
            this.dateGenerated =  result.dateGenerated;
            this.expirationDate =  result.expirationDate;        
        }
      })
    )
  }

  generateApiKey(){
    let dialogRef = this.dialog.open(GenerateApiKeyConfirmationComponent, {
      width: '600px',
      panelClass: 'client-delivery-modal',
      data: {
        msg: "This will generate a new API Key and replace the existing one, Are you sure you want to continue?",
        confirmButtonText: "Yes",
        title: "Generate ApiKey Confirmation"
      },
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.generateApiKey()     
        .subscribe(result => {
          if (result) {          
            this.dialog.open(CopyClipboardMessageComponent, {
              width: '650px',
              height: '350px',
              panelClass: 'client-delivery-modal',
              data: {
                apikey: result.data
              },
            });
          }
        });
      }
    });
  }
}
