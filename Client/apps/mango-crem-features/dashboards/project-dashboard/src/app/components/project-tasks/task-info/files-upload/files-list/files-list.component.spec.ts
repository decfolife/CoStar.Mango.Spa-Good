import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesListComponent } from './files-list.component';

describe('UploadFileListComponent', () => {
  let component: FilesListComponent;
  let fixture: ComponentFixture<FilesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FilesListComponent],
    });
    fixture = TestBed.createComponent(FilesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
