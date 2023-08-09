import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostarPopupComponent } from './costar-popup.component';

describe('CostarPopupComponent', () => {
  let component: CostarPopupComponent;
  let fixture: ComponentFixture<CostarPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CostarPopupComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
