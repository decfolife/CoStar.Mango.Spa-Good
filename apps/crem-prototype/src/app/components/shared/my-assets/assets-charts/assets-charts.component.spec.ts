import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsChartsComponent } from './assets-charts.component';

describe('AssetsChartsComponent', () => {
  let component: AssetsChartsComponent;
  let fixture: ComponentFixture<AssetsChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsChartsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
