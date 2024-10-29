import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldAssignmentsCardComponent } from './field-assignments-card.component';

describe('FieldAssignmentsCardComponent', () => {
  let component: FieldAssignmentsCardComponent;
  let fixture: ComponentFixture<FieldAssignmentsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FieldAssignmentsCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldAssignmentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
