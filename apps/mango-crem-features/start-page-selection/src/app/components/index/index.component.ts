import {Component,OnInit} from '@angular/core';
import { UserSelectedPageData } from '../../models/userSelectedPageData';
import { StartPageService } from '../../services/data.service';

@Component({
  selector: 'start-page-selection',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public startPagesList: any;
  public modulesList: any;

  constructor(private starPageSvc: StartPageService
  ) {
  }

  ngOnInit() {
    this.getStartPagesList();
  }

  // Dropdown list items
  getStartPagesList() {
    this.starPageSvc.getDefaultStartPagesList().subscribe((response:any) => {
      if (response.success) {
        this.startPagesList = response.data;
        this.getModulesList(this.startPagesList);
      }
    },
    (error: any) => {
      console.log("Error occurred getting start page data: ", error);
    }
  );
  }

  // This method creates list of buttons or tiles that user will see aboe the dropdown list
  getModulesList(modulesData: any) {
    const hasModules = modulesData.some(obj => obj.moduleID == 1 || obj.moduleID == 2);
    if (hasModules) {
      this.modulesList = modulesData.filter(data => 
        (data.isModule == true && (data.moduleID == 1 || data.moduleID == 2)) );
    } else {
      this.modulesList = modulesData.filter(data => data.isModule == true );
    }
  }

  // Saves user selected start page.
  startPageSelected(selectedItem) {
    let selectedPage: UserSelectedPageData = { defaultStartPageModuleId: selectedItem.moduleID, defaultStartPageUrl:  selectedItem.pagePath}
    this.starPageSvc.saveDefaultStartPage(selectedPage).subscribe((response:any) => {
      if (response.success) {
        sessionStorage.setItem(`FramelessCurrentModuleId`, selectedItem.moduleID);
        const urlTransitionPage = "../../.." + selectedItem.pagePath;
        document.location.href = urlTransitionPage;
      } else {
        console.log('Failed to save user selected start page', response.clientErrorMessage);
      } 
    },
    (error: any) => console.log("Error occurred saving user selected page: ", error),
      () => {});
  }
}