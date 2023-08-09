import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHistoryDialogComponent } from './view-history-dialog.component';

describe('ViewHistoryDialogComponent', () => {
  let component: ViewHistoryDialogComponent;
  let fixture: ComponentFixture<ViewHistoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewHistoryDialogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
