import './shared/extensions/bootstrap';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { BaseResponseInterceptor } from './shared/interceptors/base-response.interceptor';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { BadRequestException, LoggerService, ValidationPipe, VersioningType } from '@nestjs/common';
import { swaggerConfig } from './shared/extensions/swagger.config';
import { GlobalHttpExceptionFilter } from './shared/filters/ExceptionFilter';
import rateLimit from 'express-rate-limit';
import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import helmet from 'helmet';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  integrations: [
    () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      new RewriteFrames({
        root: global.__dirname,
      }),
  ],
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableVersioning({ type: VersioningType.URI });

  setupSecurity(app);
  setupSwagger(app);
  setupFilters(app);
  setupPipes(app);

  const logger = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
  setupInterceptors(app, logger);

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap().catch((err) => {
  console.error('Bootstrap failed:', err);
  process.exit(1);
});

function setupSwagger(app) {
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);
}

function setupSecurity(app) {
  app.use(helmet());
  app.enableCors({
    origin: ['http://localhost:4000', 'http://localhost:4200'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: 'Too many requests from this IP, please try again later.',
    }),
  );
}

function setupFilters(app) {
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
}

function setupInterceptors(app, logger: LoggerService) {
  app.useLogger(logger);
  app.useGlobalInterceptors(
    new LoggingInterceptor(logger),
    new BaseResponseInterceptor(),
  );
}

function setupPipes(app) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map(err => {
          const constraints = Object.values(err.constraints ?? {}).join(', ');
          return `${err.property}: ${constraints}`;
        });

        return new BadRequestException({
          statusCode: 400,
          message: messages,
          error: 'Bad Request',
        });
      },
    }),
  );
}
