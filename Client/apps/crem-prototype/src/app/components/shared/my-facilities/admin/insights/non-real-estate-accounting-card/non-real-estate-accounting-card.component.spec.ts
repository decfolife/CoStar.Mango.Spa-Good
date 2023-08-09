import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonRealEstateAccountingCardComponent } from './non-real-estate-accounting-card.component';

describe('NonRealEstateAccountingCardComponent', () => {
  let component: NonRealEstateAccountingCardComponent;
  let fixture: ComponentFixture<NonRealEstateAccountingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NonRealEstateAccountingCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonRealEstateAccountingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
