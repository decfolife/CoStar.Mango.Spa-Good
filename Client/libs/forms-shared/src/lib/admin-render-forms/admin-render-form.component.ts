import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DynamicFormsFacade } from '@forms/+state/dynamic-forms.facade';


@Component({
  selector: 'mango-admin-render-form',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './admin-render-form.component.html',
  styleUrls: ['./admin-render-form.component.scss']
})
export class AdminRenderFormComponent implements OnInit {
  //isLoading$ = this.dynamicFormsFacade.loading$;
  constructor(private dynamicFormsFacade: DynamicFormsFacade) {}
  ngOnInit() {
    const beginning = '';
    //this.dynamicFormsFacade.loadformsList();
  }
}
