import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEntryProfilesComponent } from './journal-entry-profiles.component';

describe('JournalEntryProfilesComponent', () => {
  let component: JournalEntryProfilesComponent;
  let fixture: ComponentFixture<JournalEntryProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalEntryProfilesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalEntryProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
