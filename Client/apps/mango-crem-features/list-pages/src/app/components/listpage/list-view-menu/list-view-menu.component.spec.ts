import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewMenuComponent } from './list-view-menu.component';

describe('ListViewMenuComponent', () => {
  let component: ListViewMenuComponent;
  let fixture: ComponentFixture<ListViewMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListViewMenuComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
