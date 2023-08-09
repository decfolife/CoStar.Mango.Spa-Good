import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSectionGroupsComponent } from './form-section-groups.component';

describe('FormSectionGroupsComponent', () => {
  let component: FormSectionGroupsComponent;
  let fixture: ComponentFixture<FormSectionGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormSectionGroupsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSectionGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
