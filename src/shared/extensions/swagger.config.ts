import { DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Haru Platform API')
  .setDescription('Comprehensive API documentation for the Haru platform, including authentication, user management, and core business operations.')
  .setVersion('v1')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    in: 'header',
  })
  .build();

export function setupSwagger(app: INestApplication) {
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);
}