import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemeasureComponent } from './remeasure.component';

describe('RemeasureComponent', () => {
  let component: RemeasureComponent;
  let fixture: ComponentFixture<RemeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RemeasureComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
