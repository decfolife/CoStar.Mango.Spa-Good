import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule, DropdownModule } from '@mango/ui-shared/lib-ui-elements';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { DxDataGridModule } from 'devextreme-angular';
import { SharedModule } from '../../shared/shared.module';
import { RemindersListService } from './reminders-list-service';

@Component({
  selector: 'mango-reminders-list',
  standalone: true,
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.scss'],
  imports: [
    CommonModule,
    DropdownModule,
    DxDataGridModule,
    SearchModule,
    SharedModule,
    ButtonModule
  ],
  providers: [
    DatePipe,
    RemindersListService
  ]
})
export class RemindersListComponent {}
