import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupFooterComponent } from './popup-footer.component';

describe('PopupFooterComponent', () => {
  let component: PopupFooterComponent;
  let fixture: ComponentFixture<PopupFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupFooterComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
