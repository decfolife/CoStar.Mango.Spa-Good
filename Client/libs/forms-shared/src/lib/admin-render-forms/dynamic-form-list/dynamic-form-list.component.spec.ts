import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormsListComponent } from './dynamic-form-list.component';

describe('DynamicFormsListComponent', () => {
  let component: DynamicFormsListComponent;
  let fixture: ComponentFixture<DynamicFormsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
