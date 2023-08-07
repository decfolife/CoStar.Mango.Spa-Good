import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentChooserComponent } from './segment-chooser.component';

describe('SegmentChooserComponent', () => {
  let component: SegmentChooserComponent;
  let fixture: ComponentFixture<SegmentChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SegmentChooserComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
