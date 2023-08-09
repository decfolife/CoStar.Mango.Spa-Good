import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkWorkflowComponent } from './bulk-workflow.component';

describe('BulkWorkflowComponent', () => {
  let component: BulkWorkflowComponent;
  let fixture: ComponentFixture<BulkWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BulkWorkflowComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
