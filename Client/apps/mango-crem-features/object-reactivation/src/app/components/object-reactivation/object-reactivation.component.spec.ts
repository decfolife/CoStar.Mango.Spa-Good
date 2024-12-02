import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObjectReactivationComponent } from './object-reactivation.component';

describe('ObjectReactivationComponent', () => {
  let component: ObjectReactivationComponent;
  let fixture: ComponentFixture<ObjectReactivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObjectReactivationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ObjectReactivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
