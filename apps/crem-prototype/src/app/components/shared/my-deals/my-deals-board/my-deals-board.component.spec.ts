import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDealsBoardComponent } from './my-deals-board.component';

describe('MyDealsBoardComponent', () => {
  let component: MyDealsBoardComponent;
  let fixture: ComponentFixture<MyDealsBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyDealsBoardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDealsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
