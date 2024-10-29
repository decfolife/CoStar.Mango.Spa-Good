import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CremEnvInfoChipAppComponent } from './crem-env-info-chip.component';

describe('CremEnvInfoChipAppComponent', () => {
  let component: CremEnvInfoChipAppComponent;
  let fixture: ComponentFixture<CremEnvInfoChipAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CremEnvInfoChipAppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CremEnvInfoChipAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
