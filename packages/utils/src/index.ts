export function isNullOrUndefined(u: unknown): u is null | undefined {
  return u === null || u === undefined;
}
