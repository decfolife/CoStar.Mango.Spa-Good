import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStatusDetailComponent } from './workflow-status-detail.component';

describe('WorkflowStatusDetailComponent', () => {
  let component: WorkflowStatusDetailComponent;
  let fixture: ComponentFixture<WorkflowStatusDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkflowStatusDetailComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStatusDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
