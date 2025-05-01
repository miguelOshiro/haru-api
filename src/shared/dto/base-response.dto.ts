import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto<T> {
  @ApiProperty({ example: true })
  isSuccess: boolean;

  @ApiProperty({ example: 'Operation completed successfully.', required: false })
  message?: string;

  @ApiProperty({ required: false })
  data?: T;

  @ApiProperty({
    example: {
      name: 'UnauthorizedError',
      message: 'Invalid email or password',
      stack: 'stack trace here',
    },
    required: false,
  })
  exception?: any;
}