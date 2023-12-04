import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAccountApiKeyDurationComponent } from './service-account-api-key-duration.component';

describe('ServiceAccountApiKeyDurationComponent', () => {
  let component: ServiceAccountApiKeyDurationComponent;
  let fixture: ComponentFixture<ServiceAccountApiKeyDurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceAccountApiKeyDurationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceAccountApiKeyDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
