import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectTypeTemplatesComponent } from './object-type-templates.component';

describe('ObjectTypeTemplatesComponent', () => {
  let component: ObjectTypeTemplatesComponent;
  let fixture: ComponentFixture<ObjectTypeTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectTypeTemplatesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectTypeTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
