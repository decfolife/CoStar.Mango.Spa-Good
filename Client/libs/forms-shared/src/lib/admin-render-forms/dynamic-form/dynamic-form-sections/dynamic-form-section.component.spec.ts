import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormSectionComponent } from './dynamic-form-section.component';

describe('DynamicFormSectionComponent', () => {
  let component: DynamicFormSectionComponent;
  let fixture: ComponentFixture<DynamicFormSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DynamicFormSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
