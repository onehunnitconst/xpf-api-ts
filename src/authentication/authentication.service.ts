import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../modules/prisma/prisma.service';
import * as argon2 from 'argon2';
import { UserStatus } from '@prisma/client';

@Injectable()
export class AuthenticationService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(body: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        userId: body.userId,
      },
    });

    if (!user) {
      throw new NotFoundException('가입된 사용자가 아닙니다.');
    }

    if (user.status === UserStatus.inactive) {
      throw new BadRequestException('회원가입이 완료되지 않은 사용자입니다.');
    }

    const verified = await argon2.verify(user.password, body.password);

    if (!verified) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    const payload = {
      userId: user.id,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async register(body: RegisterDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            userId: body.userId,
          },
        ],
        userId: body.userId,
      },
    });

    if (!!user) {
      throw new BadRequestException('이미 가입된 아이디입니다.');
    }

    const profile = await this.prisma.profile.findFirst({
      where: {
        xAccountId: body.xAccountId,
      },
    });

    if (!!profile) {
      throw new BadRequestException('이미 사용중인 X 계정입니다.');
    }

    if (body.password !== body.passwordConfirm) {
      throw new BadRequestException(
        '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
      );
    }

    const hashedPassword = await argon2.hash(body.password);

    await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          userId: body.userId,
          password: hashedPassword,
          status: UserStatus.inactive,
        },
      });

      await tx.profile.create({
        data: {
          userId: user.id,
          nickname: body.nickname,
          xAccountId: body.xAccountId,
          bio: '',
          defaultProfile: true,
        },
      });

      return user;
    });
  }
}
