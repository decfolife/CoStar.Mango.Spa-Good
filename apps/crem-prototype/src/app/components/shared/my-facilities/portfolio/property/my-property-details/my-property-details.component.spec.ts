import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPropertyDetailsComponent } from './my-property-details.component';

describe('MyPropertyDetailsComponent', () => {
  let component: MyPropertyDetailsComponent;
  let fixture: ComponentFixture<MyPropertyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyPropertyDetailsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPropertyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
