import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'cs-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  public date: any;
  @Input() value: string = null;



  ngOnInit(): void {
    this.date = new UntypedFormControl(new Date());
  }
}
