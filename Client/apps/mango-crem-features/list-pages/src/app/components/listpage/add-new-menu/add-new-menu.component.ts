import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ListPageService } from '../core/services/listpage.service';
import { ActivatedRoute, Router } from '@angular/router';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import { EditPage } from '../shared/models/edit-page';
import { MatDialog } from '@angular/material/dialog';
import { AddBuildingModalComponent } from 'libs/ui-shared/lib-ui-shared/src/lib/add-building-modal/add-building-modal.component';
import { AddSupplierModalComponent } from '@mango/ui-shared/lib-ui-shared';
import { SUPPLIER_WIZARD_OTID } from '@mango/data-models/lib-data-models';
import { AddEquipmentModalComponent } from '@mango/ui-shared/lib-ui-shared';
import { EQUIPMENT_WIZARD_OTID } from '@mango/data-models/lib-data-models';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-add-new-menu',
  templateUrl: './add-new-menu.component.html',
  styleUrls: ['./add-new-menu.component.scss']
})
export class AddNewMenuComponent implements OnInit {
  private _editPages: EditPage[] = [];
  navigationPages: EditPage[] = [];
  objectTypeId: string;
  addButtonObjects: any = [];
  isChargeAction: boolean = false;

  @Input() enabled: boolean;
  @Input() isGLEvent: boolean;
  @Input() OTTID: number;
  @Input()
  set editPages(editPages: EditPage[]) {
    this.onEditPagesChanged(editPages);
  }
  get editPages(): EditPage[] { return this._editPages; }

  @Output()
  navigateToEditPage = new EventEmitter<EditPage>();

  @Output() reLoadGrid = new EventEmitter<boolean>();

  faPlus = faPlus;

  constructor(private sanitizer: DomSanitizer, public service: ListPageService, private route: ActivatedRoute, private dialog: MatDialog,private router: Router) { }

  onEditPagesChanged(editPages: EditPage[]) {
    if (editPages === null) {
      editPages = [];
    }

    this._editPages = editPages;
  }

  ngOnInit(): void {
    this.getModuleRights()
    this.objectTypeId = this.route.snapshot.data.objectTypeId;
  }

  addButtonClick(editPage: EditPage) {
    //const htmlLink = this.ensureJavaScript(editPage.navigationUrl);

    if (this.isGLEvent) {
      this.isChargeAction = true;
    }

    this.navigateToEditPage.next(editPage);
    //window.location.href = htmlLink;
    this.navRouterUrl(editPage.navigationUrl);
  }

  addButtonClickSingle() {
    if (this.editPages.length !== 1) {
      return;
    }

    const page = this.editPages[0];
    //const htmlLink = this.ensureJavaScript(page.navigationUrl);

    this.navigateToEditPage.next(page);
    //window.location.href = htmlLink;
    this.navRouterUrl(page.navigationUrl);
  }

  addButtonClickSingleForMatMenu() {

    if (this.navigationPages.length !== 1) {
      return;
    }

    const page = this.navigationPages[0];
    //const htmlLink = this.ensureJavaScript(page.navigationUrl);

    this.navigateToEditPage.next(page);
    //window.location.href = htmlLink;
    this.navRouterUrl(page.navigationUrl);
  }

  makeSafeHtmlLink(htmlLink: string) {
    htmlLink = this.ensureJavaScript(htmlLink);

    return this.sanitizer.bypassSecurityTrustUrl(htmlLink);
  }

  private navRouterUrl(htmlLink: string) {

    let htmlurl = htmlLink.replace('GoToPage(\'','').replace('\');','');

    let splitHtmlUrl = htmlurl.split('?');
    const queryParams = {};
    if(splitHtmlUrl.length > 1) {
      const params = splitHtmlUrl[1].split('&');
      params.forEach(element => {
        const [key, value] = element.split('=');
        queryParams[key] = value;
      });
    }
   // console.log(splitHtmlUrl[0]);
   // console.log(queryParams);
   this.router.navigate([splitHtmlUrl[0]], { queryParams: queryParams } );
    
  }

  private ensureJavaScript(htmlLink: string) {    
     return htmlLink.startsWith('javascript:')
      ? htmlLink
      : `javascript:${htmlLink}`; 
  }
  //** we are getting module rights only for below object types*/
  //** Building (OTID = 3)
  //** Lease (OTID = 4)
  //** Supplier (OTID = 175)
  //** Equipment Lease (OTID = 174)
  //** Premise/Store (OTID = 2)
  //** Financials (OTID = 182)
  getModuleRights() {
    const objectIds = "3,4,174,175";  //calls module rights api for these ObjectTypeId's
    this.service.getUserModuleRights(objectIds).subscribe(
      (res: any) => {
        this.addButtonObjects = res.data.filter(v => v.hasAddRights);
      },
      (error: any) => console.log('Error occurred getting addMenu items: ', error)
    );
  }

  getNavigationLink(objectTypeId: number) {

    if (objectTypeId == 3) {
      this.showAddBuildingPopup();
    }

    if (objectTypeId === SUPPLIER_WIZARD_OTID) {
      this.showAddSupplierPopup();
    }
  
    if (objectTypeId == EQUIPMENT_WIZARD_OTID) {
      this.showAddEquipmentPopup();
    }
 
}

showAddSupplierPopup(): void {
  const dialogRef = this.dialog.open(AddSupplierModalComponent, {
    disableClose: true,
    height: '370px',
    width: '700px',
    maxWidth: '1100px',
    data: {
      objectTypeId: this.objectTypeId,
    }
  }); 
  dialogRef.afterClosed();
}

showAddEquipmentPopup() {
  let dialogRef = this.dialog.open(AddEquipmentModalComponent, {
    disableClose: true,
    height: '600px',
    width: '700px',
    maxWidth: '1100px',
    data: {
      objectTypeId: this.objectTypeId,
      userId: 2
    }
  });

  dialogRef.afterClosed();
}

showAddBuildingPopup() {
      let dialogRef = this.dialog.open(AddBuildingModalComponent, {
        disableClose: true,
        height: '81%',
        width: '75%',
        maxWidth: '1100px',
        data: {
          objectTypeId: this.objectTypeId,
          userId: 2
        }
      });
  
    dialogRef.afterClosed().subscribe(result => {
        this.reLoadGrid.emit(true);
    });
}

}

