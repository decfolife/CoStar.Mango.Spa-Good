import { Component, Input, OnInit } from '@angular/core';
import { Errors } from '@mango/data-models/lib-data-models';

@Component({
  selector: 'mango-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.scss']
})
export class ListErrorsComponent implements OnInit {
  formattedErrors: Array<string> = [];

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = Object.keys(errorList.errors || {}).map(
      (key) => `${key} ${errorList.errors[key]}`
    );
  }

  get errorList() {
    return this.formattedErrors;
  }
}
