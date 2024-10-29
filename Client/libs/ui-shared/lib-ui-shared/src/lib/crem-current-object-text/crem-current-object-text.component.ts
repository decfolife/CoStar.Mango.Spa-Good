import { Component, Input, OnInit } from '@angular/core';
import { CurrentObjectInfo } from '@mango/data-models/lib-data-models';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'crem-current-object-text',
  templateUrl: './crem-current-object-text.component.html',
  styleUrls: ['./crem-current-object-text.component.scss'],
})
export class CremCurrentObjectTextComponent implements OnInit {
  @Input() data$: Observable<CurrentObjectInfo>;

  transformedData$: Observable<CurrentObjectInfo>;

  constructor() {}

  ngOnInit(): void {
    this.transformedData$ = this.data$.pipe(
      distinctUntilChanged((prev, curr) => prev.objectType === curr.objectType),
      map((data) => ({
        ...data,
        objectType: `${data.objectType.trim()}: `,
      }))
    );
  }
}
