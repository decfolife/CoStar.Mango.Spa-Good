import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mango-render-form',
  templateUrl: './render-form.component.html',
  styleUrls: ['./render-form.component.scss']
})
export class RenderFormComponent implements OnInit {
  oid:number; 
  otid: number;
  ottid: number;
  fid: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { 
      this.route.queryParamMap.subscribe(queryParamMap => {
        this.oid   = parseInt(queryParamMap.get('oid'));          
        this.otid  = parseInt(queryParamMap.get('otid'));
        this.ottid = parseInt(queryParamMap.get('ottid'));
        this.fid   = parseInt(queryParamMap.get('fid'));
    });
  }

  ngOnInit(): void {}

}  
