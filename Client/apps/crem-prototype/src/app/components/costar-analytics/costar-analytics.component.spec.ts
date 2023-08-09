import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostarAnalyticsComponent } from './costar-analytics.component';

describe('CostarAnalyticsComponent', () => {
  let component: CostarAnalyticsComponent;
  let fixture: ComponentFixture<CostarAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CostarAnalyticsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostarAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
