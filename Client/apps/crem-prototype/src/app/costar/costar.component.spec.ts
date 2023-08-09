import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostarComponent } from './costar.component';

describe('CostarComponent', () => {
  let component: CostarComponent;
  let fixture: ComponentFixture<CostarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CostarComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
