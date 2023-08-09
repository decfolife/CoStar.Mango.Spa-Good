import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostarSummaryComponent } from './costar-summary.component';

describe('CostarSummaryComponent', () => {
  let component: CostarSummaryComponent;
  let fixture: ComponentFixture<CostarSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CostarSummaryComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostarSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
