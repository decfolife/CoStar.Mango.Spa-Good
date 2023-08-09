import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessIndexChargeComponent } from './process-index-charge.component';

describe('ProcessIndexChargeComponent', () => {
  let component: ProcessIndexChargeComponent;
  let fixture: ComponentFixture<ProcessIndexChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessIndexChargeComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessIndexChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
