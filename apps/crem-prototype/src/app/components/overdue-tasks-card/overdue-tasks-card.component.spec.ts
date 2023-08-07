import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdueTasksCardComponent } from './overdue-tasks-card.component';

describe('OverdueTasksCardComponent', () => {
  let component: OverdueTasksCardComponent;
  let fixture: ComponentFixture<OverdueTasksCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverdueTasksCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverdueTasksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
