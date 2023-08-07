import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseConstructionAllowancesComponent } from './lease-construction-allowances.component';

describe('LeaseConstructionAllowancesComponent', () => {
  let component: LeaseConstructionAllowancesComponent;
  let fixture: ComponentFixture<LeaseConstructionAllowancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaseConstructionAllowancesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseConstructionAllowancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
