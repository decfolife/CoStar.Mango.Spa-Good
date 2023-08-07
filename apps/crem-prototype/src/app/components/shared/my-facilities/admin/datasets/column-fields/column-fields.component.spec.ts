import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnFieldsComponent } from './column-fields.component';

describe('ColumnFieldsComponent', () => {
  let component: ColumnFieldsComponent;
  let fixture: ComponentFixture<ColumnFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColumnFieldsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
