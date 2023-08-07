import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { brandsearch } from './index';
import { brandclose } from './index';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'crem-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() label?: string;
  @Input() placeholder? = 'Search';
  value: string = null;
  brandsearch= brandsearch;
  brandclose=brandclose;
  @Input() hint?: string = null;
  @Input() showLabel? = false;
  @Input() disabled? = false;
  @Input() required? = false;
  @Input() optional? = false;
  @Output() changed = new EventEmitter<string>();
  @ViewChild('search') searchInput;

  handleClear(){
    // clearing the value
  this.searchInput.nativeElement.value = null;
  this.changed.emit(this.searchInput.nativeElement.value);
  this.value = null;
}
  outputSearchText(e) {
    this.value = e.target.value;
    this.changed.emit(this.value);
  }
}
