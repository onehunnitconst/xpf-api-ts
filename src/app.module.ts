import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtModule } from '@nestjs/jwt';
import Constants from './constants';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AppController } from './app.controller';
import { ProfilesModule } from './profiles/profiles.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './modules/interceptors/logger.interceptor';
import { HttpExceptionFilter } from './modules/filters/http-exception.filter';

@Module({
  controllers: [AppController],
  imports: [
    AuthenticationModule,
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: Constants.jwtSecret,
      signOptions: { expiresIn: '15m', algorithm: 'HS256' },
    }),
    ProfilesModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
