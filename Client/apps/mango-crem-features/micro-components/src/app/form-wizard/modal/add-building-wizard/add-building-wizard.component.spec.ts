import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBuildingWizardComponent } from './add-building-wizard.component';

describe('AddBuildingWizardComponent', () => {
  let component: AddBuildingWizardComponent;
  let fixture: ComponentFixture<AddBuildingWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBuildingWizardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBuildingWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
