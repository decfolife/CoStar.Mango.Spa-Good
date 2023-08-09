import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cs-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnInit  {
  checked = false;

  @Input() staticText: string;

  @Output() value = new EventEmitter<boolean>();

isChecked(e){
  this.checked = e.checked;
  this.value.emit(this.checked)
}
ngOnInit(){
  this.value.emit(this.checked);

}
}
