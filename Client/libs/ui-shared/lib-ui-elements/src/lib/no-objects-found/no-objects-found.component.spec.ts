import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoObjectsFoundComponent } from './no-objects-found.component';

describe('NoObjectsFoundComponent', () => {
  let component: NoObjectsFoundComponent;
  let fixture: ComponentFixture<NoObjectsFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoObjectsFoundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NoObjectsFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
