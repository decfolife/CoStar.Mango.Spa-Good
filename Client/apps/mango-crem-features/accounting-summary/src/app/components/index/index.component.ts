import { Component, Input, OnInit } from '@angular/core';
import { AccountingSummaryService } from '../../services/accounting-summary.service';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mango-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  @Input() leaseAbstractId: number;

  @Input() navPageId: number;

  constructor(private accountingSummaryService: AccountingSummaryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (environment.isRestful) {
      this.navPageId = Number(this.route.snapshot.queryParamMap.get('navpageid'));
      this.leaseAbstractId = Number(this.route.snapshot.queryParamMap.get('oid'));
    }
    
    this.accountingSummaryService.setNavPageId(this.navPageId);
    this.accountingSummaryService.setLeaseAbstractId(this.leaseAbstractId);
  }
}
