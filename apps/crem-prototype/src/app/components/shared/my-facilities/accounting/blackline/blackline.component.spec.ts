import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklineComponent } from './blackline.component';

describe('BlacklineComponent', () => {
  let component: BlacklineComponent;
  let fixture: ComponentFixture<BlacklineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlacklineComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlacklineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
