import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAccountConfigurationComponent } from './service-account-configuration.component';

describe('ServiceAccountConfigurationComponent', () => {
  let component: ServiceAccountConfigurationComponent;
  let fixture: ComponentFixture<ServiceAccountConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceAccountConfigurationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceAccountConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
