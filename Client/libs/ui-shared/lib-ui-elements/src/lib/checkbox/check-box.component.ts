import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DxCheckBoxComponent, DxTextBoxComponent } from 'devextreme-angular';

@Component({
  selector: 'crem-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
})

export class CheckBoxComponent {
  @Input() value: boolean;
  @Input() elementAttr: string;
  @Input() disabled: boolean;
  @Output() onChangeEvent = new EventEmitter();
  @ViewChild(DxCheckBoxComponent, { static: false }) checkBox: DxCheckBoxComponent;

  constructor() { }

  ngAfterViewInit () {
    this.checkBox.disabled = this.disabled;
    this.checkBox.instance.registerKeyHandler('enter', () => {
        this.onEnterKey();
    });
}

  public onValueChanged(event) {
    this.onChangeEvent?.emit(event);
  }

  public onEnterKey() {
    this.value = !this.value;
  }
  
}