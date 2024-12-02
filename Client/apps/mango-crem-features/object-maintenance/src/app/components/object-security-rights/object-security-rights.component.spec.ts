import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObjectSecurityRightsComponent } from './object-security-rights.component';

describe('ObjectSecurityRightsComponent', () => {
  let component: ObjectSecurityRightsComponent;
  let fixture: ComponentFixture<ObjectSecurityRightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectSecurityRightsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ObjectSecurityRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
