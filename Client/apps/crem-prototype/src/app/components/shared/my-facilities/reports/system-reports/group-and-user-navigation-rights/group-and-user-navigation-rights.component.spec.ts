import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAndUserNavigationRightsComponent } from './group-and-user-navigation-rights.component';

describe('GroupAndUserNavigationRightsComponent', () => {
  let component: GroupAndUserNavigationRightsComponent;
  let fixture: ComponentFixture<GroupAndUserNavigationRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupAndUserNavigationRightsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAndUserNavigationRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
