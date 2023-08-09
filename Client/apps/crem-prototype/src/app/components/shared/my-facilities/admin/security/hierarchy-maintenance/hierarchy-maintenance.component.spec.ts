import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyMaintenanceComponent } from './hierarchy-maintenance.component';

describe('HierarchyMaintenanceComponent', () => {
  let component: HierarchyMaintenanceComponent;
  let fixture: ComponentFixture<HierarchyMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HierarchyMaintenanceComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
