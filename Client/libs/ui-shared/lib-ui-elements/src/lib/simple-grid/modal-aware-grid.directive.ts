import {
  AfterViewInit,
  Directive,
  Inject,
  OnDestroy,
  Optional,
} from '@angular/core';
import { DxDataGridComponent, DxPivotGridComponent } from 'devextreme-angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalComponent } from '../modal';

@Directive({
  selector: '[cremModalAwareGrid]',
})
export class CremModalAwareGridDirective implements OnDestroy, AfterViewInit {
  private destroy$ = new Subject<void>();

  constructor(
    @Inject(ModalComponent)
    private modal: ModalComponent,
    @Optional()
    @Inject(DxDataGridComponent)
    private dataGrid: DxDataGridComponent,
    @Optional()
    @Inject(DxPivotGridComponent)
    private pivotGrid: DxPivotGridComponent
  ) {}
  ngAfterViewInit(): void {
    let grids = [this.dataGrid, this.pivotGrid]
      .filter((grid) => !!grid)
      .map(({ instance }) => instance);

    this.modal.resizeAction.pipe(takeUntil(this.destroy$)).subscribe(() => {
      grids.forEach((grid) => grid.updateDimensions());
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
