import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMaintenanceComponent } from './dropdown-maintenance.component';

describe('DropdownMaintenanceComponent', () => {
  let component: DropdownMaintenanceComponent;
  let fixture: ComponentFixture<DropdownMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownMaintenanceComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
