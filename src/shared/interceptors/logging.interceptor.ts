import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    const { method, originalUrl: url, body } = req;

    this.logger.log(`[REQUEST] ${method} ${url} - body: ${JSON.stringify(body)}`, 'HTTP');

    return next.handle().pipe(
      tap((res) => {
        const duration = Date.now() - now;
        this.logger.log(
          `[RESPONSE] ${method} ${url} - ${duration}ms - result: ${JSON.stringify(res)}`,
          'HTTP',
        );
      }),
    );
  }
}