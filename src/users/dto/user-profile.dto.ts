import { Profile } from '@prisma/client';

export class UserProfileDto {
  id: number;
  x_account_id: string;
  nickname: string;
  profile_image?: string;
  bio: string;

  static fromModel(model: Profile): UserProfileDto {
    return {
      id: model.user_id,
      x_account_id: model.x_account_id,
      nickname: model.nickname,
      profile_image: model.profile_image,
      bio: model.bio,
    };
  }
}
