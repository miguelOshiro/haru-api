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
import { UnlockAccountModule } from './features/account/unlock-account/unlock-account.module';
import { ForgotPasswordModule } from './features/account/forgot-password/forgot-password.module';
import { ResetPasswordModule } from './features/account/reset-password/reset-password.module';
import { ChangePasswordModule } from './features/account/change-password/change-password.module';
import { DeleteModule } from './features/account/delete/delete.module';
import { ConfirmEmailModule } from './features/account/confirm-email/confirm-email.module';
import { VerifyEmailModule } from './features/account/verify-email/verify-email.module';
import { ChangeEmailModule } from './features/account/change-email/change-email.module';
import { ConfirmChangeModule } from './features/account/confirm-change/confirm-change.module';
import { SignoutModule } from './features/account/signout/signout.module';
import { UpdateProfileModule } from './features/account/update-profile/update-profile.module';
import { UpdateAvatarModule } from './features/account/update-avatar/update-avatar.module';
import { TwoFaVerifyModule } from './features/account/2fa-verify/two-fa-verify.module';
import { TwoFaModule } from './features/account/2fa/two-fa.module';

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
        ssl: { rejectUnauthorized: false },
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
    }),
    HttpModule,
    TerminusModule,
    PassportModule,
    JwtTokenModule,
    SignInModule,
    SignUpModule,
    MeModule,
    UnlockAccountModule,
    ForgotPasswordModule,
    ResetPasswordModule,
    ChangePasswordModule,
    DeleteModule,
    ConfirmEmailModule,
    VerifyEmailModule,
    ChangeEmailModule,
    ConfirmChangeModule,
    SignoutModule,
    UpdateProfileModule,
    UpdateAvatarModule,
    TwoFaModule,
    TwoFaVerifyModule
  ],
  controllers: [HealthController],
  providers: [JwtStrategy, BaseSubscriber],
})
export class AppModule {}
