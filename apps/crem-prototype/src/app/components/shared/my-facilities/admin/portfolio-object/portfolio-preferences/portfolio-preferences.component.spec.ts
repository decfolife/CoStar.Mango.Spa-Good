import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioPreferencesComponent } from './portfolio-preferences.component';

describe('PortfolioPreferencesComponent', () => {
  let component: PortfolioPreferencesComponent;
  let fixture: ComponentFixture<PortfolioPreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioPreferencesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
