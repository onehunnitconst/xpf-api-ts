import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  passwordConfirm: string;

  @ApiProperty()
  xAccountId: string;
}
