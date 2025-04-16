import { Component, Input, OnInit } from '@angular/core';

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
export class SkeletonComponent implements OnInit {
  @Input() type: 'card' | 'metric' | 'form' | 'header' | 'table';
  @Input() instances?: number;
  @Input() direction?: 'column' | 'column-reverse' | 'row' | 'row-reverse' =
    'column';
  @Input() rowCount: number = 10; // Number of skeleton rows

  get rows(): number[] {
    return Array.from({ length: this.rowCount }, (_, i) => i);
  }

  ngOnInit(): void {
    this.instances = this.instances ?? 1;
  }

  // To be able to create multiple instances of the skeleton an array is needed
  get instancesList(): number[] {
    return Array.from({ length: this.instances });
  }
}
