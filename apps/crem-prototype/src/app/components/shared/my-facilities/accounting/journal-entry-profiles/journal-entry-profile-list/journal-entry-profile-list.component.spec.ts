import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEntryProfileListComponent } from './journal-entry-profile-list.component';

describe('JournalEntryProfileListComponent', () => {
  let component: JournalEntryProfileListComponent;
  let fixture: ComponentFixture<JournalEntryProfileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalEntryProfileListComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalEntryProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
