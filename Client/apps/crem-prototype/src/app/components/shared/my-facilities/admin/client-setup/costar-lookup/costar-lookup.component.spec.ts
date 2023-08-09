import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostarLookupComponent } from './costar-lookup.component';

describe('CostarLookupComponent', () => {
  let component: CostarLookupComponent;
  let fixture: ComponentFixture<CostarLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CostarLookupComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostarLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
