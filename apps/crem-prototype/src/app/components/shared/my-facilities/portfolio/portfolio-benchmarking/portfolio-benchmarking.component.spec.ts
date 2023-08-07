import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioBenchmarkingComponent } from './portfolio-benchmarking.component';

describe('PortfolioBenchmarkingComponent', () => {
  let component: PortfolioBenchmarkingComponent;
  let fixture: ComponentFixture<PortfolioBenchmarkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioBenchmarkingComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioBenchmarkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
