import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectFilesComponent } from './object-files.component';

describe('ObjectFilesComponent', () => {
  let component: ObjectFilesComponent;
  let fixture: ComponentFixture<ObjectFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectFilesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
