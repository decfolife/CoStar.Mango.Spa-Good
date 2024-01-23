import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeRetroPopupComponent } from './je-retro-popup.component';

describe('JeRetroPopupComponent', () => {
  let component: JeRetroPopupComponent;
  let fixture: ComponentFixture<JeRetroPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JeRetroPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JeRetroPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
