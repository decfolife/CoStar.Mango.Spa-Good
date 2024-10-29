import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CremPillComponent } from './pill.component';
describe('CremPillComponent', () => {
  let component: CremPillComponent;
  let fixture: ComponentFixture<CremPillComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CremPillComponent],
    });
    fixture = TestBed.createComponent(CremPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
