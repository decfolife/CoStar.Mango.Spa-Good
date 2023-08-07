import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnGroupsComponent } from './column-groups.component';

describe('ColumnGroupsComponent', () => {
  let component: ColumnGroupsComponent;
  let fixture: ComponentFixture<ColumnGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColumnGroupsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
