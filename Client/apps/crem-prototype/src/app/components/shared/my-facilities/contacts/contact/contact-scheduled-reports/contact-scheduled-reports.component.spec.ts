import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactScheduledReportsComponent } from './contact-scheduled-reports.component';

describe('ContactScheduledReportsComponent', () => {
  let component: ContactScheduledReportsComponent;
  let fixture: ComponentFixture<ContactScheduledReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactScheduledReportsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactScheduledReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
