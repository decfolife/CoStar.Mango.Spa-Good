/* eslint-disable rxjs-angular/prefer-composition */
import { Component, OnInit, ViewChild } from '@angular/core';

import { DataSetGridComponent } from '../data-set-grid/data-set-grid.component';
import { DataSetDictionaryService } from '../../services/data-set-dictionary.service';

@Component({
  selector: 'mango-data-sets',
  templateUrl: './data-sets.component.html',
  styleUrls: ['./data-sets.component.scss'],
})
export class DataSetsComponent implements OnInit {
  @ViewChild('dataSetGrid')
  dataSetGrid: DataSetGridComponent;

  searchText: string;
  showClearFilters = false;
  hasAddRights = false;
  rightsLoaded = false;
  appliedFilterCount = 0;

  constructor(private service: DataSetDictionaryService) {}

  ngOnInit(): void {
    this.service.getUserModuleRights().subscribe((res) => {
      const rights = res.data.find((x) => x.moduleId === 192);

      this.hasAddRights = rights?.hasAddRights ?? false;
      this.rightsLoaded = true;
    });
  }

  searchDataGrid(): void {
    this.dataSetGrid?.dataSetGrid?.instance?.searchByText(this.searchText);
  }

  showFilterBuilder() {
    this.dataSetGrid.filterBuilderVisible = true;
  }

  clearGridFilters(evt: MouseEvent) {
    evt.stopPropagation();
    this.dataSetGrid?.dataSetGrid?.instance?.clearFilter();

    this.appliedFilterCount = 0;
    this.showClearFilters = false;
  }

  toggleClearFilters() {
    this.showClearFilters = !this.showClearFilters;
  }

  updateFilterCount(newCount: number) {
    this.appliedFilterCount = newCount;
  }
}
