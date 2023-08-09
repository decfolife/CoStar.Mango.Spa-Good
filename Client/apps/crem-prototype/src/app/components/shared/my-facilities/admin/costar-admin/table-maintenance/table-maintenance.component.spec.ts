import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMaintenanceComponent } from './table-maintenance.component';

describe('TableMaintenanceComponent', () => {
  let component: TableMaintenanceComponent;
  let fixture: ComponentFixture<TableMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableMaintenanceComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
