import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'journal-entries-to-approve',
  templateUrl: './journal-entries-to-approve.component.html',
  styleUrls: ['./journal-entries-to-approve.component.scss'],
})
export class JournalEntriesToApproveComponent implements OnInit {
  public portfolioList: any = [];
  constructor() {}

  ngOnInit() {}

  public dropdownChange(dropdown, event) {
    // console.log("dropdown changing")
    return;
  }

  public apply(event) {
    // console.log("button pressed")
    return;
  }
}
