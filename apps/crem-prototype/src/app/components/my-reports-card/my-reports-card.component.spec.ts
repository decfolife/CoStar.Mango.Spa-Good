import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReportsCardComponent } from './my-reports-card.component';

describe('MyReportsCardComponent', () => {
  let component: MyReportsCardComponent;
  let fixture: ComponentFixture<MyReportsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyReportsCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReportsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
