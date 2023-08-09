import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdueProjectsCardComponent } from './overdue-projects-card.component';

describe('OverdueProjectsCardComponent', () => {
  let component: OverdueProjectsCardComponent;
  let fixture: ComponentFixture<OverdueProjectsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverdueProjectsCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverdueProjectsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
