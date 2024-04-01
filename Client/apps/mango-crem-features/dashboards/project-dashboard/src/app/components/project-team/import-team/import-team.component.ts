import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MemberInfo, Team } from '@mango/data-models/lib-data-models';
import { ModalComponent } from '@mango/ui-shared/lib-ui-elements';
import { CardsService } from '@project-dashboard/services/cards.service';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'mango-import-team',
  templateUrl: './import-team.component.html',
  styleUrls: ['./import-team.component.scss'],
})

export class ImportTeamComponent {
  @ViewChild(ModalComponent) modalComponent: ModalComponent;

  private subscription = new Subscription();
  private currentSelectedTeamId: number = null
  dataRetrieved: boolean = true;
  memberInfo: MemberInfo;
  managerSharedValue: boolean;
  importTeams: Team[] = [];
	showShareColumn = false;
  importButtonDisabled = true;
  textForTooltip: string = null;

  constructor(private dashboardService: DashboardService, 
    public cardsService: CardsService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
		this.showShareColumn = this.data.projectsPrivateSetting > 0 && this.data.projectsPrivateSetting <= 2;
    this.textForTooltip = "If the Project Manager does not have group share turned on, these share rights will default to OFF once imported."
    this.memberInfo  = this.data.memberInfo;
    this.managerSharedValue = this.data.managerSharedValue;
    this.getImportTeams();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  importTeamFromTemplate() {
    this.importTeam();
  }  

  closeImportTeamDialog() {
    this.modalComponent.dialogRef.close('');
  }

  onSelectionChanged(e:any) {
    const deselectRowKeys: number[] = [];
    const dataGrid = e.component;

    if(e.selectedRowsData.length === 0){
      this.currentSelectedTeamId = null;
    }
    else if(e.selectedRowsData.length == 1){
      this.currentSelectedTeamId = e.selectedRowsData[0].teamId;
    }
    else if(e.selectedRowsData.length > 1){
      deselectRowKeys.push(this.currentSelectedTeamId);
      dataGrid.deselectRows(deselectRowKeys);
    }

    this.importButtonDisabled = this.currentSelectedTeamId === null || this.currentSelectedTeamId < 0;
  }

  private getImportTeams() {
    this.dataRetrieved = false;
    this.subscription.add(this.dashboardService.getTeams().subscribe(res => {
      if (res === null) {
        this.dashboardService.displayContactSystemAdminMessage();
      }
      else if (res.success) {
        this.importTeams = res.data;
      } else {
        this.dashboardService.errorNotify(res.clientErrorMessage);
      }    

      this.dataRetrieved = true;
    }))
  }

  private importTeam() {
    if(this.data.projectId === undefined || this.data.projectId <= 0) {
      this.dashboardService.displayContactSystemAdminMessage();
      return;
    }

    this.subscription.add(this.dashboardService.importTeam(this.data.projectId, this.currentSelectedTeamId, this.managerSharedValue).subscribe(res => {
      if (res === null) {
        this.modalComponent.dialogRef.close('');
        this.dashboardService.displayContactSystemAdminMessage();
      }
      else if (res.success) {
        this.modalComponent.dialogRef.close('true');
        this.dashboardService.successNotify('Teams template has successfully imported to project.')
      } else {
        this.modalComponent.dialogRef.close('');
        this.dashboardService.errorNotify(res.clientErrorMessage);
      }    
    }))
  }
}
