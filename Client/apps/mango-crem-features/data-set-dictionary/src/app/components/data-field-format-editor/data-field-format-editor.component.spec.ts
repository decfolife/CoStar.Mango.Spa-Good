import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFieldFormatEditorComponent } from './data-field-format-editor.component';

describe('DataFieldFormatEditorComponent', () => {
  let component: DataFieldFormatEditorComponent;
  let fixture: ComponentFixture<DataFieldFormatEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataFieldFormatEditorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFieldFormatEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
