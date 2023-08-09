import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAndUserRightsHistoryComponent } from './group-and-user-rights-history.component';

describe('GroupAndUserRightsHistoryComponent', () => {
  let component: GroupAndUserRightsHistoryComponent;
  let fixture: ComponentFixture<GroupAndUserRightsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupAndUserRightsHistoryComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAndUserRightsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
