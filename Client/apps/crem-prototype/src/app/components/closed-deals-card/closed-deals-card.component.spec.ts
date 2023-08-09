import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedDealsCardComponent } from './closed-deals-card.component';

describe('ClosedDealsCardComponent', () => {
  let component: ClosedDealsCardComponent;
  let fixture: ComponentFixture<ClosedDealsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClosedDealsCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedDealsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
