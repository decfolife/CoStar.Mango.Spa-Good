import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialsLinksCardComponent } from './financials-links-card.component';

describe('FinancialsLinksCardComponent', () => {
  let component: FinancialsLinksCardComponent;
  let fixture: ComponentFixture<FinancialsLinksCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialsLinksCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialsLinksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
