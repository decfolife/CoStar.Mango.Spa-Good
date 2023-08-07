import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnershipTypeCardComponent } from './ownership-type-card.component';

describe('OwnershipTypeCardComponent', () => {
  let component: OwnershipTypeCardComponent;
  let fixture: ComponentFixture<OwnershipTypeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OwnershipTypeCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnershipTypeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
