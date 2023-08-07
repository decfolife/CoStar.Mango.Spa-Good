import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlLogComponent } from './etl-log.component';

describe('EtlLogComponent', () => {
  let component: EtlLogComponent;
  let fixture: ComponentFixture<EtlLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EtlLogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtlLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
