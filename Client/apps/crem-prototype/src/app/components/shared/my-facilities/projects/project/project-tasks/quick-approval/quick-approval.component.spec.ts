import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickApprovalComponent } from './quick-approval.component';

describe('QuickApprovalComponent', () => {
  let component: QuickApprovalComponent;
  let fixture: ComponentFixture<QuickApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuickApprovalComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
