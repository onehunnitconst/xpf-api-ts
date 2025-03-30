import { Item } from '@prisma/client';

export class UserInterestItemDto {
  id: number;
  user_id: number;
  title: string;
  image_url: string;
  category: string;
  memo: string;

  static fromModel(model: Item): UserInterestItemDto {
    return {
      id: model.id,
      user_id: model.user_id,
      title: model.title,
      image_url: model.item_image_url,
      category: model.category,
      memo: model.memo,
    };
  }
}
