import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DynamicFormsFacade } from '@forms/+state/dynamic-forms.facade';

import {
  ButtonModule,
  DropdownModule,
  LibUiElementsModule,
  ModalModule,
} from '@mango/ui-shared/lib-ui-elements';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchComponent, SearchModule } from '@mango/ui-shared/cosmos';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'mango-dynamic-forms-list',
  standalone: true,
  imports: [
    CommonModule,
    LibUiElementsModule,
    SearchModule,
    ButtonModule,
    MatIconModule,
    DxDataGridModule,
    DxLoadPanelModule,
    ModalModule,
    MatMenuModule,
    MatButtonModule,
    FontAwesomeModule,
    MatDialogModule,
    DropdownModule,
  ],
  templateUrl: './dynamic-form-list.component.html',
  styleUrls: ['./dynamic-form-list.component.scss'],
})
export class DynamicFormsListComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  @ViewChild('DynamicFormsGrid') dynamicFormsGrid: DxDataGridComponent;
  @ViewChild('SearchBox') searchBox: SearchComponent;
  searchText = '';
  forms$ = this.dynamicFormsFacade.forms$;
  isLoading$ = this.dynamicFormsFacade.loading$;
  error$ = this.dynamicFormsFacade.error$;

  constructor(private dynamicFormsFacade: DynamicFormsFacade) {}

  ngOnInit() {
    this.dynamicFormsFacade.loadformsList();
  }

  navigateToObject(event: any) {

    this.router.navigate(['/crem/forms/admin-forms/dynamic-form'], {
      relativeTo: this.route,
      queryParams: { FID: event.data.id  }, 
      queryParamsHandling: 'merge'
    })
  
  }

  searchDataGrid(data) {
    this.searchText = data;
    this.dynamicFormsGrid.instance.searchByText(this.searchText);
  }

  clearAllFilters() {
    this.dynamicFormsGrid.instance.clearFilter();
    this.dynamicFormsGrid.instance.searchByText(this.searchText);
  }
}
