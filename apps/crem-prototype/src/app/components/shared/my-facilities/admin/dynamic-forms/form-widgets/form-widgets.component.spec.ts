import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWidgetsComponent } from './form-widgets.component';

describe('FormWidgetsComponent', () => {
  let component: FormWidgetsComponent;
  let fixture: ComponentFixture<FormWidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormWidgetsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
