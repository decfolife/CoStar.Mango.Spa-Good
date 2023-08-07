import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateAccountingCardComponent } from './real-estate-accounting-card.component';

describe('RealEstateAccountingCardComponent', () => {
  let component: RealEstateAccountingCardComponent;
  let fixture: ComponentFixture<RealEstateAccountingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RealEstateAccountingCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateAccountingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
