import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyGlobalCardComponent } from './global-card.component';

describe('StrategyGlobalCardComponent', () => {
  let component: StrategyGlobalCardComponent;
  let fixture: ComponentFixture<StrategyGlobalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StrategyGlobalCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyGlobalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
