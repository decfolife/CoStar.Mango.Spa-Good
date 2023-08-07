import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingWorkflowStatusComponent } from './workflow-status.component';

describe('AccountingWorkflowStatusComponent', () => {
  let component: AccountingWorkflowStatusComponent;
  let fixture: ComponentFixture<AccountingWorkflowStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountingWorkflowStatusComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingWorkflowStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
