export function parseBool(value: string): boolean {
  if (!value) return false;
  return value.toLowerCase() === 'true';
}

/**
 * @summary flatten a nested array of objects into a single 1D array.
 * @param {Array<any>} arr
 * @return {*}  {Array<any>}
 */
export function flatMap(arr: Array<any>): Array<any> {
  return arr.reduce((acc, item) => {
    if (Array.isArray(item)) {
      // If the item is an array, recursively flatten it
      return acc.concat(flatMap(item));
    } else {
      // Otherwise, just add the item to the accumulator
      return acc.concat(item);
    }
  }, []);
}

export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
