import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AWSReportComponent } from './aws-report.component';

describe('AWSReportComponent', () => {
  let component: AWSReportComponent;
  let fixture: ComponentFixture<AWSReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AWSReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AWSReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
