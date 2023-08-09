import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostarAlertComponent } from './costar-alert.component';

describe('CostarAlertComponent', () => {
  let component: CostarAlertComponent;
  let fixture: ComponentFixture<CostarAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CostarAlertComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostarAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
