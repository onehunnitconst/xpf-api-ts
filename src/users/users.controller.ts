import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserData } from '../decorators/user-data.decorator';
import { JwtPayloadDto } from '../authentication/dto/jwt-payload.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('my')
  @UseGuards(AuthGuard)
  async getMyProfile(@UserData() { user_id }: JwtPayloadDto) {
    return this.service.getProfile(+user_id);
  }

  @Get('my/items')
  @UseGuards(AuthGuard)
  async getMyItems(@UserData() { user_id }: JwtPayloadDto) {
    return this.service.getItems(+user_id);
  }
}
