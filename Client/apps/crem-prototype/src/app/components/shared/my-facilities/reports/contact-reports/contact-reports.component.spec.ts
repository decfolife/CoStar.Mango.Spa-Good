import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactReportsComponent } from './contact-reports.component';

describe('ContactReportsComponent', () => {
  let component: ContactReportsComponent;
  let fixture: ComponentFixture<ContactReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactReportsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
