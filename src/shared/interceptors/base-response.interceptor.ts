import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { BaseResponseDto } from '../dto/base-response.dto';

// Add import for BaseErrorResponseDto for reference
// import { BaseErrorResponseDto } from '../../../shared/dto/base-error-response.dto';

@Injectable()
export class BaseResponseInterceptor<T> implements NestInterceptor<T, BaseResponseDto<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<BaseResponseDto<T>> {
    return next.handle().pipe(
      map((data: T): BaseResponseDto<T> => ({
        isSuccess: true,
        message: 'Success',
        data,
      })),
    );
  }
}

@Catch(BadRequestException, UnauthorizedException, ForbiddenException, NotFoundException)
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    let message = Array.isArray((exceptionResponse as any)?.message)
      ? (exceptionResponse as any).message.join(', ')
      : typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any)?.message ?? exception.message;

    if (exception instanceof ForbiddenException || exception instanceof NotFoundException) {
      const res = exception.getResponse() as any;
      message = Array.isArray(res.message) ? res.message.join(', ') : res.message;
    }

    response.status(status).json({
      isSuccess: false,
      message,
      exception: {
        name: exception.name,
        message,
      },
    });
  }
}