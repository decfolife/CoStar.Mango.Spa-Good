import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioReportsComponent } from './portfolio-reports.component';

describe('PortfolioReportsComponent', () => {
  let component: PortfolioReportsComponent;
  let fixture: ComponentFixture<PortfolioReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioReportsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
