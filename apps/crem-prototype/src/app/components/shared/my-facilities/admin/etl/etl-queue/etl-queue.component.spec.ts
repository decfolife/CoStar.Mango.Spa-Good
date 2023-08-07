import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlQueueComponent } from './etl-queue.component';

describe('EtlQueueComponent', () => {
  let component: EtlQueueComponent;
  let fixture: ComponentFixture<EtlQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EtlQueueComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtlQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
