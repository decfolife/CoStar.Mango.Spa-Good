import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupControlsRightComponent } from './popup-controls-right.component';

describe('PopupControlsRightComponent', () => {
  let component: PopupControlsRightComponent;
  let fixture: ComponentFixture<PopupControlsRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupControlsRightComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupControlsRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
