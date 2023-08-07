import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCurrenciesComponent } from './portfolio-currencies.component';

describe('PortfolioCurrenciesComponent', () => {
  let component: PortfolioCurrenciesComponent;
  let fixture: ComponentFixture<PortfolioCurrenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioCurrenciesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
