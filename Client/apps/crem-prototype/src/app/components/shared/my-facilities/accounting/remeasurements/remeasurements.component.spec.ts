import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemeasurementsComponent } from './remeasurements.component';

describe('RemeasurementsComponent', () => {
  let component: RemeasurementsComponent;
  let fixture: ComponentFixture<RemeasurementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RemeasurementsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
