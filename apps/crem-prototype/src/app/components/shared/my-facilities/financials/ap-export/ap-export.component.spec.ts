import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApExportComponent } from './ap-export.component';

describe('ApExportComponent', () => {
  let component: ApExportComponent;
  let fixture: ComponentFixture<ApExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApExportComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
