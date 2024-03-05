import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormWidgetsComponent } from './dynamic-form-widgets.component';

describe('DynamicFormWidgetsComponent', () => {
  let component: DynamicFormWidgetsComponent;
  let fixture: ComponentFixture<DynamicFormWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormWidgetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
