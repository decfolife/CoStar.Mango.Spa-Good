/* eslint-disable rxjs-angular/prefer-composition */
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { mdiInformation } from '@mdi/js';

import { TooltipService } from './tooltip.service';

export interface HistoryEntry {
  id: string;
  date: string;
  user: string;
  field: string;
  value: string;
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'crem-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  providers: [TooltipService],
  encapsulation: ViewEncapsulation.Emulated

})
export class TooltipComponent implements OnInit {
  // Upon component consumption, the below data object will be your only
  // required Input, structured by the data types popover and history interfaces above.
  @Input()
  OTID: string;

  @Input()
  helptextName: string;

  @Input()
  fieldHistoryName: string;

  @Input()
  portfolioID: string;

  @Input()
  objectID= '';

  helpTextData: string;
  fieldIdData: string;
  fieldTitleData: string;
  dateFormat = 'MM/dd/yyyy h:mm a';

  historyData: HistoryEntry[];

  mdiInformation = mdiInformation;

  isEuroDateFormat: boolean;
  withAnimationOptionsVisible: boolean;

  color = 'gray';
  type = 'text';

  disabled = false;

  constructor(private tooltipService: TooltipService) {
    this.withAnimationOptionsVisible = false;

    this.helpTextData = 'Edit the first lease year, if needed and then click generate ' +
      'to produce a regular lease year calendar for the term of the lease. The lease ' +
      'year does not affect the breakpoint schedule. If the lease year is more or less ' +
      'than a calendar year, you may have to calculate the breakpoint for that lease ' +
      'year using your preferred pro ration method.';

    this.fieldIdData = 'LeaseYears';
    this.fieldTitleData = 'Lease Terms';

    this.historyData = [
      {
        id: 'gethelp',
        date: '1/10/1994',
        user: 'Barbara G',
        field: 'Get Help',
        value: 'This is helptext'
      }, {
        id: 'gothelp',
        date: '1/10/2000',
        user: 'Allen Q',
        field: 'Got Help',
        value: 'This was helptext'
      }, {
        id: 'willgethelp',
        date: '1/10/2022',
        user: 'Xavier S',
        field: 'Will Get Help',
        value: 'This will be helptext'
      }];
  }

  ngOnInit(): void {
    const isEuroElement = document.getElementById('IsEuroDateFormat');

    this.isEuroDateFormat = isEuroElement?.innerHTML.toLowerCase() === 'true';

    if (this.isEuroDateFormat) {
      this.dateFormat = 'dd/MM/yyyy h:mm a';
    }
  }

  getHelpText() {
    this.tooltipService.GetHelptextAndHistory(
      this.portfolioID,
      this.OTID,
      this.helptextName,
      this.fieldHistoryName,
      this.objectID
    ).subscribe(result => {
      this.helpTextData = result['text'];
      this.fieldIdData = result['name'];
      this.fieldTitleData = result['subject'];
      this.historyData = result['history'];

      this.withAnimationOptionsVisible = !this.withAnimationOptionsVisible;
    });
  }
}
