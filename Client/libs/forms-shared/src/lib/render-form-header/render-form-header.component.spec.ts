import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderFormHeaderComponent } from './render-form-header.component';

describe('RenderFormHeaderComponent', () => {
  let component: RenderFormHeaderComponent;
  let fixture: ComponentFixture<RenderFormHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RenderFormHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderFormHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
