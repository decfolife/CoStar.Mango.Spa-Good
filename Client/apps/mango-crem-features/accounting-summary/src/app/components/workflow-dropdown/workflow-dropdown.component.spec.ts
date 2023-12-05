import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowDropdownComponent } from './workflow-dropdown.component';

describe('WorkflowDropdownComponent', () => {
  let component: WorkflowDropdownComponent;
  let fixture: ComponentFixture<WorkflowDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkflowDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkflowDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
