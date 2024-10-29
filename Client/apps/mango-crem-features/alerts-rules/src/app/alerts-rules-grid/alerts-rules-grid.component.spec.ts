import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsRulesGridComponent } from './alerts-rules-grid.component';

describe('AlertsRulesGridComponent', () => {
  let component: AlertsRulesGridComponent;
  let fixture: ComponentFixture<AlertsRulesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertsRulesGridComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsRulesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
