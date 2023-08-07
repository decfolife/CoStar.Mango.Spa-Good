import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSandboxComponent } from './chart-sandbox.component';

describe('ChartSandboxComponent', () => {
  let component: ChartSandboxComponent;
  let fixture: ComponentFixture<ChartSandboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartSandboxComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
