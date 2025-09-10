import { Item, Profile } from '@prisma/client';
import { ProfileItemDto } from './profile-item.dto';
export class ProfileDto {
  id: number;
  nickname: string;
  profileImage: string;
  headerImage: string;
  xAccountId: string;
  bio: string;
  items: ProfileItemDto[];

  static fromModel(model: Profile & { items: Item[] }): ProfileDto {
    return {
      id: model.id,
      nickname: model.nickname,
      profileImage: model.profileImage,
      headerImage: model.headerImage,
      xAccountId: model.xAccountId,
      bio: model.bio,
      items: model.items.map(ProfileItemDto.fromModel),
    };
  }
}
