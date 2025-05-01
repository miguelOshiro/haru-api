import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClsModule } from 'nestjs-cls';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { SignInModule } from './features/account/signin/signin.module';
import { SignUpModule } from './features/account/signup/signup.module';
import { JwtTokenModule } from './shared/services/jwt/jwt.module';
import { LoggerModule } from './shared/services/logger/logger.module';
import { RequestContextModule } from './shared/services/request-context/request-context.module';
import { MeModule } from './features/account/me/me.module';
import { JwtStrategy } from './shared/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { BaseSubscriber } from './shared/subscribers/base.subscriber';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './shared/controllers/health.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true }, // ✅ necesario
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, LoggerModule, RequestContextModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.username'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.name'),
        synchronize: false,
        autoLoadEntities: true,
      }),
    }),
    HttpModule,
    TerminusModule,
    PassportModule,
    JwtTokenModule,
    SignInModule,
    SignUpModule,
    MeModule
  ],
  controllers: [HealthController],
  providers: [JwtStrategy, BaseSubscriber],
})
export class AppModule {}
