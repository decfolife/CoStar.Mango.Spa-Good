import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSystemFontToken } from './font.component';

describe('DesignSystemFontToken', () => {
  let component: DesignSystemFontToken;
  let fixture: ComponentFixture<DesignSystemFontToken>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesignSystemFontToken],
    }).compileComponents();

    fixture = TestBed.createComponent(DesignSystemFontToken);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
