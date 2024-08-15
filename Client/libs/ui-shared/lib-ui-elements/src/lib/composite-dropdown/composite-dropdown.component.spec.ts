import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompositeDropdownComponent } from './composite-dropdown.component';

describe('CompositeDropdownComponent', () => {
  let component: CompositeDropdownComponent;
  let fixture: ComponentFixture<CompositeDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompositeDropdownComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
