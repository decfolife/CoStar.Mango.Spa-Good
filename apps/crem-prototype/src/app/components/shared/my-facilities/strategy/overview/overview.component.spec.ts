import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyOverviewComponent } from './overview.component';

describe('StrategyOverviewComponent', () => {
  let component: StrategyOverviewComponent;
  let fixture: ComponentFixture<StrategyOverviewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StrategyOverviewComponent],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
