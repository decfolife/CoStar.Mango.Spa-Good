import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupControlsComponent } from './popup-controls.component';

describe('PopupControlsComponent', () => {
  let component: PopupControlsComponent;
  let fixture: ComponentFixture<PopupControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupControlsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
