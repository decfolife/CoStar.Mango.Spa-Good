import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[mangoAccountingAda]',
  standalone: true,
})
export class AccountingAdaDirective implements AfterViewInit, AfterViewChecked {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    const cardHeaders = this.el.nativeElement.querySelectorAll('.cardHeader');
    cardHeaders.forEach((cardHeader: HTMLElement) => {
      const h2Elements = cardHeader.querySelectorAll('h2');
      h2Elements.forEach((h2) => h2.remove());
    });
  }

  ngAfterViewChecked(): void {
    const closeButtons = this.el.nativeElement.querySelectorAll(
      '.p-toast .p-toast-message .p-toast-icon-close'
    );
    closeButtons.forEach((closeButton: HTMLElement) => {
      this.renderer.setAttribute(closeButton, 'aria-label', 'Close');
    });
    this.cdRef.detectChanges();
  }
}
