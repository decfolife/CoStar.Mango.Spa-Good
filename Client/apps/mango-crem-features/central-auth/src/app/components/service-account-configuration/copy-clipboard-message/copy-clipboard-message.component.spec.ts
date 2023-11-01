import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyClipboardMessageComponent } from './copy-clipboard-message.component';

describe('CopyClipboardMessageComponent', () => {
  let component: CopyClipboardMessageComponent;
  let fixture: ComponentFixture<CopyClipboardMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CopyClipboardMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CopyClipboardMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
