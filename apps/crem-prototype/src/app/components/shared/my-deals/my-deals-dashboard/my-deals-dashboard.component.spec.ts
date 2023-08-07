import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDealsDashboardComponent } from './my-deals-dashboard.component';

describe('MyDealsDashboardComponent', () => {
  let component: MyDealsDashboardComponent;
  let fixture: ComponentFixture<MyDealsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyDealsDashboardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDealsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
