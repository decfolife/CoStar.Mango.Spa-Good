import {
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
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
export class AiDocumentViewerComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
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
    this.renderReactTree();
  }

  get src(): DocumentSource | null {
    return this._src;
  }

  @Input() set filename(value: string | undefined) {
    this._filename = value;
    this.renderReactTree();
  }

  @Input() set initialPage(value: number | undefined) {
    this._initialPage = value && value > 0 ? value : undefined;
    this.renderReactTree();
  }

  @Input() set textContent(value: string | undefined) {
    this._textContent = value?.trim() ? value : undefined;
    this.renderReactTree();
  }

  @Input() set searchQuery(value: string | undefined) {
    this._searchQuery = value;
    this.renderReactTree();
  }

  /**
   * Saved/current highlights for the SDK's controlled bookmarks mode.
   * The templates keep the historical input name, but the SDK prop is `bookmarks`.
   */
  @Input() set initialBookmarks(value: HighlightRange[]) {
    this._initialBookmarks = value ?? [];
    this.renderReactTree();
  }

  /** Fires whenever the user adds, removes or clears a highlight. */
  @Output() bookmarksChange = new EventEmitter<HighlightRange[]>();

  private _src: DocumentSource | null = null;
  private _filename?: string;
  private _initialPage?: number;
  private _textContent?: string;
  private _searchQuery?: string;
  private _initialBookmarks: HighlightRange[] = [];
  private _currentUser?: { firstName?: string; lastName?: string };
  private _dateFormat: 'us' | 'eu' = 'us';
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
    };
  }

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly ngZone: NgZone,
    private readonly mangoAppFacade: MangoAppFacade,
  ) {}

  ngOnInit(): void {
    this.mangoAppFacade.contactRecord$
      .pipe(takeUntil(this.destroy$))
      .subscribe((contact) => {
        this._currentUser = {
          firstName: contact?.firstName ?? undefined,
          lastName: contact?.lastName ?? undefined,
        };
        this._dateFormat = contact?.preferences?.contactDatesEU ? 'eu' : 'us';
        this.renderReactTree();
      });
  }

  ngAfterViewInit(): void {
    if (this._hostRef && !this.root) {
      this.root = createRoot(this._hostRef.nativeElement);
      this.renderReactTree();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.root?.unmount();
    this.root = null;
  }

  get textModeContent(): string | null {
    return this._src ? null : this._textContent ?? null;
  }

  private renderReactTree(): void {
    if (!this.root) {
      this.viewerError = null;
      this.isLoaded = false;
      this.cdr.markForCheck();
      return;
    }

    if (!this._src) {
      this.root.unmount();
      this.root = createRoot(this._hostRef!.nativeElement);
      this.viewerError = null;
      this.isLoaded = Boolean(this._textContent);
      this.cdr.markForCheck();
      return;
    }

    this.root.render(
      React.createElement(DocumentViewer, {
        src: this._src,
        filename: this._filename,
        initialPage: this._initialPage,
        toolbar: this.toolbar,
        darkMode: false,
        searchQuery: this._searchQuery,
        bookmarks: this._initialBookmarks,
        currentUser: this._currentUser,
        dateFormat: this._dateFormat,
        onBookmarksChange: (bookmarks: HighlightRange[]) => {
          // React callbacks run outside Angular's zone — run() ensures
          // RxJS schedulers (debounceTime) and HttpClient fire correctly.
          this.ngZone.run(() => this.bookmarksChange.emit(bookmarks));
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
