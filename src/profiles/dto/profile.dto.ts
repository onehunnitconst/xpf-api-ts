import { Item, Profile } from '@prisma/client';

export class ProfileItemDto {
  id: number;
  itemImageUrl: string;
  title: string;
  memo: string;

  constructor(id: number, itemImageUrl: string, title: string, memo: string) {
    this.id = id;
    this.itemImageUrl = itemImageUrl;
    this.title = title;
    this.memo = memo;
  }

  static fromModel(model: Item): ProfileItemDto {
    return {
      id: model.id,
      itemImageUrl: model.itemImageUrl,
      title: model.title,
      memo: model.memo,
    };
  }
}

export class ProfileDto {
  id: number;
  nickname: string;
  profileImage: string;
  xAccountId: string;
  bio: string;
  items: ProfileItemDto[];

  static fromModel(model: Profile & { items: Item[] }): ProfileDto {
    return {
      id: model.id,
      nickname: model.nickname,
      profileImage: model.profileImage,
      xAccountId: model.xAccountId,
      bio: model.bio,
      items: model.items.map(ProfileItemDto.fromModel),
    };
  }
}
