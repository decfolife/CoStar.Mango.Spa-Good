import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStatusSettingsComponent } from './workflow-status-settings.component';

describe('WorkflowStatusSettingsComponent', () => {
  let component: WorkflowStatusSettingsComponent;
  let fixture: ComponentFixture<WorkflowStatusSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkflowStatusSettingsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStatusSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
