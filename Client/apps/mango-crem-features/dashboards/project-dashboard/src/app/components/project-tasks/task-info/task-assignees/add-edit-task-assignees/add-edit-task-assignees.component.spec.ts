import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTaskAssigneesComponent } from './add-edit-task-assignees.component';

describe('AddEditTaskAssigneesComponent', () => {
  let component: AddEditTaskAssigneesComponent;
  let fixture: ComponentFixture<AddEditTaskAssigneesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditTaskAssigneesComponent],
    });
    fixture = TestBed.createComponent(AddEditTaskAssigneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
