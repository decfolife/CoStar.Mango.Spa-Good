import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDealsDealComponent } from './my-deals-deal.component';

describe('MyDealsDealComponent', () => {
  let component: MyDealsDealComponent;
  let fixture: ComponentFixture<MyDealsDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyDealsDealComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDealsDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
