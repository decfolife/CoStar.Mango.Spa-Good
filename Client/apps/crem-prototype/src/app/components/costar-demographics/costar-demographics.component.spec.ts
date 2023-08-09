import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostarDemographicsComponent } from './costar-demographics.component';

describe('CostarDemographicsComponent', () => {
  let component: CostarDemographicsComponent;
  let fixture: ComponentFixture<CostarDemographicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CostarDemographicsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostarDemographicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
