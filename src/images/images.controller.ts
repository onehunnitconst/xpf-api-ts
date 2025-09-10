import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { AuthGuard } from '@App/guards/auth.guard';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('profiles')
  @UseInterceptors(
    FileInterceptor('image', { limits: { fileSize: 1024 * 1024 * 1 } }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async uploadProfileImage(@UploadedFile() image: Express.Multer.File) {
    return this.imagesService.uploadImage(image, 'profiles');
  }

  @Post('headers')
  @UseInterceptors(
    FileInterceptor('image', { limits: { fileSize: 1024 * 1024 * 3 } }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          maxLength: 1024 * 1024 * 3,
        },
      },
    },
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async uploadBannerImage(@UploadedFile() image: Express.Multer.File) {
    return this.imagesService.uploadImage(image, 'headers');
  }

  @Post('items')
  @UseInterceptors(
    FileInterceptor('image', { limits: { fileSize: 1024 * 1024 * 3 } }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          maxLength: 1024 * 1024 * 3,
        },
      },
    },
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async uploadItemImage(@UploadedFile() image: Express.Multer.File) {
    return this.imagesService.uploadImage(image, 'items');
  }
}
