import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountingSummaryService } from '../../services/accounting-summary.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mango-accounts-summary-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit, OnDestroy {

  leaseName: string;
  componentName = 'title';
  showTooltip = false;
  isLocked  = false;
  isArchived = false;
  lockedReason: string;
  private subscription = new Subscription();


  constructor(public accountingSummaryService: AccountingSummaryService) { }

  ngOnInit(): void {
    this.subscription.add(this.accountingSummaryService.getTitleInfoFromSubject().subscribe(titleInfo => {
      this.leaseName = titleInfo.leaseName;
      this.isLocked = titleInfo.isLocked;
      this.isArchived = titleInfo.isArchived;
      this.lockedReason = titleInfo.lockedReason;
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showObjectInfoPopup() {
    alert("will open object information");
  }

}
