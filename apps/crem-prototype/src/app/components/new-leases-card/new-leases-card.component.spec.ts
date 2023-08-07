import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLeasesCardComponent } from './new-leases-card.component';

describe('NewLeasesCardComponent', () => {
  let component: NewLeasesCardComponent;
  let fixture: ComponentFixture<NewLeasesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewLeasesCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLeasesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
