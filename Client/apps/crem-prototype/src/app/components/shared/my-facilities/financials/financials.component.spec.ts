import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialsComponent } from './financials.component';

describe('FinancialsComponent', () => {
  let component: FinancialsComponent;
  let fixture: ComponentFixture<FinancialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
