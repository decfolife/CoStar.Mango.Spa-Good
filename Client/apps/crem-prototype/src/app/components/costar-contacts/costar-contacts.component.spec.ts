import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostarContactsComponent } from './costar-contacts.component';

describe('CostarContactsComponent', () => {
  let component: CostarContactsComponent;
  let fixture: ComponentFixture<CostarContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CostarContactsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostarContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
