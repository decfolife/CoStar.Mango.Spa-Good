import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common'; // Only import what you use
import { ButtonModule, DropdownModule } from '@mango/ui-shared/lib-ui-elements';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { DxDataGridModule, DxDataGridComponent } from 'devextreme-angular'; // Import DxDataGridComponent directly
import { SharedModule } from '../../shared/shared.module';
import { RemindersService } from './../../shared/services/reminders.service';
import { SearchComponent } from '@mango/ui-shared/cosmos';
import { ActivatedRoute } from '@angular/router';

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
  providers: [DatePipe, RemindersService]
})
export class RemindersListComponent implements OnInit {
  @ViewChild("RemindersDataGrid") remindersDataGrid: DxDataGridComponent;
  @ViewChild('SearchBox') searchBox: SearchComponent;

  public gridData: any;

  constructor(private service: RemindersService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadRemindersData();
  }

  private loadRemindersData(): void {
    const otid: number = Number(this.route.snapshot.queryParamMap.get('otid'));
    const oid: number = Number(this.route.snapshot.queryParamMap.get('oid'));

    this.service.getRemindersList(otid, oid).subscribe(res => {
      this.gridData = res.success ? res.data : null;
    });
  }
}