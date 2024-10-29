/* eslint-disable rxjs-angular/prefer-composition */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DataSetDictionaryService } from '../../services/data-set-dictionary.service';

@Component({
  selector: 'mango-data-field-format-editor',
  templateUrl: './data-field-format-editor.component.html',
  styleUrls: ['./data-field-format-editor.component.scss'],
})
export class DataFieldFormatEditorComponent implements OnInit {
  @Input()
  dataTypeId: number;

  @Input()
  set value(val: string) {
    this.selection = val;
  }
  get value() {
    return this.selection;
  }

  @Output()
  formatEditorValueChangeEvent = new EventEmitter<any>();

  dropDownOptions = [];
  showEditor = false;

  private selection: string;

  constructor(private service: DataSetDictionaryService) {}

  ngOnInit(): void {
    this.service.getDataTypeFormatList(this.dataTypeId).subscribe((res) => {
      if (!res.succeeded) {
        return;
      }

      this.showEditor = true;

      this.dropDownOptions = res.data
        .map((x) => x.dataTypeFormatString)
        .sort((a: string, b: string) => a.localeCompare(b));

      if (this.dropDownOptions.length === 1 && this.dropDownOptions[0] === '') {
        this.showEditor = false;
      }
    });
  }

  public valueChanged(e) {
    this.formatEditorValueChangeEvent.emit(e);
  }
}
