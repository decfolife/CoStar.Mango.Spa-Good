import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileCleanupComponent } from './file-cleanup.component';

describe('FileCleanupComponent', () => {
  let component: FileCleanupComponent;
  let fixture: ComponentFixture<FileCleanupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileCleanupComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileCleanupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
