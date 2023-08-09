import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsContactsComponent } from './assets-contacts.component';

describe('AssetsContactsComponent', () => {
  let component: AssetsContactsComponent;
  let fixture: ComponentFixture<AssetsContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsContactsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
