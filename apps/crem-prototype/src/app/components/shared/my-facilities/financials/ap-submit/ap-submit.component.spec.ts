import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApSubmitComponent } from './ap-submit.component';

describe('ApSubmitComponent', () => {
  let component: ApSubmitComponent;
  let fixture: ComponentFixture<ApSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApSubmitComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
