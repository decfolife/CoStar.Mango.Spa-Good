import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteHistoricScheduleComponent } from './delete-historic-schedule.component';

describe('DeleteHistoricScheduleComponent', () => {
  let component: DeleteHistoricScheduleComponent;
  let fixture: ComponentFixture<DeleteHistoricScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteHistoricScheduleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteHistoricScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
