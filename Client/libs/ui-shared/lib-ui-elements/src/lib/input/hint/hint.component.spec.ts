import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputHintComponent } from './hint.component';

describe('InputHintComponent', () => {
  let component: InputHintComponent;
  let fixture: ComponentFixture<InputHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputHintComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
