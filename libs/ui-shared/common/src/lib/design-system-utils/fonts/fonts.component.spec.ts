import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSystemFontsToken } from './fonts.component';

describe('DesignSystemFontsToken', () => {
  let component: DesignSystemFontsToken;
  let fixture: ComponentFixture<DesignSystemFontsToken>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesignSystemFontsToken],
    }).compileComponents();

    fixture = TestBed.createComponent(DesignSystemFontsToken);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
