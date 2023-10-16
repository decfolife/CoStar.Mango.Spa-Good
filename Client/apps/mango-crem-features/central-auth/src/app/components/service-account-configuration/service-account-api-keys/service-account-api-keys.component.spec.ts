import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAccountApiKeysComponent } from './service-account-api-keys.component';

describe('ServiceAccountApiKeysComponent', () => {
  let component: ServiceAccountApiKeysComponent;
  let fixture: ComponentFixture<ServiceAccountApiKeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceAccountApiKeysComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceAccountApiKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
