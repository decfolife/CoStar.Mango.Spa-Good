import { CremQuickApprovalComponent } from './quick-approval.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
describe('CremQuickApprovalComponent', () => {
  let component: CremQuickApprovalComponent;
  let fixture: ComponentFixture<CremQuickApprovalComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CremQuickApprovalComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CremQuickApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
