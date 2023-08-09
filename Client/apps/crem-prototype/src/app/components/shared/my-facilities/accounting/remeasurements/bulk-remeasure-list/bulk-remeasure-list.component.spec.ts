import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkRemeasureListComponent } from './bulk-remeasure-list.component';

describe('BulkRemeasureListComponent', () => {
  let component: BulkRemeasureListComponent;
  let fixture: ComponentFixture<BulkRemeasureListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BulkRemeasureListComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkRemeasureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
