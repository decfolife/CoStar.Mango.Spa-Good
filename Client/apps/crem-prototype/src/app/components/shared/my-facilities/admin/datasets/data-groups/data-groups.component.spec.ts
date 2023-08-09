import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGroupsComponent } from './data-groups.component';

describe('DataGroupsComponent', () => {
  let component: DataGroupsComponent;
  let fixture: ComponentFixture<DataGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataGroupsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
