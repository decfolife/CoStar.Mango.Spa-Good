import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureEventSettingsComponent } from './measure-event-settings.component';

describe('MeasureEventSettingsComponent', () => {
  let component: MeasureEventSettingsComponent;
  let fixture: ComponentFixture<MeasureEventSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MeasureEventSettingsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureEventSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
