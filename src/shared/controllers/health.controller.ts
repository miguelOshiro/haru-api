import {
  Controller,
  Get,
} from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { BaseResponseDto } from '../dto/base-response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check(): Promise<BaseResponseDto<any>> {
    try {
      const result = await this.health.check([
        async () => this.db.pingCheck('database'),
        async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024), // 200 MB
        async () => this.disk.checkStorage('disk_health', {
          thresholdPercent: 0.9,
          path: '/',
        }),
        async () => this.http.pingCheck('external_service', 'https://example.com'),
      ]);

      return {
        isSuccess: true,
        message: 'OK',
        data: result,
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error?.message ?? 'Health check failed',
        exception: {
          name: error?.name,
          message: error?.message,
          stack: error?.stack,
        },
      };
    }
  }
}