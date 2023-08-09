import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftNavListComponent } from './left-nav-list.component';

describe('LeftNavListComponent', () => {
  let component: LeftNavListComponent;
  let fixture: ComponentFixture<LeftNavListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeftNavListComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
