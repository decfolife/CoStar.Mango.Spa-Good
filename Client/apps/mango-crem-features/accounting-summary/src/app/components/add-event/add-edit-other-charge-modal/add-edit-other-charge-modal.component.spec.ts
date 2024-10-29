import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOtherChargeModalComponent } from './add-edit-other-charge-modal.component';

describe('AddEditOtherChargeModalComponent', () => {
  let component: AddEditOtherChargeModalComponent;
  let fixture: ComponentFixture<AddEditOtherChargeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditOtherChargeModalComponent],
    });
    fixture = TestBed.createComponent(AddEditOtherChargeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
