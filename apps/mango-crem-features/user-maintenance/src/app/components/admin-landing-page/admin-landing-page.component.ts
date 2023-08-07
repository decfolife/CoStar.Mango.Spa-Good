import { Component, ViewChild } from '@angular/core';
import { ObjectActionsComponent } from '@micro-components/object-actions/object-actions/object-actions.component';


@Component({
  selector: 'admin-landing-page',
  templateUrl: './admin-landing-page.component.html',
  styleUrls: ['./admin-landing-page.component.scss']
})
export class AdminLandingPageComponent {

  public objectName: string;
  public objectTypeId: number;
  public objectId: number;
  public objectTypeTypeId: number;
  public hiddenPremise: number;

  @ViewChild("ObjectActions") objectActions: ObjectActionsComponent;

  constructor(
    ) {}

  ngOnInit(): void {
  }

  public archiveBuilding(event) {
    this.objectName = "Test";
    this.objectTypeId = 3;
    this.objectId = 1176;
    this.objectTypeTypeId = 300;
    this.hiddenPremise = 0;
    setTimeout(() => {
      this.objectActions.openObjectActionArchivePopup();
    })
    
  }

  public archiveLease(event) {
    this.objectName = "Test";
    this.objectTypeId = 4;
    this.objectId = 914;
    this.objectTypeTypeId = 400;
    this.hiddenPremise = 0;
    setTimeout(() => {
      this.objectActions.openObjectActionArchivePopup();
    })
  }
}
