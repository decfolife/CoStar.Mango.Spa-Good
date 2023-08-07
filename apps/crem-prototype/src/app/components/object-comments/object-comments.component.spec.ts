import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectCommentsComponent } from './object-comments.component';

describe('ObjectCommentsComponent', () => {
  let component: ObjectCommentsComponent;
  let fixture: ComponentFixture<ObjectCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectCommentsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
