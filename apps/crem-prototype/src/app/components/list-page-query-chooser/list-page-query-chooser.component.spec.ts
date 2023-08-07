import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageQueryChooserComponent } from './list-page-query-chooser.component';

describe('ListPageQueryChooserComponent', () => {
  let component: ListPageQueryChooserComponent;
  let fixture: ComponentFixture<ListPageQueryChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListPageQueryChooserComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPageQueryChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
