import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioTemplatesComponent } from './portfolio-templates.component';

describe('PortfolioTemplatesComponent', () => {
  let component: PortfolioTemplatesComponent;
  let fixture: ComponentFixture<PortfolioTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioTemplatesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
