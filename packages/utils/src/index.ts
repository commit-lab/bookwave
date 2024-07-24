import DOMPurify from "dompurify";

export function isNullOrUndefined(u: unknown): u is null | undefined {
  return u === null || u === undefined;
}

export function cleanData(htmlContent: string) {
  return DOMPurify.sanitize(htmlContent);
}
