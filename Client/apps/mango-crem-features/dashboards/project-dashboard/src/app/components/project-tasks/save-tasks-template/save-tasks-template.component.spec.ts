import { CremSaveTasksTemplateComponent } from './save-tasks-template.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('CremSaveTasksTemplateComponent', () => {
  let component: CremSaveTasksTemplateComponent;
  let fixture: ComponentFixture<CremSaveTasksTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CremSaveTasksTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CremSaveTasksTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
