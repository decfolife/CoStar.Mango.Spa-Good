import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppendTemplateComponent } from './append-template.component';

describe('AppendTemplateComponent', () => {
  let component: AppendTemplateComponent;
  let fixture: ComponentFixture<AppendTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppendTemplateComponent]
    });
    fixture = TestBed.createComponent(AppendTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
