import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEntryExportComponent } from './journal-entry-export.component';

describe('JournalEntryExportComponent', () => {
  let component: JournalEntryExportComponent;
  let fixture: ComponentFixture<JournalEntryExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalEntryExportComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalEntryExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
