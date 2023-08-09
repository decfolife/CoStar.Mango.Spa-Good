import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseDepartmentsComponent } from './merchandise-departments.component';

describe('MerchandiseDepartmentsComponent', () => {
  let component: MerchandiseDepartmentsComponent;
  let fixture: ComponentFixture<MerchandiseDepartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MerchandiseDepartmentsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandiseDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
