import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostarToolbarComponent } from './costar-toolbar.component';

describe('CostarToolbarComponent', () => {
  let component: CostarToolbarComponent;
  let fixture: ComponentFixture<CostarToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CostarToolbarComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostarToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
