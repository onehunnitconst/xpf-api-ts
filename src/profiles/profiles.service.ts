import { PrismaService } from '@App/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: number) {
    const profile = await this.prisma.profile.findUnique({
      where: { user_id: userId },
    });

    return profile;
  }

  async getItems(userId: number) {
    const items = await this.prisma.item.findMany({
      where: { user_id: userId },
    });

    return items;
  }
}
