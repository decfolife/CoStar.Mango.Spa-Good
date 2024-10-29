import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCompleteDateComponent } from './modify-complete-date.component';

describe('ModifyCompleteDateComponent', () => {
  let component: ModifyCompleteDateComponent;
  let fixture: ComponentFixture<ModifyCompleteDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyCompleteDateComponent],
    });
    fixture = TestBed.createComponent(ModifyCompleteDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
