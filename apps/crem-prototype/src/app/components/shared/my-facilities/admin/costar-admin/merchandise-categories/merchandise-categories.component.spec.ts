import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseCategoriesComponent } from './merchandise-categories.component';

describe('MerchandiseCategoriesComponent', () => {
  let component: MerchandiseCategoriesComponent;
  let fixture: ComponentFixture<MerchandiseCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MerchandiseCategoriesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandiseCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
