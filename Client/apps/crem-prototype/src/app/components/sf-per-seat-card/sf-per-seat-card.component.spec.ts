import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfPerSeatCardComponent } from './sf-per-seat-card.component';

describe('SfPerSeatCardComponent', () => {
  let component: SfPerSeatCardComponent;
  let fixture: ComponentFixture<SfPerSeatCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SfPerSeatCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfPerSeatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
