import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateServiceAccountComponent } from './update-service-account.component';

describe('UpdateServiceAccountComponent', () => {
  let component: UpdateServiceAccountComponent;
  let fixture: ComponentFixture<UpdateServiceAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateServiceAccountComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateServiceAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
