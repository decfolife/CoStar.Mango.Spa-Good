import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidualValueComponent } from './residual-value.component';

describe('ResidualValueComponent', () => {
  let component: ResidualValueComponent;
  let fixture: ComponentFixture<ResidualValueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResidualValueComponent],
    });
    fixture = TestBed.createComponent(ResidualValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
