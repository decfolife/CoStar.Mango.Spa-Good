import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvInfoChipModule } from './env-info-chip.module';
import { EnvInfoChipComponent } from './env-info-chip.component';

describe('EnvInfoChipComponent', () => {
  let component: EnvInfoChipComponent;
  let fixture: ComponentFixture<EnvInfoChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvInfoChipComponent ],
      imports: [ EnvInfoChipModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvInfoChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
