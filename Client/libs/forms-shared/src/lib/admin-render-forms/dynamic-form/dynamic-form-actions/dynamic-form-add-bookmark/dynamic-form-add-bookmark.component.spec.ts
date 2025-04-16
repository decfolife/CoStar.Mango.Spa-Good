import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormAddBookmarkComponent } from './dynamic-form-add-bookmark.component';

describe('DynamicFormAddBookmarkComponent', () => {
  let component: DynamicFormAddBookmarkComponent;
  let fixture: ComponentFixture<DynamicFormAddBookmarkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFormAddBookmarkComponent],
    });
    fixture = TestBed.createComponent(DynamicFormAddBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
