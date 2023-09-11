import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceAccountComponent } from './add-service-account.component';

describe('AddServiceAccountComponent', () => {
  let component: AddServiceAccountComponent;
  let fixture: ComponentFixture<AddServiceAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddServiceAccountComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddServiceAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
