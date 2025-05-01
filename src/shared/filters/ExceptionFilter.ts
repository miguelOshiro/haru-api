import * as Sentry from '@sentry/node';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException, UnauthorizedException, ForbiddenException)
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    console.log(exception)
    // Report to Sentry
    Sentry.captureException(exception);

    const exceptionResponse = exception.getResponse();
    const message = typeof exceptionResponse === 'string'
      ? exceptionResponse
      : (exceptionResponse as any)?.message ?? exception.message;

    response.status(Number(status)).json({
      isSuccess: false,
      message: Array.isArray(message) ? message.join(', ') : message,
      exception: {
        name: exception.name,
        message,
      },
    });
  }
}