import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardSectionsComponent } from './admin-dashboard-sections.component';

describe('AdminDashboardSectionsComponent', () => {
  let component: AdminDashboardSectionsComponent;
  let fixture: ComponentFixture<AdminDashboardSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDashboardSectionsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
