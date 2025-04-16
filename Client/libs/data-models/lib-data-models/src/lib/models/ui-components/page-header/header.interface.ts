/**
 * Search parameters for quick search
 * 'flikeclause', 'fmodule' are for V06 redirection logic
 * @export
 * @interface SearchParams
 */
export interface SearchParams {
  flikeclause?: string; // searchObjectId
  fmodule?: number; // searchString
}
