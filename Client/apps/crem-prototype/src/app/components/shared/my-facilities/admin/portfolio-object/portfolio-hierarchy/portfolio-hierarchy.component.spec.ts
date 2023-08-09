import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioHierarchyComponent } from './portfolio-hierarchy.component';

describe('PortfolioHierarchyComponent', () => {
  let component: PortfolioHierarchyComponent;
  let fixture: ComponentFixture<PortfolioHierarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioHierarchyComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
