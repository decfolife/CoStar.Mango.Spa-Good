import {
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
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
export class AiDocumentViewerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('host')
  set hostRef(value: ElementRef<HTMLDivElement> | undefined) {
    if (value?.nativeElement === this._hostRef?.nativeElement) return;
    this.root?.unmount();
    this.root = null;
    this._hostRef = value;
    if (value && !this.root) {
      this.root = createRoot(value.nativeElement);
      this.renderReactTree();
    }
  }

  @Input() set src(value: DocumentSource | null) {
    this._src = value;
    // Reset initial bookmarks when the document changes so the SDK clears
    // its internal state and is ready to accept the next document's highlights.
    this._initialBookmarks = [];
    this.renderReactTree();
  }

  @Input() set filename(value: string | undefined) {
    this._filename = value;
    this.renderReactTree();
  }

  @Input() set searchQuery(value: string | undefined) {
    this._searchQuery = value;
    this.renderReactTree();
  }

  /**
   * Saved highlights to restore when the document first loads.
   * Passed once after loadHighlights() resolves — the SDK seeds its own internal
   * state from this and manages highlights from there on.  Angular never updates
   * this after user interaction, so there is no controlled-mode re-render loop.
   */
  @Input() set initialBookmarks(value: HighlightRange[]) {
    this._initialBookmarks = value ?? [];
    this.renderReactTree();
  }

  /** Fires whenever the user adds, removes or clears a highlight. */
  @Output() bookmarksChange = new EventEmitter<HighlightRange[]>();

  private _src: DocumentSource | null = null;
  private _filename?: string;
  private _searchQuery?: string;
  private _initialBookmarks: HighlightRange[] = [];
  private _hostRef: ElementRef<HTMLDivElement> | undefined;
  private root: Root | null = null;
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
      rightSlot: this._searchQuery?.trim()
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
              title: `Searching: ${this._searchQuery}`,
            },
            `"${this._searchQuery}"`
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

  ngOnDestroy(): void {
    this.root?.unmount();
    this.root = null;
  }

  private renderReactTree(): void {
    if (!this.root || !this._src) {
      this.viewerError = null;
      this.isLoaded = false;
      this.cdr.markForCheck();
      return;
    }

    this.root.render(
      React.createElement(DocumentViewer, {
        src: this._src,
        filename: this._filename,
        toolbar: this.toolbar,
        darkMode: false,
        searchQuery: this._searchQuery,
        // Pass as initialBookmarks (SDK-internal uncontrolled state).
        // bookmarks prop is intentionally NOT passed — that would enable
        // controlled mode which causes the React 18 concurrent-mode race.
        initialBookmarks: this._initialBookmarks,
        onBookmarksChange: (bookmarks: HighlightRange[]) => {
          this.bookmarksChange.emit(bookmarks);
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
            filename: this._filename,
            src: this._src,
            error: err,
          });
          this.cdr.markForCheck();
        },
        style: { height: '100%', width: '100%' },
      } as any)
    );
  }
}
