import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFacilitiesComponent } from './my-facilities.component';

describe('MyFacilitiesComponent', () => {
  let component: MyFacilitiesComponent;
  let fixture: ComponentFixture<MyFacilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyFacilitiesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
