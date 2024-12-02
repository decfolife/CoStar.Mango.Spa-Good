import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Modal
 * @export
 * @class ModalComponent
 * @param {string} [className]: Pass additional class names to the main component wrapper
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'crem-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @Input() modalTitle: string;
  @Input() modalTitleId: string;
  @Input() closeIconVisible: boolean;
  @Input() primaryFooterButtonText: string;
  @Input() primaryFooterButtonEnabledDisabled = false;
  @Input() closeOrCancelButtonText: string;
  @Input() showTooltip = false;
  @Input() tooltipText = '';
  @Input() modalId: string;
  @Input() customHeader = false;
  @Input() customFooter = false;
  @Input() closeDialogResult: any = '';
  @Input() className?: string = '';
  @Input() dragPosition: any = { x: 0, y: 0 };
  @Output() primaryButtonAction = new EventEmitter<any>();
  @Output() closeButtonAction = new EventEmitter<any>();
  @Output() dragEndAction = new EventEmitter<any>();
  @Output() resizeAction = new EventEmitter<any>();

  private resizeObserver: ResizeObserver;

  constructor(
    @Optional() public dialogRef: MatDialogRef<ModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private elementRef: ElementRef
  ) {}

  ngAfterViewInit() {
    this.initModalResizeBehavior();
  }

  private initModalResizeBehavior() {
    // Find the nearest ancestor with the class '.mat-mdc-dialog-surface'
    const ancestor = this.findAncestorWithClass(
      this.elementRef.nativeElement,
      'mat-mdc-dialog-surface' // we may need to provide configuration for this if we intend to use something other than material at some point
    );

    // Attach ResizeObserver if an ancestor is found
    if (ancestor) {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          this.resizeAction.emit({ width, height });
        }
      });
      this.resizeObserver.observe(ancestor);
    }
  }

  public closeDialog() {
    this.closeButtonAction.emit();
    this.dialogRef.close(this.closeDialogResult);
  }

  public primaryEvent() {
    this.primaryButtonAction.emit();
  }

  public dragEndEvent(e) {
    this.dragEndAction.emit(e);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeAction.emit({
      width: event.target.innerWidth,
      height: event.target.innerHeight,
    });
  }
  ngOnDestroy() {
    // Disconnect the observer to avoid memory leaks
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private findAncestorWithClass(
    element: HTMLElement,
    className: string
  ): HTMLElement | null {
    const allClasses = className.split(' ');
    let parent = element.parentElement;
    while (parent) {
      const matchFail = allClasses
        .map((cssClass) => parent.classList.contains(cssClass))
        .includes(false);

      if (!matchFail) {
        return parent;
      }

      parent = parent.parentElement;
    }
    return null;
  }
}
