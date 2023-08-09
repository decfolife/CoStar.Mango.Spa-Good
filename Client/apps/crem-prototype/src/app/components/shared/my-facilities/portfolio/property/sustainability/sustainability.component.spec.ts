import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySustainabilityComponent } from './sustainability.component';

describe('PropertySustainabilityComponent', () => {
  let component: PropertySustainabilityComponent;
  let fixture: ComponentFixture<PropertySustainabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertySustainabilityComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertySustainabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
