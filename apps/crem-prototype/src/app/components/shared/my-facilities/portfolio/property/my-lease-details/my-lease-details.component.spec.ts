import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLeaseDetailsComponent } from './my-lease-details.component';

describe('MyLeaseDetailsComponent', () => {
  let component: MyLeaseDetailsComponent;
  let fixture: ComponentFixture<MyLeaseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyLeaseDetailsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLeaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
