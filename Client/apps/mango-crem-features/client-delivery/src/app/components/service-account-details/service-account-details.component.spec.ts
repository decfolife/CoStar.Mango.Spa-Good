import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAccountDetailsComponent } from './service-account-details.component';

describe('ServiceAccountDetailsComponent', () => {
  let component: ServiceAccountDetailsComponent;
  let fixture: ComponentFixture<ServiceAccountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceAccountDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
