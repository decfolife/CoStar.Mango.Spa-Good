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
import { flushSync } from 'react-dom';
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
    this._pendingOcrIds.clear();
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
   * The SDK uses a controlled bookmarks model — it will revert highlights and
   * fire onBookmarksChange([]) if the `bookmarks` prop isn't kept up to date.
   * We maintain _liveBookmarks as the authoritative copy and pass it on every
   * root.render() call.  The reference guard below prevents re-renders when
   * Angular echoes our own emissions back through the [bookmarks] binding.
   */
  @Input() set bookmarks(value: HighlightRange[]) {
    // Same reference means this came from our own onBookmarksChange emission —
    // _liveBookmarks is already correct and renderReactTree() already ran.
    if (value === this._liveBookmarks) return;
    this._liveBookmarks = value ?? [];
    this.renderReactTree();
  }

  @Output() bookmarksChange = new EventEmitter<HighlightRange[]>();

  private _src: DocumentSource | null = null;
  private _filename?: string;
  private _searchQuery?: string;
  private _liveBookmarks: HighlightRange[] = [];
  /**
   * Tracks highlight IDs that were added with empty text on scanned PDFs, meaning
   * the SDK kicked off an async region-OCR call (runRegionOcrFallback) to fill
   * the text.  When that async call resolves, it uses a stale closure whose
   * bookmarksProp was captured BEFORE our root.render() committed — so it maps
   * over an empty array and fires onBookmarksChange([]).  We detect this by
   * watching for IDs that entered with text=="" and ignore the spurious empty
   * reset that follows.
   */
  private _pendingOcrIds = new Set<string>();
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
        bookmarks: this._liveBookmarks,
        onBookmarksChange: (bookmarks: HighlightRange[]) => {
          // --- Stale-closure OCR guard ---
          // On scanned PDFs the SDK calls runRegionOcrFallback() (an async
          // Promise) that captures onHighlightUpdate at effect-setup time.
          // By the time the Promise resolves, our root.render() has committed a
          // NEW updateHighlight — but the stale closure still uses the OLD one
          // whose bookmarksProp was [].  Mapping over [] yields [], so it fires
          // onBookmarksChange([]) and wipes everything.
          //
          // Detection: any highlight arriving with text=="" is waiting for region
          // OCR to fill its text.  We track those IDs.  If onBookmarksChange([])
          // fires while pending IDs exist, it is the stale-closure reset — ignore
          // it and re-render with the bookmarks we already have.
          if (bookmarks.length === 0 && this._pendingOcrIds.size > 0) {
            this._pendingOcrIds.clear();
            flushSync(() => this.renderReactTree()); // synchronously restore
            return;
          }

          // Track highlights that arrived with no text (region OCR pending).
          const prevIds = new Set(this._liveBookmarks.map((h) => h.id));
          for (const h of bookmarks) {
            if (!prevIds.has(h.id) && !h.text) {
              // New highlight, no text yet — region OCR will attempt to fill it
              this._pendingOcrIds.add(h.id);
            } else if (h.text && this._pendingOcrIds.has(h.id)) {
              // OCR filled the text — no longer pending
              this._pendingOcrIds.delete(h.id);
            }
          }
          // Remove IDs that were deleted by the user
          for (const id of this._pendingOcrIds) {
            if (!bookmarks.some((h) => h.id === id)) {
              this._pendingOcrIds.delete(id);
            }
          }

          // Store the exact same reference so the @Input setter ignores it.
          this._liveBookmarks = bookmarks;
          // flushSync forces React to commit the new bookmarksProp synchronously
          // before the current JS task continues.  Without this, React 18 concurrent
          // mode defers root.render(), leaving highlights = bookmarksProp = [] for
          // one frame — the "flash then disappear" the user sees.
          flushSync(() => this.renderReactTree());
          // Notify sidebar for debounced save (same reference, setter is a no-op).
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
      })
    );
  }
}
