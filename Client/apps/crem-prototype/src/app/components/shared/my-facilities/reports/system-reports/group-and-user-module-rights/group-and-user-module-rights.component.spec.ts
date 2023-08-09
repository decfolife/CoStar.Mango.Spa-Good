import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAndUserModuleRightsComponent } from './group-and-user-module-rights.component';

describe('GroupAndUserModuleRightsComponent', () => {
  let component: GroupAndUserModuleRightsComponent;
  let fixture: ComponentFixture<GroupAndUserModuleRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupAndUserModuleRightsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAndUserModuleRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
