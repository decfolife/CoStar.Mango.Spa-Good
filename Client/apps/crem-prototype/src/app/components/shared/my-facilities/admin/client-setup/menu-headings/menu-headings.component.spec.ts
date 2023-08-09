import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuHeadingsComponent } from './menu-headings.component';

describe('MenuHeadingsComponent', () => {
  let component: MenuHeadingsComponent;
  let fixture: ComponentFixture<MenuHeadingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuHeadingsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuHeadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
