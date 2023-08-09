import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewSharingDialogComponent } from './list-view-sharing-dialog.component';

describe('ListViewSharingDialogComponent', () => {
  let component: ListViewSharingDialogComponent;
  let fixture: ComponentFixture<ListViewSharingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListViewSharingDialogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewSharingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
