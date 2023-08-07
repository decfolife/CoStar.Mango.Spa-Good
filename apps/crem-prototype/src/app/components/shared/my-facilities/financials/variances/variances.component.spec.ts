import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariancesComponent } from './variances.component';

describe('VariancesComponent', () => {
  let component: VariancesComponent;
  let fixture: ComponentFixture<VariancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VariancesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
