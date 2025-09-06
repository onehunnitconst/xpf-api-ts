import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async getMyDefaultProfile(uid: number) {
    const profile = await this.prisma.profile.findFirst({
      where: { userId: uid, defaultProfile: true },
      include: {
        items: true,
      },
    });

    if (!profile) {
      throw new NotFoundException('기본 프로필을 찾을 수 없습니다.');
    }

    return ProfileDto.fromModel(profile);
  }

  async getProfileByXAccountId(xAccountId: string) {
    const profile = await this.prisma.profile.findFirst({
      where: { xAccountId },
      include: {
        items: true,
      },
    });

    if (!profile) {
      throw new NotFoundException('프로필을 찾을 수 없습니다.');
    }

    return ProfileDto.fromModel(profile);
  }
}
