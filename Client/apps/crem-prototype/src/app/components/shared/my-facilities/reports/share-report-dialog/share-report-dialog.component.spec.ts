import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareReportDialogComponent } from './share-report-dialog.component';

describe('ShareReportDialogComponent', () => {
  let component: ShareReportDialogComponent;
  let fixture: ComponentFixture<ShareReportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShareReportDialogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
