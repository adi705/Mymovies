import { StatusCodes } from 'http-status-codes';

export class CustomAPIError extends Error {
    constructor(message, statusCode) {
      super(message)
      this.statusCode = statusCode
    }
  }
  
export const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode)
  }
  

export class UnauthenticatedError extends Error {
    constructor(message) {
      super(message); // the child class is responsible to initializing also the parent class Error
      this.name = 'UnauthenticatedError';
      this.statusCode = StatusCodes.UNAUTHORIZED;
    }
  }  

  export class UnauthorizedError extends Error {
    constructor(message) {
      super(message);
      this.name = 'UnauthorizedError';
      this.statusCode = StatusCodes.FORBIDDEN;
    }
  }

  export class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NotFoundError';
      this.statusCode = StatusCodes.NOT_FOUND;
    }
  }
  export class BadRequestError extends Error {
    constructor(message) {
      super(message);
      this.name = 'BadRequestError';
      this.statusCode = StatusCodes.BAD_REQUEST;
    }
  }