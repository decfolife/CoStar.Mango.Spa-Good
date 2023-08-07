import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedLeasesCardComponent } from './archived-leases-card.component';

describe('ArchivedLeasesCardComponent', () => {
  let component: ArchivedLeasesCardComponent;
  let fixture: ComponentFixture<ArchivedLeasesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivedLeasesCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedLeasesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
