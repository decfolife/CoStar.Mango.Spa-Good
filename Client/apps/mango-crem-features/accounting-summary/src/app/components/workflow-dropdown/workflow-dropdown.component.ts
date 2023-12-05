import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mango-workflow-dropdown',
  templateUrl: './workflow-dropdown.component.html',
  styleUrls: ['./workflow-dropdown.component.scss'],
})
export class WorkflowDropdownComponent {
  @Input() rightsInfo: any;

  componentName = 'workflow-component';
  isWorkflowDropdownVisible = false;
  isTooltipVisible: boolean = false;
  dropdownDataSource: any[];
  dropdownStatusValue: number;
  inputStatusText: string = "";
	toolTipTarget: any;
  btnDisabledReason: string;
  private subscription = new Subscription();
  private workflowSettings: any;
  private originalOptionsList: any[]
  private messageCommentRequiredDisplayed = false;

  constructor(public accountingSummaryService: AccountingSummaryService) { }

  ngOnInit(): void {
    this.getWorkflowStatuses();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.rightsInfo !== undefined){
      this.isWorkflowDropdownVisible = this.rightsInfo.userHasEditLeaseRights;
    }
  }

  onValueChanged(event: any) {
    //This is to stop the loop that is created when we switch the value of the dropdown back
    //to the original value.
    if(this.messageCommentRequiredDisplayed){
      this.messageCommentRequiredDisplayed = false
      return;
    }

    if(event.previousValue !== undefined && event.previousValue !== event.value){
      let comment = "testing";
      if(this.workflowSettings.isCommentsRequired && (!comment)){
        this.accountingSummaryService.errorNotify("A comment is required to save the workflow status");
        this.messageCommentRequiredDisplayed = true;
        event.component.option("value", event.previousValue);
        return;
      }
  
      this.saveWorkflowStatus(event.value, comment);
    }
  }

  onMouseLeave(){
    this.isTooltipVisible = false;
  }

  onMouseEnter(e, itemData){
    this.isTooltipVisible = itemData.disabled;
    this.toolTipTarget = e.target;
    this.btnDisabledReason = itemData.disabledReason;
  }

  getWorkflowStatuses() {
    this.subscription.add(this.accountingSummaryService.getWorkflowStatuses().subscribe(response => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (response.success) {
        this.dropdownDataSource = [];

        if(response.data.options.length > 0) {
          //make sure these are set before calling generateDataSourceArray
          //coding it this way because we will have to call generateDataSourceArray again.
          this.inputStatusText = response.data.workflowStatus;
          this.dropdownStatusValue = response.data.workflowStatusID;
          this.workflowSettings = response.data.settings;
          this.originalOptionsList = response.data.options;

          this.dropdownDataSource = this.generateDataSourceArray();
        }
      }
      else if (!response.success) {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }));
  }

  saveWorkflowStatus(workflowStatusId: number, comment: string) { 
    this.subscription.add(this.accountingSummaryService.saveWorkflowStatus(workflowStatusId, comment).subscribe(response => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (response.success) {
        this.accountingSummaryService.successNotify("Workflow status saved successfully.");
        if(this.workflowSettings.isIncrementOneLevelEnforced){
          this.dropdownDataSource = this.generateDataSourceArray();
        }
      } else {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }));
  }

  private generateDataSourceArray() : any[] {
    let nextStatusOrderNumberAfterSelectedStatus: number = null;
    let options = this.originalOptionsList;
    const selectedStatusOrderNumber = options.find(op => op.workflowStatusId === this.dropdownStatusValue).statusOrder;

    let dataSourceArray = options.map(opt => {
      let itemDisabled: boolean = false;
      let itemDisabledReason: string = null;

      if(nextStatusOrderNumberAfterSelectedStatus === null && opt.statusOrder > selectedStatusOrderNumber){
        nextStatusOrderNumberAfterSelectedStatus = opt.statusOrder;
      }

      if(!opt.userHasEditRights){
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

      let dataElement = {
        "workflowStatusId": opt.workflowStatusId,
        "workflowStatus": opt.workflowStatus,
        "statusOrder": opt.statusOrder,
        "disabled": itemDisabled,
        // "isDisabled": itemDisabled,
        "disabledReason": itemDisabledReason
      }

      return dataElement;
    });

    return dataSourceArray;
  }
}
