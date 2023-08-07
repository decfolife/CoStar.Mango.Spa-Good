import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsAlertsComponent } from './assets-alerts.component';

describe('AssetsAlertsComponent', () => {
  let component: AssetsAlertsComponent;
  let fixture: ComponentFixture<AssetsAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsAlertsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
