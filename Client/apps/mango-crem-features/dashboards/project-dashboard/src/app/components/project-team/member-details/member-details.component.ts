import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ProjectTeamMember } from '@mango/data-models/lib-data-models';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
})
export class MemberDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('MemberDetailsGrid') memberDetailsGrid: DxDataGridComponent;
  @Input() projectMember: ProjectTeamMember;
  @Input() searchText: string;
  projectMemberData: ProjectTeamMember[] = [];

  public dataRetrieved: boolean = false;

  constructor() {}

  ngOnInit() {
    this.projectMemberData.push(this.projectMember);
  }

  ngAfterViewInit() {
    if (this.searchText) this.searchDataGrid();
  }

  searchDataGrid() {
    this.memberDetailsGrid?.instance.searchByText(this.searchText);
  }
}
