import { Injectable } from '@nestjs/common';
import { PrismaService } from '../modules/prisma/prisma.service';
import { UserProfileDto } from './dto/user-profile.dto';
import { UserInterestItemDto } from './dto/user-interest-item.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: number) {
    const profile = await this.prisma.profile.findFirst({
      where: {
        user_id: userId,
      },
    });

    return UserProfileDto.fromModel(profile);
  }

  async getItems(userId: number) {
    const items = await this.prisma.item.findMany({
      where: { user_id: userId },
    });

    return items.map((item) => UserInterestItemDto.fromModel(item));
  }
}
