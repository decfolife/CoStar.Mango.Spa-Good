import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostarTenantComponent } from './costar-tenant.component';

describe('CostarTenantComponent', () => {
  let component: CostarTenantComponent;
  let fixture: ComponentFixture<CostarTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CostarTenantComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostarTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
