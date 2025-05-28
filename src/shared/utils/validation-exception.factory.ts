import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export function validationExceptionFactory(errors: ValidationError[]): BadRequestException {
  const messages = errors.map(err => {
    const constraints = Object.values(err.constraints ?? {}).join(', ');
    return `${err.property}: ${constraints}`;
  });

  return new BadRequestException({
    statusCode: 400,
    message: messages,
    error: 'Bad Request',
  });
}