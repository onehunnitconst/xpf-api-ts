import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { AuthGuard } from '@App/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserData } from '@App/decorators/user-data.decorator';
import { JwtPayloadDto } from '@App/authentication/dto/jwt-payload.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AddItemDto } from './dto/add-item.dto';

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

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async updateProfile(
    @Param('id') id: string,
    @UserData() { userId }: JwtPayloadDto,
    @Body() body: UpdateProfileDto,
  ) {
    return this.service.updateProfile(+id, +userId, body);
  }

  @Post(':id/items')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async addItem(
    @Param('id') profileId: string,
    @UserData() { userId }: JwtPayloadDto,
    @Body() body: AddItemDto,
  ) {
    return this.service.addItem(+profileId, +userId, body);
  }

  @Patch(':id/items/:itemId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async updateItem(
    @Param('id') profileId: string,
    @Param('itemId') itemId: string,
    @UserData() { userId }: JwtPayloadDto,
    @Body() body: AddItemDto,
  ) {
    return this.service.updateItem(+profileId, +itemId, +userId, body);
  }

  @Delete(':id/items/:itemId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async deleteItem(
    @Param('id') profileId: string,
    @Param('itemId') itemId: string,
    @UserData() { userId }: JwtPayloadDto,
  ) {
    return this.service.deleteItem(+profileId, +itemId, +userId);
  }
}
