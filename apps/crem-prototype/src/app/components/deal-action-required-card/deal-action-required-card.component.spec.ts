import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealActionRequiredCardComponent } from './deal-action-required-card.component';

describe('DealActionRequiredCardComponent', () => {
  let component: DealActionRequiredCardComponent;
  let fixture: ComponentFixture<DealActionRequiredCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DealActionRequiredCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealActionRequiredCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
