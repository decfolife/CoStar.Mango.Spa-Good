import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBuildingModalComponent } from './add-building-modal.component';

describe('AddBuildingModalComponent', () => {
  let component: AddBuildingModalComponent;
  let fixture: ComponentFixture<AddBuildingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBuildingModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBuildingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
