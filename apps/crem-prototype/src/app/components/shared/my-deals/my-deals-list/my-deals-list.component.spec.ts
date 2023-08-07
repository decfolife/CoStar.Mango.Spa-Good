import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDealsListComponent } from './my-deals-list.component';

describe('MyDealsListComponent', () => {
  let component: MyDealsListComponent;
  let fixture: ComponentFixture<MyDealsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyDealsListComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDealsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
