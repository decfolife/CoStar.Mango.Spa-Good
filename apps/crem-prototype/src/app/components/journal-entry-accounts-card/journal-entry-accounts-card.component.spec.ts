import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEntryAccountsCardComponent } from './journal-entry-accounts-card.component';

describe('JournalEntryAccountsCardComponent', () => {
  let component: JournalEntryAccountsCardComponent;
  let fixture: ComponentFixture<JournalEntryAccountsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalEntryAccountsCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalEntryAccountsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
