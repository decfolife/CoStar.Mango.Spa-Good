import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangoFormsComponent } from './mango-forms.component';

describe('MangoFormsComponent', () => {
  let component: MangoFormsComponent;
  let fixture: ComponentFixture<MangoFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangoFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MangoFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
