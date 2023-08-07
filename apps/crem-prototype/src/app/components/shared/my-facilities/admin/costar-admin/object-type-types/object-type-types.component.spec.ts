import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectTypeTypesComponent } from './object-type-types.component';

describe('ObjectTypeTypesComponent', () => {
  let component: ObjectTypeTypesComponent;
  let fixture: ComponentFixture<ObjectTypeTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectTypeTypesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectTypeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
