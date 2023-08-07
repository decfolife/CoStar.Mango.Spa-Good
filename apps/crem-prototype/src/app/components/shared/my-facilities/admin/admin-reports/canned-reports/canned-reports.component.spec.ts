import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CannedReportsComponent } from './canned-reports.component';

describe('CannedReportsComponent', () => {
  let component: CannedReportsComponent;
  let fixture: ComponentFixture<CannedReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CannedReportsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CannedReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
