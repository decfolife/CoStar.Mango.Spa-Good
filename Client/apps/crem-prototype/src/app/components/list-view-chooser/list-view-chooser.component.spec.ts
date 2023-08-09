import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewChooserComponent } from './list-view-chooser.component';

describe('ListViewChooserComponent', () => {
  let component: ListViewChooserComponent;
  let fixture: ComponentFixture<ListViewChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListViewChooserComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
