import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesSurveysComponent } from './properties-surveys.component';

describe('PropertiesSurveysComponent', () => {
  let component: PropertiesSurveysComponent;
  let fixture: ComponentFixture<PropertiesSurveysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesSurveysComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
