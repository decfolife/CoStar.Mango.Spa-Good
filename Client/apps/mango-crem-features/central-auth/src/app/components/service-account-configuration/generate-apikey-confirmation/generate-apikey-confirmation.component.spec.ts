import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateApiKeyConfirmationComponent } from './generate-apikey-confirmation.component';

describe('GenerateApiKeyConfirmationComponent', () => {
  let component: GenerateApiKeyConfirmationComponent;
  let fixture: ComponentFixture<GenerateApiKeyConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateApiKeyConfirmationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateApiKeyConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
