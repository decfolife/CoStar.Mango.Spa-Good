import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalsCardComponent } from './intervals-card.component';

describe('IntervalsCardComponent', () => {
  let component: IntervalsCardComponent;
  let fixture: ComponentFixture<IntervalsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervalsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
