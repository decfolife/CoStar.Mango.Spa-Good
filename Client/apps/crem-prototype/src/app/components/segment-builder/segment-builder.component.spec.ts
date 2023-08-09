import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentBuilderComponent } from './segment-builder.component';

describe('SegmentBuilderComponent', () => {
  let component: SegmentBuilderComponent;
  let fixture: ComponentFixture<SegmentBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SegmentBuilderComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
