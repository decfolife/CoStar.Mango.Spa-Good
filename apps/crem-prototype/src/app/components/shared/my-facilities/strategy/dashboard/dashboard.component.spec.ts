import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyDashboardComponent } from './dashboard.component';

describe('StrategyDashboardComponent', () => {
  let component: StrategyDashboardComponent;
  let fixture: ComponentFixture<StrategyDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StrategyDashboardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
