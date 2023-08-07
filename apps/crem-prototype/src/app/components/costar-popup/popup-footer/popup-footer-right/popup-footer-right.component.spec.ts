import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupFooterRightComponent } from './popup-footer-right.component';

describe('PopupFooterRightComponent', () => {
  let component: PopupFooterRightComponent;
  let fixture: ComponentFixture<PopupFooterRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupFooterRightComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupFooterRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
