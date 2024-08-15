import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassificationTestsComponent } from './classification-tests.component';

describe('ClassificationTestsComponent', () => {
  let component: ClassificationTestsComponent;
  let fixture: ComponentFixture<ClassificationTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassificationTestsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassificationTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
