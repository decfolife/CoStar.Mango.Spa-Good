import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewDeleteDialogComponent } from './list-view-delete-dialog.component';

describe('ListViewDeleteDialogComponent', () => {
  let component: ListViewDeleteDialogComponent;
  let fixture: ComponentFixture<ListViewDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListViewDeleteDialogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
