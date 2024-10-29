import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsRulesComponent } from './alerts-rules.component';

describe('AlertsRulesComponent', () => {
  let component: AlertsRulesComponent;
  let fixture: ComponentFixture<AlertsRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertsRulesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
