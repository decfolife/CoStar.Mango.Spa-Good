import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessMtmComponent } from './process-mtm.component';

describe('ProcessMtmComponent', () => {
  let component: ProcessMtmComponent;
  let fixture: ComponentFixture<ProcessMtmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessMtmComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessMtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
