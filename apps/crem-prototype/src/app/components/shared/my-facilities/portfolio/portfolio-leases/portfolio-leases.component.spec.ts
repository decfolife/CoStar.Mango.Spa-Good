import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioLeasesComponent } from './portfolio-leases.component';

describe('PortfolioLeasesComponent', () => {
  let component: PortfolioLeasesComponent;
  let fixture: ComponentFixture<PortfolioLeasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioLeasesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioLeasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
