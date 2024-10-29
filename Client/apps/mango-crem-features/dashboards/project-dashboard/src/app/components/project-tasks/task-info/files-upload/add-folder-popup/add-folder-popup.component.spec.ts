import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFolderPopupComponent } from './add-folder-popup.component';

describe('AddFolderPopupComponent', () => {
  let component: AddFolderPopupComponent;
  let fixture: ComponentFixture<AddFolderPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddFolderPopupComponent],
    });
    fixture = TestBed.createComponent(AddFolderPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
