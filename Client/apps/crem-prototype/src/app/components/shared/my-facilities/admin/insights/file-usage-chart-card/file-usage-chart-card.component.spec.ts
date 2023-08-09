import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUsageChartCardComponent } from './file-usage-chart-card.component';

describe('FileUsageChartCardComponent', () => {
  let component: FileUsageChartCardComponent;
  let fixture: ComponentFixture<FileUsageChartCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileUsageChartCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUsageChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
