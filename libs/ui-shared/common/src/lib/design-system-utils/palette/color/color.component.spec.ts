import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSystemColorToken } from './color.component';

describe('DesignSystemColorToken', () => {
  let component: DesignSystemColorToken;
  let fixture: ComponentFixture<DesignSystemColorToken>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesignSystemColorToken],
    }).compileComponents();

    fixture = TestBed.createComponent(DesignSystemColorToken);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
