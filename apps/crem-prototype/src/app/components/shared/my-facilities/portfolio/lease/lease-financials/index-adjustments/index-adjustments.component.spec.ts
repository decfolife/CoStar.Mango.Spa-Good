import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAdjustmentsComponent } from './index-adjustments.component';

describe('IndexAdjustmentsComponent', () => {
  let component: IndexAdjustmentsComponent;
  let fixture: ComponentFixture<IndexAdjustmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndexAdjustmentsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexAdjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
