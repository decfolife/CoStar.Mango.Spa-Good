import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { environment } from '@mangoSpa/src/environments/environment.local'
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
  externalCremLink: string

  @ViewChild("ObjectActions") objectActions: ObjectActionsComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private facade: MangoAppFacade
    ) {}

  ngOnInit(): void {
    const renderFormParams = this.router.url.split('?')[1]
    this.facade.clientKey$.subscribe(clientKey => {
      this.externalCremLink = `${environment.cremBaseUrl.replace('[CLIENT]', clientKey)}/v06/Admin/AdminHome2.aspx`
    })
    // this.route.queryParamMap.subscribe(queryParamMap => {
    //   this.oid = parseInt(queryParamMap.get('oid') || queryParamMap.get('OID'));
    //   this.otid = parseInt(queryParamMap.get('otid') || queryParamMap.get('OTID'));
    //   this.ottid = parseInt(queryParamMap.get('ottid') || queryParamMap.get('OTTID'));
    //   this.fid = parseInt(queryParamMap.get('fid') || queryParamMap.get('FID'));
    // });
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
