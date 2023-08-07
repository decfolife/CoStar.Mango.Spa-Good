import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseOptionClassificationsComponent } from './lease-option-classifications.component';

describe('LeaseOptionClassificationsComponent', () => {
  let component: LeaseOptionClassificationsComponent;
  let fixture: ComponentFixture<LeaseOptionClassificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaseOptionClassificationsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseOptionClassificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
