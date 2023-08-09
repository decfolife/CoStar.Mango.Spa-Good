import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupControlsLeftComponent } from './popup-controls-left.component';

describe('PopupControlsLeftComponent', () => {
  let component: PopupControlsLeftComponent;
  let fixture: ComponentFixture<PopupControlsLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupControlsLeftComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupControlsLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
