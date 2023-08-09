import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadOfflineDialogComponent } from './upload-offline-dialog.component';

describe('UploadOfflineDialogComponent', () => {
  let component: UploadOfflineDialogComponent;
  let fixture: ComponentFixture<UploadOfflineDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadOfflineDialogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadOfflineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
