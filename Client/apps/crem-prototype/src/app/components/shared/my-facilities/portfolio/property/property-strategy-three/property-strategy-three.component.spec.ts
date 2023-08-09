import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyStrategyThreeComponent } from './property-strategy-three.component';

describe('PropertyStrategyThreeComponent', () => {
  let component: PropertyStrategyThreeComponent;
  let fixture: ComponentFixture<PropertyStrategyThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyStrategyThreeComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyStrategyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
