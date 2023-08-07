import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationCentersComponent } from './allocation-centers.component';

describe('AllocationCentersComponent', () => {
  let component: AllocationCentersComponent;
  let fixture: ComponentFixture<AllocationCentersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllocationCentersComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
