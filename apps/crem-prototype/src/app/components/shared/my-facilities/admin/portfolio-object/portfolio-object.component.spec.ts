import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioObjectComponent } from './portfolio-object.component';

describe('PortfolioObjectComponent', () => {
  let component: PortfolioObjectComponent;
  let fixture: ComponentFixture<PortfolioObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioObjectComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
