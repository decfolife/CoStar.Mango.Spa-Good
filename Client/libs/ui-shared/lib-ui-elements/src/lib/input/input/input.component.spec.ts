import { FormsModule } from '@angular/forms';
import { InputHintComponent } from '../hint';
import { InputLabelComponent } from '../label';
import { InputComponent } from './input.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InputComponent, 
        InputLabelComponent,
        InputHintComponent,
        FormsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});