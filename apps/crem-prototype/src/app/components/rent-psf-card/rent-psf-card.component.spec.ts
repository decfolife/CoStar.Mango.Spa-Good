import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentPsfCardComponent } from './rent-psf-card.component';

describe('RentPsfCardComponent', () => {
  let component: RentPsfCardComponent;
  let fixture: ComponentFixture<RentPsfCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RentPsfCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentPsfCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
