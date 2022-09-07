import {HttpErrors} from '@loopback/rest';

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

export interface Result {
  status: boolean;
  msg?: string;
  data?: unknown;
  error?: unknown;
}

export class ResultPlugin {
  static getSuccessResult(result?: unknown, msg?: string): Result {
    return {
      status: true,
      msg: msg,
      data: result,
    };
  }
  static getErrorResult(error?: unknown, msg?: string): Result {
    return {
      status: false,
      msg: msg,
      error: error,
    };
  }
}
