import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  x_account_id: string;
}
