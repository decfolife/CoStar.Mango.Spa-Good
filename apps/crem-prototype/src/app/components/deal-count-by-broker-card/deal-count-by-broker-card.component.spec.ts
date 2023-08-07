import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealCountByBrokerCardComponent } from './deal-count-by-broker-card.component';

describe('DealCountByBrokerCardComponent', () => {
  let component: DealCountByBrokerCardComponent;
  let fixture: ComponentFixture<DealCountByBrokerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DealCountByBrokerCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealCountByBrokerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
