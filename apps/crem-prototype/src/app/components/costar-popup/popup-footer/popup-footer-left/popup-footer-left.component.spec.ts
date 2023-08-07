import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupFooterLeftComponent } from './popup-footer-left.component';

describe('PopupFooterLeftComponent', () => {
  let component: PopupFooterLeftComponent;
  let fixture: ComponentFixture<PopupFooterLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupFooterLeftComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupFooterLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
