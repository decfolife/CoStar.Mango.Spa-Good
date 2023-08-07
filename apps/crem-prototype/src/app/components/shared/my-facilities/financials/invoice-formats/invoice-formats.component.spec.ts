import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceFormatsComponent } from './invoice-formats.component';

describe('InvoiceFormatsComponent', () => {
  let component: InvoiceFormatsComponent;
  let fixture: ComponentFixture<InvoiceFormatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceFormatsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceFormatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
