import { UserInfoResponse } from '@accounting-summary/models/user-info-response.modal';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { Component, Input, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { DxScrollViewComponent } from 'devextreme-angular/ui/scroll-view';

@Component({
  selector: 'mango-workflow-history-popup',
  templateUrl: './workflow-history-popup.component.html',
  styleUrls: ['./workflow-history-popup.component.scss'],
})

export class WorkflowHistoryPopupComponent {
  @ViewChildren(DxScrollViewComponent) scrollViewComponents: QueryList<DxScrollViewComponent>;
  @Input() userInfo: UserInfoResponse;
  @Input() workflowStatusHistory: any;

  componentName = 'workflow-history-component';
  workflowHistoryPopVisible = false;
  isFullscreen = false;
  historyEvents: any[]
  dateFormat = 'MM/dd/yyyy, h:mm a';
  mainScrollViewId: string;
  currentTemplate = 'noDataTemplate'

  constructor(public accountingSummaryService: AccountingSummaryService) {
    this.mainScrollViewId = accountingSummaryService.getId(this.componentName,'main','scrollview')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.userInfo !== undefined && changes.userInfo.currentValue !== undefined){
      const isEuroDateFormat = this.userInfo.useDateEU;
      if (isEuroDateFormat) {
        this.dateFormat = 'dd.MM.yyyy, h:mm a';
      }
    }

    if(changes.workflowStatusHistory !== undefined && changes.workflowStatusHistory.currentValue !== undefined){
      if(changes.workflowStatusHistory.currentValue.length > 0){
        this.historyEvents = this.workflowStatusHistory;
        this.currentTemplate = 'dataTemplate';
      }
    }
  }

  showHistoryPopup(event: any) {
    this.workflowHistoryPopVisible = true;
  }

  hideHistoryPopup(event: any) {
    this.workflowHistoryPopVisible = false;
  }

  determineScrollViewHeight(event) {
    const svComponentsArray = this.scrollViewComponents.toArray().filter(svc => svc.instance.element().id !== this.mainScrollViewId &&
        svc.instance.scrollHeight() === svc.instance.clientHeight());
    svComponentsArray.forEach(svc => svc.instance.option("height", "fit-content"))
  }

  toggleFullscreen(event) {
    this.isFullscreen = !this.isFullscreen;
  }
}
