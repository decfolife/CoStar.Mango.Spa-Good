import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormScriptsComponent } from './form-scripts.component';

describe('FormScriptsComponent', () => {
  let component: FormScriptsComponent;
  let fixture: ComponentFixture<FormScriptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormScriptsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormScriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
