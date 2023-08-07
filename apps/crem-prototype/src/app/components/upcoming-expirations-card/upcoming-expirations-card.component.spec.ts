import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingExpirationsCardComponent } from './upcoming-expirations-card.component';

describe('UpcomingExpirationsCardComponent', () => {
  let component: UpcomingExpirationsCardComponent;
  let fixture: ComponentFixture<UpcomingExpirationsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingExpirationsCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingExpirationsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
