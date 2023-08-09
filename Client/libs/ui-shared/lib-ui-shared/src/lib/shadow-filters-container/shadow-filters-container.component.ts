import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'shadow-filters-container',
  templateUrl: './shadow-filters-container.component.html',
  styleUrls: ['./shadow-filters-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ShadowFiltersContainerComponent implements OnInit {

  public dummyCount = [1,2,3,4,5,6];

  constructor() { }

  ngOnInit(): void {
  }

}
