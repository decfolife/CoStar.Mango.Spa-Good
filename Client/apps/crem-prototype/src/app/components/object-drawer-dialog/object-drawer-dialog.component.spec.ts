import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectDrawerDialogComponent } from './object-drawer-dialog.component';

describe('ObjectDrawerDialogComponent', () => {
  let component: ObjectDrawerDialogComponent;
  let fixture: ComponentFixture<ObjectDrawerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectDrawerDialogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectDrawerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
