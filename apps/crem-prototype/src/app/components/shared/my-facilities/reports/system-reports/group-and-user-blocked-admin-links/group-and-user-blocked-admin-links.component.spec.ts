import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAndUserBlockedAdminLinksComponent } from './group-and-user-blocked-admin-links.component';

describe('GroupAndUserBlockedAdminLinksComponent', () => {
  let component: GroupAndUserBlockedAdminLinksComponent;
  let fixture: ComponentFixture<GroupAndUserBlockedAdminLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupAndUserBlockedAdminLinksComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAndUserBlockedAdminLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
