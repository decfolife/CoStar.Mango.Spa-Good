import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
export const brandclose = `<svg width="24" height="24" id="brand-close" y="0">
    <path d="M 13.6 6.128 L 12.472 5 L 8 9.472 L 3.528 5 L 2.4 6.128 L 6.872 10.6 L 2.4 15.072 L 3.528 16.2 L 8 11.728 L 12.472 16.2 L 13.6 15.072 L 9.128 10.6 Z"  fill-rule="evenodd"/>
  </svg>`;
  export const brandsearch = `<svg width="24" height="24" id="brand-search" y="0">
  <path d="M 10.576 10.547 L 10.034 10.547 L 9.842 10.362 C 10.538 9.555 10.92 8.525 10.919 7.46 C 10.919 4.027 7.203 1.881 4.23 3.597 C 1.257 5.314 1.257 9.605 4.23 11.322 C 4.908 11.713 5.677 11.919 6.46 11.919 C 7.564 11.919 8.58 11.515 9.362 10.842 L 9.547 11.034 L 9.547 11.576 L 12.978 15 L 14 13.978 L 10.576 10.547 Z M 6.46 10.547 C 4.751 10.547 3.372 9.168 3.372 7.46 C 3.372 5.751 4.751 4.372 6.46 4.372 C 8.168 4.372 9.547 5.751 9.547 7.46 C 9.547 9.168 8.168 10.547 6.46 10.547 Z"  fill-rule="evenodd"/>
</svg>`

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
