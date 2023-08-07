import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StraightlineDatesComponent } from './straightline-dates.component';

describe('StraightlineDatesComponent', () => {
  let component: StraightlineDatesComponent;
  let fixture: ComponentFixture<StraightlineDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StraightlineDatesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StraightlineDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
