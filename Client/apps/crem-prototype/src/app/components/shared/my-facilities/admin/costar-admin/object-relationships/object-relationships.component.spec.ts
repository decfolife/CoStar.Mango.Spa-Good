import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectRelationshipsComponent } from './object-relationships.component';

describe('ObjectRelationshipsComponent', () => {
  let component: ObjectRelationshipsComponent;
  let fixture: ComponentFixture<ObjectRelationshipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectRelationshipsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectRelationshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
