/**
 * Patches document-viewer-sdk/dist/index.js.
 *
 * FIX 1 – initialBookmarks / uncontrolled mode
 *   Adds an `initialBookmarks` prop to PDFViewer that seeds useHighlighting's
 *   internal state once (via a seeded-ref guard).  The SDK then runs fully
 *   uncontrolled — React state lives inside the SDK, never owned by the Angular
 *   parent — eliminating the controlled-mode race that caused highlights to
 *   disappear.  onBookmarksChange is fired via a useEffect on internalHighlights
 *   so Angular can still debounce-save.
 *
 * FIX 2 – stale OCR closure
 *   runRegionOcrFallback captures onHighlightUpdate at effect-setup time.  A live
 *   ref ensures the async Promise always calls the current callback.
 */

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../node_modules/document-viewer-sdk/dist/index.js');

if (!fs.existsSync(file)) {
  console.log('patches/apply-sdk-patches.js: document-viewer-sdk not found, skipping.');
  process.exit(0);
}

let src = fs.readFileSync(file, 'utf8');

/**
 * Each entry: [anchor, replacement, name, alreadyAppliedMarker?]
 * - If alreadyAppliedMarker is supplied, it is used (instead of replacement) to
 *   detect whether the patch has already been applied.
 */
const patches = [

  // ------------------------------------------------------------------
  // FIX 2a: add onHighlightUpdateRef declaration in PDFPage
  // ------------------------------------------------------------------
  [
    // anchor: the two lines are adjacent in the original file
    `  hasTextContentRef.current = hasTextContent;\n  const [ocrWords, setOcrWords]`,
    `  hasTextContentRef.current = hasTextContent;
  // Keep a live ref so async OCR Promises always call the current onHighlightUpdate.
  const onHighlightUpdateRef = useRef(onHighlightUpdate);
  onHighlightUpdateRef.current = onHighlightUpdate;
  const [ocrWords, setOcrWords]`,
    'OCR: onHighlightUpdateRef declaration',
    // already-applied marker — present regardless of which comment variant was used
    'const onHighlightUpdateRef = useRef(onHighlightUpdate);',
  ],

  // ------------------------------------------------------------------
  // FIX 2b: use the ref inside runRegionOcrFallback
  // ------------------------------------------------------------------
  [
    'if (text) onHighlightUpdate == null ? void 0 : onHighlightUpdate(id, { text });',
    'if (text) onHighlightUpdateRef.current == null ? void 0 : onHighlightUpdateRef.current(id, { text });',
    'OCR: runRegionOcrFallback ref usage',
  ],

  // ------------------------------------------------------------------
  // FIX 2c: use the ref in the pending-fill effect, drop from deps
  // ------------------------------------------------------------------
  [
    `    if (!ocrWords || pendingTextFillRef.current.length === 0 || !onHighlightUpdate) return;
    for (const { id, x, y, w, h } of pendingTextFillRef.current) {
      const text = getTextInRect(ocrWords, x, y, w, h, widthRef.current, heightRef.current);
      if (text) onHighlightUpdate(id, { text });
    }
    pendingTextFillRef.current = [];
  }, [ocrWords, onHighlightUpdate]);`,
    `    if (!ocrWords || pendingTextFillRef.current.length === 0 || !onHighlightUpdateRef.current) return;
    for (const { id, x, y, w, h } of pendingTextFillRef.current) {
      const text = getTextInRect(ocrWords, x, y, w, h, widthRef.current, heightRef.current);
      if (text) onHighlightUpdateRef.current(id, { text });
    }
    pendingTextFillRef.current = [];
  }, [ocrWords]);`,
    'OCR: pendingTextFill effect ref usage',
  ],

  // ------------------------------------------------------------------
  // FIX 1a: useHighlighting — accept initialHighlights, seed state
  // ------------------------------------------------------------------
  [
    `function useHighlighting() {
  const [highlightingEnabled, setHighlightingEnabled] = useState(false);
  const [highlights, setHighlights] = useState([]);`,
    `function useHighlighting({ initialHighlights } = {}) {
  const [highlightingEnabled, setHighlightingEnabled] = useState(false);
  const [highlights, setHighlights] = useState([]);
  // Seed internal state from initialHighlights (async load from backend).
  // seededRef tracks the last reference we seeded from — if the prop changes
  // (new document) we re-seed; same reference means no re-seed.
  const seededRef = useRef(null);
  useEffect(() => {
    if (initialHighlights === seededRef.current) return;
    seededRef.current = initialHighlights;
    setHighlights(initialHighlights ?? []);
  }, [initialHighlights]);`,
    'useHighlighting: initialHighlights seeding',
    'const seededRef = useRef(null);',
  ],

  // ------------------------------------------------------------------
  // FIX 1b: DocumentViewer — accept and forward initialBookmarks to PDFViewer
  // ------------------------------------------------------------------
  [
    `function DocumentViewer({
  src,
  filename: filenameProp,
  toolbar = true,
  darkMode = false,
  className,
  style,
  bookmarks,
  onBookmarksChange,
  searchQuery,
  onLoad,
  onError
}) {`,
    `function DocumentViewer({
  src,
  filename: filenameProp,
  toolbar = true,
  darkMode = false,
  className,
  style,
  bookmarks,
  initialBookmarks,
  onBookmarksChange,
  searchQuery,
  onLoad,
  onError
}) {`,
    'DocumentViewer: accept initialBookmarks prop',
    'initialBookmarks,\n  onBookmarksChange,\n  searchQuery,\n  onLoad,\n  onError\n}) {',
  ],

  [
    `        bookmarks,
        onBookmarksChange,
        searchQuery
      }
    );
  }
  if (!state.buffer) return null;`,
    `        bookmarks,
        initialBookmarks,
        onBookmarksChange,
        searchQuery
      }
    );
  }
  if (!state.buffer) return null;`,
    'DocumentViewer: forward initialBookmarks to PDFViewer',
    'initialBookmarks,\n        onBookmarksChange,\n        searchQuery\n      }\n    );\n  }\n  if (!state.buffer) return null;',
  ],

  // ------------------------------------------------------------------
  // FIX 1b: PDFViewer — accept initialBookmarks prop
  // ------------------------------------------------------------------
  [
    `    bookmarks: bookmarksProp,
    onBookmarksChange,
    searchQuery: searchQueryProp,`,
    `    bookmarks: bookmarksProp,
    initialBookmarks,
    onBookmarksChange,
    searchQuery: searchQueryProp,`,
    'PDFViewer: initialBookmarks prop',
  ],

  // ------------------------------------------------------------------
  // FIX 1c: PDFViewer — pass to useHighlighting, fire onChange in
  //          uncontrolled mode via useEffect (no re-render loop)
  // ------------------------------------------------------------------
  [
    `    } = useHighlighting();
    const highlights = isBookmarksControlled ? bookmarksProp : internalHighlights;`,
    `    } = useHighlighting({ initialHighlights: initialBookmarks });
    // In uncontrolled mode fire onBookmarksChange whenever internal state changes
    // so Angular can debounce-save without owning React state.
    const _onBookmarksChangeRef = useRef(onBookmarksChange);
    _onBookmarksChangeRef.current = onBookmarksChange;
    const _initialBookmarksRef = useRef(initialBookmarks);
    useEffect(() => { _initialBookmarksRef.current = initialBookmarks; }, [initialBookmarks]);
    const _onChangeMountedRef = useRef(false);
    useEffect(() => {
      if (isBookmarksControlled) return;
      // Skip the initial mount render — that's not a user action.
      if (!_onChangeMountedRef.current) { _onChangeMountedRef.current = true; return; }
      // Skip when state was just seeded from initialBookmarks (not a user action).
      if (internalHighlights === _initialBookmarksRef.current) return;
      _onBookmarksChangeRef.current == null ? void 0 : _onBookmarksChangeRef.current(internalHighlights);
    }, [internalHighlights, isBookmarksControlled]);
    const highlights = isBookmarksControlled ? bookmarksProp : internalHighlights;`,
    'PDFViewer: uncontrolled onChange effect',
    '_onChangeMountedRef',
  ],
];

let patched = src;
let changed = false;

for (const [anchor, replacement, name, appliedMarker] of patches) {
  const marker = appliedMarker ?? replacement;
  if (patched.includes(marker)) {
    console.log(`  [skip] "${name}" already applied.`);
  } else if (patched.includes(anchor)) {
    patched = patched.replace(anchor, replacement);
    console.log(`  [ok]   "${name}" applied.`);
    changed = true;
  } else {
    console.warn(`  [WARN] anchor not found for "${name}" — SDK may have changed.`);
  }
}

if (changed) {
  fs.writeFileSync(file, patched, 'utf8');
  console.log('patches/apply-sdk-patches.js: document-viewer-sdk patched successfully.');
} else {
  console.log('patches/apply-sdk-patches.js: nothing to do.');
}
