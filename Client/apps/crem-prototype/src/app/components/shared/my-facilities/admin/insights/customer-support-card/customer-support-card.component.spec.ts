import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSupportCardComponent } from './customer-support-card.component';

describe('CustomerSupportCardComponent', () => {
  let component: CustomerSupportCardComponent;
  let fixture: ComponentFixture<CustomerSupportCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerSupportCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSupportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
