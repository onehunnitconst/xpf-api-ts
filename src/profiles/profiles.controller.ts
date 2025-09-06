import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { AuthGuard } from '@App/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserData } from '@App/decorators/user-data.decorator';
import { JwtPayloadDto } from '@App/authentication/dto/jwt-payload.dto';

@Controller({
  version: '1',
  path: 'profiles',
})
export class ProfilesController {
  constructor(private readonly service: ProfilesService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getMyDefaultProfile(@UserData() { userId }: JwtPayloadDto) {
    return this.service.getMyDefaultProfile(+userId);
  }

  @Get(':xAccountId')
  async getProfile(@Param('xAccountId') xAccountId: string) {
    return this.service.getProfileByXAccountId(xAccountId);
  }
}
