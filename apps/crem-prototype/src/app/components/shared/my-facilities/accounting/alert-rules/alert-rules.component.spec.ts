import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertRulesComponent } from './alert-rules.component';

describe('AlertRulesComponent', () => {
  let component: AlertRulesComponent;
  let fixture: ComponentFixture<AlertRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertRulesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
