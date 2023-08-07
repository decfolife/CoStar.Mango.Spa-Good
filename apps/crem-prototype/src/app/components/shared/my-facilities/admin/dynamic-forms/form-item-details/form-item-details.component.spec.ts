import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemDetailsComponent } from './form-item-details.component';

describe('FormItemDetailsComponent', () => {
  let component: FormItemDetailsComponent;
  let fixture: ComponentFixture<FormItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormItemDetailsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
