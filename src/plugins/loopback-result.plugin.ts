import {HttpErrors} from '@loopback/rest';
import {loopbackConfig} from '../config';

export interface IResult<T> {
  status: boolean;
  msg?: string;
  data?: T;
  error?: unknown;
}

export class UnauthorizedError {
  constructor(message: string) {
    return new HttpErrors.Unauthorized(message);
  }
}

export class BadRequestError {
  constructor(message: string) {
    return new HttpErrors.BadRequest(message);
  }
}

export class NotFoundError {
  constructor(message: string) {
    // "message": "Entity not found: Entity with id xxx",
    const error = new HttpErrors.NotFound(message);
    error.code = 'ENTITY_NOT_FOUND';
    return error;
  }
}

export class Result<T> {
  status: boolean;
  data?: T | undefined;
  msg?: string | undefined;
  error?: unknown;

  constructor(status: boolean, data?: T, msg?: string, error?: unknown) {
    this.status = status;
    this.data = data;
    this.msg = msg;
    this.error = error;
  }
}

export class SuccessResult<T> extends Result<T> {
  constructor(data?: T, msg?: string) {
    super(true);
    this.data = data;
    this.msg = msg;
  }
}

export class FailedResult<T> extends Result<T> {
  constructor(error?: unknown, msg?: string) {
    super(false);
    if (loopbackConfig.debug) {
      this.error = error;
    }
    this.msg = msg;
  }
}
