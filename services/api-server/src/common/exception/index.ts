import { HttpException, HttpStatus, Logger } from "@nestjs/common";

const logger = new Logger("common/Exception");

export function logErrorAndMaybeThrowInternalServerError(
  err: unknown,
  returnedMessage: string,
  logMessage?: string
): never {
  logger.error(logMessage ?? `${returnedMessage}. err = ${String(err)}`);
  if (err instanceof HttpException) {
    throw err;
  }
  throw new HttpException(returnedMessage, HttpStatus.INTERNAL_SERVER_ERROR);
}
