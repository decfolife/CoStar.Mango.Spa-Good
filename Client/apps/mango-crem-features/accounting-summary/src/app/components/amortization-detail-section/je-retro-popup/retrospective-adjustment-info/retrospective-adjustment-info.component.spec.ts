import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrospectiveAdjustmentInfoComponent } from './retrospective-adjustment-info.component';

describe('RetrospectiveAdjustmentInfoComponent', () => {
  let component: RetrospectiveAdjustmentInfoComponent;
  let fixture: ComponentFixture<RetrospectiveAdjustmentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetrospectiveAdjustmentInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RetrospectiveAdjustmentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
