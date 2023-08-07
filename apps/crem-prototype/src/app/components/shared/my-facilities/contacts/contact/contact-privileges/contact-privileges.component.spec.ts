import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPrivilegesComponent } from './contact-privileges.component';

describe('ContactPrivilegesComponent', () => {
  let component: ContactPrivilegesComponent;
  let fixture: ComponentFixture<ContactPrivilegesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactPrivilegesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPrivilegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
