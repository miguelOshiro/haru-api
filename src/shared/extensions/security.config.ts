import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { INestApplication } from '@nestjs/common';

export function setupSecurity(app: INestApplication) {
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