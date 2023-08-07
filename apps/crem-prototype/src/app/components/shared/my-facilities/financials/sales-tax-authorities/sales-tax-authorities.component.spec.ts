import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTaxAuthoritiesComponent } from './sales-tax-authorities.component';

describe('SalesTaxAuthoritiesComponent', () => {
  let component: SalesTaxAuthoritiesComponent;
  let fixture: ComponentFixture<SalesTaxAuthoritiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SalesTaxAuthoritiesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesTaxAuthoritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
