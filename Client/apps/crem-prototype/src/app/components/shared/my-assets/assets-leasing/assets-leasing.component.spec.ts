import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsLeasingComponent } from './assets-leasing.component';

describe('AssetsLeasingComponent', () => {
  let component: AssetsLeasingComponent;
  let fixture: ComponentFixture<AssetsLeasingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsLeasingComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsLeasingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
