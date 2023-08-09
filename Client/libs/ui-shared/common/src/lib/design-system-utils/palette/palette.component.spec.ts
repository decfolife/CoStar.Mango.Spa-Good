import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSystemPalette } from './palette.component';

describe('DesignSystemPalette', () => {
  let component: DesignSystemPalette;
  let fixture: ComponentFixture<DesignSystemPalette>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesignSystemPalette],
    }).compileComponents();

    fixture = TestBed.createComponent(DesignSystemPalette);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
