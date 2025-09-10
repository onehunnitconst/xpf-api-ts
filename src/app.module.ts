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
import * as fs from 'fs';
import { ImagesModule } from './images/images.module';

@Module({
  controllers: [AppController],
  imports: [
    AuthenticationModule,
    PrismaModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: () => {
        const privateKey = fs.readFileSync(Constants.jwtPrivateKeyPath);
        const publicKey = fs.readFileSync(Constants.jwtPublicKeyPath);

        return {
          privateKey,
          publicKey,
          signOptions: { expiresIn: '1d', algorithm: 'RS256' },
        };
      },
    }),
    ProfilesModule,
    ImagesModule,
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
