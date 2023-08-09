import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioSuppliersComponent } from './portfolio-suppliers.component';

describe('PortfolioSuppliersComponent', () => {
  let component: PortfolioSuppliersComponent;
  let fixture: ComponentFixture<PortfolioSuppliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioSuppliersComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
