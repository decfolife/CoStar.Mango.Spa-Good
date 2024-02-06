/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'save-team-template-popup',
  templateUrl: './save-team-template.component.html',
  styleUrls: ['./save-team-template.component.scss']
})

export class SaveTeamTemplateComponent implements OnInit {
  
  subs: Subscription[] = [];
  templateName: string = '';
  closeButton: boolean = true;
  saveButtonDisabled: boolean =  true;

  constructor(private dashboardService: DashboardService,
    public dialogRef: MatDialogRef<SaveTeamTemplateComponent>,
    public toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void { }

  saveTeamAsTemplate() {

    this.subs.push(this.dashboardService.saveTeamAsTemplate(this.templateName, this.data.projectId).subscribe(
      (res:any ) => {
        if(res.success) {
          this.toastr.info("Team Template has been saved.", "", { positionClass: 'toast-bottom-right', timeOut: 3000, closeButton: false, progressBar: false }); 
          this.dialogRef.close('true');
        } else {
          console.log("Error occurred saving team as Template, please try again later.");
        }
      },
      (error: any) => console.log("Error occurred Saving Team as Template ", error),
      () => {}
    ));
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe);
  }

}