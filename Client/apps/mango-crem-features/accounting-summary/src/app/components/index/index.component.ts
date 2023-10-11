import { Component } from '@angular/core';
import { AccountingSummaryService } from '../../services/accounting-summary.service';

@Component({
  selector: 'mango-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent {

  leaseId:number=1001;

  constructor(private accountingSummaryService: AccountingSummaryService) { }

  ngOnInit(): void {
    this.accountingSummaryService.setLeaseAbstractId(this.leaseId);
  }
}
