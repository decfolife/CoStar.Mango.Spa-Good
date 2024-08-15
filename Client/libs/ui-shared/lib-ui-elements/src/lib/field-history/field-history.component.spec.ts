import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldHistoryComponent } from './field-history.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FieldHistoryComponent', () => {
  let component: FieldHistoryComponent;
  let fixture: ComponentFixture<FieldHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldHistoryComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
