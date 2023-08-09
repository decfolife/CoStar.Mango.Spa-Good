import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualExpirationRentCardComponent } from './annual-expiration-rent-card.component';

describe('AnnualExpirationRentCardComponent', () => {
  let component: AnnualExpirationRentCardComponent;
  let fixture: ComponentFixture<AnnualExpirationRentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnnualExpirationRentCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualExpirationRentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
