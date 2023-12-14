import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mango-workflow-dropdown',
  templateUrl: './workflow-dropdown.component.html',
  styleUrls: ['./workflow-dropdown.component.scss'],
})
export class WorkflowDropdownComponent {
  @Input() rightsInfo: any;
  @Input() workflowStatusInfo: any;
  @Output() refreshWorkflowStatusInfo: EventEmitter<boolean> = new EventEmitter();

  componentName = 'workflow-component';
  isWorkflowDropdownVisible = false;
  isTooltipVisible = false;
  dropdownDataSource: any[];
  dropdownStatusValue: number;
  inputStatusText = "";
	toolTipTarget: any;
  btnDisabledReason: string;
  isCommentsEnabled: boolean;
  isCommentsRequired: boolean;
  commentsVisible = false;
  private subscription = new Subscription();
  private workflowSettings: any;
  private originalOptionsList: any[]
  private commentDialogCanceled = false;
  private savedEventData: any;
  commentText = '';
  @ViewChild('commentTextArea') commentTextArea: ElementRef;


  constructor(public accountingSummaryService: AccountingSummaryService) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.rightsInfo.currentValue !== undefined){
      this.isWorkflowDropdownVisible = this.rightsInfo.userHasEditLeaseRights;
    }

    if(changes.workflowStatusInfo.currentValue !== undefined){
      //make sure these are set before calling generateDataSourceArray
      this.inputStatusText = this.workflowStatusInfo.workflowStatus;
      this.dropdownStatusValue = this.workflowStatusInfo.workflowStatusID;
      this.workflowSettings = this.workflowStatusInfo.settings;
      this.isCommentsEnabled= this.workflowStatusInfo.settings.isCommentsEnabled;
      this.isCommentsRequired= this.workflowStatusInfo.settings.isCommentsRequired;
      
      this.dropdownDataSource = [];
      if(this.workflowStatusInfo.options.length > 0) {
        this.originalOptionsList = this.workflowStatusInfo.options;
        this.dropdownDataSource = this.generateDataSourceArray();
      }
    }
  }

  onValueChanged(event: any) {
    //This is to stop the loop that is created when we switch the value of the dropdown back
    //to the original value.
    if(this.commentDialogCanceled){
      this.commentDialogCanceled = false
      return;
    }

    if (event.previousValue !== undefined && event.previousValue !== event.value) {
      this.savedEventData = event;
      if (!this.isCommentsEnabled) {
        this.saveWorkflowStatus(event.value, this.commentText);
      }
      else {
        this.commentsVisible = true;
      }
    }
  }

  saveWorkFlowComment() {
    if (this.isCommentsRequired && this.commentText === '') {
      this.accountingSummaryService.errorNotify("A comment is required to save the workflow status");
      this.commentTextArea.nativeElement.focus();
      return;
    }

    if (this.savedEventData) {
      const { value } = this.savedEventData;
      this.saveWorkflowStatus(value, this.commentText);
      this.commentText = '';
    }
    this.commentsVisible = false;
  }

  onMouseLeave(){
    this.isTooltipVisible = false;
  }

  onMouseEnter(e, itemData){
    this.isTooltipVisible = itemData.disabled;
    this.toolTipTarget = e.target;
    this.btnDisabledReason = itemData.disabledReason;
  }

  saveWorkflowStatus(workflowStatusId: number, comment: string) { 
    this.subscription.add(this.accountingSummaryService.saveWorkflowStatus(workflowStatusId, comment).subscribe(response => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (response.success) {
        this.accountingSummaryService.successNotify("Workflow status saved successfully.");
        this.refreshWorkflowStatusInfo.emit(true);
      } else {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }));
  }

  private generateDataSourceArray() : any[] {
    let nextStatusOrderNumberAfterSelectedStatus: number = null;
    const options = this.originalOptionsList;
    const selectedStatusOrderNumber = options.find(op => op.workflowStatusId === this.dropdownStatusValue).statusOrder;

    const dataSourceArray = options.map(opt => {
      let itemDisabled = false;
      let itemDisabledReason: string = null;

      if(nextStatusOrderNumberAfterSelectedStatus === null && opt.statusOrder > selectedStatusOrderNumber){
        nextStatusOrderNumberAfterSelectedStatus = opt.statusOrder;
      }

      if(!opt.allUsersHaveRights && !opt.userHasEditRights){
        itemDisabled = true;
        itemDisabledReason = "You do not have rights to this status.";
      } else if(!this.workflowSettings.isApproveOwnChangesEnabled && opt.isApprovedStatus){
        itemDisabled = true;
        itemDisabledReason = "You cannot approve your own changes.";
      } else if(this.workflowSettings.isIncrementOneLevelEnforced && nextStatusOrderNumberAfterSelectedStatus !== null && 
                opt.statusOrder > nextStatusOrderNumberAfterSelectedStatus){
        itemDisabled = true;
        itemDisabledReason = "You can only increment on status at a time.";
      }

      const dataElement = {
        "workflowStatusId": opt.workflowStatusId,
        "workflowStatus": opt.workflowStatus,
        "statusOrder": opt.statusOrder,
        "disabled": itemDisabled,
        "disabledReason": itemDisabledReason
      }

      return dataElement;
    });

    return dataSourceArray;
  }

  cancelChanges() {
    this.commentsVisible = false;  
    this.commentText = '';
    this.commentDialogCanceled = true;
    this.savedEventData.component.option("value", this.savedEventData.previousValue);
  }
}
