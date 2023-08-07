import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationTestDialogComponent } from './classification-test-dialog.component';

describe('ClassificationTestDialogComponent', () => {
  let component: ClassificationTestDialogComponent;
  let fixture: ComponentFixture<ClassificationTestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassificationTestDialogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationTestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
