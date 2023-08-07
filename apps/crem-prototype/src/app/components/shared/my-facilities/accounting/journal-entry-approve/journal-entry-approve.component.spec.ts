import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEntryApproveComponent } from './journal-entry-approve.component';

describe('JournalEntryApproveComponent', () => {
  let component: JournalEntryApproveComponent;
  let fixture: ComponentFixture<JournalEntryApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalEntryApproveComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalEntryApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
