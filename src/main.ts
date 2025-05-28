import './shared/extensions/bootstrap';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { LoggerService, ValidationPipe, VersioningType } from '@nestjs/common';
import { setupSecurity } from './shared/extensions/security.config';
import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import { GlobalHttpExceptionFilter, GlobalResponseInterceptor } from './shared/interceptors/base-response.interceptor';
import { validationExceptionFactory } from './shared/utils/validation-exception.factory';
import { setupSwagger } from './shared/extensions/swagger.config';

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    integrations: [
      () =>
        new RewriteFrames({
          root: global.__dirname,
        }),
    ],
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableVersioning({ type: VersioningType.URI });

  setupSecurity(app);
  setupSwagger(app);
  setupInterceptors(app, app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER));
  setupPipes(app);

  const port = parseInt(process.env.PORT ?? '4000', 10);
  await app.listen(port, () => {
    console.log(`Application is running on: http://localhost:${port}`);
  });
}

bootstrap().catch((err) => {
  console.error('Bootstrap failed:', err);
  process.exit(1);
});

function setupInterceptors(app, logger: LoggerService) {
  app.useLogger(logger);
  app.useGlobalInterceptors(
    new LoggingInterceptor(logger),
    new GlobalResponseInterceptor(),
  );
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
}

function setupPipes(app) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: validationExceptionFactory,
    }),
  );
}
