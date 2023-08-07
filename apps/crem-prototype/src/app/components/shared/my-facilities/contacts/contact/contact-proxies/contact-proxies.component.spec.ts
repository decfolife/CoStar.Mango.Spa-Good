import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactProxiesComponent } from './contact-proxies.component';

describe('ContactProxiesComponent', () => {
  let component: ContactProxiesComponent;
  let fixture: ComponentFixture<ContactProxiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactProxiesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactProxiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
