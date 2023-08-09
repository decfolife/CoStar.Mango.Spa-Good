import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSetGridComponent } from './data-set-grid.component';

describe('DataSetGridComponent', () => {
  let component: DataSetGridComponent;
  let fixture: ComponentFixture<DataSetGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataSetGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSetGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
