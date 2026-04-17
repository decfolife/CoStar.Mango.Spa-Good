import {
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';
import {
  DocumentViewer,
  type DocumentSource,
  type HighlightRange,
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
  @ViewChild('host')
  set hostRef(value: ElementRef<HTMLDivElement> | undefined) {
    if (value?.nativeElement === this._hostRef?.nativeElement) {
      return;
    }

    this.root?.unmount();
    this.root = null;
    this._hostRef = value;

    if (value && !this.root) {
      this.root = createRoot(value.nativeElement);
      this.renderReactTree();
    }
  }

  @Input() src: DocumentSource | null = null;
  @Input() filename?: string;
  @Input() searchQuery?: string;
  @Input() bookmarks: HighlightRange[] = [];
  @Output() bookmarksChange = new EventEmitter<HighlightRange[]>();

  private _hostRef: ElementRef<HTMLDivElement> | undefined;
  private root: Root | null = null;
  private _bookmarkCallbackInFlight = false;
  viewerError: string | null = null;
  isLoaded = false;

  private get toolbar(): ToolbarConfig {
    return {
      navigation: true,
      zoomOut: true,
      zoomSelect: true,
      zoomIn: true,
      rotate: true,
      download: false,
      print: true,
      search: true,
      rightSlot: this.searchQuery?.trim()
        ? React.createElement(
            'span',
            {
              style: {
                fontSize: '12px',
                padding: '2px 8px',
                borderRadius: '4px',
                background: '#fef08a',
                color: '#713f12',
                whiteSpace: 'nowrap',
                maxWidth: '200px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
              title: `Searching: ${this.searchQuery}`,
            },
            `"${this.searchQuery}"`
          )
        : undefined,
    };
  }

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (this._hostRef && !this.root) {
      this.root = createRoot(this._hostRef.nativeElement);
      this.renderReactTree();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.root) return;

    // When bookmarks change because the SDK just fired onBookmarksChange, don't
    // call root.render() — the SDK already has the correct state and calling
    // root.render() synchronously inside React's own event handler breaks things.
    // We do need to re-render when bookmarks are loaded from the backend (flag is false).
    const onlyBookmarksChanged =
      changes['bookmarks'] && Object.keys(changes).length === 1;

    if (onlyBookmarksChanged && this._bookmarkCallbackInFlight) return;

    this.renderReactTree();
  }

  ngOnDestroy(): void {
    this.root?.unmount();
    this.root = null;
  }

  private renderReactTree(): void {
    if (!this.root || !this.src) {
      this.viewerError = null;
      this.isLoaded = false;
      this.cdr.markForCheck();
      return;
    }

    this.viewerError = null;
    this.isLoaded = false;
    this.cdr.markForCheck();

    this.root.render(
      React.createElement(DocumentViewer, {
        src: this.src,
        filename: this.filename,
        toolbar: this.toolbar,
        darkMode: false,
        searchQuery: this.searchQuery,
        bookmarks: this.bookmarks,
        onBookmarksChange: (bookmarks: HighlightRange[]) => {
          this._bookmarkCallbackInFlight = true;
          this.bookmarksChange.emit(bookmarks);
          // Clear the flag after Angular's change detection has run
          Promise.resolve().then(() => { this._bookmarkCallbackInFlight = false; });
        },
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
            filename: this.filename,
            src: this.src,
            error: err,
          });
          this.cdr.markForCheck();
        },
        style: { height: '100%', width: '100%' },
      })
    );
  }
}
