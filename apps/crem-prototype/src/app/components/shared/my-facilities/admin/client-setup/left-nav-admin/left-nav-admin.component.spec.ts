import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftNavAdminComponent } from './left-nav-admin.component';

describe('LeftNavAdminComponent', () => {
  let component: LeftNavAdminComponent;
  let fixture: ComponentFixture<LeftNavAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeftNavAdminComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftNavAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
