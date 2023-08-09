import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFloorplanComponent } from './my-floorplan.component';

describe('MyFloorplanComponent', () => {
  let component: MyFloorplanComponent;
  let fixture: ComponentFixture<MyFloorplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyFloorplanComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFloorplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
