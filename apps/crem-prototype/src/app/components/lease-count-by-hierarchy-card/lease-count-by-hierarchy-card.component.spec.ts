import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseCountByHierarchyCardComponent } from './lease-count-by-hierarchy-card.component';

describe('LeaseCountByHierarchyCardComponent', () => {
  let component: LeaseCountByHierarchyCardComponent;
  let fixture: ComponentFixture<LeaseCountByHierarchyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaseCountByHierarchyCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseCountByHierarchyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
