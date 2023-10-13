import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAccountSitesComponent } from './service-account-sites.component';

describe('ServiceAccountSitesComponent', () => {
  let component: ServiceAccountSitesComponent;
  let fixture: ComponentFixture<ServiceAccountSitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceAccountSitesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceAccountSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
