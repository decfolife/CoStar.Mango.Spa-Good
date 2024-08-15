import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CremPopoverComponent } from './popover.component';

describe('CremPopoverComponent', () => {
  let component: CremPopoverComponent;
  let fixture: ComponentFixture<CremPopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CremPopoverComponent]
    });
    fixture = TestBed.createComponent(CremPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
