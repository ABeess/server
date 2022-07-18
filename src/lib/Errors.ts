import { StatusCodes } from 'http-status-codes'

export class MyError extends Error {
  public static message = 'MyError'
  public readonly code = StatusCodes.BAD_REQUEST
  constructor(message: string, code: number) {
    super(message)
    this.code = code
  }
}

export class NotFoundError extends MyError {
  public static message = 'NotFoundError'
  public static readonly code = StatusCodes.NOT_FOUND
  constructor(message: string) {
    super(message, NotFoundError.code)
  }
}

export class ConflictError extends MyError {
  public static message = 'ConflictError'
  public static readonly code = StatusCodes.CONFLICT
  constructor(message: string) {
    super(message, ConflictError.code)
  }
}

export class UnauthorizedError extends MyError {
  public static message = 'UnauthorizedError'
  public static readonly code = StatusCodes.UNAUTHORIZED
  constructor(message: string) {
    super(message, UnauthorizedError.code)
  }
}

export class ForbiddenError extends MyError {
  public static message = 'ForbiddenError'
  public static readonly code = StatusCodes.FORBIDDEN
  constructor(message: string) {
    super(message, ForbiddenError.code)
  }
}

export class BadRequestError extends MyError {
  public static message = 'BadRequestError'
  public static readonly code = StatusCodes.BAD_REQUEST
  constructor(message: string) {
    super(message, BadRequestError.code)
  }
}

export class InternalServerError extends MyError {
  public static message = 'InternalServerError'
  public static readonly code = StatusCodes.INTERNAL_SERVER_ERROR
  constructor(message: string) {
    super(message, InternalServerError.code)
  }
}

export class LengthRequiredError extends MyError {
  public static message = 'LengthRequiredError'
  public static readonly code = StatusCodes.LENGTH_REQUIRED
  constructor(message: string) {
    super(message, LengthRequiredError.code)
  }
}

export class NotAcceptableError extends MyError {
  public static message = 'NotAcceptableError'
  public static readonly code = StatusCodes.NOT_ACCEPTABLE
  constructor(message: string) {
    super(message, NotAcceptableError.code)
  }
}

export class RequestTimeOut extends MyError {
  public static message = 'RequestTimeOut'
  public static readonly code = StatusCodes.REQUEST_TIMEOUT
  constructor(message: string) {
    super(message, RequestTimeOut.code)
  }
}

export class ImATeapot extends MyError {
  public static message = 'ImATeapot'
  public static readonly code = StatusCodes.IM_A_TEAPOT
  constructor(message: string) {
    super(message, ImATeapot.code)
  }
}
