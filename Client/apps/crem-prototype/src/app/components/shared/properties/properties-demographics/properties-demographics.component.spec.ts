import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesDemographicsComponent } from './properties-demographics.component';

describe('PropertiesDemographicsComponent', () => {
  let component: PropertiesDemographicsComponent;
  let fixture: ComponentFixture<PropertiesDemographicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesDemographicsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesDemographicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
