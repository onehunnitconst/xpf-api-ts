import { PrismaService } from '../modules/prisma/prisma.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProfileDto } from './dto/profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ProfileItemDto } from './dto/profile-item.dto';

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

  async updateProfile(id: number, userId: number, body: UpdateProfileDto) {
    await this.validateProfile(id, userId);

    if (!!body.xAccountId) {
      await this.validateXAccountId(body.xAccountId);
    }

    await this.prisma.profile.update({
      where: { id },
      data: {
        ...(body.nickname && { nickname: body.nickname }),
        ...(body.bio && { bio: body.bio }),
        ...(body.profileImage && { profileImage: body.profileImage }),
        ...(body.headerImage && { headerImage: body.headerImage }),
        ...(body.xAccountId && { xAccountId: body.xAccountId }),
      },
    });

    return;
  }

  async addItem(profileId: number, userId: number, body: AddItemDto) {
    await this.validateProfile(profileId, userId);

    const item = await this.prisma.item.create({
      data: {
        profileId,
        itemImageUrl: body.itemImageUrl,
        title: body.title,
        summary: body.summary,
        memo: body.memo,
      },
    });

    return ProfileItemDto.fromModel(item);
  }

  async updateItem(
    profileId: number,
    itemId: number,
    userId: number,
    body: UpdateItemDto,
  ) {
    await this.validateProfile(profileId, userId);

    const item = await this.prisma.item.update({
      where: { id: itemId },
      data: {
        ...(body.itemImageUrl && { itemImageUrl: body.itemImageUrl }),
        ...(body.title && { title: body.title }),
        ...(body.summary && { summary: body.summary }),
        ...(body.memo && { memo: body.memo }),
      },
    });

    return ProfileItemDto.fromModel(item);
  }

  async deleteItem(profileId: number, itemId: number, userId: number) {
    await this.validateProfile(profileId, userId);
    await this.prisma.item.delete({
      where: { id: itemId },
    });

    return;
  }

  private async validateProfile(profileId: number, userId: number) {
    const profile = await this.prisma.profile.findFirst({
      where: { id: profileId },
    });

    if (profile.userId !== userId) {
      throw new ForbiddenException('본인의 프로필이 아닙니다.');
    }
  }

  private async validateXAccountId(xAccountId: string) {
    const profile = await this.prisma.profile.findFirst({
      where: { xAccountId },
    });

    if (!!profile) {
      throw new BadRequestException('이미 사용중인 X 계정입니다.');
    }
  }
}
