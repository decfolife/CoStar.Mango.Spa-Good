import {
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';
import {
  DocumentViewer,
  type DocumentSource,
  type ToolbarConfig,
} from 'document-viewer-sdk';

@Component({
  selector: 'mango-ai-document-viewer',
  templateUrl: './ai-document-viewer.component.html',
  styleUrls: ['./ai-document-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiDocumentViewerComponent
  implements AfterViewInit, OnChanges, OnDestroy
{
  @ViewChild('host', { static: true }) hostRef!: ElementRef<HTMLDivElement>;

  @Input() src: DocumentSource | null = null;
  @Input() filename?: string;

  private root: Root | null = null;
  viewerError: string | null = null;
  isLoaded = false;
  readonly useSdkTestDocument =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).has('aiDocViewerTest');

  readonly toolbar: ToolbarConfig = {
    navigation: true,
    zoomOut: true,
    zoomSelect: true,
    zoomIn: true,
    rotate: true,
    download: true,
    print: true,
    search: true,
  };

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.root = createRoot(this.hostRef.nativeElement);
    this.renderReactTree();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.root) {
      this.renderReactTree();
    }
  }

  ngOnDestroy(): void {
    this.root?.unmount();
    this.root = null;
  }

  private renderReactTree(): void {
    const effectiveSource = this.getEffectiveSource();
    const effectiveFilename = this.getEffectiveFilename();

    if (!this.root || !effectiveSource) {
      this.viewerError = null;
      this.isLoaded = false;
      return;
    }

    this.viewerError = null;
    this.isLoaded = false;
    this.cdr.markForCheck();

    this.root.render(
      React.createElement(DocumentViewer, {
        src: effectiveSource,
        filename: effectiveFilename,
        toolbar: this.toolbar,
        darkMode: false,
        onLoad: () => {
          this.viewerError = null;
          this.isLoaded = true;
          this.cdr.markForCheck();
        },
        onError: (err: { message?: string; code?: string }) => {
          this.viewerError =
            err?.message ??
            err?.code ??
            'The document viewer failed to load this file.';
          this.isLoaded = false;
          console.error('AI document viewer load error', {
            filename: effectiveFilename,
            src: effectiveSource,
            error: err,
          });
          this.cdr.markForCheck();
        },
        style: { height: '100%', width: '100%' },
      })
    );
  }

  private getEffectiveSource(): DocumentSource | null {
    if (this.useSdkTestDocument) {
      return new File(
        [
          `AI document viewer test file\n\nIf you can read this, the SDK renders correctly inside the Angular host app.\n\nTimestamp: ${new Date().toISOString()}\n`,
        ],
        'ai-document-viewer-test.txt',
        { type: 'text/plain' }
      );
    }

    return this.src;
  }

  private getEffectiveFilename(): string | undefined {
    if (this.useSdkTestDocument) {
      return 'ai-document-viewer-test.txt';
    }

    return this.filename;
  }
}
