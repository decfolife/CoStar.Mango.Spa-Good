import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSiteSetupComponent } from './client-site-setup.component';

describe('ClientSiteSetupComponent', () => {
  let component: ClientSiteSetupComponent;
  let fixture: ComponentFixture<ClientSiteSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientSiteSetupComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSiteSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
