import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioSecurityComponent } from './portfolio-security.component';

describe('PortfolioSecurityComponent', () => {
  let component: PortfolioSecurityComponent;
  let fixture: ComponentFixture<PortfolioSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioSecurityComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
