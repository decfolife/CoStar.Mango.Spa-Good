/**
 * Patches document-viewer-sdk to fix a stale-closure bug in runRegionOcrFallback.
 *
 * The SDK's PDFPage component passes onHighlightUpdate to async OCR Promises via
 * a useEffect closure. By the time the Promise resolves, onHighlightUpdate is
 * stale — it captured bookmarksProp=[] from before the first highlight was added.
 * Calling the stale fn fires onBookmarksChange([]) and wipes the highlight.
 *
 * Fix: use a ref (onHighlightUpdateRef) so the Promise always calls the current
 * version of the callback, matching how widthRef/heightRef are handled nearby.
 */

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../node_modules/document-viewer-sdk/dist/index.js');

if (!fs.existsSync(file)) {
  console.log('patches/apply-sdk-patches.js: document-viewer-sdk not found, skipping.');
  process.exit(0);
}

let src = fs.readFileSync(file, 'utf8');

// --- Patch 1: add onHighlightUpdateRef after hasTextContentRef assignment ---
const anchor1 = '  hasTextContentRef.current = hasTextContent;\n  const [ocrWords, setOcrWords]';
const replacement1 = `  hasTextContentRef.current = hasTextContent;
  // Keep a live ref to onHighlightUpdate so async OCR Promises always invoke the
  // current callback (which has the up-to-date bookmarksProp) rather than the
  // stale closure captured when the effect first ran.
  const onHighlightUpdateRef = useRef(onHighlightUpdate);
  onHighlightUpdateRef.current = onHighlightUpdate;
  const [ocrWords, setOcrWords]`;

// --- Patch 2: use the ref inside runRegionOcrFallback ---
const anchor2 = 'if (text) onHighlightUpdate == null ? void 0 : onHighlightUpdate(id, { text });';
const replacement2 = 'if (text) onHighlightUpdateRef.current == null ? void 0 : onHighlightUpdateRef.current(id, { text });';

// --- Patch 3: use the ref in the pending-fill effect and drop it from deps ---
const anchor3 = `    if (!ocrWords || pendingTextFillRef.current.length === 0 || !onHighlightUpdate) return;
    for (const { id, x, y, w, h } of pendingTextFillRef.current) {
      const text = getTextInRect(ocrWords, x, y, w, h, widthRef.current, heightRef.current);
      if (text) onHighlightUpdate(id, { text });
    }
    pendingTextFillRef.current = [];
  }, [ocrWords, onHighlightUpdate]);`;
const replacement3 = `    if (!ocrWords || pendingTextFillRef.current.length === 0 || !onHighlightUpdateRef.current) return;
    for (const { id, x, y, w, h } of pendingTextFillRef.current) {
      const text = getTextInRect(ocrWords, x, y, w, h, widthRef.current, heightRef.current);
      if (text) onHighlightUpdateRef.current(id, { text });
    }
    pendingTextFillRef.current = [];
  }, [ocrWords]);`;

let patched = src;
let changed = false;

for (const [anchor, replacement, name] of [
  [anchor1, replacement1, 'onHighlightUpdateRef declaration'],
  [anchor2, replacement2, 'runRegionOcrFallback ref usage'],
  [anchor3, replacement3, 'pendingTextFill effect ref usage'],
]) {
  if (patched.includes(replacement)) {
    console.log(`patches/apply-sdk-patches.js: "${name}" already applied, skipping.`);
  } else if (patched.includes(anchor)) {
    patched = patched.replace(anchor, replacement);
    console.log(`patches/apply-sdk-patches.js: applied "${name}".`);
    changed = true;
  } else {
    console.warn(`patches/apply-sdk-patches.js: WARNING — anchor not found for "${name}". SDK may have been updated.`);
  }
}

if (changed) {
  fs.writeFileSync(file, patched, 'utf8');
  console.log('patches/apply-sdk-patches.js: document-viewer-sdk patched successfully.');
}
