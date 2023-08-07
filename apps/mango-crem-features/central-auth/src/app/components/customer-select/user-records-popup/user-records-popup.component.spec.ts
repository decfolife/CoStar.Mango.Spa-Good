import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecordsPopupComponent } from './user-records-popup.component';

describe('UserRecordsPopupComponent', () => {
  let component: UserRecordsPopupComponent;
  let fixture: ComponentFixture<UserRecordsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRecordsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRecordsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
