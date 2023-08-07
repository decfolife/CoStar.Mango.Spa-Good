import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTaskDialogComponent } from './template-task-dialog.component';

describe('TemplateTaskDialogComponent', () => {
  let component: TemplateTaskDialogComponent;
  let fixture: ComponentFixture<TemplateTaskDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateTaskDialogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
