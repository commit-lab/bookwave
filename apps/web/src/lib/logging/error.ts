/* eslint-disable no-console -- we want console logs here. */

export function errorLog(...args: unknown[]) {
  if (process.env.NODE_ENV === "test") {
    return;
  }
  console.error(...args);
}
