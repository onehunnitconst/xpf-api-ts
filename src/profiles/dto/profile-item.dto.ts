import { Item } from '@prisma/client';

export class ProfileItemDto {
  id: number;
  itemImageUrl: string;
  title: string;
  summary: string;
  memo: string;

  constructor(
    id: number,
    itemImageUrl: string,
    title: string,
    summary: string,
    memo: string,
  ) {
    this.id = id;
    this.itemImageUrl = itemImageUrl;
    this.title = title;
    this.summary = summary;
    this.memo = memo;
  }

  static fromModel(model: Item): ProfileItemDto {
    return {
      id: model.id,
      itemImageUrl: model.itemImageUrl,
      title: model.title,
      summary: model.summary,
      memo: model.memo,
    };
  }
}
