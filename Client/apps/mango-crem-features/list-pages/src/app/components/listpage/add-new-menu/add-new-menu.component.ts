import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ListPageService } from '../core/services/listpage.service';
import { ActivatedRoute } from '@angular/router';

import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';

import { EditPage } from '../shared/models/edit-page';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-add-new-menu',
  templateUrl: './add-new-menu.component.html',
  styleUrls: ['./add-new-menu.component.scss']
})
export class AddNewMenuComponent implements OnInit {
  private _editPages: EditPage[] = [];
  navigationPages: EditPage[] = [];
  queryParam: string;
  addButtonObjects: any = [];
  isChargeAction: boolean = false;

  @Input() enabled: boolean;
  @Input() isGLEvent: boolean;
  @Input()
  set editPages(editPages: EditPage[]) {
    this.onEditPagesChanged(editPages);
  }
  get editPages(): EditPage[] { return this._editPages; }

  @Output()
  navigateToEditPage = new EventEmitter<EditPage>();

  faPlus = faPlus;

  constructor(private sanitizer: DomSanitizer,public service: ListPageService,private route: ActivatedRoute) { }

  onEditPagesChanged(editPages: EditPage[]) {
    if (editPages === null) {
      editPages = [];
    }

    this._editPages = editPages;
  }
 
  ngOnInit(): void {
      this.getModuleRights()
      this.queryParam = this.route.snapshot.queryParamMap.get('ObjectTypeId');
  }

  addButtonClick(editPage: EditPage) {
    const htmlLink = this.ensureJavaScript(editPage.navigationUrl);

    if(this.isGLEvent) {
      this.isChargeAction = true;
    }  

    this.navigateToEditPage.next(editPage);
    window.location.href = htmlLink;
  }

  addButtonClickSingle() {
    if (this.editPages.length !== 1) {
      return;
    }

    const page = this.editPages[0];
    const htmlLink = this.ensureJavaScript(page.navigationUrl);

    this.navigateToEditPage.next(page);
    window.location.href = htmlLink;
  }

  addButtonClickSingleForMatMenu() {

    if (this.navigationPages.length !== 1) {
      return;
    }

    const page = this.navigationPages[0];
    const htmlLink = this.ensureJavaScript(page.navigationUrl);

    this.navigateToEditPage.next(page);
    window.location.href = htmlLink;
  }

  makeSafeHtmlLink(htmlLink: string) {
    htmlLink = this.ensureJavaScript(htmlLink);

    return this.sanitizer.bypassSecurityTrustUrl(htmlLink);
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
        if (res.success) {
          this.addButtonObjects = res.data.filter(v=>v.hasAddRights);
        }
      },
      (error: any) => console.log('Error occurred getting addMenu items: ', error)
    );
  }
getNavigationLink(objectTypeId:number){
  this.service.getAddWizards(objectTypeId) //calls getAddWizards for specific ObjectTypeId and that returns MatMenu buttons related Popup on CREM
  .subscribe(result => { 
      this.navigationPages = result.data.addWizards;
      this.addButtonClickSingleForMatMenu();
  });
 
}

}

