import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminRenderFormComponent } from './admin-render-form.component';

describe('AdminRenderFormComponent', () => {
  let component: AdminRenderFormComponent;
  let fixture: ComponentFixture<AdminRenderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AdminRenderFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRenderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
