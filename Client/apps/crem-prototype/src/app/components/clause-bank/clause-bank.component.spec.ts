import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClauseBankComponent } from './clause-bank.component';

describe('ClauseBankComponent', () => {
  let component: ClauseBankComponent;
  let fixture: ComponentFixture<ClauseBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClauseBankComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClauseBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
