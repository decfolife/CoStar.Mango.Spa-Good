import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DynamicFormsFacade } from '@forms/+state/dynamic-forms.facade';

@Component({
  selector: 'mango-admin-etl',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './admin-etl.component.html',
  styleUrls: ['./admin-etl.component.scss'],
})
export class AdminEtlComponent implements OnInit {
  //isLoading$ = this.dynamicFormsFacade.loading$;
  constructor(private dynamicFormsFacade: DynamicFormsFacade) {}
  ngOnInit() {
    const beginning = '';
    //this.dynamicFormsFacade.loadformsList();
  }
}
