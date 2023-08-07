import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterlyExpirationsCardComponent } from './quarterly-expirations-card.component';

describe('QuarterlyExpirationsCardComponent', () => {
  let component: QuarterlyExpirationsCardComponent;
  let fixture: ComponentFixture<QuarterlyExpirationsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuarterlyExpirationsCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterlyExpirationsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
