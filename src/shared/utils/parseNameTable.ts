export function parseNameTable(str: string): string {
  return str.slice(1).split("'")[0];
}
