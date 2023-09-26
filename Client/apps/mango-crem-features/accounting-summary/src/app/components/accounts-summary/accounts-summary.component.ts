import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AccountingSummaryService } from '../../services/accounting-summary.service';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'mango-accounts-summary',
  templateUrl: './accounts-summary.component.html',
  styleUrls: ['./accounts-summary.component.scss'],
})
export class AccountsSummaryComponent  implements OnInit {

  gridDataSource: any;
  gridBoxValue: number[] = [1];
  isGridBoxOpened: boolean = false;
  isAccountingEventEmpty: boolean = true;
  readonly allowedPageSizes = [5, 'all'];

  constructor(private ref: ChangeDetectorRef, private accountingSummaryService: AccountingSummaryService) { }

  ngOnInit(): void {
    this.getEventsDropDownData();
  }

  getEventsDropDownData() {
    this.accountingSummaryService.getAccountingEvents().subscribe(response => {
      if (response.succeeded && response.data.length != 0) {
        const dropdownEvents = this.getUniqueEvents(response.data);
        this.gridDataSource = this.makeAsyncDataSource(dropdownEvents);
        this.isAccountingEventEmpty = false;
      }
    });
  }

  getUniqueEvents(data: any[]) {
    const uniqueObjectsMap = new Map();

    // Iterate through the original array and add unique objects to the map
    for (const item of data) {
      const masterScheduleID = item.masterScheduleID;
      if (!uniqueObjectsMap.has(masterScheduleID)) {
        uniqueObjectsMap.set(masterScheduleID, item);
      }
    }

    // Convert the map values (unique objects) back to an array
    const uniqueObjectsArray= Array.from(uniqueObjectsMap.values());

    // Return sorted array based on sortOrder
    return uniqueObjectsArray.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  makeAsyncDataSource(data: any[]) {
    return new CustomStore({
      loadMode: 'raw',
      key: 'sortOrder',
      load() {
        return data;
      },
    });
  }

  gridBox_displayExpr(item) {
    return item && `${item.classificationType} (${item.amortizationProfileName})`;
  }

  onGridBoxOptionChanged(e) {
    if (e.name === 'value') {
      this.isGridBoxOpened = false;
      this.ref.detectChanges();
    }
  }

}
