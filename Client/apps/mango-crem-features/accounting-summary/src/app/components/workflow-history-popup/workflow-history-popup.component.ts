import { UserInfoResponse } from '@accounting-summary/models/user-info-response.modal';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { Component, Input, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { DxScrollViewComponent, } from 'devextreme-angular/ui/scroll-view';
import ScrollView from "devextreme/ui/scroll_view";

@Component({
  selector: 'mango-workflow-history-popup',
  templateUrl: './workflow-history-popup.component.html',
  styleUrls: ['./workflow-history-popup.component.scss'],
})

export class WorkflowHistoryPopupComponent {
  @Input() userInfo: UserInfoResponse;
  @Input() workflowStatusHistory: any;

  componentName = 'workflow-history-component';
  workflowHistoryPopVisible = false;
  isFullscreen = false;
  historyEvents: any[]
  dateFormat = 'MM/dd/yyyy, h:mm a';
  mainScrollViewId: string;
  currentTemplate = 'noDataTemplate'
  scrollViewComponents: ScrollView[];

  constructor(public accountingSummaryService: AccountingSummaryService) {
    this.mainScrollViewId = accountingSummaryService.getId(this.componentName,'main','scrollview');
    this.scrollViewComponents = [];
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
    const svComponentsArray = this.scrollViewComponents.filter(svc => svc.element().id !== this.mainScrollViewId &&
        svc.scrollHeight() === svc.clientHeight());
    svComponentsArray.forEach(svc => svc.option("height", "fit-content"))
  }

  toggleFullscreen(event) {
    this.isFullscreen = !this.isFullscreen;
  }

  onScrollViewInitialized(event){
    this.scrollViewComponents.push(event.component);
  }
}
