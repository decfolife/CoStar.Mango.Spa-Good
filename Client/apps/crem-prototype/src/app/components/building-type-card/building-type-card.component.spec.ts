import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingTypeCardComponent } from './building-type-card.component';

describe('BuildingTypeCardComponent', () => {
  let component: BuildingTypeCardComponent;
  let fixture: ComponentFixture<BuildingTypeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingTypeCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingTypeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
