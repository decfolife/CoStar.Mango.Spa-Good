import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapConfigurationComponent } from './map-configuration.component';

describe('MapConfigurationComponent', () => {
  let component: MapConfigurationComponent;
  let fixture: ComponentFixture<MapConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapConfigurationComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
