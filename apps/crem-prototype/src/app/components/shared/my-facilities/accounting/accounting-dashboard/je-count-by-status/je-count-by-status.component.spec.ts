import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JECountByStatusComponent } from './je-count-by-status.component';

describe('JECountByStatusComponent', () => {
  let component: JECountByStatusComponent;
  let fixture: ComponentFixture<JECountByStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JECountByStatusComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JECountByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
