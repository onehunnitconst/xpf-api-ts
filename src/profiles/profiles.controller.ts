import { Controller, Get, Param } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller({
  version: '1',
  path: 'profiles',
})
export class ProfilesController {
  constructor(private readonly service: ProfilesService) {}

  @Get(':id')
  async getProfile(@Param('id') id: string) {
    return this.service.getProfile(+id);
  }

  @Get(':id/items')
  async getItems(@Param('id') id: string) {
    return this.service.getItems(+id);
  }
}
