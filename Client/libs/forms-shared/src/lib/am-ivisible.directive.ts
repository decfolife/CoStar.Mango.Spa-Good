import {
    Directive,
    ElementRef,
    Output,
    EventEmitter,
    Input,
  } from '@angular/core';
  
  @Directive({
    selector: '[appAmIVisible]',
    standalone: true,
  })
  export class AmIVisibleDirective {
    constructor(private element: ElementRef) {}
  
    @Output('elementVisible') elementVisible = new EventEmitter<boolean>();
    @Input('isTargetElement') isTargetElement: boolean;
  
    public intersectionOptions = {
      root: null, //implies the root is the document viewport
      rootMargin: '0px',
      threshold: [1],
    };
  
    ngAfterViewInit() {
      let observer = new IntersectionObserver(
      this.intersectionCallback.bind(this), this.intersectionOptions);

      if (this.isTargetElement) {
        observer.observe(this.element.nativeElement);
      }
    }
  
    intersectionCallback(entries, observer) {
      entries.forEach((entry) => {
        if (entry.intersectionRatio === 1 && entry.target === this.element.nativeElement) {
            this.elementVisible.emit(true); // Emit true only when the directive's element is fully visible
          } else {
            this.elementVisible.emit(false);
          }
      });
    }
  }
  