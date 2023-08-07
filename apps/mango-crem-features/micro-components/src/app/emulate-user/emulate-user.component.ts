import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SimpleGridComponent } from '@mango/ui-shared/lib-ui-elements';
import { EmulateUserService } from '../services/emulate-user.service';

@Component({
  selector: 'mango-emulate-user',
  templateUrl: './emulate-user.component.html',
  styleUrls: ['./emulate-user.component.scss']
})
export class EmulateUserAppComponent implements OnInit {
  dataSource: any;
  columns: any;
  password: string;
  @ViewChild('SimpleGrid')
  simpleGrid: SimpleGridComponent;

  @Input('is-central-authenticated') isCA: string

  constructor(
    private emulateUserService: EmulateUserService
  ) { }
  ngOnInit(): void {
      this.emulateUserService.getEmulateUserList()
      .subscribe(result => {
        this.dataSource = result.data;
      })

    this.columns = [
			{	dataField : "contactID",
				alignment : "left",
				visible : true,
				dataType : "number",
				caption : "ID",
        width: "60"
			},
			{	dataField : "contactName",
        caption : "Name",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "companyName",
        caption : "Company",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "primaryGroup",
        caption : "Primary Group",
				alignment : null,
				visible : true,
				dataType : null
			},
			{	dataField : "roleDesc",
        caption : "Role",
				alignment : null,
				visible : true,
				dataType : null,
        width: "100"
			},
		];
  }

  public searchDataGrid(data: string): void {
    this.simpleGrid.searchDataGrid(data)
  }

  public passwordChange(event) {
    let passwordElement = <HTMLInputElement>document.getElementById("ctl00_ctl00_ContentPlaceHolder1_modalBoxBody_emulateTxtPassword");
    setTimeout(() => {
      if (passwordElement) {
        passwordElement.value = event;
      }
    })
  }

  public onSelectionChange(event) {
    let selectedUser = <HTMLInputElement>document.getElementById("ctl00_ctl00_ContentPlaceHolder1_modalBoxBody_emulsteTxtUser");
    setTimeout(() => {
      if (selectedUser) {
        selectedUser.value = event.selectedRowsData[0].contactID;
      }
    })
  }   
}
