declare module 'document-viewer-sdk' {
  import * as React from 'react';

  export type PDFSource =
    | string
    | ArrayBuffer
    | Uint8Array
    | { url: string; httpHeaders?: Record<string, string> };

  export type DocumentSource = PDFSource | File;

  export interface HighlightRange {
    id: string;
    text: string;
    /** Optional first name stamped onto a highlight by the viewer */
    firstName?: string;
    /** Optional last name stamped onto a highlight by the viewer */
    lastName?: string;
    /** ISO 8601 timestamp associated with the highlight */
    datetime?: string;
    /** Optional username shown in the bookmarks sidebar */
    username?: string;
    /** When true, this highlight is read-only in the sidebar UI */
    locked?: boolean;
    /** Optional comment/annotation attached to this highlight */
    comment?: string;
    /** Optional lower-left label shown in the bookmarks sidebar */
    bookmarkBottomLeft?: string;
    /** Optional lower-right label shown in the bookmarks sidebar */
    bookmarkBottomRight?: string;
    /**
     * Persistence-safe character offsets within the document text.
     * Use this (not startContainer/endContainer) when saving to the backend.
     */
    textPosition?: { start: number; end: number };
    /** Page number the highlight appears on */
    pageNumber?: number;
    /** Approximate bounding box — useful as a display hint */
    position?: { x: number; y: number; width: number; height: number };
    // DOM nodes — NOT serialisable, present only at runtime
    startContainer?: Node;
    startOffset?: number;
    endContainer?: Node;
    endOffset?: number;
  }

  export interface ToolbarConfig {
    navigation?: boolean;
    zoomOut?: boolean;
    zoomSelect?: boolean;
    zoomIn?: boolean;
    rotate?: boolean;
    download?: boolean;
    print?: boolean;
    search?: boolean;
    /** Show the highlight tool button. Default: true */
    highlight?: boolean;
    filename?: boolean;
    rightSlot?: React.ReactNode;
  }

  export interface DocumentViewerProps {
    src: DocumentSource;
    filename?: string;
    initialPage?: number;
    toolbar?: boolean | ToolbarConfig;
    darkMode?: boolean;
    searchQuery?: string;
    className?: string;
    style?: React.CSSProperties;
    /**
     * Controlled bookmarks (highlights) array.
     * Pass saved highlights here to restore them when the document loads.
     */
    bookmarks?: HighlightRange[];
    /** Fires whenever bookmarks are added, removed, or cleared by the user. */
    onBookmarksChange?: (bookmarks: HighlightRange[]) => void;
    /** Date display format for bookmark timestamps. */
    dateFormat?: 'us' | 'eu';
    /** Current user stamped onto newly created bookmarks. */
    currentUser?: {
      firstName?: string;
      lastName?: string;
      username?: string;
    };
    onLoad?: (...args: any[]) => void;
    onError?: (err: { message?: string; code?: string }) => void;
  }

  export const DocumentViewer: React.ComponentType<DocumentViewerProps>;
}

declare module 'document-vieweer-sdk' {
  export * from 'document-viewer-sdk';
}
