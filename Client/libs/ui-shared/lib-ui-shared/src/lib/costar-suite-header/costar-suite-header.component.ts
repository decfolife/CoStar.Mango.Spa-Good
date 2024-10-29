import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'costar-header',
  templateUrl: './costar-suite-header.component.html',
  styleUrls: ['./costar-suite-header.component.scss'],
})
export class CostarSuiteHeaderComponent implements OnInit {
  constructor(private ele: ElementRef) {}

  ngOnInit() {
    const head = <HTMLHeadElement>document.getElementsByTagName('head')[0];
    this.loadScript(
      'https://product-dev-main.costar.com/universal-ui/build/costar-ui.esm.js',
      head,
      'module'
    );
    this.loadScript(
      'https://product-dev-main.costar.com/universal-ui/build/costar-ui.js',
      head,
      'nomodule'
    );
    this.loadCSS(
      'https://product-dev-main.costar.com/universal-ui/build/costar-ui.css',
      head
    );

    let mastRemoved = false,
      navRemoved = false;
    const eleInt = setInterval(() => {
      const shadowRoot: DocumentFragment = this.ele.nativeElement.shadowRoot;
      if (shadowRoot) {
        if (!mastRemoved) {
          const masterHeader = shadowRoot.querySelector('costar-masthead');
          if (masterHeader) {
            masterHeader.remove();
            mastRemoved = true;
          }
        }
        if (!navRemoved) {
          const secondaryNav = shadowRoot.querySelector('costar-nav');
          if (secondaryNav) {
            secondaryNav.remove();
            navRemoved = true;
          }
        }
        if (navRemoved && mastRemoved) {
          clearInterval(eleInt);
        }
      }
    }, 500);
  }

  public loadScript(url: string, head: HTMLHeadElement, type: string) {
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.type = type;
    script.async = false;
    script.defer = true;
    head.appendChild(script);
  }

  loadCSS(url: string, head: HTMLHeadElement) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.media = 'all';
    head.appendChild(link);
  }
}
