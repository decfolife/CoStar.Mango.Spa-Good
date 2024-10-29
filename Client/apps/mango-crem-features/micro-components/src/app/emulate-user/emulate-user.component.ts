import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { SimpleGridComponent } from '@mango/ui-shared/lib-ui-elements';
import { EmulateUserService } from '../services/emulate-user.service';
import { ContactRecord } from '@mango/data-models/lib-data-models';

@Component({
  selector: 'mango-emulate-user',
  templateUrl: './emulate-user.component.html',
  styleUrls: ['./emulate-user.component.scss'],
})
export class EmulateUserAppComponent implements OnInit {
  @Output() setEmulatedUserEvent = new EventEmitter<ContactRecord>();

  dataSource: any;
  columns: any;
  password: string;
  @ViewChild('SimpleGrid')
  simpleGrid: SimpleGridComponent;

  constructor(private emulateUserService: EmulateUserService) {}

  ngOnInit(): void {
    this.emulateUserService.getEmulateUserList().subscribe((result) => {
      this.dataSource = result.data;
    });

    this.columns = [
      {
        dataField: 'contactID',
        alignment: 'left',
        visible: true,
        dataType: 'number',
        caption: 'ID',
        width: '60',
      },
      {
        dataField: 'contactName',
        caption: 'Name',
        alignment: null,
        visible: true,
        dataType: null,
      },
      {
        dataField: 'companyName',
        caption: 'Company',
        alignment: null,
        visible: true,
        dataType: null,
      },
      {
        dataField: 'primaryGroup',
        caption: 'Primary Group',
        alignment: null,
        visible: true,
        dataType: null,
      },
      {
        dataField: 'roleDesc',
        caption: 'Role',
        alignment: null,
        visible: true,
        dataType: null,
        width: '100',
      },
    ];
  }

  public searchDataGrid(data: string): void {
    this.simpleGrid.searchDataGrid(data);
  }

  public onSelectionChange(event) {
    this.setEmulatedUserEvent.emit(event.selectedRowsData[0]);
  }
}
