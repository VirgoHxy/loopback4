import {HttpErrors} from '@loopback/rest';

export class UnauthorizedError {
  constructor(message: string) {
    return new HttpErrors.Unauthorized(message);
  }
}

export interface Result {
  status: boolean;
  data: unknown;
}

export class ResultPlugin {
  static getSuccessResult(result: unknown): Result {
    return {
      status: true,
      data: result,
    };
  }
}
