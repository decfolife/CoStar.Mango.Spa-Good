import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDropdownComponent } from './portfolio-dropdown.component';

describe('PortfolioDropdownComponent', () => {
  let component: PortfolioDropdownComponent;
  let fixture: ComponentFixture<PortfolioDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioDropdownComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
