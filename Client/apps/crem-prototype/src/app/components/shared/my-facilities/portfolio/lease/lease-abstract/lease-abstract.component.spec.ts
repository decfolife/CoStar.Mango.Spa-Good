import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseAbstractComponent } from './lease-abstract.component';

describe('LeaseAbstractComponent', () => {
  let component: LeaseAbstractComponent;
  let fixture: ComponentFixture<LeaseAbstractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaseAbstractComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseAbstractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
