import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CremPivotTableComponent } from './crem-pivot-table.component';

describe('CremPivotTableComponent', () => {
  let component: CremPivotTableComponent;
  let fixture: ComponentFixture<CremPivotTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CremPivotTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CremPivotTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
