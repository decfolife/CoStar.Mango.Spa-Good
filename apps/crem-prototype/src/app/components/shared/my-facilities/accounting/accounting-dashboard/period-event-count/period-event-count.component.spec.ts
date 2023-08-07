import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodEventCountComponent } from './period-event-count.component';

describe('PeriodEventCountComponent', () => {
  let component: PeriodEventCountComponent;
  let fixture: ComponentFixture<PeriodEventCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PeriodEventCountComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodEventCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
