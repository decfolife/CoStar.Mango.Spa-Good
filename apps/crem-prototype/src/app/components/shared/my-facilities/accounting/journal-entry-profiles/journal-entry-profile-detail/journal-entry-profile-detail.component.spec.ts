import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEntryProfileDetailComponent } from './journal-entry-profile-detail.component';

describe('JournalEntryProfileDetailComponent', () => {
  let component: JournalEntryProfileDetailComponent;
  let fixture: ComponentFixture<JournalEntryProfileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalEntryProfileDetailComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalEntryProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
