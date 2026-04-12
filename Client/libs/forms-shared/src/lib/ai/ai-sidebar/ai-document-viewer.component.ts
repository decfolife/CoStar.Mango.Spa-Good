import {
  AfterViewInit,
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
    if (!this.root || !this.src) {
      return;
    }

    this.root.render(
      React.createElement(DocumentViewer, {
        src: this.src,
        filename: this.filename,
        toolbar: this.toolbar,
        darkMode: false,
        style: { height: '100%', width: '100%' },
      })
    );
  }
}
