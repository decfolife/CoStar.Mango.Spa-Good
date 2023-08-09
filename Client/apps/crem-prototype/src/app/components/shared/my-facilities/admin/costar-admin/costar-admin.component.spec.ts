import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostarAdminComponent } from './costar-admin.component';

describe('CostarAdminComponent', () => {
  let component: CostarAdminComponent;
  let fixture: ComponentFixture<CostarAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CostarAdminComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
