import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  password: string;
}
