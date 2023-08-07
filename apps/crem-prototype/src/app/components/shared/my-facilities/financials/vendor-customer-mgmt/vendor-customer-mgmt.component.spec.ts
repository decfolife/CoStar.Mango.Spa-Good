import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCustomerMgmtComponent } from './vendor-customer-mgmt.component';

describe('VendorCustomerMgmtComponent', () => {
  let component: VendorCustomerMgmtComponent;
  let fixture: ComponentFixture<VendorCustomerMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VendorCustomerMgmtComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorCustomerMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
