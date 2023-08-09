import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnverifiedLeasesCardComponent } from './unverified-leases-card.component';

describe('UnverifiedLeasesCardComponent', () => {
  let component: UnverifiedLeasesCardComponent;
  let fixture: ComponentFixture<UnverifiedLeasesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnverifiedLeasesCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnverifiedLeasesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
