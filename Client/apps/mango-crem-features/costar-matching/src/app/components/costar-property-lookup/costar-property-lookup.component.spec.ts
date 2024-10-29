import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostarPropertyLookupComponent } from './costar-property-lookup.component';

describe('CostarPropertyLookupComponent', () => {
  let component: CostarPropertyLookupComponent;
  let fixture: ComponentFixture<CostarPropertyLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CostarPropertyLookupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CostarPropertyLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
