import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDistributionListComponent } from './add-edit-distribution-list.component';

describe('AddEditDistributionListComponent', () => {
  let component: AddEditDistributionListComponent;
  let fixture: ComponentFixture<AddEditDistributionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditDistributionListComponent],
    });
    fixture = TestBed.createComponent(AddEditDistributionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
