import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CremPortfolioComponent } from './crem-portfolio.component';

describe('CremPortfolioComponent', () => {
  let component: CremPortfolioComponent;
  let fixture: ComponentFixture<CremPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CremPortfolioComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CremPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
