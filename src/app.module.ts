import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtModule } from '@nestjs/jwt';
import Constants from './constants';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AppController } from './app.controller';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  controllers: [AppController],
  imports: [
    AuthenticationModule,
    UsersModule,
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: Constants.jwtSecret,
      signOptions: { expiresIn: '15m', algorithm: 'HS256' },
    }),
    ProfilesModule,
  ],
})
export class AppModule {}
