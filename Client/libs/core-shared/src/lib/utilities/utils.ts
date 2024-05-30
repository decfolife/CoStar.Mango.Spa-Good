export function parseBool(value: string): boolean {
    if (!value) return false;
    return value.toLowerCase() === 'true';
}