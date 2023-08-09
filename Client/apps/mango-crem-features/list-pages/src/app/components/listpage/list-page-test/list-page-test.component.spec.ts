import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageTestComponent } from './list-page-test.component';

describe('ListPageTestComponent', () => {
  let component: ListPageTestComponent;
  let fixture: ComponentFixture<ListPageTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListPageTestComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPageTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
