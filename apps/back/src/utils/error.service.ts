/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * error code information
 */
interface ErrorCode {
  code: string;
  title: string;
  description?: string;
  httpCode?: HttpStatus;
}

class ServiceError extends HttpException {
  /**
   * error code definition
   */
  error: ErrorCode;

  constructor(payload: ErrorCode) {
    super(payload, payload?.httpCode ?? 500);
  }
}

export { ErrorCode, ServiceError };
