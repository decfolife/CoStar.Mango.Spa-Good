import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPercentRentComponent } from './process-percent-rent.component';

describe('ProcessPercentRentComponent', () => {
  let component: ProcessPercentRentComponent;
  let fixture: ComponentFixture<ProcessPercentRentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessPercentRentComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessPercentRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
