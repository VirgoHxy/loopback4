import {
  AUTHENTICATION_STRATEGY_NOT_FOUND,
  USER_PROFILE_NOT_FOUND,
} from '@loopback/authentication';

export class LoopbackError extends Error {
  statusCode: number;
  code?: string;
  details?: Array<any>;
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export class UnauthorizedError extends LoopbackError {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.code = AUTHENTICATION_STRATEGY_NOT_FOUND;
    this.statusCode = 401;
  }
}

export class UserProfile404Error extends LoopbackError {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.code = USER_PROFILE_NOT_FOUND;
    this.statusCode = 401;
  }
}

export class JsonWebTokenError extends LoopbackError {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = 'JsonWebTokenError';
    this.statusCode = 401;
  }
}

export interface SuccessResult {
  status: boolean;
  data: any;
}

export interface ErrorResult {
  status: boolean;
  data: {
    message: string;
    name: string;
    statusCode: number;
    code?: string;
    details?: Array<any>;
  };
}

export default class ResultService {
  static getSuccessResult(result: any): SuccessResult {
    return {
      status: true,
      data: result,
    };
  }
  static getErrorResult(result: LoopbackError): ErrorResult {
    return {
      status: false,
      data: {
        message: result.message || 'something error',
        name: result.name || 'Error',
        statusCode: result.statusCode || 500,
        code: result.code,
        details: result.details,
      },
    };
  }
}
