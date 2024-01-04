import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeProcessingInfoComponent } from './je-processing-info.component';

describe('JeProcessingInfoComponent', () => {
  let component: JeProcessingInfoComponent;
  let fixture: ComponentFixture<JeProcessingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JeProcessingInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JeProcessingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
