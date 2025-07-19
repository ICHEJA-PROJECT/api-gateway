import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { MIME_TYPES } from 'src/exercises/domain/constants/mime-types';
import { isFile } from 'src/shared/data/validators/is-file.validator';

export class CreateTemplateInstructionMediaDto {
  @ApiProperty({ description: 'id of template', type: 'number' })
  @IsNumber()
  template: number;
  @ApiProperty({ description: 'id of type media', type: 'number' })
  @IsNumber()
  typeMedia: number;
  @ApiProperty({
    description: 'path to the media (gif, img, etc)',
    type: 'string',
    format: 'binary',
  })
  @isFile({ mime: [...MIME_TYPES.IMAGES, ...MIME_TYPES.VIDEOS] })
  pathMedia: Express.Multer.File;
}
