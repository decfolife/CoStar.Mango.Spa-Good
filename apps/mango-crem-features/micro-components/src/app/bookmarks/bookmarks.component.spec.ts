import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksAppComponent } from './bookmarks.component';

describe('BookmarksAppComponent', () => {
  let component: BookmarksAppComponent;
  let fixture: ComponentFixture<BookmarksAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarksAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
