import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentRentComponent } from './percent-rent.component';

describe('PercentRentComponent', () => {
  let component: PercentRentComponent;
  let fixture: ComponentFixture<PercentRentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PercentRentComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
