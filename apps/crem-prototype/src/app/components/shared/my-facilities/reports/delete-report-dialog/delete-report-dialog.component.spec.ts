import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReportDialogComponent } from './delete-report-dialog.component';

describe('DeleteReportDialogComponent', () => {
  let component: DeleteReportDialogComponent;
  let fixture: ComponentFixture<DeleteReportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteReportDialogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
