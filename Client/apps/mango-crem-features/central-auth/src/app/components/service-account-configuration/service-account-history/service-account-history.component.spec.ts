import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAccountHistoryComponent } from './service-account-history.component';

describe('ServiceAccountHistoryComponent', () => {
  let component: ServiceAccountHistoryComponent;
  let fixture: ComponentFixture<ServiceAccountHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceAccountHistoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceAccountHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
