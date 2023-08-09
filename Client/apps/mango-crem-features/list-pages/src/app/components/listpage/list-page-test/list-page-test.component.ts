import { Component, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-list-page-test',
  templateUrl: './list-page-test.component.html',
  styleUrls: ['./list-page-test.component.scss'],
})
export class ListPageTestComponent {
  showMore = true;
  showListMap = true;
  showFilters = true;
  showSearch = true;
  showPortfolio = true;
  showSaveAs = true;
  showShare = true;
  showExpandCollapse = true;
  showColumnChooser = true;
  showExport = true;
  showAdd = true;
  showHeaderFilter = true;
  showArchiveToggle = true;
}
