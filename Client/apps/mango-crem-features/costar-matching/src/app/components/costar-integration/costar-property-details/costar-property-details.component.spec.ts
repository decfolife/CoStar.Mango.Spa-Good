import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostarPropertyDetailsComponent } from './costar-property-details.component';

describe('CostarPropertyDetailsComponent', () => {
  let component: CostarPropertyDetailsComponent;
  let fixture: ComponentFixture<CostarPropertyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostarPropertyDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostarPropertyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
