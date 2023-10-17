import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAccountEndpointsComponent } from './service-account-endpoints.component';

describe('ServiceAccountEndpointsComponent', () => {
  let component: ServiceAccountEndpointsComponent;
  let fixture: ComponentFixture<ServiceAccountEndpointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceAccountEndpointsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceAccountEndpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
