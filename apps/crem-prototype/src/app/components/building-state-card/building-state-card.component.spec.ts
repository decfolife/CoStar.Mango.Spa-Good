import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingStateCardComponent } from './building-state-card.component';

describe('BuildingStateCardComponent', () => {
  let component: BuildingStateCardComponent;
  let fixture: ComponentFixture<BuildingStateCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuildingStateCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingStateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
