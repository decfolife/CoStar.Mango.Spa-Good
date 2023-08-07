import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesSpacesComponent } from './properties-spaces.component';

describe('PropertiesSpacesComponent', () => {
  let component: PropertiesSpacesComponent;
  let fixture: ComponentFixture<PropertiesSpacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesSpacesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
