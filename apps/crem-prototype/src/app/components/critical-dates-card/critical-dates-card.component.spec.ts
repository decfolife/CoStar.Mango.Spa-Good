import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalDatesCardComponent } from './critical-dates-card.component';

describe('CriticalDatesCardComponent', () => {
  let component: CriticalDatesCardComponent;
  let fixture: ComponentFixture<CriticalDatesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CriticalDatesCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticalDatesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
