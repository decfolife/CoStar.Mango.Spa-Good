import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentAdminComponent } from './segment-admin.component';

describe('SegmentAdminComponent', () => {
  let component: SegmentAdminComponent;
  let fixture: ComponentFixture<SegmentAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SegmentAdminComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
