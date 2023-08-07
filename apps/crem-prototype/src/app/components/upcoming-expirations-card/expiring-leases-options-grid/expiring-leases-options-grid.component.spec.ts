import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiringLeasesOptionsGridComponent } from './expiring-leases-options-grid.component';

describe('ExpiringLeasesOptionsGridComponent', () => {
  let component: ExpiringLeasesOptionsGridComponent;
  let fixture: ComponentFixture<ExpiringLeasesOptionsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExpiringLeasesOptionsGridComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiringLeasesOptionsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
