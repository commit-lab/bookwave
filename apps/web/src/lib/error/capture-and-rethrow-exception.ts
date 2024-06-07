import { ApiError } from "@bookwave/api-client";
import { HttpStatus } from "@nestjs/common";
import { errorLog } from "@/lib/logging/error";
import {
  ApiConflictError,
  ApiNotFoundError,
  ApiUnauthorizedError,
} from "@/lib/error/api-errors";

/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison -- we want to compare `number` and `HttpStatus` enums. */

export function captureAndRethrowException(error: unknown): never {
  if (error instanceof ApiError) {
    switch (error.status) {
      case HttpStatus.UNAUTHORIZED:
        throw new ApiUnauthorizedError("Unauthorized", error);
      case HttpStatus.NOT_FOUND:
        throw new ApiNotFoundError("Not found", error);
      case HttpStatus.CONFLICT:
        throw new ApiConflictError("Conflict", error);
    }
  }
  errorLog(error);
  throw error;
}
