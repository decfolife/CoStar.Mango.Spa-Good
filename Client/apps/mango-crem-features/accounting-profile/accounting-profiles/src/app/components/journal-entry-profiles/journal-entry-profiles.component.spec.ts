import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JournalEntryProfilesComponent } from './journal-entry-profiles.component';

describe('JournalEntryProfilesComponent', () => {
  let component: JournalEntryProfilesComponent;
  let fixture: ComponentFixture<JournalEntryProfilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [JournalEntryProfilesComponent],
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
