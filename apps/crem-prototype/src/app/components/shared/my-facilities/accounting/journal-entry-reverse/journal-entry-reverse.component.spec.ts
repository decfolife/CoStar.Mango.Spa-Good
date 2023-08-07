import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEntryReverseComponent } from './journal-entry-reverse.component';

describe('JournalEntryReverseComponent', () => {
  let component: JournalEntryReverseComponent;
  let fixture: ComponentFixture<JournalEntryReverseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalEntryReverseComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalEntryReverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
