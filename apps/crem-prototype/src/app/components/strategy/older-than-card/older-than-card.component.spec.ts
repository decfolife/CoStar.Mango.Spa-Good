import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyOlderThanCardComponent } from './older-than-card.component';

describe('StrategyOlderThanCardComponent', () => {
  let component: StrategyOlderThanCardComponent;
  let fixture: ComponentFixture<StrategyOlderThanCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StrategyOlderThanCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyOlderThanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
