import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  password: string;
}
