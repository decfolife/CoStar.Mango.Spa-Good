import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHeroCardComponent } from './dashboard-hero-card.component';

describe('DashboardHeroCardComponent', () => {
  let component: DashboardHeroCardComponent;
  let fixture: ComponentFixture<DashboardHeroCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardHeroCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHeroCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
