import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputInfoComponent } from './info.component';

describe('InputInfoComponent', () => {
  let component: InputInfoComponent;
  let fixture: ComponentFixture<InputInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
