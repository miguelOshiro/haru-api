import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponseDto } from '../dto/base-response.dto';

@Injectable()
export class GlobalResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<BaseResponseDto<any>> {
    return next.handle().pipe(
      map((data) => ({
        isSuccess: true,
        message: 'Operation completed successfully.',
        data,
        exception: '',
        errors: [],
      })),
    );
  }
}

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;
    const exceptionName = exception instanceof Error ? exception.name : 'UnknownException';
    const exceptionMessage = exception instanceof Error ? exception.message : 'Unexpected error';
    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : { message: exceptionMessage };

    let errors: string[] = [];

    if (Array.isArray((exceptionResponse as any)?.message)) {
      errors = (exceptionResponse as any).message;
    } else if (typeof (exceptionResponse as any)?.message === 'string') {
      errors = [(exceptionResponse as any).message];
    } else if (typeof exceptionMessage === 'string') {
      errors = [exceptionMessage];
    } else {
      errors = ['An unexpected error occurred.'];
    }

    const message = exception instanceof HttpException && status === 400
      ? 'Validation Errors'
      : errors.join(', ');

    response.status(status).json({
      isSuccess: false,
      message,
      exception: exceptionName,
      errors: exception instanceof HttpException ? errors : [],
    });
  }
}