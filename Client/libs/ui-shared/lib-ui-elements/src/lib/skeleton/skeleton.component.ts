import { Component, Input } from '@angular/core';

/**
 * Skeleton Component
 * @export
 * @class SkeletonComponent
 * @param { 'card' } type - Support multiple types of skeletons pre-styled
 */
@Component({
  selector: 'crem-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent {
  @Input() type: 'card' | 'metric';
  @Input() instances?: number;
  @Input() direction?: 'column' | 'column-reverse' | 'row' | 'row-reverse' = 'column';

  constructor(){
    this.instances = this.instances || 1;
  }

  // To be able to create multiple instances of the skeleton an array is needed
  get instancesList(): number[] {
    return Array.from({ length: this.instances });
  }

}
