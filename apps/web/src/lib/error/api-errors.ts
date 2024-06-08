import type { ApiError } from "@bookwave/api-client";
import { GeneralError } from "./general-error";

/**
 * An error class that maps to HTTP status code `HttpStatus.UNAUTHORIZED`
 */
export class ApiUnauthorizedError extends GeneralError {
  constructor(
    message: string,
    public originError: ApiError,
  ) {
    super(message);
    this.name = "ApiUnauthorizedError";
    Object.setPrototypeOf(this, ApiUnauthorizedError.prototype);
  }
}

/**
 * An error class that maps to HTTP status code `HttpStatus.NOT_FOUND`
 */
export class ApiNotFoundError extends GeneralError {
  constructor(
    message: string,
    public originError: ApiError,
  ) {
    super(message);
    this.name = "ApiNotFoundError";
    Object.setPrototypeOf(this, ApiNotFoundError.prototype);
  }
}

/**
 * An error class that maps to HTTP status code `HttpStatus.CONFLICT`
 */
export class ApiConflictError extends GeneralError {
  constructor(
    message: string,
    public originError: ApiError,
  ) {
    super(message);
    this.name = "ApiConflictError";
    Object.setPrototypeOf(this, ApiConflictError.prototype);
  }
}
