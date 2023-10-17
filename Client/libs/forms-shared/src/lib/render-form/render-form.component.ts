import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@mangoSpa/src/environments/environment.local'
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Component({
  selector: 'mango-render-form',
  templateUrl: './render-form.component.html',
  styleUrls: ['./render-form.component.scss']
})
export class RenderFormComponent implements OnInit {
  oid: number;
  otid: number;
  ottid: number;
  fid: number;
  externalCremLink: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private facade: MangoAppFacade
  ) { }

  ngOnInit(): void {
    const renderFormParams = this.router.url.split('?')[1]
    this.facade.clientKey$.subscribe(clientKey => {
      this.externalCremLink = `${environment.cremBaseUrl.replace('[CLIENT]', clientKey)}/v06/Forms/RenderForm.aspx?${renderFormParams}`
    })
    this.route.queryParamMap.subscribe(queryParamMap => {
      this.oid = parseInt(queryParamMap.get('oid') || queryParamMap.get('OID'));
      this.otid = parseInt(queryParamMap.get('otid') || queryParamMap.get('OTID'));
      this.ottid = parseInt(queryParamMap.get('ottid') || queryParamMap.get('OTTID'));
      this.fid = parseInt(queryParamMap.get('fid') || queryParamMap.get('FID'));
    });
  }
}  
