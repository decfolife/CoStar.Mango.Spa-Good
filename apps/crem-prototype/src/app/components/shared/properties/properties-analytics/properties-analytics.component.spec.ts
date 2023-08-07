import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesAnalyticsComponent } from './properties-analytics.component';

describe('PropertiesAnalyticsComponent', () => {
  let component: PropertiesAnalyticsComponent;
  let fixture: ComponentFixture<PropertiesAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesAnalyticsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
