import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormScriptAssociationsComponent } from './form-script-associations.component';

describe('FormScriptAssociationsComponent', () => {
  let component: FormScriptAssociationsComponent;
  let fixture: ComponentFixture<FormScriptAssociationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormScriptAssociationsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormScriptAssociationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
