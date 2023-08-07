import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsSegmentComponent } from './reports-segment.component';

describe('ReportsSegmentComponent', () => {
  let component: ReportsSegmentComponent;
  let fixture: ComponentFixture<ReportsSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsSegmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
